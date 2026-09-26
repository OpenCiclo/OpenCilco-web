// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { addDaysIso, parseDiary } from "@/lib/diary";
import { mostLikelyLength } from "@/lib/forecast/distribution";
import { daysBetween } from "@/lib/forecast/math";
import {
  anchoredPeriodDate,
  cycleOverview,
  isPeriodDueOrOverdue,
  phaseAtDate,
  phaseSeason,
  untruncatedStartProbability,
} from "@/lib/cycle/phases";

function diaryWithStarts(starts: string[], extraDays: Record<string, object> = {}) {
  const days = Object.fromEntries(
    starts.map((iso) => [iso, { flow: "medium", symptoms: {} }]),
  );
  return parseDiary({
    schemaVersion: 3,
    locale: "en",
    periodStarts: starts,
    days: { ...days, ...extraDays },
  });
}

describe("cycle phases", () => {
  it("maps cycle phases to their visual seasons", () => {
    expect(phaseSeason("menstrual")).toBe("winter");
    expect(phaseSeason("follicular")).toBe("spring");
    expect(phaseSeason("ovulation")).toBe("summer");
    expect(phaseSeason("luteal")).toBe("fall");
  });

  it("marks observed bleeding as menstrual", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"], {
      "2026-06-02": { flow: "light", symptoms: {} },
    });
    const phase = phaseAtDate(diary, "2026-06-02", "2026-06-29", 5);
    expect(phase?.phase).toBe("menstrual");
    expect(phase?.source).toBe("observed");
  });

  it("places follicular days after bleeding and before the ovulation window", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"]);
    const phase = phaseAtDate(diary, "2026-06-08", "2026-06-29", 5);
    expect(phase?.phase).toBe("follicular");
    expect(phase?.source).toBe("estimated");
  });

  it("estimates ovulation 10–16 days before the next start", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"]);
    const mid = phaseAtDate(diary, "2026-06-15", "2026-06-29", 5);
    expect(mid?.phase).toBe("ovulation");
    expect(mid?.source).toBe("estimated");
    const late = phaseAtDate(diary, "2026-06-25", "2026-06-29", 5);
    expect(late?.phase).toBe("luteal");
  });

  it("uses the forecast for the open cycle", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"]);
    const overview = cycleOverview(diary, "2026-07-10");
    expect(overview.forecast).not.toBeNull();
    expect(overview.nextPeriodDate).toBeTruthy();
    expect(overview.currentPhase).not.toBeNull();
    expect(overview.avgCycleLength).toBe(28);
    expect(overview.avgPeriodLength).toBe(1);
    expect(overview.expectedPeriodLength).toBe(1);
    expect(isPeriodDueOrOverdue(overview)).toBe(false);
  });

  it("hides estimates when forecasting is disabled", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"]);
    diary.forecastingEnabled = false;
    const overview = cycleOverview(diary, "2026-07-10");
    expect(overview.forecastingEnabled).toBe(false);
    expect(overview.forecast).toBeNull();
    expect(overview.nextPeriodDate).toBeNull();
    expect(overview.nextPeriodInDays).toBeNull();
    expect(overview.expectedBleedingWindow).toBeNull();
    expect(overview.currentPhase).toBeNull();
    expect(overview.currentCycleDay).toBe(12);
    expect(overview.avgCycleLength).toBe(28);
    expect(isPeriodDueOrOverdue(overview)).toBe(false);
  });

  it("keeps observed menstrual phase when forecasting is off", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"], {
      "2026-06-30": { flow: "light", symptoms: {} },
    });
    diary.forecastingEnabled = false;
    const overview = cycleOverview(diary, "2026-06-30");
    expect(overview.currentPhase?.phase).toBe("menstrual");
    expect(overview.currentPhase?.source).toBe("observed");
    expect(overview.forecast).toBeNull();
  });

  it("keeps the open cycle in luteal after the expected start", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"]);
    const late = phaseAtDate(diary, "2026-07-31", "2026-07-27", 5);
    expect(late?.phase).toBe("luteal");
    expect(late?.source).toBe("estimated");
    expect(late?.cycleStart).toBe("2026-06-29");
  });

  it("anchors the expected start and quotes today's untruncated probability when late", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"]);
    const open = cycleOverview(diary, "2026-07-10");
    const anchor = open.nextPeriodDate;
    expect(anchor).toBeTruthy();
    expect(anchor).toBe(anchoredPeriodDate(open.forecast!));
    expect(anchor).toBe(
      addDaysIso("2026-06-29", mostLikelyLength(open.forecast!.cycleLengthDistribution)),
    );
    expect(open.nextPeriodInDays).toBeGreaterThan(0);
    expect(isPeriodDueOrOverdue(open)).toBe(false);

    const due = cycleOverview(diary, anchor!);
    expect(due.currentPhase?.phase).toBe("luteal");
    expect(due.currentPhase?.source).toBe("estimated");
    expect(due.nextPeriodDate).toBe(anchor);
    expect(due.nextPeriodInDays).toBe(0);
    expect(due.initialStartProbability).toBe(untruncatedStartProbability(due.forecast!, anchor!));
    const dueRenormalized = due.forecast!.dailyProbabilities.find((item) => item.date === anchor);
    expect(dueRenormalized).toBeTruthy();
    expect(due.initialStartProbability).toBeLessThan(dueRenormalized!.probability);

    const lateDay = addDaysIso(anchor!, 2);
    const overdue = cycleOverview(diary, lateDay);
    expect(overdue.currentPhase?.phase).toBe("luteal");
    expect(overdue.currentPhase?.source).toBe("estimated");
    expect(overdue.nextPeriodDate).toBe(anchor);
    expect(overdue.nextPeriodInDays).toBe(-2);
    expect(overdue.initialStartProbability).toBe(untruncatedStartProbability(overdue.forecast!, lateDay));
    const length = daysBetween(overdue.forecast!.lastPeriodStart, lateDay);
    const index = overdue.forecast!.cycleLengthDistribution.supportDays.indexOf(length);
    expect(overdue.initialStartProbability).toBe(
      overdue.forecast!.cycleLengthDistribution.probabilities[index],
    );
    const lateRenormalized = overdue.forecast!.dailyProbabilities.find((item) => item.date === lateDay);
    expect(lateRenormalized).toBeTruthy();
    expect(overdue.initialStartProbability).not.toBe(lateRenormalized!.probability);
    expect(isPeriodDueOrOverdue(overdue)).toBe(false);
  });
});
