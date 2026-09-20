// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { ConsoleForbidden } from "@/components/console/console-forbidden";
import { ConsoleStatsView } from "@/components/console/console-stats-view";
import { requireConsolePage } from "@/lib/server/console";
import { loadConsoleStats } from "@/lib/server/console-stats";

export const dynamic = "force-dynamic";

export default async function ConsolePage() {
  const access = await requireConsolePage("/console");
  if (!access.ok) return <ConsoleForbidden />;
  const stats = await loadConsoleStats();
  return <ConsoleStatsView stats={stats} />;
}
