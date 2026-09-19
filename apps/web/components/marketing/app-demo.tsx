// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChartNoAxesColumn, Sparkles } from "lucide-react";

import {
  isEstimatedBleedingDate,
  isEstimatedFertileDate,
  possiblePeriodStartDates,
} from "@/lib/cycle/calendar-markers";
import { cycleOverview, phaseBody, phaseLabel } from "@/lib/cycle/phases";
import {
  addDaysIso,
  emptyDiary,
  monthCells,
  todayIsoUtc,
  weekdayLabels,
  type DayLog,
  type Diary,
} from "@/lib/diary";
import { formatIsoUtc } from "@/lib/format-date";
import { messages, type Locale } from "@/lib/i18n";
import { patternStats } from "@/lib/patterns/stats";
import { cn } from "@/lib/utils";

/**
 * Builds a realistic sample diary (five ~28-day cycles) so the demo drives
 * the same forecasting and pattern-stats engines used by the real app —
 * no screenshots, just the app's own logic fed with fixture data instead of
 * an encrypted wallet.
 */
function buildSampleDiary(locale: Locale, today: string): Diary {
  const base = emptyDiary(locale);
  const lastStart = addDaysIso(today, -13);
  const periodStarts = [
    addDaysIso(lastStart, -112),
    addDaysIso(lastStart, -84),
    addDaysIso(lastStart, -56),
    addDaysIso(lastStart, -28),
    lastStart,
  ];
  const days: Record<string, DayLog> = {};
  for (const start of periodStarts) {
    days[start] = { flow: "medium", symptoms: { cramps: "mild" } };
    days[addDaysIso(start, 1)] = { flow: "heavy", symptoms: { cramps: "moderate", fatigue: "mild" } };
    days[addDaysIso(start, 2)] = { flow: "light", symptoms: { fatigue: "mild" } };
    days[addDaysIso(start, 12)] = { symptoms: { cramps: "mild" } };
  }
  return { ...base, periodStarts, days };
}

const SYMPTOM_LABEL_KEYS = {
  cramps: "symptomCramps",
  fatigue: "symptomFatigue",
} as const;

type Tab = "calendar" | "stats";

