// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

/** Mirrors openciclo.constants for the released shrinkage + Laplace path. */

export const ENGINE_VERSION = "0.2.1";
export const MIN_CYCLE_LENGTH = 1;
export const MAX_CYCLE_LENGTH = 90;
export const UNUSUAL_SHORT_DAYS = 21;
export const UNUSUAL_LONG_DAYS = 45;
export const SUSPICIOUS_SHORT_DAYS = 10;
export const SUSPICIOUS_LONG_DAYS = 60;
export const INCOMPLETE_HISTORY_DAYS = 40;
export const MIN_LAPLACE_SCALE = 0.75;
export const PROBABILITY_WINDOWS = [1, 2, 3, 5] as const;
export const LOW_UNCERTAINTY_MAX_SCALE = 2.0;
export const LOW_UNCERTAINTY_MIN_CYCLES = 6;
export const HIGH_UNCERTAINTY_MIN_SCALE = 5.0;
export const HIGH_UNCERTAINTY_MAX_CYCLES = 2;
export const MEDICAL_DISCLAIMER =
  "Ciclo provides cycle forecasts. Forecasts can be wrong. Ciclo is not a medical device, diagnosis system, or contraceptive method.";
