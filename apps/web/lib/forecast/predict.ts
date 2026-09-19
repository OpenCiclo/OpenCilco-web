// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import releasedModel from "./released_model.json";
import {
  ENGINE_VERSION,
  HIGH_UNCERTAINTY_MAX_CYCLES,
  HIGH_UNCERTAINTY_MIN_SCALE,
  INCOMPLETE_HISTORY_DAYS,
  LOW_UNCERTAINTY_MAX_SCALE,
  LOW_UNCERTAINTY_MIN_CYCLES,
  MAX_CYCLE_LENGTH,
  MEDICAL_DISCLAIMER,
  MIN_CYCLE_LENGTH,
  MIN_LAPLACE_SCALE,
  PROBABILITY_WINDOWS,
} from "./constants";
import {
  lengthDistribution,
  mostLikelyLength,
  probabilityWithinWindow,
  uncertaintyLabel,
} from "./distribution";
import { addDays, argMax, cycleLengths, daysBetween } from "./math";
import { estimateShrinkageMedian, scaleForShrinkage } from "./shrinkage";
import type {
  DailyProbability,
  Forecast,
  ForecastConfig,
  LengthDistribution,
  PopulationPrior,
} from "./types";

export function releasedPrior(): PopulationPrior {
  return {
    medianLength: releasedModel.population_median,
    madLength: releasedModel.population_mad,
    meanLength: releasedModel.population_mean,
    source: releasedModel.dataset,
  };
}

export function releasedConfig(): ForecastConfig {
  return {
    minCycleLength: MIN_CYCLE_LENGTH,
    maxCycleLength: MAX_CYCLE_LENGTH,
    incompleteHistoryDays: INCOMPLETE_HISTORY_DAYS,
    minLaplaceScale: MIN_LAPLACE_SCALE,
    probabilityWindows: PROBABILITY_WINDOWS,
    shrinkageK: releasedModel.shrinkage_k,
    blendLast: releasedModel.blend_last,
    personalClipRadius: releasedModel.personal_clip_radius,
    lowUncertaintyMaxScale: LOW_UNCERTAINTY_MAX_SCALE,
    lowUncertaintyMinCycles: LOW_UNCERTAINTY_MIN_CYCLES,
    highUncertaintyMinScale: HIGH_UNCERTAINTY_MIN_SCALE,
    highUncertaintyMaxCycles: HIGH_UNCERTAINTY_MAX_CYCLES,
  };
}

export function predict(
  history: string[],
  referenceDate?: string,
  prior: PopulationPrior = releasedPrior(),
  config: ForecastConfig = releasedConfig(),
): Forecast {
  const ordered = [...new Set(history)].sort();
  if (ordered.length === 0) {
    throw new Error("At least one period start date is required.");
  }
  if (ordered.length !== history.length) {
    throw new Error("Duplicate period start dates are not allowed.");
  }

  const lastStart = ordered[ordered.length - 1];
  const reference = referenceDate ?? lastStart;
  const lengths = cycleLengths(ordered);
  const pointEst = estimateShrinkageMedian(lengths, prior, config);
  const scale = scaleForShrinkage(lengths, pointEst.point, prior, config);
  const distribution = lengthDistribution(pointEst.point, scale, config);
  const modalLength = mostLikelyLength(distribution);
  const elapsed = daysBetween(lastStart, reference);
  const { daily, displayModeDate, displayModeLength } = datesFromLengths(
    lastStart,
    reference,
    distribution,
    config,
  );

  const withinNext: Record<string, number> = {};
  const withinOfPoint: Record<string, number> = {};
  for (const window of config.probabilityWindows) {
    withinNext[String(window)] = probabilityFrom(reference, daily, window);
    withinOfPoint[String(window)] = probabilityWithinWindow(
      distribution,
      modalLength,
      window,
    );
  }

  const notes = [MEDICAL_DISCLAIMER];
  if (pointEst.usedPrior) {
    notes.push(
      `Personal history had ${pointEst.nLengths} completed cycle(s); the ${prior.source} population prior contributed to the point forecast.`,
    );
  }
  if (elapsed >= config.incompleteHistoryDays) {
    notes.push(
      "A long gap since the last recorded period may mean a missed log. Missing data is treated as unknown, not as a confirmed negative.",
    );
  }

  return {
    mostLikelyDate: displayModeDate,
    mostLikelyCycleLength: displayModeLength,
    dailyProbabilities: daily,
    probabilityWithinNextNDays: withinNext,
    probabilityWithinNDaysOfPoint: withinOfPoint,
    uncertainty: uncertaintyLabel(pointEst.nLengths, scale, pointEst.usedPrior, config),
    cycleLengthDistribution: distribution,
    modelId: "v0.shrinkage.median",
    modelVersion: ENGINE_VERSION,
    referenceDate: reference,
    lastPeriodStart: lastStart,
    notes,
    usedPrior: pointEst.usedPrior,
    nLengths: pointEst.nLengths,
    scale,
    pointEstimate: pointEst.point,
  };
}

function datesFromLengths(
  lastStart: string,
  referenceDate: string,
  distribution: LengthDistribution,
  config: ForecastConfig,
): { daily: DailyProbability[]; displayModeDate: string; displayModeLength: number } {
  const elapsed = daysBetween(lastStart, referenceDate);
  const minK = Math.max(config.minCycleLength, elapsed);
  const rows: { length: number; date: string; probability: number }[] = [];
  for (let i = 0; i < distribution.supportDays.length; i += 1) {
    const length = distribution.supportDays[i];
    if (length < minK) continue;
    rows.push({
      length,
      date: addDays(lastStart, length),
      probability: distribution.probabilities[i],
    });
  }

  if (rows.length === 0) {
    const span = config.maxCycleLength - config.minCycleLength + 1;
    const uniform = 1 / span;
    for (let offset = 0; offset < span; offset += 1) {
      const length = minK + offset;
      rows.push({
        length,
        date: addDays(lastStart, length),
        probability: uniform,
      });
    }
  }

  const total = rows.reduce((sum, row) => sum + row.probability, 0);
  const daily: DailyProbability[] =
    total <= 0
      ? rows.map((row) => ({ date: row.date, probability: 1 / rows.length }))
      : rows.map((row) => ({ date: row.date, probability: row.probability / total }));

  const bestIndex = argMax(daily.map((item) => item.probability));
  const bestDate = daily[bestIndex].date;
  return {
    daily,
    displayModeDate: bestDate,
    displayModeLength: daysBetween(lastStart, bestDate),
  };
}

function probabilityFrom(
  referenceDate: string,
  daily: DailyProbability[],
  windowDays: number,
): number {
  const end = addDays(referenceDate, windowDays);
  let total = 0;
  for (const item of daily) {
    if (item.date >= referenceDate && item.date <= end) {
      total += item.probability;
    }
  }
  return Math.min(Math.max(total, 0), 1);
}
