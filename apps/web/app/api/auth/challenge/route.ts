// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { eq } from "drizzle-orm";

import { authChallenges } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/server/env";

export async function POST(request: Request) {
  const body = (await request.json()) as { pubkeyHash?: string };
  const pubkeyHash = body.pubkeyHash?.trim().toLowerCase();
  if (!pubkeyHash || !/^[0-9a-f]{64}$/.test(pubkeyHash)) {
    return jsonError("Invalid public key hash", 400);
  }
  const nonce = crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const db = getDb();
  await db.delete(authChallenges).where(eq(authChallenges.pubkeyHash, pubkeyHash));
  await db.insert(authChallenges).values({ pubkeyHash, nonce, expiresAt });
  return Response.json({ nonce, expiresAt: expiresAt.toISOString() });
}
