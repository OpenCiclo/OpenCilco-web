// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { ConsoleForbidden } from "@/components/console/console-forbidden";
import { ConsoleLearnList } from "@/components/console/console-learn-list";
import { LEARN_ARTICLES } from "@/lib/learn/articles";
import { listLearnForConsole } from "@/lib/learn/catalog";
import { loadDbLearnEntries } from "@/lib/learn/load";
import { requireConsolePage } from "@/lib/server/console";

export const dynamic = "force-dynamic";

export default async function ConsoleLearnPage() {
  const access = await requireConsolePage("/console/learn");
  if (!access.ok) return <ConsoleForbidden />;
  const dbRows = await loadDbLearnEntries();
  const items = listLearnForConsole(LEARN_ARTICLES, dbRows);
  return <ConsoleLearnList items={items} />;
}
