// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { eq } from "drizzle-orm";

import { accounts } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/server/env";
import { requireAccount } from "@/lib/server/account";
import { MAX_VAULT_CIPHERTEXT_LENGTH } from "@/lib/server/vault-limits";

export { MAX_VAULT_CIPHERTEXT_LENGTH };

export async function GET() {
  const { error, account } = await requireAccount();
  if (error || !account) return error;
  return Response.json({
    ciphertext: account.ciphertext,
    nonce: account.nonce,
    schemaVersion: account.schemaVersion,
    updatedAt: account.updatedAt,
  });
}

export async function PUT(request: Request) {
  const { error, account } = await requireAccount();
  if (error || !account) return error;
  const body = (await request.json()) as {
    ciphertext?: string;
    nonce?: string;
    schemaVersion?: number;
  };
  if (!body.ciphertext || !body.nonce) {
    return jsonError("Ciphertext and nonce are required", 400);
  }
  if (body.ciphertext.length > MAX_VAULT_CIPHERTEXT_LENGTH) {
    return jsonError("Vault too large", 413);
  }
  const db = getDb();
  await db
    .update(accounts)
    .set({
      ciphertext: body.ciphertext,
      nonce: body.nonce,
      schemaVersion: body.schemaVersion ?? 1,
      updatedAt: new Date(),
    })
    .where(eq(accounts.id, account.id));
  return Response.json({ ok: true });
}
