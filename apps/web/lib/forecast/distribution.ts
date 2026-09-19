// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import {
  HIGH_UNCERTAINTY_MAX_CYCLES,
  HIGH_UNCERTAINTY_MIN_SCALE,
  LOW_UNCERTAINTY_MAX_SCALE,
  LOW_UNCERTAINTY_MIN_CYCLES,
  MAX_CYCLE_LENGTH,
  MIN_CYCLE_LENGTH,
} from "./constants";
import { argMax, logSumExp } from "./math";
import type {
  ForecastConfig,
  LengthDistribution,
  UncertaintyLevel,
} from "./types";

export function discreteLaplacePmf(
  center: number,
  scale: number,
  support: number[],
): number[] {
  const safeScale = Math.max(scale, 1e-6);
  const logMass = support.map((value) => -Math.abs(value - center) / safeScale);
  const norm = logSumExp(logMass);
  let pmf = logMass.map((value) => Math.exp(value - norm));
  pmf = pmf.map((value) => Math.min(Math.max(value, 0), 1));
  const total = pmf.reduce((sum, value) => sum + value, 0);
  if (total <= 0) {
    return support.map(() => 1 / support.length);
  }
  return pmf.map((value) => value / total);
}

export function lengthDistribution(
  point: number,
  scale: number,
  config: ForecastConfig,
): LengthDistribution {
  const support: number[] = [];
  for (let day = config.minCycleLength; day <= config.maxCycleLength; day += 1) {
    support.push(day);
  }
  const probabilities = discreteLaplacePmf(point, scale, support);
  return {
    supportDays: support,
    probabilities,
    pointEstimate: point,
    scale,
    assumption: "v0_discrete_laplace",
  };
}

export function mostLikelyLength(distribution: LengthDistribution): number {
  return distribution.supportDays[argMax(distribution.probabilities)];
}

export function probabilityWithinWindow(
  distribution: LengthDistribution,
  center: number,
  radius: number,
): number {
  let total = 0;
  for (let i = 0; i < distribution.supportDays.length; i += 1) {
    if (Math.abs(distribution.supportDays[i] - center) <= radius) {
      total += distribution.probabilities[i];
    }
  }
  return Math.min(Math.max(total, 0), 1);
}

export function uncertaintyLabel(
  nLengths: number,
  scale: number,
  usedPrior: boolean,
  config: ForecastConfig,
): UncertaintyLevel {
  if (usedPrior && nLengths < 2) return "high";
  if (
    nLengths <= (config.highUncertaintyMaxCycles ?? HIGH_UNCERTAINTY_MAX_CYCLES) ||
    scale >= (config.highUncertaintyMinScale ?? HIGH_UNCERTAINTY_MIN_SCALE)
  ) {
    return "high";
  }
  if (
    nLengths >= (config.lowUncertaintyMinCycles ?? LOW_UNCERTAINTY_MIN_CYCLES) &&
    scale <= (config.lowUncertaintyMaxScale ?? LOW_UNCERTAINTY_MAX_SCALE)
  ) {
    return "low";
  }
  return "medium";
}

export function defaultSupport(): number[] {
  const support: number[] = [];
  for (let day = MIN_CYCLE_LENGTH; day <= MAX_CYCLE_LENGTH; day += 1) {
    support.push(day);
  }
  return support;
}
