// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Locale } from "@/lib/i18n";
import { cycleLengths } from "@/lib/forecast/math";
import {
  BUILT_IN_SYMPTOM_IDS,
  DEFAULT_FAVORITE_SYMPTOM_IDS,
  isBuiltInSymptomId,
  isCustomSymptomId,
  type CustomSymptomCategory,
  type CustomSymptomDefinition,
  type CustomSymptomId,
  type SymptomId as SymptomIdentifier,
} from "@/lib/symptoms/definitions";

export const DIARY_SCHEMA_VERSION = 6;
export const MAX_DAILY_NOTE_LENGTH = 200;

export const FLOW_LEVELS = ["spotting", "light", "medium", "heavy"] as const;
export const MUCUS_LEVELS = ["dry", "sticky", "creamy", "watery", "eggwhite"] as const;
export const SYMPTOM_IDS = BUILT_IN_SYMPTOM_IDS;
export const SYMPTOM_VALUES = ["present", "mild", "moderate", "severe"] as const;
export const LEGACY_INTENSITIES = ["none", "mild", "moderate", "severe"] as const;

export type FlowLevel = (typeof FLOW_LEVELS)[number];
export type CervicalMucus = (typeof MUCUS_LEVELS)[number];
export type SymptomId = SymptomIdentifier;
export type SymptomValue = (typeof SYMPTOM_VALUES)[number];
export type SymptomMap = Partial<Record<SymptomId, SymptomValue>>;
export type {
  CustomSymptomCategory,
  CustomSymptomDefinition,
  CustomSymptomId,
};

export type DayLog = {
  flow?: FlowLevel;
  cervicalMucus?: CervicalMucus;
  symptoms: SymptomMap;
  note?: string;
};

export type Diary = {
  schemaVersion: number;
  periodStarts: string[];
  days: Record<string, DayLog>;
  locale: Locale;
  poolOptIn: boolean;
  poolContributorKey: string | null;
  poolLastSyncedAt: string | null;
  recoveryEmailSet: boolean;
  favoriteSymptomIds: SymptomId[];
  customSymptoms: CustomSymptomDefinition[];
  forecastingEnabled: boolean;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: string): boolean {
  return ISO_DATE.test(value);
}

export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function addDaysIso(iso: string, delta: number): string {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
}

export function todayIsoUtc(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function emptyDayLog(): DayLog {
  return { symptoms: {} };
}

export function emptyDiary(locale: Locale): Diary {
  return {
    schemaVersion: DIARY_SCHEMA_VERSION,
    periodStarts: [],
    days: {},
    locale,
    poolOptIn: false,
    poolContributorKey: null,
    poolLastSyncedAt: null,
    recoveryEmailSet: false,
    favoriteSymptomIds: [...DEFAULT_FAVORITE_SYMPTOM_IDS],
    customSymptoms: [],
    forecastingEnabled: true,
  };
}

function isFlow(value: unknown): value is FlowLevel {
  return typeof value === "string" && (FLOW_LEVELS as readonly string[]).includes(value);
}

function isMucus(value: unknown): value is CervicalMucus {
  return typeof value === "string" && (MUCUS_LEVELS as readonly string[]).includes(value);
}

function isSymptomValue(value: unknown): value is SymptomValue {
  return typeof value === "string" && (SYMPTOM_VALUES as readonly string[]).includes(value);
}

function migrateLegacyIntensity(value: unknown): SymptomValue | undefined {
  if (value === "mild" || value === "moderate" || value === "severe") return value;
  if (value === "present") return "present";
  return undefined;
}

export function sanitizeCustomSymptoms(raw: unknown): CustomSymptomDefinition[] {
  if (!Array.isArray(raw)) return [];
  const definitions: CustomSymptomDefinition[] = [];
  const seen = new Set<string>();
  for (const value of raw) {
    if (!value || typeof value !== "object") continue;
    const input = value as Record<string, unknown>;
    if (!isCustomSymptomId(input.id) || seen.has(input.id)) continue;
    const label = typeof input.label === "string" ? input.label.trim().slice(0, 80) : "";
    if (!label) continue;
    const emoji = typeof input.emoji === "string" ? input.emoji.trim().slice(0, 32) : "";
    const category: CustomSymptomCategory = input.category === "otherPills" ? "otherPills" : "custom";
    definitions.push({ id: input.id, label, emoji, category });
    seen.add(input.id);
  }
  return definitions;
}

export function sanitizeSymptoms(
  raw: unknown,
  legacy?: { cramps?: unknown; headache?: unknown },
  allowedCustomIds: ReadonlySet<CustomSymptomId> = new Set(),
): SymptomMap {
  const symptoms: SymptomMap = {};
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
      if (!isBuiltInSymptomId(key) && !(isCustomSymptomId(key) && allowedCustomIds.has(key))) continue;
      if (isSymptomValue(value)) symptoms[key] = value;
    }
  } else if (Array.isArray(raw)) {
    for (const item of raw) {
      if (
        isBuiltInSymptomId(item) ||
        (isCustomSymptomId(item) && allowedCustomIds.has(item))
      ) {
        symptoms[item] = "present";
      }
    }
  }
  const legacyCramps = migrateLegacyIntensity(legacy?.cramps);
  if (legacyCramps && !symptoms.cramps) symptoms.cramps = legacyCramps;
  const legacyHeadache = migrateLegacyIntensity(legacy?.headache);
  if (legacyHeadache && !symptoms.headache) symptoms.headache = legacyHeadache;
  return symptoms;
}

