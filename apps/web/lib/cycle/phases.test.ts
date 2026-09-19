// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { parseDiary } from "@/lib/diary";
import {
  cycleOverview,
  isPeriodDueOrOverdue,
  phaseAtDate,
  phaseSeason,
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

  it("marks the period as due or overdue when the forecast date arrives without bleeding", () => {
    const diary = diaryWithStarts(["2026-06-01", "2026-06-29"]);
    const open = cycleOverview(diary, "2026-07-10");
    expect(open.nextPeriodDate).toBeTruthy();

    const due = cycleOverview(diary, open.nextPeriodDate!);
    expect(due.currentPhase).toBeNull();
    expect(due.forecast).not.toBeNull();
    expect(due.nextPeriodInDays).toBe(0);
    expect(isPeriodDueOrOverdue(due)).toBe(true);

    const overdue = cycleOverview(diary, "2026-09-01");
    expect(overdue.currentPhase).toBeNull();
    expect(overdue.forecast).not.toBeNull();
    expect(isPeriodDueOrOverdue(overdue)).toBe(true);
  });
});
