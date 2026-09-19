// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { parseDiary } from "@/lib/diary";
import { filterJournalEntries, listJournalEntries, similarJournalEntries } from "@/lib/journal/entries";

describe("journal entries", () => {
  const diary = parseDiary({
    schemaVersion: 5,
    locale: "es",
    periodStarts: ["2026-05-01", "2026-05-29", "2026-06-26"],
    days: {
      "2026-05-01": { flow: "medium", note: "Inicio suave", symptoms: {} },
      "2026-05-10": { note: "Más energía", symptoms: { energetic: "present" } },
      "2026-05-29": { flow: "medium", note: "Otro inicio", symptoms: {} },
      "2026-06-07": { note: "Energía otra vez", symptoms: {} },
      "2026-06-26": { flow: "medium", symptoms: {} },
      "2026-07-05": { note: "Misma zona del ciclo", symptoms: {} },
    },
  });

  it("lists notes newest first with cycle context when available", () => {
    const entries = listJournalEntries(diary, "2026-07-24");
    expect(entries.map((entry) => entry.iso)).toEqual([
      "2026-07-05",
      "2026-06-07",
      "2026-05-29",
      "2026-05-10",
      "2026-05-01",
    ]);
    expect(entries[0]?.cycleDay).toBeGreaterThan(0);
    expect(entries.find((entry) => entry.iso === "2026-05-01")?.phase).toBe("menstrual");
  });

  it("filters notes by substring without analyzing meaning", () => {
    const entries = listJournalEntries(diary);
    expect(filterJournalEntries(entries, "energ").map((entry) => entry.iso)).toEqual([
      "2026-06-07",
      "2026-05-10",
    ]);
    expect(filterJournalEntries(entries, "nada")).toEqual([]);
  });

  it("selects similar notes from earlier cycles around the same cycle day or phase", () => {
    const similar = similarJournalEntries(diary, "2026-07-05", "2026-07-24", 3);
    expect(similar.length).toBeGreaterThan(0);
    expect(similar.every((entry) => entry.iso !== "2026-07-05")).toBe(true);
    expect(similar.some((entry) => entry.iso === "2026-06-07" || entry.iso === "2026-05-10")).toBe(
      true,
    );
  });

  it("falls back to recent notes when none share phase or cycle day closely", () => {
    const sparse = parseDiary({
      schemaVersion: 5,
      locale: "es",
      periodStarts: ["2026-05-01", "2026-05-29"],
      days: {
        "2026-05-01": { flow: "medium", note: "Solo al inicio", symptoms: {} },
        "2026-05-29": { flow: "medium", symptoms: {} },
      },
    });
    // Mid-cycle reference; the only note is menstrual day 1 — not a close match.
    const similar = similarJournalEntries(sparse, "2026-06-12", "2026-06-26", 3);
    expect(similar).toHaveLength(1);
    expect(similar[0]?.note).toBe("Solo al inicio");
  });

  it("keeps cycle day without estimated phases when forecasting is off", () => {
    const off = parseDiary({
      schemaVersion: 6,
      locale: "es",
      forecastingEnabled: false,
      periodStarts: ["2026-05-01", "2026-05-29"],
      days: {
        "2026-05-01": { flow: "medium", note: "Inicio", symptoms: {} },
        "2026-05-10": { note: "Mitad del ciclo", symptoms: {} },
        "2026-05-29": { flow: "medium", symptoms: {} },
      },
    });
    const entries = listJournalEntries(off, "2026-06-26");
    const mid = entries.find((entry) => entry.iso === "2026-05-10");
    expect(mid?.cycleDay).toBe(10);
    expect(mid?.phase).toBeNull();
    const start = entries.find((entry) => entry.iso === "2026-05-01");
    expect(start?.phase).toBe("menstrual");
  });
});
