// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { addDaysIso, type Diary } from "@/lib/diary";
import { median } from "@/lib/forecast/math";

export type PeriodRun = {
  start: string;
  length: number;
  dates: string[];
};

export type PeriodDurationSource = "history" | "insufficient_history";

export type PeriodDurationStats = {
  closedRuns: PeriodRun[];
  nRuns: number;
  meanDays: number | null;
  medianDays: number | null;
  expectedDays: number | null;
  range: { min: number; max: number } | null;
  source: PeriodDurationSource;
};

function bleedRunFromStart(diary: Diary, start: string, limitExclusive?: string): string[] {
  const dates: string[] = [];
  let cursor = start;
  while (diary.days[cursor]?.flow && (!limitExclusive || cursor < limitExclusive)) {
    dates.push(cursor);
    cursor = addDaysIso(cursor, 1);
  }
  return dates;
}

/** Consecutive bleeding days from every recorded start, including the open cycle. */
export function periodRuns(diary: Diary): PeriodRun[] {
  return [...diary.periodStarts].sort().map((start) => {
    const dates = bleedRunFromStart(diary, start);
    return { start, length: Math.max(dates.length, 1), dates };
  });
}

/**
 * Periods closed by a later start. Open/current bleeding is excluded so an
 * incomplete log cannot count as a one-day period.
 */
export function closedPeriodRuns(diary: Diary): PeriodRun[] {
  const starts = [...diary.periodStarts].sort();
  if (starts.length < 2) return [];
  const closed: PeriodRun[] = [];
  for (let i = 0; i < starts.length - 1; i += 1) {
    const start = starts[i];
    const nextStart = starts[i + 1];
    const dates = bleedRunFromStart(diary, start, nextStart);
    if (dates.length === 0) continue;
    closed.push({ start, length: dates.length, dates });
  }
  return closed;
}

export function estimatePeriodDuration(diary: Diary): PeriodDurationStats {
  const closedRuns = closedPeriodRuns(diary);
  const lengths = closedRuns.map((run) => run.length);
  if (lengths.length === 0) {
    return {
      closedRuns,
      nRuns: 0,
      meanDays: null,
      medianDays: null,
      expectedDays: null,
      range: null,
      source: "insufficient_history",
    };
  }
  const meanDays = Math.max(1, Math.round(lengths.reduce((sum, value) => sum + value, 0) / lengths.length));
  const medianDays = median(lengths);
  return {
    closedRuns,
    nRuns: lengths.length,
    meanDays,
    medianDays,
    expectedDays: Math.max(1, Math.round(medianDays)),
    range: { min: Math.min(...lengths), max: Math.max(...lengths) },
    source: "history",
  };
}

export function expectedBleedingWindow(
  start: string | null,
  durationDays: number | null,
): { start: string; end: string; dates: string[] } | null {
  if (!start || durationDays === null || durationDays < 1) return null;
  const dates: string[] = [];
  for (let offset = 0; offset < durationDays; offset += 1) {
    dates.push(addDaysIso(start, offset));
  }
  return { start, end: dates[dates.length - 1], dates };
}
