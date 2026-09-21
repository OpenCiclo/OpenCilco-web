// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { and, eq, isNotNull } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import { parseConsoleEmails, consoleIsEnabled } from "@/lib/console/emails";
import { isSafeConsoleNextPath } from "@/lib/console/paths";
import { accounts, recoveryMailboxes } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { emailLookup, jsonError } from "@/lib/server/env";
import { readSession } from "@/lib/server/session";

export type ConsoleAccess =
  | { status: "disabled" }
  | { status: "unauthenticated" }
  | { status: "forbidden" }
  | { status: "ok"; accountId: string };

export async function readConsoleAccess(): Promise<ConsoleAccess> {
  const emails = parseConsoleEmails(process.env.CONSOLE_EMAILS);
  if (emails.length === 0) return { status: "disabled" };

  const session = await readSession();
  if (!session) return { status: "unauthenticated" };

  try {
    const db = getDb();
    const accountRows = await db
      .select({ id: accounts.id })
      .from(accounts)
      .where(eq(accounts.pubkeyHash, session.pubkeyHash))
      .limit(1);
    const account = accountRows[0];
    if (!account) return { status: "forbidden" };

    const mailboxRows = await db
      .select({ emailLookup: recoveryMailboxes.emailLookup })
      .from(recoveryMailboxes)
      .where(
        and(eq(recoveryMailboxes.accountId, account.id), isNotNull(recoveryMailboxes.verifiedAt)),
      );
    if (mailboxRows.length === 0) return { status: "forbidden" };

    const allowed = new Set(emails.map((email) => emailLookup(email)));
    if (!mailboxRows.some((row) => allowed.has(row.emailLookup))) return { status: "forbidden" };

    return { status: "ok", accountId: account.id };
  } catch {
    return { status: "forbidden" };
  }
}

export async function requireConsolePage(nextPath: string): Promise<{ ok: true } | { ok: false }> {
  const access = await readConsoleAccess();
  if (access.status === "disabled") notFound();
  if (access.status === "unauthenticated") {
    const next = isSafeConsoleNextPath(nextPath) ? nextPath : "/console";
    redirect(`/unlock?next=${encodeURIComponent(next)}`);
  }
  if (access.status === "forbidden") return { ok: false };
  return { ok: true };
}

export async function requireConsoleApi(): Promise<{ ok: true } | { ok: false; response: Response }> {
  const access = await readConsoleAccess();
  if (access.status === "disabled") return { ok: false, response: jsonError("Not found", 404) };
  if (access.status === "unauthenticated") return { ok: false, response: jsonError("Not authenticated", 401) };
  if (access.status === "forbidden") return { ok: false, response: jsonError("Forbidden", 403) };
  return { ok: true };
}

export { consoleIsEnabled };
