// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { requireConsoleApi } from "@/lib/server/console";
import { loadConsoleStats } from "@/lib/server/console-stats";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await requireConsoleApi();
  if (!access.ok) return access.response;
  const stats = await loadConsoleStats();
  return Response.json(stats);
}
