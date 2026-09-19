// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { SYMPTOM_IDS, type DayLog, type SymptomId } from "@/lib/diary";

/** Returns selected symptoms present on the day, in catalog order. */
export function matchingFilterSymptoms(
  log: DayLog | undefined,
  selected: ReadonlyArray<SymptomId> | ReadonlySet<SymptomId>,
): SymptomId[] {
  const active = selected instanceof Set ? selected : new Set(selected);
  if (active.size === 0 || !log) return [];
  const order: SymptomId[] = [
    ...SYMPTOM_IDS,
    ...[...active].filter((id) => !SYMPTOM_IDS.includes(id as (typeof SYMPTOM_IDS)[number])),
  ];
  return order.filter((id) => active.has(id) && Boolean(log.symptoms[id]));
}

export function dayMatchesSymptomFilter(
  log: DayLog | undefined,
  selected: ReadonlyArray<SymptomId> | ReadonlySet<SymptomId>,
): boolean {
  const active = selected instanceof Set ? selected : new Set(selected);
  if (active.size === 0) return true;
  return matchingFilterSymptoms(log, active).length > 0;
}

export function toggleSymptomSelection(
  selected: ReadonlyArray<SymptomId>,
  id: SymptomId,
): SymptomId[] {
  if (selected.includes(id)) return selected.filter((item) => item !== id);
  const next = new Set([...selected, id]);
  return [
    ...SYMPTOM_IDS.filter((item) => next.has(item)),
    ...[...next].filter((item) => !SYMPTOM_IDS.includes(item as (typeof SYMPTOM_IDS)[number])),
  ];
}
