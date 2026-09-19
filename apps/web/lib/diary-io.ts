// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import {
  emptyDiary,
  emptyDayLog,
  isEmptyDayLog,
  isIsoDate,
  parseDiary,
  sanitizeDayLog,
  type DayLog,
  type Diary,
  type CustomSymptomId,
  type SymptomId,
  type SymptomMap,
  type SymptomValue,
} from "@/lib/diary";
import type { Locale } from "@/lib/i18n";

export type ImportPreview = {
  days: number;
  starts: number;
};

function csvEscape(value: string): string {
  if (!value.includes(",") && !value.includes('"') && !value.includes("\n")) return value;
  return `"${value.replaceAll('"', '""')}"`;
}

export function serializeSymptoms(symptoms: SymptomMap): string {
  return Object.entries(symptoms)
    .filter((entry): entry is [SymptomId, SymptomValue] => Boolean(entry[1]))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, value]) => `${id}:${value}`)
    .join(";");
}

export function parseSymptomsCell(
  raw: string,
  allowedCustomIds: ReadonlySet<CustomSymptomId> = new Set(),
): SymptomMap {
  const symptoms: SymptomMap = {};
  if (!raw.trim()) return symptoms;
  for (const part of raw.split(";")) {
    const [id, value] = part.split(":").map((item) => item.trim());
    const log = sanitizeDayLog(
      { symptoms: { [id]: value ?? "present" } },
      allowedCustomIds,
    );
    Object.assign(symptoms, log.symptoms);
  }
  return symptoms;
}

export function diaryToJson(diary: Diary): string {
  return JSON.stringify(diary, null, 2);
}

export function diaryToCsv(diary: Diary): string {
  const header =
    "date,flow,cervicalMucus,symptoms,cramps,headache,note,periodStart,customSymptoms,favoriteSymptomIds";
  const dates = new Set([...Object.keys(diary.days), ...diary.periodStarts]);
  const sortedDates = [...dates].sort();
  const rows = sortedDates.map((date, index) => {
    const log = diary.days[date] ?? emptyDayLog();
    const start = diary.periodStarts.includes(date) ? "1" : "";
    return [
      date,
      log.flow ?? "",
      log.cervicalMucus ?? "",
      serializeSymptoms(log.symptoms),
      log.symptoms.cramps ?? "",
      log.symptoms.headache ?? "",
      log.note ?? "",
      start,
      index === 0 ? JSON.stringify(diary.customSymptoms) : "",
      index === 0 ? diary.favoriteSymptomIds.join(";") : "",
    ]
      .map((cell) => csvEscape(String(cell)))
      .join(",");
  });
  if (rows.length === 0) {
    rows.push(
      ["", "", "", "", "", "", "", "", JSON.stringify(diary.customSymptoms), diary.favoriteSymptomIds.join(";")]
        .map((cell) => csvEscape(String(cell)))
        .join(","),
    );
  }
  return `${header}\n${rows.join("\n")}\n`;
}

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quoted) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells;
}