export function sanitizeDailyNote(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return undefined;
  return normalized.slice(0, MAX_DAILY_NOTE_LENGTH);
}

export function sanitizeDayLog(
  raw: unknown,
  allowedCustomIds: ReadonlySet<CustomSymptomId> = new Set(),
): DayLog {
  if (!raw || typeof raw !== "object") return emptyDayLog();
  const input = raw as Record<string, unknown>;
  const log: DayLog = { symptoms: sanitizeSymptoms(input.symptoms, input, allowedCustomIds) };
  if (isFlow(input.flow) || isFlow(input.bleeding)) {
    log.flow = (input.flow as FlowLevel | undefined) ?? (input.bleeding as FlowLevel);
  }
  if (isMucus(input.cervicalMucus) || isMucus(input.mucus)) {
    log.cervicalMucus = (input.cervicalMucus as CervicalMucus | undefined) ?? (input.mucus as CervicalMucus);
  }
  const note = sanitizeDailyNote(input.note);
  if (note) log.note = note;
  return log;
}

export function isEmptyDayLog(log: DayLog): boolean {
  return !log.flow && !log.cervicalMucus && Object.keys(log.symptoms).length === 0 && !log.note;
}

export function hasSymptoms(log: DayLog | undefined): boolean {
  return Boolean(log && Object.keys(log.symptoms).length > 0);
}

export function hasNote(log: DayLog | undefined): boolean {
  return Boolean(log?.note);
}

export function derivePeriodStarts(days: Record<string, DayLog>): string[] {
  const bleeding = Object.keys(days)
    .filter((iso) => days[iso]?.flow)
    .sort();
  const starts: string[] = [];
  for (const iso of bleeding) {
    const previous = addDaysIso(iso, -1);
    if (!days[previous]?.flow) starts.push(iso);
  }
  return starts;
}

function backfillStarts(days: Record<string, DayLog>, starts: string[]): Record<string, DayLog> {
  const next = { ...days };
  for (const iso of starts) {
    if (!isIsoDate(iso)) continue;
    if (!next[iso]?.flow) {
      next[iso] = { ...emptyDayLog(), ...next[iso], flow: "medium", symptoms: { ...next[iso]?.symptoms } };
    }
  }
  return next;
}

