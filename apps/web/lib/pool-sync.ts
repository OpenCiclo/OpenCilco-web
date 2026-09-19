// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { cycleLengths } from "@/lib/forecast/math";
import type { Diary } from "@/lib/diary";

export const POOL_SYNC_INTERVAL_DAYS = 30;

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function createPoolContributorKey(): string {
  return crypto.randomUUID();
}

export function isPoolContributorKey(value: string): boolean {
  return UUID.test(value);
}

export function poolCycleLengths(periodStarts: string[]): number[] {
  return cycleLengths(periodStarts);
}

export function todayIsoUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysSinceIso(iso: string, now = new Date()): number {
  const then = new Date(`${iso}T00:00:00Z`).getTime();
  return (now.getTime() - then) / 86_400_000;
}

export function shouldSyncPool(diary: Diary, now = new Date()): boolean {
  if (!diary.poolOptIn || !diary.poolContributorKey) return false;
  if (poolCycleLengths(diary.periodStarts).length === 0) return false;
  if (!diary.poolLastSyncedAt) return true;
  return daysSinceIso(diary.poolLastSyncedAt, now) >= POOL_SYNC_INTERVAL_DAYS;
}

export function ensurePoolContributorKey(diary: Diary): Diary {
  if (diary.poolContributorKey && isPoolContributorKey(diary.poolContributorKey)) return diary;
  return { ...diary, poolContributorKey: createPoolContributorKey() };
}

export async function submitPoolContribution(diary: Diary): Promise<Diary> {
  const withKey = ensurePoolContributorKey(diary);
  const lengths = poolCycleLengths(withKey.periodStarts);
  if (lengths.length === 0) throw new Error("Need at least one completed cycle");
  const response = await fetch("/api/research/contribute", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contributorKey: withKey.poolContributorKey,
      cycleLengths: lengths,
    }),
  });
  if (!response.ok) throw new Error("Contribution failed");
  return { ...withKey, poolLastSyncedAt: todayIsoUtc() };
}

export async function revokePoolContribution(diary: Diary): Promise<void> {
  if (!diary.poolContributorKey) return;
  await fetch("/api/research/contribute", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ contributorKey: diary.poolContributorKey }),
  });
}

export async function syncPoolIfDue(diary: Diary): Promise<Diary> {
  if (!shouldSyncPool(diary)) return diary;
  return submitPoolContribution(diary);
}
