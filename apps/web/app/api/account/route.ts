// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { eq } from "drizzle-orm";

import { accounts } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { requireAccount } from "@/lib/server/account";
import { clearSessionCookie } from "@/lib/server/session";

export async function DELETE() {
  const { error, account } = await requireAccount();
  if (error || !account) return error;
  const db = getDb();
  await db.delete(accounts).where(eq(accounts.id, account.id));
  await clearSessionCookie();
  return Response.json({ ok: true });
}
