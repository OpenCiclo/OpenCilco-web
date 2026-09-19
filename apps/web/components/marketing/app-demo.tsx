// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

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
import { cn } from "@/lib/utils";

/**
 * Builds a realistic sample diary (three ~28-day cycles) so the demo drives
 * the same forecasting engine (`cycleOverview`) and calendar markers used by
 * the real calendar screen — no screenshots, just the app's own logic fed
 * with fixture data instead of an encrypted wallet.
 */
function buildSampleDiary(locale: Locale, today: string): Diary {
  const base = emptyDiary(locale);
  const lastStart = addDaysIso(today, -13);
  const periodStarts = [addDaysIso(lastStart, -56), addDaysIso(lastStart, -28), lastStart];
  const days: Record<string, DayLog> = {};
  for (const start of periodStarts) {
    days[start] = { flow: "medium", symptoms: {} };
    days[addDaysIso(start, 1)] = { flow: "heavy", symptoms: { cramps: "moderate" } };
    days[addDaysIso(start, 2)] = { flow: "light", symptoms: {} };
  }
  return { ...base, periodStarts, days };
}

export function AppDemo({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const today = useMemo(() => todayIsoUtc(), []);
  const diary = useMemo(() => buildSampleDiary(locale, today), [locale, today]);
  const overview = useMemo(() => cycleOverview(diary, today), [diary, today]);
  const [selected, setSelected] = useState<string | null>(today);

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-serif text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          {t.appName}
        </span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          {locale === "es" ? "Demo interactiva" : "Interactive demo"}
        </span>
      </div>

      {phase ? (
        <div className="relative overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground">
          <div
            aria-hidden
            className="absolute -right-8 -top-10 size-36 rounded-full bg-primary-foreground/10"
          />
          <div className="relative">
            <p className="text-sm font-medium opacity-90">
              {t.cycleDay.replace("{day}", String(phase.cycleDay))}
            </p>
            <p className="mt-1 font-serif text-2xl">
              {phaseLabel(phase.phase, t)}
              {phase.source === "estimated" ? (
                <span className="ml-2 align-middle font-sans text-sm font-medium opacity-80">
                  · {t.phaseEstimated}
                </span>
              ) : null}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-pretty opacity-90">{phaseBody(phase.phase, t)}</p>
          </div>
        </div>
      ) : null}

      <div>
        <div className="mb-1 grid grid-cols-7">
          {labels.map((label, index) => (
            <div key={`${label}-${index}`} className="py-1 text-center text-[11px] font-semibold text-muted-foreground">
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((iso, index) => {
            if (!iso) return <div key={`empty-${index}`} />;
            const log = diary.days[iso];
            const isToday = iso === today;
            const bleeding = log?.flow;
            const estFertile =
              overview.forecastingEnabled && isEstimatedFertileDate(iso, diary.periodStarts, overview.nextPeriodDate);
            const estBleeding =
              overview.forecastingEnabled && isEstimatedBleedingDate(iso, overview.expectedBleedingWindow);
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
                  "mx-auto flex size-9 items-center justify-center rounded-full text-xs font-medium transition-transform active:scale-90",
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
        <p className="flex items-center gap-1.5 rounded-2xl bg-muted px-3 py-2 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 shrink-0 text-primary" />
          <span className="capitalize">{formatIsoUtc(selected, locale, { month: "long", day: "numeric" })}</span>
          {selectedInfo ? <span>· {selectedInfo}</span> : null}
        </p>
      ) : null}

      <p className="text-center text-[11px] text-muted-foreground">
        {locale === "es" ? "Datos de ejemplo. Nada se guarda." : "Sample data. Nothing is saved."}
      </p>
    </div>
  );
}
