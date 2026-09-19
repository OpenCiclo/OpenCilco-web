// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { MIN_LAPLACE_SCALE } from "./constants";
import { median } from "./math";
import type { ForecastConfig, PopulationPrior } from "./types";

export function shrinkTowardPrior(
  personal: number,
  n: number,
  prior: PopulationPrior,
  config: ForecastConfig,
): number {
  const weight = n + config.shrinkageK ? n / (n + config.shrinkageK) : 0;
  const point = weight * personal + (1 - weight) * prior.medianLength;
  return clipPersonal(point, prior, config);
}

function clipPersonal(
  value: number,
  prior: PopulationPrior,
  config: ForecastConfig,
): number {
  const radius = config.personalClipRadius;
  if (radius === null) return value;
  const center = prior.medianLength;
  return Math.min(Math.max(value, center - radius), center + radius);
}

function blendLast(personal: number, lengths: number[], config: ForecastConfig): number {
  if (config.blendLast <= 0) return personal;
  const last = lengths[lengths.length - 1];
  return (1 - config.blendLast) * personal + config.blendLast * last;
}

export function estimateScale(
  lengths: number[],
  point: number,
  prior: PopulationPrior,
  minScale: number,
): number {
  if (lengths.length < 2) {
    return Math.max(prior.madLength, minScale);
  }
  const deviations = lengths.map((length) => Math.abs(length - point));
  const mad = median(deviations);
  if (mad < 1e-9) return minScale;
  return Math.max(mad / Math.log(2.0), minScale);
}

export function mixedScale(
  lengths: number[],
  point: number,
  prior: PopulationPrior,
  shrinkageK: number,
  minScale: number,
): number {
  const n = lengths.length;
  const personal = estimateScale(lengths, point, prior, minScale);
  const weight = n + shrinkageK ? n / (n + shrinkageK) : 0;
  const mixed = weight * personal + (1 - weight) * Math.max(prior.madLength, minScale);
  return Math.max(mixed, minScale);
}

export type LengthPoint = {
  point: number;
  usedPrior: boolean;
  nLengths: number;
};

export function estimateShrinkageMedian(
  lengths: number[],
  prior: PopulationPrior,
  config: ForecastConfig,
): LengthPoint {
  if (lengths.length === 0) {
    return { point: prior.medianLength, usedPrior: true, nLengths: 0 };
  }
  const n = lengths.length;
  let personal = blendLast(median(lengths), lengths, config);
  personal = clipPersonal(personal, prior, config);
  const point = shrinkTowardPrior(personal, n, prior, config);
  return { point, usedPrior: true, nLengths: n };
}

export function scaleForShrinkage(
  lengths: number[],
  point: number,
  prior: PopulationPrior,
  config: ForecastConfig,
): number {
  return mixedScale(
    lengths,
    point,
    prior,
    config.shrinkageK,
    config.minLaplaceScale ?? MIN_LAPLACE_SCALE,
  );
}
