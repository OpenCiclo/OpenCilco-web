// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { eq } from "drizzle-orm";

import { recoveryMailboxes } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { emailLookup, jsonError } from "@/lib/server/env";
import { requireAccount } from "@/lib/server/account";

export async function POST(request: Request) {
  const { error, account } = await requireAccount();
  if (error || !account) return error;
  const body = (await request.json()) as {
    email?: string;
    wrappedSecret?: string;
    wrapNonce?: string;
    wrapSalt?: string;
    wrapParams?: Record<string, unknown>;
  };
  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@") || !body.wrappedSecret || !body.wrapNonce || !body.wrapSalt) {
    return jsonError("Incomplete recovery kit", 400);
  }
  const lookup = emailLookup(email);
  const db = getDb();
  await db.delete(recoveryMailboxes).where(eq(recoveryMailboxes.accountId, account.id));
  await db.insert(recoveryMailboxes).values({
    emailLookup: lookup,
    wrappedSecret: body.wrappedSecret,
    wrapNonce: body.wrapNonce,
    wrapSalt: body.wrapSalt,
    wrapParams: body.wrapParams ?? { kdf: "pbkdf2-sha256" },
    accountId: account.id,
  });
  return Response.json({ ok: true });
}
