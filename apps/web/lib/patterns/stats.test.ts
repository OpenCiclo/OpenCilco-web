// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { parseDiary } from "@/lib/diary";
import { patternStats, recurringSymptoms, completedCycles } from "@/lib/patterns/stats";

describe("pattern stats", () => {
  it("counts symptoms by cycle, not only raw days", () => {
    const diary = parseDiary({
      schemaVersion: 3,
      locale: "en",
      periodStarts: ["2026-05-01", "2026-05-29", "2026-06-26"],
      days: {
        "2026-05-01": { flow: "medium", symptoms: { cramps: "present" } },
        "2026-05-02": { flow: "light", symptoms: { cramps: "present" } },
        "2026-05-29": { flow: "medium", symptoms: { headache: "mild" } },
        "2026-06-26": { flow: "medium", symptoms: {} },
      },
    });
    expect(completedCycles(diary)).toHaveLength(2);
    const recurring = recurringSymptoms(diary);
    const cramps = recurring.find((item) => item.id === "cramps");
    expect(cramps?.dayCount).toBe(2);
    expect(cramps?.cycleCount).toBe(1);
    expect(cramps?.cycleTotal).toBeGreaterThanOrEqual(2);
  });

  it("counts sexualActivity in recurring symptoms", () => {
    const diary = parseDiary({
      schemaVersion: 3,
      locale: "en",
      periodStarts: ["2026-05-01", "2026-05-29"],
      days: {
        "2026-05-10": { symptoms: { sexualActivity: "present" } },
        "2026-05-29": { flow: "medium", symptoms: { sexualActivity: "present" } },
      },
    });
    const recurring = recurringSymptoms(diary);
    const sex = recurring.find((item) => item.id === "sexualActivity");
    expect(sex?.dayCount).toBe(2);
    expect(sex?.cycleCount).toBe(2);
  });

  it("counts custom symptoms in recurring patterns", () => {
    const diary = parseDiary({
      schemaVersion: 4,
      locale: "en",
      periodStarts: ["2026-05-01", "2026-05-29"],
      customSymptoms: [
        { id: "custom-migraine1", label: "Migraine", emoji: "🌩️", category: "custom" },
      ],
      days: {
        "2026-05-10": { symptoms: { "custom-migraine1": "present" } },
        "2026-05-29": { flow: "medium", symptoms: { "custom-migraine1": "present" } },
      },
    });
    const recurring = recurringSymptoms(diary);
    const custom = recurring.find((item) => item.id === "custom-migraine1");
    expect(custom?.dayCount).toBe(2);
    expect(custom?.cycleCount).toBe(2);
  });

  it("reports observed cycle and period averages instead of the forecast length", () => {
    const diary = parseDiary({
      schemaVersion: 6,
      locale: "en",
      periodStarts: ["2026-05-01", "2026-05-29", "2026-06-26"],
      days: {
        "2026-05-01": { flow: "medium", symptoms: {} },
        "2026-05-02": { flow: "light", symptoms: {} },
        "2026-05-03": { flow: "light", symptoms: {} },
        "2026-05-29": { flow: "medium", symptoms: {} },
        "2026-05-30": { flow: "medium", symptoms: {} },
        "2026-06-26": { flow: "medium", symptoms: {} },
      },
    });
    const stats = patternStats(diary, "2026-07-04");
    expect(stats.avgCycleLength).toBe(28);
    expect(stats.avgPeriodLength).toBe(3);
    expect(stats.expectedPeriodLength).toBe(3);
    expect(stats.forecast?.mostLikelyCycleLength).not.toBe(stats.avgCycleLength);
    diary.forecastingEnabled = false;
    const off = patternStats(diary, "2026-07-04");
    expect(off.forecast).toBeNull();
    expect(off.avgCycleLength).toBe(28);
    expect(off.avgPeriodLength).toBe(3);
  });
});
