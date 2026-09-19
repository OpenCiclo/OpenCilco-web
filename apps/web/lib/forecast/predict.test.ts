// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { discreteLaplacePmf } from "./distribution";
import { predict } from "./predict";
import releasedModel from "./released_model.json";
import {
  estimateScale,
  mixedScale,
  shrinkTowardPrior,
} from "./shrinkage";
import type { ForecastConfig, PopulationPrior } from "./types";

const fixturePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../tests/fixtures/forecast_parity.json",
);
const parity = JSON.parse(readFileSync(fixturePath, "utf8")) as {
  shrinkage_cases: {
    personal: number;
    n: number;
    k: number;
    prior_median: number;
    expected: number;
  }[];
  mixed_scale_cases: {
    lengths: number[];
    point: number;
    shrinkage_k: number;
    min_scale: number;
    prior_median: number;
    prior_mad: number;
    expected: number;
  }[];
  estimate_scale_cases: {
    lengths: number[];
    point: number;
    min_scale: number;
    prior_mad: number;
    expected: number;
  }[];
  laplace_pmf: {
    center: number;
    scale: number;
    support_days: number[];
    probabilities: number[];
  };
  forecasts: {
    history: string[];
    reference_date: string;
    most_likely_date: string;
    most_likely_cycle_length: number;
    uncertainty: string;
    model_id: string;
    model_version: string;
    probability_within_next_n_days: Record<string, number>;
    probability_within_n_days_of_point: Record<string, number>;
    daily_probabilities: { date: string; probability: number }[];
    point_estimate: number;
    scale: number;
    assumption: string;
    support_days: number[];
    probabilities: number[];
    notes: string[];
  }[];
};

const placeholderPrior = (median: number, mad: number): PopulationPrior => ({
  medianLength: median,
  madLength: mad,
  meanLength: median,
  source: "literature_placeholder",
});

const configFor = (k: number): ForecastConfig => ({
  minCycleLength: 1,
  maxCycleLength: 90,
  incompleteHistoryDays: 40,
  minLaplaceScale: 0.75,
  probabilityWindows: [1, 2, 3, 5],
  shrinkageK: k,
  blendLast: 0,
  personalClipRadius: null,
  lowUncertaintyMaxScale: 2,
  lowUncertaintyMinCycles: 6,
  highUncertaintyMinScale: 5,
  highUncertaintyMaxCycles: 2,
});

describe("released model copy", () => {
  it("stays on the mcPHASES aggregate and does not mix Utah", () => {
    expect(releasedModel.dataset.toLowerCase()).toContain("mcphases");
    expect(releasedModel.dataset.toLowerCase()).not.toContain("utah");
    expect(releasedModel.dataset.toLowerCase()).not.toContain("creighton");
    expect(releasedModel.population_median).toBe(30.5);
    expect(releasedModel.shrinkage_k).toBe(2);
    expect(releasedModel.length_family).toBe("laplace");
  });

  it("matches the Python artifact byte-for-byte as JSON", () => {
    const rootPath = join(
      dirname(fileURLToPath(import.meta.url)),
      "../../../../openciclo/artifacts/released_model.json",
    );
    const root = JSON.parse(readFileSync(rootPath, "utf8")) as typeof releasedModel;
    expect(releasedModel).toEqual(root);
  });
});

describe("Python parity", () => {
  it("matches shrinkage toward the placeholder prior", () => {
    for (const testCase of parity.shrinkage_cases) {
      const prior = placeholderPrior(testCase.prior_median, 4);
      const got = shrinkTowardPrior(
        testCase.personal,
        testCase.n,
        prior,
        configFor(testCase.k),
      );
      expect(got).toBeCloseTo(testCase.expected, 12);
    }
  });

  it("matches mixed Laplace scale", () => {
    for (const testCase of parity.mixed_scale_cases) {
      const prior = placeholderPrior(testCase.prior_median, testCase.prior_mad);
      const got = mixedScale(
        testCase.lengths,
        testCase.point,
        prior,
        testCase.shrinkage_k,
        testCase.min_scale,
      );
      expect(got).toBeCloseTo(testCase.expected, 12);
    }
  });

  it("matches estimate_scale for short histories", () => {
    for (const testCase of parity.estimate_scale_cases) {
      const prior = placeholderPrior(29, testCase.prior_mad);
      const got = estimateScale(
        testCase.lengths,
        testCase.point,
        prior,
        testCase.min_scale,
      );
      expect(got).toBeCloseTo(testCase.expected, 12);
    }
  });

  it("matches the discrete Laplace PMF", () => {
    const got = discreteLaplacePmf(
      parity.laplace_pmf.center,
      parity.laplace_pmf.scale,
      parity.laplace_pmf.support_days,
    );
    expect(got.length).toBe(parity.laplace_pmf.probabilities.length);
    for (let i = 0; i < got.length; i += 1) {
      expect(got[i]).toBeCloseTo(parity.laplace_pmf.probabilities[i], 12);
    }
  });

  it("matches full predict() vectors from the released model", () => {
    for (const expected of parity.forecasts) {
      const got = predict(expected.history, expected.reference_date);
      expect(got.modelId).toBe(expected.model_id);
      expect(got.modelVersion).toBe(expected.model_version);
      expect(got.mostLikelyDate).toBe(expected.most_likely_date);
      expect(got.mostLikelyCycleLength).toBe(expected.most_likely_cycle_length);
      expect(got.uncertainty).toBe(expected.uncertainty);
      expect(got.pointEstimate).toBeCloseTo(expected.point_estimate, 12);
      expect(got.scale).toBeCloseTo(expected.scale, 12);
      expect(got.cycleLengthDistribution.assumption).toBe(expected.assumption);
      expect(got.notes[0]).toBe(expected.notes[0]);
      for (const window of Object.keys(expected.probability_within_next_n_days)) {
        expect(got.probabilityWithinNextNDays[window]).toBeCloseTo(
          expected.probability_within_next_n_days[window],
          12,
        );
        expect(got.probabilityWithinNDaysOfPoint[window]).toBeCloseTo(
          expected.probability_within_n_days_of_point[window],
          12,
        );
      }
      expect(got.dailyProbabilities.length).toBe(expected.daily_probabilities.length);
      for (let i = 0; i < got.dailyProbabilities.length; i += 1) {
        expect(got.dailyProbabilities[i].date).toBe(expected.daily_probabilities[i].date);
        expect(got.dailyProbabilities[i].probability).toBeCloseTo(
          expected.daily_probabilities[i].probability,
          12,
        );
      }
      for (let i = 0; i < expected.probabilities.length; i += 1) {
        expect(got.cycleLengthDistribution.probabilities[i]).toBeCloseTo(
          expected.probabilities[i],
          12,
        );
      }
    }
  });
});
