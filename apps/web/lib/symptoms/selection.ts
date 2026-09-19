// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { CustomSymptomDefinition, SymptomId, SymptomMap } from "@/lib/diary";
import type { SymptomMeta } from "@/lib/symptoms/catalog";

export function toggleLoggedSymptom(
  current: SymptomMap,
  id: SymptomId,
  catalog: readonly SymptomMeta[],
): SymptomMap {
  const next = { ...current };
  if (next[id]) {
    delete next[id];
    return next;
  }

  const selected = catalog.find((item) => item.id === id);
  if (selected?.exclusiveGroup) {
    for (const item of catalog) {
      if (item.exclusiveGroup === selected.exclusiveGroup) delete next[item.id];
    }
  }
  if (selected?.noneGroup) {
    for (const item of catalog) {
      if (item.noneGroup !== selected.noneGroup) continue;
      if (selected.noneRole || item.noneRole) delete next[item.id];
    }
  }
  next[id] = "present";
  return next;
}

export function toggleFavoriteSymptom(
  current: readonly SymptomId[],
  id: SymptomId,
  catalog: readonly SymptomMeta[],
): SymptomId[] {
  if (current.includes(id)) return current.filter((item) => item !== id);
  const selected = new Set([...current, id]);
  return catalog.filter((item) => selected.has(item.id)).map((item) => item.id);
}

export function removeCustomSymptom(
  id: SymptomId,
  current: {
    customSymptoms: CustomSymptomDefinition[];
    favoriteSymptomIds: readonly SymptomId[];
    symptoms: SymptomMap;
  },
): {
  customSymptoms: CustomSymptomDefinition[];
  favoriteSymptomIds: SymptomId[];
  symptoms: SymptomMap;
} {
  const customSymptoms = current.customSymptoms.filter((item) => item.id !== id);
  const favoriteSymptomIds = current.favoriteSymptomIds.filter((item) => item !== id);
  const symptoms = { ...current.symptoms };
  delete symptoms[id];
  return { customSymptoms, favoriteSymptomIds, symptoms };
}

export function idsToSymptomMap(ids: readonly SymptomId[]): SymptomMap {
  const selected: SymptomMap = {};
  for (const id of ids) selected[id] = "present";
  return selected;
}

export function quickSymptomCatalog(
  catalog: readonly SymptomMeta[],
  favorites: readonly SymptomId[],
  selected: SymptomMap,
): SymptomMeta[] {
  const visible = new Set<SymptomId>([
    ...favorites,
    ...(Object.keys(selected) as SymptomId[]),
  ]);
  return catalog.filter((item) => visible.has(item.id));
}

export function quickSymptomCatalogFromIds(
  catalog: readonly SymptomMeta[],
  favorites: readonly SymptomId[],
  selectedIds: readonly SymptomId[],
): SymptomMeta[] {
  return quickSymptomCatalog(catalog, favorites, idsToSymptomMap(selectedIds));
}
