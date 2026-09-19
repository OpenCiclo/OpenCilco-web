// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { addDaysIso, todayIsoUtc, type Diary } from "@/lib/diary";
import { daysBetween } from "@/lib/forecast/math";
import { predict } from "@/lib/forecast/predict";
import type { Forecast } from "@/lib/forecast/types";
import type { Messages } from "@/lib/i18n";
import {
  estimatePeriodDuration,
  expectedBleedingWindow,
  periodRuns,
  type PeriodDurationStats,
  type PeriodRun,
} from "@/lib/cycle/period-duration";

export const CYCLE_PHASES = ["menstrual", "follicular", "ovulation", "luteal"] as const;
export type CyclePhase = (typeof CYCLE_PHASES)[number];
export type PhaseSource = "observed" | "estimated";
export const CYCLE_SEASONS = ["winter", "spring", "summer", "fall"] as const;
export type CycleSeason = (typeof CYCLE_SEASONS)[number];

export type { PeriodRun };

export type PhaseAtDate = {
  phase: CyclePhase;
  source: PhaseSource;
  cycleDay: number;
  cycleStart: string;
  nextStart: string;
};

export type CycleOverview = {
  currentCycleDay: number | null;
  currentPhase: PhaseAtDate | null;
  avgCycleLength: number | null;
  avgPeriodLength: number | null;
  expectedPeriodLength: number | null;
  expectedBleedingWindow: { start: string; end: string; dates: string[] } | null;
  periodLengthRange: { min: number; max: number } | null;
  nextPeriodDate: string | null;
  nextPeriodInDays: number | null;
  forecast: Forecast | null;
  forecastingEnabled: boolean;
  periodRuns: PeriodRun[];
  periodDuration: PeriodDurationStats;
};

const DEFAULT_PERIOD_LENGTH = 5;
const OVULATION_OFFSET_START = 16;
const OVULATION_OFFSET_END = 10;

export const PHASE_COPY: Record<CyclePhase, { label: keyof Messages; body: keyof Messages }> = {
  menstrual: { label: "phaseMenstrual", body: "phaseMenstrualBody" },
  follicular: { label: "phaseFollicular", body: "phaseFollicularBody" },
  ovulation: { label: "phaseOvulation", body: "phaseOvulationBody" },
  luteal: { label: "phaseLuteal", body: "phaseLutealBody" },
};

const PHASE_SEASONS: Record<CyclePhase, CycleSeason> = {
  menstrual: "winter",
  follicular: "spring",
  ovulation: "summer",
  luteal: "fall",
};

export function phaseSeason(phase: CyclePhase): CycleSeason {
  return PHASE_SEASONS[phase];
}

export function phaseLabel(phase: CyclePhase, t: Messages): string {
  return String(t[PHASE_COPY[phase].label]);
}

export function phaseBody(phase: CyclePhase, t: Messages): string {
  return String(t[PHASE_COPY[phase].body]);
}

export { periodRuns };

export function averagePeriodLength(runs: PeriodRun[]): number {
  if (runs.length === 0) return DEFAULT_PERIOD_LENGTH;
  const total = runs.reduce((sum, run) => sum + run.length, 0);
  return Math.max(1, Math.round(total / runs.length));
}

export function meanRounded(values: number[]): number | null {
  if (values.length === 0) return null;
  return Math.max(1, Math.round(values.reduce((sum, value) => sum + value, 0) / values.length));
}

export function lastPeriodStartOnOrBefore(starts: string[], date: string): string | null {
  let start: string | null = null;
  for (const candidate of [...starts].sort()) {
    if (candidate <= date) start = candidate;
    else break;
  }
  return start;
}

export function cycleDayAtDate(starts: string[], date: string): number | null {
  const start = lastPeriodStartOnOrBefore(starts, date);
  if (!start) return null;
  return daysBetween(start, date) + 1;
}

export function cycleContaining(date: string, starts: string[], predictedNext: string | null) {
  const ordered = [...starts].sort();
  if (ordered.length === 0) return null;
  let start = ordered[0];
  if (date < start) return null;
  let next = predictedNext;
  for (let i = 0; i < ordered.length; i += 1) {
    const current = ordered[i];
    const following = ordered[i + 1] ?? predictedNext;
    if (date >= current && (!following || date < following)) {
      start = current;
      next = following ?? predictedNext;
      break;
    }
  }
  if (!next || date >= next) return null;
  return { start, next };
}