function parsePoolFields(parsed: Partial<Diary> & Record<string, unknown>) {
  if (typeof parsed.poolOptIn === "boolean") {
    return {
      poolOptIn: parsed.poolOptIn,
      poolContributorKey:
        typeof parsed.poolContributorKey === "string" ? parsed.poolContributorKey : null,
      poolLastSyncedAt:
        typeof parsed.poolLastSyncedAt === "string" && isIsoDate(parsed.poolLastSyncedAt)
          ? parsed.poolLastSyncedAt
          : null,
    };
  }
  const legacyOptIn = Boolean(parsed.contributedToPool) && !Boolean(parsed.poolDeclined);
  return {
    poolOptIn: legacyOptIn,
    poolContributorKey: null,
    poolLastSyncedAt: null,
  };
}

export function parseDiary(raw: string | object): Diary {
  const parsed = (typeof raw === "string" ? JSON.parse(raw) : raw) as Partial<Diary> & {
    days?: Record<string, unknown>;
  };
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid diary");
  }
  if (!Array.isArray(parsed.periodStarts) && !parsed.days) {
    throw new Error("Invalid diary");
  }
  const periodStarts = Array.isArray(parsed.periodStarts)
    ? parsed.periodStarts.filter((iso) => typeof iso === "string" && isIsoDate(iso))
    : [];
  const customSymptoms = sanitizeCustomSymptoms(parsed.customSymptoms);
  const allowedCustomIds = new Set(customSymptoms.map((item) => item.id));
  const days: Record<string, DayLog> = {};
  if (parsed.days && typeof parsed.days === "object") {
    for (const [iso, value] of Object.entries(parsed.days)) {
      if (!isIsoDate(iso)) continue;
      const log = sanitizeDayLog(value, allowedCustomIds);
      if (!isEmptyDayLog(log)) days[iso] = log;
    }
  }
  const withStarts = backfillStarts(days, periodStarts);
  const derived = derivePeriodStarts(withStarts);
  const pool = parsePoolFields(parsed);
  const favoriteSource = Array.isArray(parsed.favoriteSymptomIds)
    ? parsed.favoriteSymptomIds
    : DEFAULT_FAVORITE_SYMPTOM_IDS;
  const favoriteSymptomIds = [...new Set(favoriteSource)].filter(
    (id): id is SymptomId =>
      isBuiltInSymptomId(id) ||
      (isCustomSymptomId(id) && allowedCustomIds.has(id)),
  );
  return {
    schemaVersion: DIARY_SCHEMA_VERSION,
    periodStarts: derived.length > 0 ? derived : [...periodStarts].sort(),
    days: withStarts,
    locale: parsed.locale === "en" ? "en" : "es",
    ...pool,
    recoveryEmailSet: Boolean(parsed.recoveryEmailSet),
    favoriteSymptomIds,
    customSymptoms,
    forecastingEnabled: parsed.forecastingEnabled !== false,
  };
}

export function upsertDay(diary: Diary, iso: string, log: DayLog): Diary {
  const days = { ...diary.days };
  const allowedCustomIds = new Set(diary.customSymptoms.map((item) => item.id));
  const cleaned = sanitizeDayLog(log, allowedCustomIds);
  if (isEmptyDayLog(cleaned)) {
    delete days[iso];
  } else {
    days[iso] = cleaned;
  }
  return {
    ...diary,
    schemaVersion: DIARY_SCHEMA_VERSION,
    days,
    periodStarts: derivePeriodStarts(days),
  };
}

export function monthCells(year: number, month: number, weekStartsOn: 0 | 1): (string | null)[] {
  const firstIso = toIsoDate(year, month, 1);
  const firstWeekday = new Date(`${firstIso}T00:00:00Z`).getUTCDay();
  const leading = (firstWeekday - weekStartsOn + 7) % 7;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < leading; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(toIsoDate(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function weekdayLabels(locale: Locale, weekStartsOn: 0 | 1): string[] {
  const formatter = new Intl.DateTimeFormat(locale === "es" ? "es" : "en", { weekday: "narrow" });
  const sunday = Date.UTC(2026, 7, 9);
  const labels: string[] = [];
  for (let i = 0; i < 7; i += 1) {
    const offset = (weekStartsOn + i) % 7;
    labels.push(formatter.format(new Date(sunday + offset * 86_400_000)));
  }
  return labels;
}

export function diaryLengths(diary: Diary): number[] {
  return cycleLengths(diary.periodStarts);
}
