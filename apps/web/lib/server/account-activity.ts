// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { and, eq, inArray, isNotNull } from "drizzle-orm";

import { parseConsoleEmails } from "@/lib/console/emails";
import { accountActivityDays, accounts, recoveryMailboxes } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { emailLookup } from "@/lib/server/env";

export function consoleAdminLookups(raw = process.env.CONSOLE_EMAILS): string[] {
  try {
    return parseConsoleEmails(raw).map((email) => emailLookup(email));
  } catch {
    return [];
  }
}

export function mailboxIsConsoleAdmin(
  mailboxLookups: readonly string[],
  adminLookups: readonly string[],
): boolean {
  if (adminLookups.length === 0 || mailboxLookups.length === 0) return false;
  const allowed = new Set(adminLookups);
  return mailboxLookups.some((lookup) => allowed.has(lookup));
}

export async function consoleAdminAccountIds(): Promise<string[]> {
  const lookups = consoleAdminLookups();
  if (lookups.length === 0) return [];
  const db = getDb();
  const rows = await db
    .select({ accountId: recoveryMailboxes.accountId })
    .from(recoveryMailboxes)
    .where(
      and(isNotNull(recoveryMailboxes.verifiedAt), inArray(recoveryMailboxes.emailLookup, lookups)),
    );
  return [...new Set(rows.map((row) => row.accountId))];
}

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

    const adminLookups = consoleAdminLookups();
    if (adminLookups.length > 0) {
      const mailboxes = await db
        .select({ emailLookup: recoveryMailboxes.emailLookup })
        .from(recoveryMailboxes)
        .where(
          and(eq(recoveryMailboxes.accountId, account.id), isNotNull(recoveryMailboxes.verifiedAt)),
        );
      if (mailboxIsConsoleAdmin(mailboxes.map((row) => row.emailLookup), adminLookups)) return;
    }

    const day = new Date().toISOString().slice(0, 10);
    await db.insert(accountActivityDays).values({ accountId: account.id, day }).onConflictDoNothing();
  } catch {
    // Login still works if 0004_account_activity.sql has not been applied yet.
  }
}
