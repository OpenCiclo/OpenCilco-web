// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import {
  derivePeriodStarts,
  parseDiary,
  upsertDay,
  type DayLog,
} from "./diary";
import { diaryToCsv, diaryToJson, mergeDiaries, parseImportedFile, previewImport } from "./diary-io";

describe("diary schema", () => {
  it("migrates v1 period starts into bleeding days", () => {
    const diary = parseDiary({
      schemaVersion: 1,
      periodStarts: ["2026-06-01", "2026-06-29"],
      locale: "es",
    });
    expect(diary.schemaVersion).toBe(6);
    expect(diary.days["2026-06-01"]?.flow).toBe("medium");
    expect(diary.days["2026-06-29"]?.flow).toBe("medium");
    expect(diary.periodStarts).toEqual(["2026-06-01", "2026-06-29"]);
    expect(diary.forecastingEnabled).toBe(true);
  });

  it("migrates v2 intensity fields into the symptoms map", () => {
    const diary = parseDiary({
      schemaVersion: 2,
      locale: "es",
      periodStarts: ["2026-07-04"],
      days: {
        "2026-07-04": { flow: "medium", cramps: "mild", headache: "severe" },
      },
    });
    expect(diary.days["2026-07-04"]).toEqual({
      flow: "medium",
      symptoms: { cramps: "mild", headache: "severe" },
    });
  });

  it("drops unknown symptom ids and empty none intensities", () => {
    const diary = parseDiary({
      schemaVersion: 3,
      locale: "en",
      periodStarts: [],
      days: {
        "2026-07-05": {
          symptoms: { cramps: "present", unknown: "present", headache: "none" },
          cramps: "none",
        },
      },
    });
    expect(diary.days["2026-07-05"]?.symptoms).toEqual({ cramps: "present" });
  });

  it("migrates v3 diaries with editable default favorites", () => {
    const diary = parseDiary({
      schemaVersion: 3,
      locale: "en",
      periodStarts: [],
      days: {
        "2026-07-05": {
          symptoms: { calm: "present", pregnancyTestNegative: "present" },
        },
      },
    });
    expect(diary.schemaVersion).toBe(6);
    expect(diary.favoriteSymptomIds).toContain("cramps");
    expect(diary.days["2026-07-05"]?.symptoms).toEqual({
      calm: "present",
      pregnancyTestNegative: "present",
    });
  });

  it("keeps custom symptoms, pills, and favorites in the encrypted diary model", () => {
    const diary = parseDiary({
      schemaVersion: 4,
      locale: "en",
      periodStarts: [],
      customSymptoms: [
        { id: "custom-migraine1", label: "Migraine", emoji: "🌩️", category: "custom" },
        { id: "custom-pill0001", label: "Ibuprofen", emoji: "💊", category: "otherPills" },
      ],
      favoriteSymptomIds: ["custom-migraine1", "cramps"],
      days: {
        "2026-07-05": {
          symptoms: {
            "custom-migraine1": "present",
            "custom-pill0001": "present",
            "custom-orphan01": "present",
          },
        },
      },
    });
    expect(diary.customSymptoms).toHaveLength(2);
    expect(diary.favoriteSymptomIds).toEqual(["custom-migraine1", "cramps"]);
    expect(diary.days["2026-07-05"]?.symptoms).toEqual({
      "custom-migraine1": "present",
      "custom-pill0001": "present",
    });
  });

  it("keeps daily notes, trims them, and caps them at 200 characters", () => {
    const long = "x".repeat(250);
    const diary = parseDiary({
      schemaVersion: 4,
      locale: "es",
      periodStarts: [],
      days: {
        "2026-08-01": { note: "  Hoy me siento mejor\n  ", symptoms: {} },
        "2026-08-02": { note: long, symptoms: { calm: "present" } },
        "2026-08-03": { note: "   ", symptoms: {} },
      },
    });
    expect(diary.schemaVersion).toBe(6);
    expect(diary.days["2026-08-01"]).toEqual({ note: "Hoy me siento mejor", symptoms: {} });
    expect(diary.days["2026-08-02"]?.note).toHaveLength(200);
    expect(diary.days["2026-08-03"]).toBeUndefined();
  });

  it("keeps a day that only has a note", () => {
    const empty = parseDiary({ schemaVersion: 4, periodStarts: [], days: {}, locale: "en" });
    const withNote = upsertDay(empty, "2026-08-11", { note: "Quiet day", symptoms: {} });
    expect(withNote.days["2026-08-11"]).toEqual({ note: "Quiet day", symptoms: {} });
    const cleared = upsertDay(withNote, "2026-08-11", { symptoms: {} });
    expect(cleared.days["2026-08-11"]).toBeUndefined();
  });

  it("derives period starts from consecutive bleeding runs", () => {
    const days: Record<string, DayLog> = {
      "2026-06-01": { flow: "heavy", symptoms: {} },
      "2026-06-02": { flow: "medium", symptoms: {} },
      "2026-06-03": { flow: "light", symptoms: {} },
      "2026-06-10": { flow: "spotting", symptoms: {} },
      "2026-06-28": { flow: "medium", symptoms: {} },
      "2026-06-29": { flow: "light", symptoms: {} },
    };
    expect(derivePeriodStarts(days)).toEqual(["2026-06-01", "2026-06-10", "2026-06-28"]);
  });

  it("recalculates period starts when a day is saved", () => {
    const empty = parseDiary({ schemaVersion: 3, periodStarts: [], days: {}, locale: "en" });
    const withFlow = upsertDay(empty, "2026-07-04", {
      flow: "medium",
      symptoms: { cramps: "present" },
    });
    expect(withFlow.periodStarts).toEqual(["2026-07-04"]);
    const cleared = upsertDay(withFlow, "2026-07-04", { symptoms: {} });
    expect(cleared.periodStarts).toEqual([]);
    expect(cleared.days["2026-07-04"]).toBeUndefined();
  });

  it("does not treat intermenstrual bleeding as a period start or duration", () => {
    const empty = parseDiary({ schemaVersion: 6, periodStarts: [], days: {}, locale: "en" });
    const withSymptom = upsertDay(empty, "2026-07-10", {
      symptoms: { intermenstrualBleeding: "present" },
    });
    expect(withSymptom.periodStarts).toEqual([]);
    expect(withSymptom.days["2026-07-10"]?.flow).toBeUndefined();
    expect(derivePeriodStarts(withSymptom.days)).toEqual([]);

    const withPeriod = upsertDay(withSymptom, "2026-07-01", { flow: "medium", symptoms: {} });
    expect(withPeriod.periodStarts).toEqual(["2026-07-01"]);
    const midCycleBleed = upsertDay(withPeriod, "2026-07-10", {
      symptoms: { intermenstrualBleeding: "present" },
    });
    expect(midCycleBleed.periodStarts).toEqual(["2026-07-01"]);
  });

  it("keeps forecasting disabled when the diary already stores that preference", () => {
    const diary = parseDiary({
      schemaVersion: 5,
      locale: "es",
      periodStarts: [],
      days: {},
      forecastingEnabled: false,
    });
    expect(diary.schemaVersion).toBe(6);
    expect(diary.forecastingEnabled).toBe(false);
  });
});

