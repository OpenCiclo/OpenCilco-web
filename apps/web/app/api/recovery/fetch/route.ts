// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { and, eq, gt, sql } from "drizzle-orm";

import { recoveryAttempts, recoveryMailboxes } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { emailLookup, hashIp, jsonError } from "@/lib/server/env";

const MAX_PER_HOUR = 5;
const GENERIC_ERROR = "Invalid email or password";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return jsonError(GENERIC_ERROR, 404);
  }
  const lookup = emailLookup(email);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = hashIp(ip);
  const db = getDb();
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await db
    .select({ count: sql<number>`count(*)` })
    .from(recoveryAttempts)
    .where(and(eq(recoveryAttempts.emailLookup, lookup), gt(recoveryAttempts.createdAt, hourAgo)));
  if (Number(recent[0]?.count ?? 0) >= MAX_PER_HOUR) {
    return jsonError("Too many attempts. Try again later.", 429);
  }
  await db.insert(recoveryAttempts).values({ emailLookup: lookup, ipHash });

  const mailbox = await db
    .select()
    .from(recoveryMailboxes)
    .where(eq(recoveryMailboxes.emailLookup, lookup))
    .limit(1);
  const kit = mailbox[0];
  if (!kit?.wrappedSecret) {
    return jsonError(GENERIC_ERROR, 404);
  }
  return Response.json({
    wrappedSecret: kit.wrappedSecret,
    wrapNonce: kit.wrapNonce,
    wrapSalt: kit.wrapSalt,
    wrapParams: kit.wrapParams,
  });
}
