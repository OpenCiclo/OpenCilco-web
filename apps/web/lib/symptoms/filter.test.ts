// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import type { DayLog, SymptomId } from "@/lib/diary";
import {
  dayMatchesSymptomFilter,
  matchingFilterSymptoms,
  toggleSymptomSelection,
} from "./filter";

function log(symptoms: DayLog["symptoms"]): DayLog {
  return { symptoms };
}

describe("symptom filter helpers", () => {
  it("returns an empty match list when no filters are active", () => {
    expect(matchingFilterSymptoms(log({ cramps: "present", headache: "mild" }), [])).toEqual([]);
    expect(dayMatchesSymptomFilter(log({ cramps: "present" }), [])).toBe(true);
  });

  it("matches any selected symptom present on the day", () => {
    const day = log({ cramps: "present", headache: "mild" });
    expect(matchingFilterSymptoms(day, ["headache", "highLibido"])).toEqual(["headache"]);
    expect(dayMatchesSymptomFilter(day, ["highLibido", "sexualActivity"])).toBe(false);
    expect(dayMatchesSymptomFilter(day, ["cramps", "highLibido"])).toBe(true);
  });

  it("keeps catalog order when several filters match", () => {
    const day = log({
      cravings: "present",
      sexualActivity: "present",
      cramps: "severe",
      headache: "present",
    });
    const selected: SymptomId[] = ["cravings", "headache", "sexualActivity", "cramps"];
    expect(matchingFilterSymptoms(day, selected)).toEqual([
      "cramps",
      "headache",
      "cravings",
      "sexualActivity",
    ]);
  });

  it("toggles selection while preserving catalog order", () => {
    expect(toggleSymptomSelection([], "headache")).toEqual(["headache"]);
    expect(toggleSymptomSelection(["headache"], "cramps")).toEqual(["cramps", "headache"]);
    expect(toggleSymptomSelection(["cramps", "headache"], "headache")).toEqual(["cramps"]);
  });

  it("matches and toggles custom symptom ids after built-in catalog entries", () => {
    const custom: SymptomId = "custom-migraine1";
    const day = log({ [custom]: "present", cramps: "present" });
    expect(matchingFilterSymptoms(day, [custom, "cramps"])).toEqual(["cramps", custom]);
    expect(toggleSymptomSelection(["headache"], custom)).toEqual(["headache", custom]);
  });
});
