// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { LEARN_ARTICLES } from "@/lib/learn/articles";
import { listLearnForConsole, loadDbLearnEntries } from "@/lib/learn/catalog";
import { requireConsoleApi } from "@/lib/server/console";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await requireConsoleApi();
  if (!access.ok) return access.response;
  const dbRows = await loadDbLearnEntries();
  return Response.json({ items: listLearnForConsole(LEARN_ARTICLES, dbRows) });
}
