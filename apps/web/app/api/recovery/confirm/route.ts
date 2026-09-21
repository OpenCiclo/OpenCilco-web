// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { eq } from "drizzle-orm";

import { mailboxPending, recoveryMailboxes } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { requireAccount } from "@/lib/server/account";
import { jsonError } from "@/lib/server/env";
import {
  hashMailboxCode,
  MAILBOX_CODE_MAX_ATTEMPTS,
  mailboxCodesEqual,
  parseMailboxCode,
  pendingIsExpired,
} from "@/lib/server/mailbox";

export async function POST(request: Request) {
  const { error, account } = await requireAccount();
  if (error || !account) return error;

  const body = (await request.json()) as Record<string, unknown>;
  const db = getDb();
  const pendingRows = await db
    .select()
    .from(mailboxPending)
    .where(eq(mailboxPending.accountId, account.id))
    .limit(1);
  const pending = pendingRows[0];
  if (!pending) {
    return jsonError("Could not confirm", 400);
  }

  if (pendingIsExpired(pending.expiresAt)) {
    await db.delete(mailboxPending).where(eq(mailboxPending.id, pending.id));
    return jsonError("Could not confirm", 400);
  }

  const code = parseMailboxCode(body.code);
  if (!code || !mailboxCodesEqual(pending.codeHash, hashMailboxCode(code))) {
    const attempts = pending.attemptCount + 1;
    if (attempts >= MAILBOX_CODE_MAX_ATTEMPTS) {
      await db.delete(mailboxPending).where(eq(mailboxPending.id, pending.id));
    } else {
      await db
        .update(mailboxPending)
        .set({ attemptCount: attempts })
        .where(eq(mailboxPending.id, pending.id));
    }
    return jsonError("Could not confirm", 400);
  }

  try {
    await db.insert(recoveryMailboxes).values({
      emailLookup: pending.emailLookup,
      accountId: account.id,
      wrappedSecret: pending.wrappedSecret,
      wrapNonce: pending.wrapNonce,
      wrapSalt: pending.wrapSalt,
      wrapParams: pending.wrapParams,
      verifiedAt: new Date(),
    });
  } catch {
    await db.delete(mailboxPending).where(eq(mailboxPending.id, pending.id));
    return jsonError("Could not confirm", 400);
  }

  await db.delete(mailboxPending).where(eq(mailboxPending.id, pending.id));
  return Response.json({ ok: true });
}
