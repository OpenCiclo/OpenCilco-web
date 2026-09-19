// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

export type UncertaintyLevel = "low" | "medium" | "high";

export type PopulationPrior = {
  medianLength: number;
  madLength: number;
  meanLength: number;
  source: string;
};

export type ForecastConfig = {
  minCycleLength: number;
  maxCycleLength: number;
  incompleteHistoryDays: number;
  minLaplaceScale: number;
  probabilityWindows: readonly number[];
  shrinkageK: number;
  blendLast: number;
  personalClipRadius: number | null;
  lowUncertaintyMaxScale: number;
  lowUncertaintyMinCycles: number;
  highUncertaintyMinScale: number;
  highUncertaintyMaxCycles: number;
};

export type LengthDistribution = {
  supportDays: number[];
  probabilities: number[];
  pointEstimate: number;
  scale: number;
  assumption: string;
};

export type DailyProbability = {
  date: string;
  probability: number;
};

export type Forecast = {
  mostLikelyDate: string;
  mostLikelyCycleLength: number;
  dailyProbabilities: DailyProbability[];
  probabilityWithinNextNDays: Record<string, number>;
  probabilityWithinNDaysOfPoint: Record<string, number>;
  uncertainty: UncertaintyLevel;
  cycleLengthDistribution: LengthDistribution;
  modelId: string;
  modelVersion: string;
  referenceDate: string;
  lastPeriodStart: string;
  notes: string[];
  usedPrior: boolean;
  nLengths: number;
  scale: number;
  pointEstimate: number;
};
