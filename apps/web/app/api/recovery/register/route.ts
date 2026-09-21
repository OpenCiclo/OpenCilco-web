// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { and, eq, gt, sql } from "drizzle-orm";

import { mailboxPending, recoveryAttempts, recoveryMailboxes } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { requireAccount } from "@/lib/server/account";
import { emailLookup, hashIp, jsonError } from "@/lib/server/env";
import {
  generateMailboxCode,
  hashMailboxCode,
  MAILBOX_CODE_TTL_MS,
  MAILBOX_SEND_MAX_PER_HOUR,
  mailboxRegisterAction,
  parseMailLocale,
} from "@/lib/server/mailbox";
import { mailTransportConfigured, sendMailboxCode } from "@/lib/server/mail";

export async function POST(request: Request) {
  const { error, account } = await requireAccount();
  if (error || !account) return error;

  const body = (await request.json()) as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const wrappedSecret = typeof body.wrappedSecret === "string" ? body.wrappedSecret : "";
  const wrapNonce = typeof body.wrapNonce === "string" ? body.wrapNonce : "";
  const wrapSalt = typeof body.wrapSalt === "string" ? body.wrapSalt : "";
  const wrapParams = body.wrapParams;
  if (!email.includes("@") || !wrappedSecret || !wrapNonce || !wrapSalt || !wrapParams) {
    return jsonError("Incomplete kit", 400);
  }

  const lookup = emailLookup(email);
  const db = getDb();
  const existing = await db
    .select({
      accountId: recoveryMailboxes.accountId,
      verifiedAt: recoveryMailboxes.verifiedAt,
    })
    .from(recoveryMailboxes)
    .where(eq(recoveryMailboxes.emailLookup, lookup))
    .limit(1);
  const existingRow = existing[0] ?? null;
  const action = mailboxRegisterAction({
    existingMailbox: existingRow ? { accountId: existingRow.accountId } : null,
    accountId: account.id,
  });

  if (action === "update-wrap") {
    await db
      .update(recoveryMailboxes)
      .set({
        wrappedSecret,
        wrapNonce,
        wrapSalt,
        wrapParams,
        verifiedAt: existingRow?.verifiedAt ?? new Date(),
      })
      .where(
        and(eq(recoveryMailboxes.emailLookup, lookup), eq(recoveryMailboxes.accountId, account.id)),
      );
    return Response.json({ ok: true, pending: false });
  }

  if (action === "reject-taken") {
    return Response.json({ pending: true });
  }

  if (!mailTransportConfigured()) {
    return jsonError("Mail is not configured", 503);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local";
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(recoveryAttempts)
    .where(and(eq(recoveryAttempts.emailLookup, lookup), gt(recoveryAttempts.createdAt, hourAgo)));
  if ((recent[0]?.n ?? 0) >= MAILBOX_SEND_MAX_PER_HOUR) {
    return jsonError("Too many attempts", 429);
  }

  const code = generateMailboxCode();
  const expiresAt = new Date(Date.now() + MAILBOX_CODE_TTL_MS);
  await db.delete(mailboxPending).where(eq(mailboxPending.emailLookup, lookup));
  await db.delete(mailboxPending).where(eq(mailboxPending.accountId, account.id));
  await db.insert(mailboxPending).values({
    emailLookup: lookup,
    accountId: account.id,
    wrappedSecret,
    wrapNonce,
    wrapSalt,
    wrapParams,
    codeHash: hashMailboxCode(code),
    expiresAt,
    attemptCount: 0,
  });
  await db.insert(recoveryAttempts).values({ emailLookup: lookup, ipHash: hashIp(ip) });

  try {
    await sendMailboxCode(email, code, parseMailLocale(body.locale));
  } catch {
    return jsonError("Mail is not configured", 503);
  }

  return Response.json({ pending: true });
}
