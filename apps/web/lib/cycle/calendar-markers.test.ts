// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import {
  PERIOD_START_DISPLAY_THRESHOLD,
  estimatedFertileWindow,
  fertileWindowAnchors,
  isEditableDiaryDate,
  isEstimatedBleedingDate,
  isEstimatedFertileDate,
  isInEstimatedFertileWindow,
  possiblePeriodStartDates,
} from "./calendar-markers";

describe("calendar markers", () => {
  it("keeps an inclusive six-day fertile window ending 14 days before the next start", () => {
    const window = estimatedFertileWindow("2026-08-30");
    expect(window).toEqual({ start: "2026-08-11", end: "2026-08-16" });
    expect(isInEstimatedFertileWindow("2026-08-11", "2026-08-30")).toBe(true);
    expect(isInEstimatedFertileWindow("2026-08-16", "2026-08-30")).toBe(true);
    expect(isInEstimatedFertileWindow("2026-08-10", "2026-08-30")).toBe(false);
    expect(isInEstimatedFertileWindow("2026-08-17", "2026-08-30")).toBe(false);
  });

  it("derives a fertile window from each closed cycle and the open-cycle forecast", () => {
    const starts = ["2026-06-01", "2026-06-29"];
    const predictedNext = "2026-07-27";
    expect(fertileWindowAnchors(starts, predictedNext)).toEqual(["2026-06-29", "2026-07-27"]);
    expect(isEstimatedFertileDate("2026-06-12", starts, predictedNext)).toBe(true);
    expect(isEstimatedFertileDate("2026-07-10", starts, predictedNext)).toBe(true);
    expect(isEstimatedFertileDate("2026-06-20", starts, predictedNext)).toBe(false);
  });

  it("keeps current or future dates at or above the 12% threshold in any month", () => {
    const dates = possiblePeriodStartDates(
      [
        { date: "2026-08-17", probability: 0.2 },
        { date: "2026-08-18", probability: 0.119 },
        { date: "2026-08-19", probability: 0.12 },
        { date: "2026-09-02", probability: 0.4 },
      ],
      "2026-08-18",
    );
    expect([...dates].sort()).toEqual(["2026-08-19", "2026-09-02"]);
    expect(PERIOD_START_DISPLAY_THRESHOLD).toBe(0.12);
  });

  it("includes the most likely date when it sits above the display threshold", () => {
    const dates = possiblePeriodStartDates(
      [
        { date: "2026-09-14", probability: 0.13 },
        { date: "2026-09-15", probability: 0.17 },
        { date: "2026-09-16", probability: 0.11 },
      ],
      "2026-08-21",
    );
    expect([...dates].sort()).toEqual(["2026-09-14", "2026-09-15"]);
  });

  it("blocks writing diary dates after today", () => {
    expect(isEditableDiaryDate("2026-08-18", "2026-08-18")).toBe(true);
    expect(isEditableDiaryDate("2026-08-17", "2026-08-18")).toBe(true);
    expect(isEditableDiaryDate("2026-08-19", "2026-08-18")).toBe(false);
  });

  it("marks inclusive estimated bleeding days from the expected window", () => {
    const window = {
      start: "2026-07-27",
      end: "2026-07-30",
      dates: ["2026-07-27", "2026-07-28", "2026-07-29", "2026-07-30"],
    };
    expect(isEstimatedBleedingDate("2026-07-27", window)).toBe(true);
    expect(isEstimatedBleedingDate("2026-07-30", window)).toBe(true);
    expect(isEstimatedBleedingDate("2026-07-26", window)).toBe(false);
    expect(isEstimatedBleedingDate("2026-07-28", null)).toBe(false);
  });
});