function parseCsvDiary(text: string): Diary {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) throw new Error("Invalid diary");
  const header = splitCsvLine(lines[0]).map((cell) => cell.trim().toLowerCase());
  const days: Record<string, DayLog> = {};
  const starts: string[] = [];

  const dateOnly = header.length === 1 && (header[0] === "date" || isIsoDate(header[0]));
  if (dateOnly) {
    const dates = header[0] === "date" ? lines.slice(1) : lines;
    for (const raw of dates) {
      const iso = splitCsvLine(raw)[0]?.trim() ?? "";
      if (!isIsoDate(iso)) continue;
      days[iso] = { flow: "medium", symptoms: {} };
      starts.push(iso);
    }
    return parseDiary({
      schemaVersion: 3,
      periodStarts: starts,
      days,
      locale: "es",
      poolOptIn: false,
      poolContributorKey: null,
      poolLastSyncedAt: null,
      recoveryEmailSet: false,
    });
  }

  const index = Object.fromEntries(header.map((name, i) => [name, i]));
  const metadataRows = lines.slice(1).map((line) => splitCsvLine(line));
  const customSymptoms = metadataRows.flatMap((cells) => {
    const raw = index.customsymptoms === undefined ? "" : (cells[index.customsymptoms] ?? "").trim();
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const customDiary = parseDiary({
    schemaVersion: 4,
    periodStarts: [],
    days: {},
    locale: "es",
    customSymptoms,
    favoriteSymptomIds: [],
  });
  const allowedCustomIds = new Set(customDiary.customSymptoms.map((item) => item.id));
  const favoriteSymptomIds = metadataRows.flatMap((cells) => {
    const raw =
      index.favoritesymptomids === undefined
        ? ""
        : (cells[index.favoritesymptomids] ?? "").trim();
    return raw ? raw.split(";").map((item) => item.trim()).filter(Boolean) : [];
  });
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const iso = (cells[index.date] ?? "").trim();
    if (!isIsoDate(iso)) continue;
    const fromCell =
      index.symptoms !== undefined
        ? parseSymptomsCell(cells[index.symptoms] ?? "", allowedCustomIds)
        : {};
    const log = sanitizeDayLog({
      flow: cells[index.flow] || cells[index.bleeding] || undefined,
      cervicalMucus: cells[index.cervicalmucus] || cells[index.cervical_mucus] || cells[index.mucus] || undefined,
      symptoms: fromCell,
      cramps: cells[index.cramps] || undefined,
      headache: cells[index.headache] || undefined,
      note: index.note === undefined ? undefined : cells[index.note],
    }, allowedCustomIds);
    if (!isEmptyDayLog(log)) days[iso] = log;
    const startFlag = (cells[index.periodstart] ?? cells[index.period_start] ?? "").trim();
    if (startFlag === "1" || startFlag.toLowerCase() === "true") starts.push(iso);
  }
  return parseDiary({
    schemaVersion: 3,
    periodStarts: starts,
    days,
    locale: "es",
    poolOptIn: false,
    poolContributorKey: null,
    poolLastSyncedAt: null,
    recoveryEmailSet: false,
    customSymptoms: customDiary.customSymptoms,
    ...(index.favoritesymptomids === undefined ? {} : { favoriteSymptomIds }),
  });
}

export function parseImportedFile(text: string): Diary {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Invalid diary");
  if (trimmed.startsWith("{")) return parseDiary(trimmed);
  return parseCsvDiary(trimmed);
}

export function previewImport(incoming: Diary): ImportPreview {
  return {
    days: Object.keys(incoming.days).length,
    starts: incoming.periodStarts.length,
  };
}

function mergeSymptoms(current: SymptomMap | undefined, incoming: SymptomMap | undefined): SymptomMap {
  return { ...current, ...incoming };
}

export function mergeDiaries(current: Diary, incoming: Diary, locale: Locale): Diary {
  const customSymptoms = [
    ...current.customSymptoms,
    ...incoming.customSymptoms.filter(
      (incomingItem) => !current.customSymptoms.some((currentItem) => currentItem.id === incomingItem.id),
    ),
  ];
  const favoriteSymptomIds = [
    ...new Set([...current.favoriteSymptomIds, ...incoming.favoriteSymptomIds]),
  ];
  const days: Record<string, DayLog> = { ...current.days };
  for (const [iso, log] of Object.entries(incoming.days)) {
    const existing = days[iso] ?? emptyDayLog();
    days[iso] = {
      flow: log.flow ?? existing.flow,
      cervicalMucus: log.cervicalMucus ?? existing.cervicalMucus,
      symptoms: mergeSymptoms(existing.symptoms, log.symptoms),
      ...(log.note ? { note: log.note } : existing.note ? { note: existing.note } : {}),
    };
  }
  const mergedStarts = [...new Set([...current.periodStarts, ...incoming.periodStarts])];
  const base = emptyDiary(locale);
  return parseDiary({
    ...base,
    ...current,
    days,
    periodStarts: mergedStarts,
    locale: current.locale ?? locale,
    poolOptIn: current.poolOptIn,
    poolContributorKey: current.poolContributorKey,
    poolLastSyncedAt: current.poolLastSyncedAt,
    recoveryEmailSet: current.recoveryEmailSet,
    customSymptoms,
    favoriteSymptomIds,
  });
}
