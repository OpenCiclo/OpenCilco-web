// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { cycleDayAtDate, phaseAtDate, type CyclePhase } from "@/lib/cycle/phases";
import { type Diary } from "@/lib/diary";
import { daysBetween } from "@/lib/forecast/math";

export type JournalEntry = {
  iso: string;
  note: string;
  cycleDay: number | null;
  phase: CyclePhase | null;
};

const CYCLE_DAY_TOLERANCE = 2;

function entryFromDay(diary: Diary, iso: string, note: string, predictedNext: string | null): JournalEntry {
  const includeEstimated = diary.forecastingEnabled !== false;
  const phase = phaseAtDate(diary, iso, includeEstimated ? predictedNext : null, undefined, {
    includeEstimated,
  });
  return {
    iso,
    note,
    cycleDay: phase?.cycleDay ?? cycleDayAtDate(diary.periodStarts, iso),
    phase: phase?.phase ?? null,
  };
}

export function listJournalEntries(diary: Diary, predictedNext: string | null = null): JournalEntry[] {
  return Object.entries(diary.days)
    .filter((entry): entry is [string, NonNullable<(typeof diary.days)[string]>] =>
      Boolean(entry[1]?.note),
    )
    .map(([iso, log]) => entryFromDay(diary, iso, log.note as string, predictedNext))
    .sort((a, b) => b.iso.localeCompare(a.iso));
}

export function filterJournalEntries(entries: JournalEntry[], query: string): JournalEntry[] {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return entries;
  return entries.filter((entry) => entry.note.toLocaleLowerCase().includes(needle));
}

export function similarJournalEntries(
  diary: Diary,
  referenceIso: string,
  predictedNext: string | null = null,
  limit = 5,
): JournalEntry[] {
  const entries = listJournalEntries(diary, predictedNext);
  const others = entries.filter((entry) => entry.iso !== referenceIso);
  if (others.length === 0) return [];

  const includeEstimated = diary.forecastingEnabled !== false;
  const reference = phaseAtDate(
    diary,
    referenceIso,
    includeEstimated ? predictedNext : null,
    undefined,
    { includeEstimated },
  );
  const referenceCycleDay = reference?.cycleDay ?? cycleDayAtDate(diary.periodStarts, referenceIso);
  if (!reference && referenceCycleDay === null) {
    return others.slice(0, limit);
  }

  const scored = others
    .map((entry) => {
      let score = 0;
      if (reference?.phase && entry.phase && entry.phase === reference.phase) score += 3;
      if (entry.cycleDay !== null && referenceCycleDay !== null) {
        const distance = Math.abs(entry.cycleDay - referenceCycleDay);
        if (distance <= CYCLE_DAY_TOLERANCE) score += 2 - distance * 0.25;
      }
      score += 1 / (1 + Math.abs(daysBetween(entry.iso, referenceIso)));
      return { entry, score };
    })
    .filter((item) => item.score >= 2)
    .sort((a, b) => b.score - a.score || b.entry.iso.localeCompare(a.entry.iso));

  if (scored.length > 0) {
    return scored.slice(0, limit).map((item) => item.entry);
  }

  return others.slice(0, limit);
}
