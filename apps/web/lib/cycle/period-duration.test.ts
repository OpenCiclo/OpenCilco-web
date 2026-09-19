// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { parseDiary } from "@/lib/diary";
import {
  closedPeriodRuns,
  estimatePeriodDuration,
  expectedBleedingWindow,
} from "@/lib/cycle/period-duration";

function diaryFromDays(days: Record<string, object>) {
  return parseDiary({
    schemaVersion: 6,
    locale: "en",
    periodStarts: [],
    days,
  });
}

describe("period duration", () => {
  it("uses only closed periods and ignores the open cycle", () => {
    const diary = diaryFromDays({
      "2026-06-01": { flow: "medium", symptoms: {} },
      "2026-06-02": { flow: "light", symptoms: {} },
      "2026-06-03": { flow: "spotting", symptoms: {} },
      "2026-06-29": { flow: "heavy", symptoms: {} },
      "2026-06-30": { flow: "medium", symptoms: {} },
      "2026-07-27": { flow: "medium", symptoms: {} },
    });
    const closed = closedPeriodRuns(diary);
    expect(closed.map((run) => ({ start: run.start, length: run.length }))).toEqual([
      { start: "2026-06-01", length: 3 },
      { start: "2026-06-29", length: 2 },
    ]);
    const stats = estimatePeriodDuration(diary);
    expect(stats.source).toBe("history");
    expect(stats.nRuns).toBe(2);
    expect(stats.meanDays).toBe(3);
    expect(stats.expectedDays).toBe(3);
    expect(stats.range).toEqual({ min: 2, max: 3 });
  });

  it("does not invent a one-day period from an open start without later confirmation", () => {
    const diary = diaryFromDays({
      "2026-07-27": { flow: "medium", symptoms: {} },
    });
    expect(closedPeriodRuns(diary)).toEqual([]);
    expect(estimatePeriodDuration(diary).source).toBe("insufficient_history");
    expect(estimatePeriodDuration(diary).expectedDays).toBeNull();
  });

  it("takes the median of an odd number of closed lengths", () => {
    const diary = diaryFromDays({
      "2026-04-01": { flow: "medium", symptoms: {} },
      "2026-04-02": { flow: "medium", symptoms: {} },
      "2026-04-03": { flow: "medium", symptoms: {} },
      "2026-04-04": { flow: "light", symptoms: {} },
      "2026-04-05": { flow: "light", symptoms: {} },
      "2026-04-29": { flow: "medium", symptoms: {} },
      "2026-04-30": { flow: "medium", symptoms: {} },
      "2026-05-01": { flow: "light", symptoms: {} },
      "2026-05-27": { flow: "medium", symptoms: {} },
      "2026-05-28": { flow: "light", symptoms: {} },
      "2026-06-24": { flow: "medium", symptoms: {} },
    });
    const stats = estimatePeriodDuration(diary);
    expect(stats.nRuns).toBe(3);
    expect(stats.expectedDays).toBe(3);
    expect(stats.meanDays).toBe(3);
  });

  it("builds an inclusive expected bleeding window from the modal start", () => {
    expect(expectedBleedingWindow("2026-07-27", 4)).toEqual({
      start: "2026-07-27",
      end: "2026-07-30",
      dates: ["2026-07-27", "2026-07-28", "2026-07-29", "2026-07-30"],
    });
    expect(expectedBleedingWindow(null, 4)).toBeNull();
    expect(expectedBleedingWindow("2026-07-27", null)).toBeNull();
  });
});