describe("diary import/export", () => {
  it("round-trips CSV with the v3 symptoms map", () => {
    const source = parseDiary({
      schemaVersion: 3,
      locale: "es",
      periodStarts: ["2026-05-02"],
      days: {
        "2026-05-02": { flow: "heavy", symptoms: { cramps: "severe", bloating: "present" } },
        "2026-05-03": { flow: "light", cervicalMucus: "sticky", symptoms: { headache: "mild" } },
      },
    });
    const csv = diaryToCsv(source);
    const incoming = parseImportedFile(csv);
    expect(previewImport(incoming)).toEqual({ days: 2, starts: 1 });
    const blank = parseDiary({ schemaVersion: 3, periodStarts: [], days: {}, locale: "en" });
    const merged = mergeDiaries(blank, incoming, "en");
    expect(merged.days["2026-05-02"]?.symptoms).toEqual({ cramps: "severe", bloating: "present" });
    expect(merged.days["2026-05-03"]?.cervicalMucus).toBe("sticky");
    expect(merged.periodStarts).toEqual(["2026-05-02"]);
  });

  it("imports a v2 CSV with cramps and headache columns", () => {
    const incoming = parseImportedFile(
      "date,flow,cramps,headache,cervicalMucus,periodStart\n2026-05-02,heavy,severe,,sticky,1\n",
    );
    expect(incoming.days["2026-05-02"]?.symptoms.cramps).toBe("severe");
    expect(incoming.days["2026-05-02"]?.cervicalMucus).toBe("sticky");
  });

  it("imports v1 JSON and keeps existing symptoms on merge", () => {
    const current = parseDiary({
      schemaVersion: 3,
      locale: "es",
      periodStarts: ["2026-04-01"],
      days: { "2026-04-01": { flow: "light", symptoms: { cramps: "mild" } } },
    });
    const incoming = parseImportedFile(
      JSON.stringify({ schemaVersion: 1, periodStarts: ["2026-04-01", "2026-04-30"] }),
    );
    const merged = mergeDiaries(current, incoming, "es");
    expect(merged.periodStarts).toEqual(["2026-04-01", "2026-04-30"]);
    expect(merged.days["2026-04-01"]?.flow).toBe("medium");
    expect(merged.days["2026-04-01"]?.symptoms.cramps).toBe("mild");
  });

  it("imports a date-only CSV backup", () => {
    const incoming = parseImportedFile("date\n2026-01-10\n2026-02-08\n");
    expect(incoming.periodStarts).toEqual(["2026-01-10", "2026-02-08"]);
    expect(incoming.days["2026-01-10"]?.flow).toBe("medium");
  });

  it("keeps sexualActivity through upsert and CSV export/import", () => {
    const blank = parseDiary({ schemaVersion: 3, periodStarts: [], days: {}, locale: "en" });
    const withSex = upsertDay(blank, "2026-08-10", {
      symptoms: { sexualActivity: "present", highLibido: "present" },
    });
    expect(withSex.days["2026-08-10"]?.symptoms).toEqual({
      sexualActivity: "present",
      highLibido: "present",
    });
    const csv = diaryToCsv(withSex);
    expect(csv).toContain("sexualActivity:present");
    const reimported = parseImportedFile(csv);
    expect(reimported.days["2026-08-10"]?.symptoms.sexualActivity).toBe("present");
    expect(reimported.days["2026-08-10"]?.symptoms.highLibido).toBe("present");
  });

  it("round-trips custom symptom metadata and favorites through CSV", () => {
    const source = parseDiary({
      schemaVersion: 4,
      locale: "en",
      periodStarts: [],
      customSymptoms: [
        { id: "custom-migraine1", label: "Migraine", emoji: "🌩️", category: "custom" },
      ],
      favoriteSymptomIds: ["custom-migraine1"],
      days: {
        "2026-08-10": { symptoms: { "custom-migraine1": "present" } },
      },
    });
    const reimported = parseImportedFile(diaryToCsv(source));
    expect(reimported.customSymptoms).toEqual(source.customSymptoms);
    expect(reimported.favoriteSymptomIds).toEqual(["custom-migraine1"]);
    expect(reimported.days["2026-08-10"]?.symptoms["custom-migraine1"]).toBe("present");
  });

  it("round-trips daily notes through CSV and prefers incoming notes on merge", () => {
    const source = parseDiary({
      schemaVersion: 5,
      locale: "es",
      periodStarts: [],
      days: {
        "2026-08-12": { note: "Día suave", symptoms: { calm: "present" } },
      },
    });
    const csv = diaryToCsv(source);
    expect(csv).toContain("note");
    expect(csv).toContain("Día suave");
    const reimported = parseImportedFile(csv);
    expect(reimported.days["2026-08-12"]?.note).toBe("Día suave");

    const current = parseDiary({
      schemaVersion: 5,
      locale: "es",
      periodStarts: [],
      days: {
        "2026-08-12": { note: "Nota antigua", symptoms: { calm: "present" } },
        "2026-08-13": { note: "Solo actual", symptoms: {} },
      },
    });
    const incoming = parseDiary({
      schemaVersion: 5,
      locale: "es",
      periodStarts: [],
      days: {
        "2026-08-12": { note: "Nota nueva", symptoms: {} },
        "2026-08-14": { note: "Solo import", symptoms: {} },
      },
    });
    const merged = mergeDiaries(current, incoming, "es");
    expect(merged.days["2026-08-12"]?.note).toBe("Nota nueva");
    expect(merged.days["2026-08-13"]?.note).toBe("Solo actual");
    expect(merged.days["2026-08-14"]?.note).toBe("Solo import");
  });

  it("round-trips the forecasting preference through JSON", () => {
    const source = parseDiary({
      schemaVersion: 6,
      locale: "es",
      periodStarts: [],
      days: {},
      forecastingEnabled: false,
    });
    const incoming = parseImportedFile(diaryToJson(source));
    expect(incoming.forecastingEnabled).toBe(false);
  });
});
