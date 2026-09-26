// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Messages } from "@/lib/i18n";

export function periodTimingChip(days: number | null, observed: boolean, t: Messages): string | null {
  if (days === null) return null;
  if (days < 0) {
    if (observed) return null;
    const late = -days;
    return late === 1 ? t.periodLateOne : t.periodLateMany.replace("{days}", String(late));
  }
  if (days === 0) {
    if (observed) return null;
    return t.nextPeriodToday;
  }
  return t.nextPeriodIn.replace("{days}", String(days));
}

export function initialProbabilityLabel(probability: number, t: Messages): string {
  const percent = Math.round(probability * 100);
  if (percent <= 0) return t.initialProbabilityTodayUnderOne;
  return t.initialProbabilityToday.replace("{percent}", String(percent));
}
