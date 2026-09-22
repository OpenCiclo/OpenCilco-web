// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { eq } from "drizzle-orm";

import { accountActivityDays, accounts } from "@/lib/db/schema";
import { getDb } from "@/lib/db";

export async function recordAccountOpen(pubkeyHash: string): Promise<void> {
  try {
    const db = getDb();
    const rows = await db
      .select({ id: accounts.id })
      .from(accounts)
      .where(eq(accounts.pubkeyHash, pubkeyHash))
      .limit(1);
    const account = rows[0];
    if (!account) return;
    const day = new Date().toISOString().slice(0, 10);
    await db.insert(accountActivityDays).values({ accountId: account.id, day }).onConflictDoNothing();
  } catch {
    // Login still works if 0004_account_activity.sql has not been applied yet.
  }
}
