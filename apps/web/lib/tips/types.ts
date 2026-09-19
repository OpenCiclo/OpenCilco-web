// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { CyclePhase } from "@/lib/cycle/phases";
import type { Messages } from "@/lib/i18n";
import type { RecurringSymptom } from "@/lib/patterns/stats";

export type TipTone = "primary" | "fertile" | "accent";
export type TipCategory = "phase" | "symptom" | "regularity";

export type TipContext = {
  currentPhase: CyclePhase | null;
  nextPeriodInDays: number | null;
  avgCycleLength: number | null;
  cycleLengthRange: { min: number; max: number } | null;
  completedCycleCount: number;
  topSymptom: RecurringSymptom | null;
};

export type TipCard = {
  id: string;
  title: string;
  body: string;
  tone: TipTone;
  category: TipCategory;
};

export type TipRule = {
  id: string;
  category: TipCategory;
  priority: number;
  tone: TipTone;
  when: (context: TipContext) => boolean;
  message: (context: TipContext, t: Messages) => { title: string; body: string };
};
