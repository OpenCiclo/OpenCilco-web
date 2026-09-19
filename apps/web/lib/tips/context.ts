// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Diary } from "@/lib/diary";
import { patternStats } from "@/lib/patterns/stats";
import type { TipContext } from "@/lib/tips/types";

export function buildTipContext(diary: Diary, today?: string): TipContext {
  const stats = patternStats(diary, today);
  return {
    currentPhase: stats.currentPhase?.phase ?? null,
    nextPeriodInDays: stats.nextPeriodInDays,
    avgCycleLength: stats.avgCycleLength,
    cycleLengthRange: stats.cycleLengthRange,
    completedCycleCount: stats.completedCycles.length,
    topSymptom: stats.recurringSymptoms[0] ?? null,
  };
}
