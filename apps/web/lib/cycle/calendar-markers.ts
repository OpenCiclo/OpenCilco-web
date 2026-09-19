// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { addDaysIso } from "@/lib/diary";
import type { DailyProbability } from "@/lib/forecast/types";

export const PERIOD_START_DISPLAY_THRESHOLD = 0.12;
export const FERTILE_WINDOW_LENGTH_DAYS = 6;
export const FERTILE_OVULATION_OFFSET_DAYS = 14;

export function isCurrentCalendarMonth(viewYear: number, viewMonth: number, today: string): boolean {
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));
  return viewYear === year && viewMonth === month;
}

export function isEditableDiaryDate(iso: string, today: string): boolean {
  return iso <= today;
}

export function estimatedFertileWindow(nextStart: string): { start: string; end: string } {
  return {
    start: addDaysIso(nextStart, -(FERTILE_OVULATION_OFFSET_DAYS + FERTILE_WINDOW_LENGTH_DAYS - 1)),
    end: addDaysIso(nextStart, -FERTILE_OVULATION_OFFSET_DAYS),
  };
}

export function isInEstimatedFertileWindow(date: string, nextStart: string): boolean {
  const { start, end } = estimatedFertileWindow(nextStart);
  return date >= start && date <= end;
}

/** Observed next starts of closed cycles, plus the predicted next start of the open cycle. */
export function fertileWindowAnchors(periodStarts: string[], predictedNext: string | null): string[] {
  const ordered = [...periodStarts].sort();
  const anchors = ordered.slice(1);
  if (predictedNext) anchors.push(predictedNext);
  return anchors;
}

export function isEstimatedFertileDate(
  date: string,
  periodStarts: string[],
  predictedNext: string | null,
): boolean {
  return fertileWindowAnchors(periodStarts, predictedNext).some((anchor) =>
    isInEstimatedFertileWindow(date, anchor),
  );
}

export function possiblePeriodStartDates(
  daily: DailyProbability[],
  today: string,
  threshold = PERIOD_START_DISPLAY_THRESHOLD,
): Set<string> {
  return new Set(
    daily.filter((item) => item.date >= today && item.probability >= threshold).map((item) => item.date),
  );
}

export function isEstimatedBleedingDate(
  date: string,
  window: { dates: string[] } | null | undefined,
): boolean {
  return Boolean(window?.dates.includes(date));
}
