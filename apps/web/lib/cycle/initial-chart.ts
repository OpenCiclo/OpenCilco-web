// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { addDays, daysBetween } from "@/lib/forecast/math";
import type { DailyProbability, Forecast } from "@/lib/forecast/types";

const CHART_DAYS = 28;
const LEAD_DAYS = 3;

export function untruncatedDaily(forecast: Forecast): DailyProbability[] {
  const { supportDays, probabilities } = forecast.cycleLengthDistribution;
  return supportDays.map((length, index) => ({
    date: addDays(forecast.lastPeriodStart, length),
    probability: probabilities[index] ?? 0,
  }));
}

/** Window for the initial forecast chart once the anchored day is in the past. */
export function initialChartWindow(anchorDate: string, today: string): { start: string; end: string } {
  const start = addDays(anchorDate, -LEAD_DAYS);
  const span = daysBetween(start, today) + 1;
  if (today >= start && span <= CHART_DAYS) {
    return { start, end: today };
  }
  return { start: addDays(anchorDate, -13), end: addDays(anchorDate, 14) };
}
