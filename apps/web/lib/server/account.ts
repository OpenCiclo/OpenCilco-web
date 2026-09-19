// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { eq } from "drizzle-orm";

import { accounts } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { jsonError } from "@/lib/server/env";
import { readSession } from "@/lib/server/session";

export async function requireAccount() {
  const session = await readSession();
  if (!session) {
    return { error: jsonError("Not authenticated", 401) as Response, account: null };
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(accounts)
    .where(eq(accounts.pubkeyHash, session.pubkeyHash))
    .limit(1);
  const account = rows[0];
  if (!account) {
    return { error: jsonError("Account not found", 404) as Response, account: null };
  }
  return { error: null, account };
}
