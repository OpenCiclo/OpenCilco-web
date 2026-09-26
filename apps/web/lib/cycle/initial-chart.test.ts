// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { messages } from "@/lib/i18n";
import { addDays } from "@/lib/forecast/math";
import { initialChartWindow } from "@/lib/cycle/initial-chart";
import { nextPeriodStat } from "@/lib/cycle/period-timing";

describe("late pattern summary", () => {
  it("counts days late as a positive number", () => {
    expect(nextPeriodStat(8, messages.es)).toEqual({ value: 8, label: messages.es.untilNextPeriod });
    expect(nextPeriodStat(0, messages.es)).toEqual({ value: 0, label: messages.es.untilNextPeriod });
    expect(nextPeriodStat(-11, messages.es)).toEqual({ value: 11, label: messages.es.periodLateStat });
    expect(nextPeriodStat(null, messages.en)).toEqual({ value: "—", label: messages.en.untilNextPeriod });
  });

  it("keeps a short delay on one chart and a long delay on the original hump", () => {
    const anchor = "2026-09-15";
    const short = initialChartWindow(anchor, "2026-09-26");
    expect(short).toEqual({ start: "2026-09-12", end: "2026-09-26" });

    const long = initialChartWindow(anchor, "2026-11-15");
    expect(long).toEqual({ start: addDays(anchor, -13), end: addDays(anchor, 14) });
    expect(long.end < "2026-11-15").toBe(true);
  });
});