export function AppDemo({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const today = useMemo(() => todayIsoUtc(), []);
  const diary = useMemo(() => buildSampleDiary(locale, today), [locale, today]);
  const overview = useMemo(() => cycleOverview(diary, today), [diary, today]);
  const stats = useMemo(() => patternStats(diary, today), [diary, today]);
  const [selected, setSelected] = useState<string | null>(today);
  const [tab, setTab] = useState<Tab>("calendar");

  const todayDate = new Date(`${today}T00:00:00Z`);
  const year = todayDate.getUTCFullYear();
  const month = todayDate.getUTCMonth() + 1;
  const weekStartsOn = locale === "es" ? 1 : 0;
  const cells = monthCells(year, month, weekStartsOn);
  const labels = weekdayLabels(locale, weekStartsOn);

  const possibleStarts = useMemo(
    () =>
      overview.forecast
        ? possiblePeriodStartDates(overview.forecast.dailyProbabilities, today)
        : new Set<string>(),
    [overview.forecast, today],
  );
  const mostLikelyStart = overview.forecast?.mostLikelyDate ?? null;
  const phase = overview.currentPhase;

  function describeDay(iso: string): string | null {
    const log = diary.days[iso];
    if (log?.flow) return t.legendBleeding;
    if (!overview.forecastingEnabled) return null;
    if (mostLikelyStart === iso) return t.legendMostLikelyStart;
    if (possibleStarts.has(iso)) return t.legendPossibleStart;
    if (isEstimatedBleedingDate(iso, overview.expectedBleedingWindow)) return t.legendEstimatedBleeding;
    if (isEstimatedFertileDate(iso, diary.periodStarts, overview.nextPeriodDate)) return t.legendFertileWindow;
    return null;
  }

  const selectedInfo = selected ? describeDay(selected) : null;
  const avgLength =
    stats.cycleLengthRange
      ? Math.round(
          stats.completedCycles.reduce((sum, cycle) => sum + cycle.length, 0) /
            Math.max(1, stats.completedCycles.length),
        )
      : null;

  return (
    <div
      className="relative mx-auto flex w-[300px] flex-col rounded-[2.5rem] border-2 border-foreground/90 bg-foreground/90 p-1.5 shadow-2xl"
      role="group"
      aria-label={locale === "es" ? "Demo interactiva de la app" : "Interactive app demo"}
    >
      <div
        aria-hidden
        className="absolute top-3 left-1/2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-foreground/90"
      />
      <div className="flex h-[580px] flex-col overflow-hidden rounded-[2.1rem] bg-card">
        <div className="flex items-center justify-between px-4 pt-6 pb-1">
          <span className="font-serif text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            {t.appName}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-semibold text-muted-foreground">
            {locale === "es" ? "Demo" : "Demo"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          {tab === "calendar" ? (
            <div className="flex flex-col gap-3">
              {phase ? (
                <div className="relative overflow-hidden rounded-2xl bg-primary p-3.5 text-primary-foreground">
                  <div
                    aria-hidden
                    className="absolute -right-6 -top-8 size-24 rounded-full bg-primary-foreground/10"
                  />
                  <div className="relative">
                    <p className="text-[11px] font-medium opacity-90">
                      {t.cycleDay.replace("{day}", String(phase.cycleDay))}
                    </p>
                    <p className="mt-0.5 font-serif text-lg leading-tight">
                      {phaseLabel(phase.phase, t)}
                      {phase.source === "estimated" ? (
                        <span className="ml-1.5 align-middle font-sans text-[10px] font-medium opacity-80">
                          · {t.phaseEstimated}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-pretty opacity-90">
                      {phaseBody(phase.phase, t)}
                    </p>
                  </div>
                </div>
              ) : null}

              <div>
                <div className="mb-1 grid grid-cols-7">
                  {labels.map((label, index) => (
                    <div
                      key={`${label}-${index}`}
                      className="py-0.5 text-center text-[9px] font-semibold text-muted-foreground"
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-0.5">
                  {cells.map((iso, index) => {
                    if (!iso) return <div key={`empty-${index}`} />;
                    const log = diary.days[iso];
                    const isToday = iso === today;
                    const bleeding = log?.flow;
                    const estFertile =
                      overview.forecastingEnabled &&
                      isEstimatedFertileDate(iso, diary.periodStarts, overview.nextPeriodDate);
                    const estBleeding =
                      overview.forecastingEnabled &&
                      isEstimatedBleedingDate(iso, overview.expectedBleedingWindow);
                    const likelyStart = overview.forecastingEnabled && mostLikelyStart === iso;
                    const possibleStart = overview.forecastingEnabled && possibleStarts.has(iso);
                    const dayLabel = formatIsoUtc(iso, locale, { month: "long", day: "numeric" });

                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => setSelected(iso)}
                        aria-label={dayLabel}
                        aria-pressed={selected === iso}
                        className={cn(
                          "mx-auto flex size-7 items-center justify-center rounded-full text-[10px] font-medium transition-transform active:scale-90",
                          bleeding
                            ? "bg-bleed text-bleed-foreground"
                            : likelyStart
                              ? "bg-primary text-primary-foreground"
                              : possibleStart
                                ? "bg-primary/40 text-primary"
                                : estBleeding
                                  ? "border-2 border-dashed border-bleed bg-bleed/10 text-bleed"
                                  : estFertile
                                    ? "bg-fertile/20 text-fertile-foreground ring-1 ring-inset ring-fertile/50"
                                    : "text-card-foreground hover:bg-muted",
                          isToday && !bleeding ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : null,
                          selected === iso ? "outline outline-2 outline-offset-2 outline-primary/40" : null,
                        )}
                      >
                        {Number(iso.slice(8, 10))}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selected ? (
                <p className="flex items-center gap-1.5 rounded-xl bg-muted px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground">
                  <Sparkles className="size-3 shrink-0 text-primary" />
                  <span className="capitalize">{formatIsoUtc(selected, locale, { month: "long", day: "numeric" })}</span>
                  {selectedInfo ? <span>· {selectedInfo}</span> : null}
                </p>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-muted p-3">
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase">
                    {locale === "es" ? "Ciclo promedio" : "Average cycle"}
                  </p>
                  <p className="mt-1 font-serif text-xl text-card-foreground">
                    {avgLength ? `${avgLength}d` : "—"}
                  </p>
                </div>
                <div className="rounded-2xl bg-muted p-3">
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase">
                    {locale === "es" ? "Ciclos registrados" : "Cycles logged"}
                  </p>
                  <p className="mt-1 font-serif text-xl text-card-foreground">
                    {stats.completedCycles.length}
                  </p>
                </div>
              </div>

              {stats.cycleLengthRange ? (
                <div className="rounded-2xl bg-muted p-3">
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase">
                    {locale === "es" ? "Rango de duración" : "Length range"}
                  </p>
                  <p className="mt-1 text-xs text-card-foreground">
                    {stats.cycleLengthRange.min}–{stats.cycleLengthRange.max}{" "}
                    {locale === "es" ? "días" : "days"}
                  </p>
                </div>
              ) : null}

              <div className="rounded-2xl bg-muted p-3">
                <p className="mb-2 text-[9px] font-semibold text-muted-foreground uppercase">
                  {locale === "es" ? "Síntomas frecuentes" : "Recurring symptoms"}
                </p>
                <div className="flex flex-col gap-2">
                  {stats.recurringSymptoms.length ? (
                    stats.recurringSymptoms.slice(0, 3).map((symptom) => {
                      const key = SYMPTOM_LABEL_KEYS[symptom.id as keyof typeof SYMPTOM_LABEL_KEYS];
                      const label = key ? t[key] : symptom.id;
                      return (
                        <div key={symptom.id} className="flex items-center gap-2">
                          <span className="w-16 shrink-0 truncate text-[10px] text-card-foreground">{label}</span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${Math.max(12, symptom.ratio * 100)}%` }}
                            />
                          </div>
                          <span className="w-10 shrink-0 text-right text-[9px] text-muted-foreground">
                            {symptom.cycleCount}/{symptom.cycleTotal}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-[10px] text-muted-foreground">
                      {locale === "es" ? "Sin datos suficientes." : "Not enough data yet."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1 border-t border-border px-4 py-2">
          {(
            [
              { id: "calendar" as const, label: locale === "es" ? "Calendario" : "Calendar", icon: CalendarDays },
              { id: "stats" as const, label: locale === "es" ? "Estadísticas" : "Stats", icon: ChartNoAxesColumn },
            ]
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[9px] font-semibold transition-colors",
                tab === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
