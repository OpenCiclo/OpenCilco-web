// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { emptyDiary, parseDiary } from "@/lib/diary";
import {
  POOL_SYNC_INTERVAL_DAYS,
  daysSinceIso,
  poolCycleLengths,
  shouldSyncPool,
} from "@/lib/pool-sync";

describe("pool sync", () => {
  it("requires at least one completed cycle", () => {
    expect(poolCycleLengths(["2026-06-01"])).toEqual([]);
    expect(poolCycleLengths(["2026-06-01", "2026-06-29"])).toEqual([28]);
  });

  it("syncs when opted in and never synced before", () => {
    const diary = {
      ...emptyDiary("es"),
      poolOptIn: true,
      poolContributorKey: "550e8400-e29b-41d4-a716-446655440000",
      periodStarts: ["2026-06-01", "2026-06-29"],
    };
    expect(shouldSyncPool(diary)).toBe(true);
  });

  it("waits 30 days between syncs", () => {
    const diary = {
      ...emptyDiary("es"),
      poolOptIn: true,
      poolContributorKey: "550e8400-e29b-41d4-a716-446655440000",
      poolLastSyncedAt: "2026-08-01",
      periodStarts: ["2026-06-01", "2026-06-29"],
    };
    expect(shouldSyncPool(diary, new Date("2026-08-20T12:00:00Z"))).toBe(false);
    expect(shouldSyncPool(diary, new Date("2026-09-01T12:00:00Z"))).toBe(true);
    expect(daysSinceIso("2026-08-01", new Date("2026-09-01T12:00:00Z"))).toBeGreaterThanOrEqual(
      POOL_SYNC_INTERVAL_DAYS,
    );
  });

  it("migrates legacy contributedToPool into poolOptIn", () => {
    const diary = parseDiary({
      schemaVersion: 2,
      periodStarts: [],
      days: {},
      locale: "es",
      contributedToPool: true,
    });
    expect(diary.poolOptIn).toBe(true);
    expect(diary.poolContributorKey).toBeNull();
  });
});
