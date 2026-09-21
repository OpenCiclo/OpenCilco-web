// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { and, eq, gt, isNotNull, sql } from "drizzle-orm";

import { recoveryAttempts, recoveryMailboxes } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { emailLookup, hashIp, jsonError } from "@/lib/server/env";
import { mailboxIsFetchable } from "@/lib/server/mailbox";

const MAX_PER_HOUR = 5;

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  if (!email.includes("@")) {
    return jsonError("Invalid email", 400);
  }
  const lookup = emailLookup(email);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local";
  const db = getDb();
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(recoveryAttempts)
    .where(and(eq(recoveryAttempts.emailLookup, lookup), gt(recoveryAttempts.createdAt, hourAgo)));
  if ((recent[0]?.n ?? 0) >= MAX_PER_HOUR) {
    return jsonError("Too many attempts", 429);
  }
  await db.insert(recoveryAttempts).values({ emailLookup: lookup, ipHash: hashIp(ip) });

  const rows = await db
    .select()
    .from(recoveryMailboxes)
    .where(and(eq(recoveryMailboxes.emailLookup, lookup), isNotNull(recoveryMailboxes.verifiedAt)))
    .limit(1);
  const kit = rows[0];
  if (!kit || !mailboxIsFetchable(kit)) {
    return jsonError("Not found", 404);
  }
  return Response.json({
    wrappedSecret: kit.wrappedSecret,
    wrapNonce: kit.wrapNonce,
    wrapSalt: kit.wrapSalt,
    wrapParams: kit.wrapParams,
  });
}
