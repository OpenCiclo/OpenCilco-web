// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { and, eq, gt } from "drizzle-orm";

import { verifyChallenge } from "@/lib/crypto/wallet";
import { accounts, authChallenges } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/server/env";
import { setSessionCookie } from "@/lib/server/session";
import { recordAccountOpen } from "@/lib/server/account-activity";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    pubkeyHash?: string;
    pubkey?: string;
    nonce?: string;
    signature?: string;
    ciphertext?: string;
    nonceVault?: string;
    schemaVersion?: number;
    persist?: boolean;
  };
  const pubkeyHash = body.pubkeyHash?.trim().toLowerCase();
  const pubkey = body.pubkey?.trim().toLowerCase();
  const nonce = body.nonce?.trim();
  const signature = body.signature?.trim().toLowerCase();
  if (
    !pubkeyHash ||
    !pubkey ||
    !nonce ||
    !signature ||
    !/^[0-9a-f]{64}$/.test(pubkeyHash) ||
    !/^[0-9a-f]{64}$/.test(pubkey) ||
    !/^[0-9a-f]+$/.test(signature)
  ) {
    return jsonError("Invalid authentication payload", 400);
  }
  if (!verifyChallenge(pubkey, pubkeyHash, nonce, signature)) {
    return jsonError("Signature rejected", 401);
  }

  const db = getDb();
  const challenges = await db
    .select()
    .from(authChallenges)
    .where(
      and(
        eq(authChallenges.pubkeyHash, pubkeyHash),
        eq(authChallenges.nonce, nonce),
        gt(authChallenges.expiresAt, new Date()),
      ),
    )
    .limit(1);
  if (!challenges[0]) {
    return jsonError("Challenge expired", 401);
  }
  await db.delete(authChallenges).where(eq(authChallenges.pubkeyHash, pubkeyHash));

  const existing = await db
    .select()
    .from(accounts)
    .where(eq(accounts.pubkeyHash, pubkeyHash))
    .limit(1);
  let created = false;
  if (!existing[0]) {
    await db.insert(accounts).values({
      pubkeyHash,
      pubkey,
      ciphertext: body.ciphertext ?? "",
      nonce: body.nonceVault ?? "",
      schemaVersion: body.schemaVersion ?? 1,
    });
    created = true;
  }
  await setSessionCookie(pubkeyHash, body.persist !== false);
  await recordAccountOpen(pubkeyHash);
  return Response.json({ ok: true, created });
}
