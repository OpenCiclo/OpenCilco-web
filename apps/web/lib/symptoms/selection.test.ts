// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { parseDiary, type CustomSymptomDefinition, type SymptomMap } from "@/lib/diary";
import { resolveSymptomCatalog } from "@/lib/symptoms/catalog";
import {
  quickSymptomCatalog,
  quickSymptomCatalogFromIds,
  removeCustomSymptom,
  toggleFavoriteSymptom,
  toggleLoggedSymptom,
} from "@/lib/symptoms/selection";

const catalog = resolveSymptomCatalog();

describe("symptom selection", () => {
  it("keeps one value in single-choice groups", () => {
    const high = toggleLoggedSymptom({}, "highLibido", catalog);
    const low = toggleLoggedSymptom(high, "lowLibido", catalog);
    expect(low).toEqual({ lowLibido: "present" });

    const positive = toggleLoggedSymptom({}, "pregnancyTestPositive", catalog);
    const negative = toggleLoggedSymptom(positive, "pregnancyTestNegative", catalog);
    expect(negative).toEqual({ pregnancyTestNegative: "present" });
  });

  it("clears contradictory none options while preserving multiple positive options", () => {
    let selected: SymptomMap = {};
    selected = toggleLoggedSymptom(selected, "protectedSex", catalog);
    selected = toggleLoggedSymptom(selected, "orgasm", catalog);
    expect(selected).toEqual({ protectedSex: "present", orgasm: "present" });

    selected = toggleLoggedSymptom(selected, "didntHaveSex", catalog);
    expect(selected).toEqual({ didntHaveSex: "present" });

    selected = toggleLoggedSymptom(selected, "unprotectedSex", catalog);
    expect(selected).toEqual({ unprotectedSex: "present" });
  });

  it("makes everything-fine exclusive with general symptoms", () => {
    const cramps = toggleLoggedSymptom({}, "cramps", catalog);
    const fine = toggleLoggedSymptom(cramps, "everythingFine", catalog);
    expect(fine).toEqual({ everythingFine: "present" });
    expect(toggleLoggedSymptom(fine, "headache", catalog)).toEqual({
      headache: "present",
    });
  });

  it("shows favorites and selected custom tags in the quick list", () => {
    const custom: CustomSymptomDefinition = {
      id: "custom-migraine1",
      label: "Migraine",
      emoji: "🌩️",
      category: "custom",
    };
    const withCustom = resolveSymptomCatalog([custom]);
    const favorites = toggleFavoriteSymptom([], "cramps", withCustom);
    const quick = quickSymptomCatalog(
      withCustom,
      favorites,
      { "custom-migraine1": "present" },
    );
    expect(quick.map((item) => item.id)).toEqual(["cramps", "custom-migraine1"]);
  });

  it("keeps active non-favorite filters in the quick catalog", () => {
    const custom: CustomSymptomDefinition = {
      id: "custom-migraine1",
      label: "Migraine",
      emoji: "🌩️",
      category: "custom",
    };
    const withCustom = resolveSymptomCatalog([custom]);
    const favorites = toggleFavoriteSymptom(["cramps"], "headache", withCustom);
    const quick = quickSymptomCatalogFromIds(withCustom, favorites, [
      "custom-migraine1",
      "headache",
    ]);
    expect(quick.map((item) => item.id)).toEqual([
      "cramps",
      "headache",
      "custom-migraine1",
    ]);
  });

  it("removes a custom symptom from the catalog, favorites, and the current day", () => {
    const custom: CustomSymptomDefinition = {
      id: "custom-migraine1",
      label: "Migraine",
      emoji: "🌩️",
      category: "custom",
    };
    const next = removeCustomSymptom("custom-migraine1", {
      customSymptoms: [custom],
      favoriteSymptomIds: ["cramps", "custom-migraine1"],
      symptoms: { cramps: "present", "custom-migraine1": "present" },
    });
    expect(next.customSymptoms).toEqual([]);
    expect(next.favoriteSymptomIds).toEqual(["cramps"]);
    expect(next.symptoms).toEqual({ cramps: "present" });
  });

  it("drops logs of a deleted custom symptom when the diary is saved", () => {
    const diary = parseDiary({
      schemaVersion: 6,
      locale: "en",
      periodStarts: [],
      customSymptoms: [
        { id: "custom-migraine1", label: "Migraine", emoji: "🌩️", category: "custom" },
      ],
      favoriteSymptomIds: ["custom-migraine1"],
      days: {
        "2026-08-10": { symptoms: { "custom-migraine1": "present", cramps: "present" } },
      },
    });
    const next = removeCustomSymptom("custom-migraine1", {
      customSymptoms: diary.customSymptoms,
      favoriteSymptomIds: diary.favoriteSymptomIds,
      symptoms: diary.days["2026-08-10"]?.symptoms ?? {},
    });
    const saved = parseDiary({
      ...diary,
      customSymptoms: next.customSymptoms,
      favoriteSymptomIds: next.favoriteSymptomIds,
    });
    expect(saved.customSymptoms).toEqual([]);
    expect(saved.days["2026-08-10"]?.symptoms).toEqual({ cramps: "present" });
  });
});