function inOvulationWindow(date: string, nextStart: string): boolean {
  const windowStart = addDaysIso(nextStart, -OVULATION_OFFSET_START);
  const windowEnd = addDaysIso(nextStart, -OVULATION_OFFSET_END);
  return date >= windowStart && date <= windowEnd;
}

export function phaseAtDate(
  diary: Diary,
  date: string,
  predictedNext: string | null = null,
  periodLength = estimatePeriodDuration(diary).expectedDays ?? DEFAULT_PERIOD_LENGTH,
  options: { includeEstimated?: boolean } = {},
): PhaseAtDate | null {
  const includeEstimated = options.includeEstimated ?? true;
  const bounds = cycleContaining(date, diary.periodStarts, predictedNext);
  if (diary.days[date]?.flow) {
    const start = bounds?.start ?? lastPeriodStartOnOrBefore(diary.periodStarts, date);
    if (!start) return null;
    return {
      phase: "menstrual",
      source: "observed",
      cycleDay: daysBetween(start, date) + 1,
      cycleStart: start,
      nextStart: bounds?.next ?? start,
    };
  }
  if (!includeEstimated || !bounds) return null;
  const cycleDay = daysBetween(bounds.start, date) + 1;
  const menstrualEnd = addDaysIso(bounds.start, periodLength - 1);
  if (date <= menstrualEnd) {
    return {
      phase: "menstrual",
      source: "estimated",
      cycleDay,
      cycleStart: bounds.start,
      nextStart: bounds.next,
    };
  }
  if (inOvulationWindow(date, bounds.next)) {
    return {
      phase: "ovulation",
      source: "estimated",
      cycleDay,
      cycleStart: bounds.start,
      nextStart: bounds.next,
    };
  }
  const ovulationStart = addDaysIso(bounds.next, -OVULATION_OFFSET_START);
  return {
    phase: date < ovulationStart ? "follicular" : "luteal",
    source: "estimated",
    cycleDay,
    cycleStart: bounds.start,
    nextStart: bounds.next,
  };
}

export function isPeriodDueOrOverdue(overview: CycleOverview): boolean {
  return Boolean(
    overview.forecastingEnabled &&
      overview.forecast &&
      !overview.currentPhase &&
      overview.nextPeriodInDays !== null &&
      overview.nextPeriodInDays <= 0,
  );
}

export function cycleOverview(diary: Diary, today = todayIsoUtc()): CycleOverview {
  const runs = periodRuns(diary);
  const periodDuration = estimatePeriodDuration(diary);
  const starts = [...diary.periodStarts].sort();
  const completedLengths: number[] = [];
  for (let i = 0; i < starts.length - 1; i += 1) {
    completedLengths.push(daysBetween(starts[i], starts[i + 1]));
  }
  const avgCycleLength = meanRounded(completedLengths);
  const currentCycleDay = cycleDayAtDate(starts, today);
  const forecastingEnabled = diary.forecastingEnabled !== false;
  const empty: CycleOverview = {
    currentCycleDay,
    currentPhase: null,
    avgCycleLength,
    avgPeriodLength: periodDuration.meanDays,
    expectedPeriodLength: periodDuration.expectedDays,
    expectedBleedingWindow: null,
    periodLengthRange: periodDuration.range,
    nextPeriodDate: null,
    nextPeriodInDays: null,
    forecast: null,
    forecastingEnabled,
    periodRuns: runs,
    periodDuration,
  };

  if (starts.length === 0) {
    return { ...empty, currentCycleDay: null };
  }

  const menstrualLength = periodDuration.expectedDays ?? DEFAULT_PERIOD_LENGTH;
  if (!forecastingEnabled) {
    return {
      ...empty,
      currentPhase: phaseAtDate(diary, today, null, menstrualLength, { includeEstimated: false }),
    };
  }

  const forecast = predict(diary.periodStarts, today);
  const currentPhase = phaseAtDate(diary, today, forecast.mostLikelyDate, menstrualLength, {
    includeEstimated: true,
  });
  return {
    ...empty,
    currentPhase,
    currentCycleDay: currentPhase?.cycleDay ?? currentCycleDay,
    expectedBleedingWindow: expectedBleedingWindow(forecast.mostLikelyDate, periodDuration.expectedDays),
    nextPeriodDate: forecast.mostLikelyDate,
    nextPeriodInDays: daysBetween(today, forecast.mostLikelyDate),
    forecast,
  };
}
