// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Filter, Moon, Plus, Sparkles } from "lucide-react";

import {
  isEditableDiaryDate,
  isEstimatedBleedingDate,
  isEstimatedFertileDate,
  possiblePeriodStartDates,
} from "@/lib/cycle/calendar-markers";
import { cycleOverview } from "@/lib/cycle/phases";
import {
  hasNote,
  hasSymptoms,
  isIsoDate,
  monthCells,
  todayIsoUtc,
  upsertDay,
  type CustomSymptomDefinition,
  weekdayLabels,
  type DayLog,
  type SymptomId,
} from "@/lib/diary";
import { formatIsoUtc } from "@/lib/format-date";
import type { Locale, Messages } from "@/lib/i18n";
import { useCiclo } from "@/lib/client/ciclo-context";
import { lunarDayInfo, type MoonPhaseId } from "@/lib/lunar/phases";
import { symptomColor, symptomLabel, symptomMeta } from "@/lib/symptoms/catalog";
import { matchingFilterSymptoms } from "@/lib/symptoms/filter";
import { cn } from "@/lib/utils";
import { CycleStatusCard } from "@/components/calendar/cycle-status-card";
import { DaySheet } from "@/components/calendar/day-sheet";
import { MoonPhaseIcon } from "@/components/calendar/moon-phase-icon";
import { SymptomFilterSheet } from "@/components/calendar/symptom-filter-sheet";

const MOON_PHASE_LABEL_KEYS: Record<MoonPhaseId, keyof Messages> = {
  newMoon: "moonPhaseNewMoon",
  waxingCrescent: "moonPhaseWaxingCrescent",
  firstQuarter: "moonPhaseFirstQuarter",
  waxingGibbous: "moonPhaseWaxingGibbous",
  fullMoon: "moonPhaseFullMoon",
  waningGibbous: "moonPhaseWaningGibbous",
  lastQuarter: "moonPhaseLastQuarter",
  waningCrescent: "moonPhaseWaningCrescent",
};

function moonPhaseAccessibleLabel(iso: string, t: Messages): string {
  const info = lunarDayInfo(iso);
  const phaseName = String(t[MOON_PHASE_LABEL_KEYS[info.phaseId]]);
  return t.moonPhaseLabel
    .replace("{phase}", phaseName)
    .replace("{percent}", String(info.percent));
}

export function CalendarScreen() {
  const {
    diary,
    persistDiary,
    t,
    locale,
    visualSeasons,
    lunarPhasesEnabled,
    lunarPhasesVisible,
    setLunarPhasesVisible,
  } = useCiclo();
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = todayIsoUtc();
  const todayDate = new Date(`${today}T00:00:00Z`);
  const deepLinkDay = (() => {
    const day = searchParams.get("day");
    if (!day || !isIsoDate(day) || !isEditableDiaryDate(day, today)) return null;
    return day;
  })();
  const deepLinkDate = deepLinkDay ? new Date(`${deepLinkDay}T00:00:00Z`) : null;
  const [year, setYear] = useState(
    () => deepLinkDate?.getUTCFullYear() ?? todayDate.getUTCFullYear(),
  );
  const [month, setMonth] = useState(
    () => (deepLinkDate ? deepLinkDate.getUTCMonth() + 1 : todayDate.getUTCMonth() + 1),
  );
  const [sheetOpen, setSheetOpen] = useState(() => Boolean(deepLinkDay));
  const [activeIso, setActiveIso] = useState<string | null>(() => deepLinkDay);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPresent, setFilterPresent] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SymptomId[]>([]);
  const showMoonBand = lunarPhasesEnabled && lunarPhasesVisible;

  const overview = useMemo(() => cycleOverview(diary, today), [diary, today]);
  const possibleStarts = useMemo(
    () =>
      overview.forecast
        ? possiblePeriodStartDates(overview.forecast.dailyProbabilities, today)
        : new Set<string>(),
    [overview.forecast, today],
  );
  const mostLikelyStart = overview.forecast?.mostLikelyDate ?? null;
  const filtersActive = activeFilters.length > 0;
  const weekStartsOn = locale === "es" ? 1 : 0;
  const cells = monthCells(year, month, weekStartsOn);
  const labels = weekdayLabels(locale, weekStartsOn);
  const monthTitle = formatIsoUtc(new Date(Date.UTC(year, month - 1, 1)).toISOString().slice(0, 10), locale, {
    month: "long",
    year: "numeric",
  });
  const greetingDate = formatIsoUtc(today, locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const filterActiveLabel = t.filterSymptomsActive.replace("{count}", String(activeFilters.length));
  const filterIdleLabel = t.filterSymptoms;
  const filterLabel = filtersActive ? filterActiveLabel : filterIdleLabel;

  function shiftMonth(delta: number) {
    const next = new Date(Date.UTC(year, month - 1 + delta, 1));
    setYear(next.getUTCFullYear());
    setMonth(next.getUTCMonth() + 1);
  }

  function openDay(iso: string) {
    if (!isEditableDiaryDate(iso, today)) return;
    setError(null);
    setActiveIso(iso);
    setSheetOpen(true);
  }

  useEffect(() => {
    if (!searchParams.get("day")) return;
    router.replace("/", { scroll: false });
  }, [router, searchParams]);

  const closeSheet = useCallback(() => {
    if (saving) return;
    setSheetOpen(false);
  }, [saving]);

  const handleSheetExited = useCallback(() => {
    setActiveIso(null);
    setError(null);
  }, []);

  const closeFilter = useCallback(() => {
    setFilterOpen(false);
  }, []);

  const handleFilterExited = useCallback(() => {
    setFilterPresent(false);
  }, []);

  function openFilter() {
    setFilterPresent(true);
    setFilterOpen(true);
  }

  async function saveDay(log: DayLog) {
    if (!activeIso || !isEditableDiaryDate(activeIso, today)) return;
    try {
      setSaving(true);
      await persistDiary(upsertDay(diary, activeIso, log));
      setError(null);
      setSaving(false);
      setSheetOpen(false);
    } catch {
      setError(t.errorGeneric);
      setSaving(false);
    }
  }

  async function updateSymptomPreferences(
    favoriteSymptomIds: SymptomId[],
    customSymptoms: CustomSymptomDefinition[],
  ) {
    try {
      setSaving(true);
      await persistDiary({ ...diary, favoriteSymptomIds, customSymptoms });
      setActiveFilters((current) =>
        current.filter((id) => !id.startsWith("custom-") || customSymptoms.some((item) => item.id === id)),
      );
      setError(null);
    } catch {
      setError(t.errorGeneric);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <header className="animate-fade-up">
        <p className="text-sm font-medium text-muted-foreground capitalize">{greetingDate}</p>
      </header>

      <CycleStatusCard
        overview={overview}
        today={today}
        locale={locale}
        t={t}
        visualSeasons={visualSeasons}
      />

      <section
        className="animate-fade-up rounded-3xl bg-card p-4 shadow-sm"
        style={{ animationDelay: "120ms" }}
      >
        <div className="mb-3 flex flex-col gap-2 px-1 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
          <h2 className="whitespace-nowrap font-serif text-lg capitalize text-card-foreground">{monthTitle}</h2>
          <div className="flex shrink-0 justify-end gap-1">
            {lunarPhasesEnabled ? (
              <button
                type="button"
                onClick={() => setLunarPhasesVisible(!lunarPhasesVisible)}
                aria-label={lunarPhasesVisible ? t.hideLunarPhases : t.toggleLunarPhases}
                aria-pressed={lunarPhasesVisible}
                className={cn(
                  "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  "transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "motion-reduce:transition-none active:scale-90",
                  lunarPhasesVisible
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Moon className="size-4 shrink-0" aria-hidden />
              </button>
            ) : null}
            <button
              type="button"
              onClick={openFilter}
              aria-label={filterLabel}
              aria-pressed={filtersActive}
              className={cn(
                "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full px-3 text-sm font-semibold",
                "transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "motion-reduce:transition-none active:scale-90",
                filtersActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Filter className="size-4 shrink-0" aria-hidden />
              <span className="flex items-center overflow-hidden leading-none">
                <span
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    filtersActive ? "max-w-0 -translate-y-0.5 opacity-0" : "max-w-[9.5rem] translate-y-0 opacity-100",
                  )}
                  aria-hidden={filtersActive}
                >
                  <span className="block whitespace-nowrap pr-0">{filterIdleLabel}</span>
                </span>
                <span
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    filtersActive ? "max-w-[5.75rem] translate-y-0 opacity-100" : "max-w-0 translate-y-0.5 opacity-0",
                  )}
                  aria-hidden={!filtersActive}
                >
                  <span className="block whitespace-nowrap">{filterActiveLabel}</span>
                </span>
              </span>
            </button>
            <NavButton label={t.prevMonth} onClick={() => shiftMonth(-1)}>
              <ChevronLeft className="size-5" />
            </NavButton>
            <NavButton label={t.nextMonth} onClick={() => shiftMonth(1)}>
              <ChevronRight className="size-5" />
            </NavButton>
          </div>
        </div>
        <div className="mb-1 grid grid-cols-7">
          {labels.map((label, index) => (
            <div key={`${label}-${index}`} className="py-1 text-center text-xs font-semibold text-muted-foreground">
              {label}
            </div>
          ))}
        </div>
        <div
          key={`${year}-${month}`}
          className={cn(
            "grid grid-cols-7 transition-[row-gap] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            filtersActive || showMoonBand ? "gap-y-2" : "gap-y-1",
          )}
        >
          {cells.map((iso, index) => {
            if (!iso) return <div key={`empty-${index}`} />;
            const log = diary.days[iso];
            const editable = isEditableDiaryDate(iso, today);
            const filterMatches = matchingFilterSymptoms(log, activeFilters);
            return (
              <DayCell
                key={iso}
                iso={iso}
                day={Number(iso.slice(8, 10))}
                log={log}
                isToday={iso === today}
                isFuture={!editable}
                possibleStart={overview.forecastingEnabled && possibleStarts.has(iso)}
                mostLikelyStart={overview.forecastingEnabled && mostLikelyStart === iso}
                estimatedFertile={
                  overview.forecastingEnabled &&
                  isEstimatedFertileDate(iso, diary.periodStarts, overview.nextPeriodDate)
                }
                estimatedBleeding={
                  overview.forecastingEnabled &&
                  isEstimatedBleedingDate(iso, overview.expectedBleedingWindow)
                }
                filtersActive={filtersActive}
                filterMatches={filterMatches}
                showMoon={showMoonBand}
                index={index}
                locale={locale}
                t={t}
                customSymptoms={diary.customSymptoms}
                onClick={() => openDay(iso)}
              />
            );
          })}
        </div>
      </section>

      <section
        className="animate-fade-up flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-xs text-muted-foreground"
        style={{ animationDelay: "180ms" }}
      >
        <LegendDot className="bg-bleed" label={t.legendBleeding} />
        {overview.forecastingEnabled ? (
          <>
            <LegendDot className="border border-dashed border-bleed bg-bleed/10" label={t.legendEstimatedBleeding} />
            <LegendDot className="bg-fertile" label={t.legendFertile} />
            <LegendDot className="border border-fertile bg-fertile/20" label={t.legendFertileWindow} />
            <LegendDot className="bg-primary" label={t.legendMostLikelyStart} />
            <LegendDot className="bg-primary/40" label={t.legendPossibleStart} />
          </>
        ) : (
          <LegendDot className="bg-fertile" label={t.legendFertile} />
        )}
        {filtersActive
          ? activeFilters.map((id) => {
              const meta = symptomMeta(id, diary.customSymptoms);
              return (
                <LegendDot
                  key={id}
                  className="border border-transparent"
                  style={{ backgroundColor: meta.color }}
                  label={symptomLabel(meta, t)}
                />
              );
            })
          : (
            <LegendDot className="bg-secondary-foreground/50" label={t.legendSymptoms} />
          )}
        <LegendDot className="bg-primary/70" label={t.legendNote} />
      </section>

      <p
        className="animate-fade-up flex items-center justify-center gap-1.5 text-sm text-muted-foreground"
        style={{ animationDelay: "220ms" }}
      >
        <Plus className="size-4" />
        {t.tapToLog}
      </p>

      <DaySheet
        open={sheetOpen}
        iso={activeIso}
        log={activeIso ? diary.days[activeIso] : undefined}
        locale={locale}
        t={t}
        favoriteSymptomIds={diary.favoriteSymptomIds}
        customSymptoms={diary.customSymptoms}
        saving={saving}
        error={error}
        onClose={closeSheet}
        onExited={handleSheetExited}
        onSave={(log) => saveDay(log)}
        onUpdateSymptomPreferences={updateSymptomPreferences}
      />

      <SymptomFilterSheet
        open={filterOpen}
        present={filterPresent}
        selected={activeFilters}
        favoriteSymptomIds={diary.favoriteSymptomIds}
        customSymptoms={diary.customSymptoms}
        t={t}
        onClose={closeFilter}
        onExited={handleFilterExited}
        onApply={setActiveFilters}
        onUpdateFavorites={(favoriteSymptomIds) =>
          updateSymptomPreferences(favoriteSymptomIds, diary.customSymptoms)
        }
      />
    </div>
  );
}

function DayCell({
  iso,
  day,
  log,
  isToday,
  isFuture,
  possibleStart,
  mostLikelyStart,
  estimatedFertile,
  estimatedBleeding,
  filtersActive,
  filterMatches,
  showMoon,
  index,
  locale,
  t,
  customSymptoms,
  onClick,
}: {
  iso: string;
  day: number;
  log: DayLog | undefined;
  isToday: boolean;
  isFuture: boolean;
  possibleStart: boolean;
  mostLikelyStart: boolean;
  estimatedFertile: boolean;
  estimatedBleeding: boolean;
  filtersActive: boolean;
  filterMatches: SymptomId[];
  showMoon: boolean;
  index: number;
  locale: Locale;
  t: Messages;
  customSymptoms: CustomSymptomDefinition[];
  onClick: () => void;
}) {
  const bleeding = log?.flow;
  const observedFertile = log?.cervicalMucus === "eggwhite";
  const symptoms = hasSymptoms(log);
  const note = hasNote(log);
  const showGenericSymptomDot = symptoms && !filtersActive;
  const showFilterDots = filtersActive && filterMatches.length > 0;
  const moonInfo = showMoon ? lunarDayInfo(iso) : null;
  const moonLabel = showMoon ? moonPhaseAccessibleLabel(iso, t) : null;
  const bleedFill =
    bleeding === "heavy"
      ? "bg-bleed text-bleed-foreground"
      : bleeding === "medium"
        ? "bg-bleed/80 text-bleed-foreground"
        : bleeding === "light"
          ? "bg-bleed/60 text-bleed-foreground"
          : bleeding === "spotting"
            ? "bg-bleed/40 text-bleed-foreground"
            : null;

  const probabilityFill = mostLikelyStart
    ? "bg-primary text-primary-foreground"
    : possibleStart
      ? "bg-primary/40 text-primary"
      : null;

  const markers = [
    formatIsoUtc(iso, locale, { month: "long", day: "numeric" }),
    isFuture ? t.futureDayDisabled : null,
    moonLabel,
    bleeding ? t.legendBleeding : null,
    observedFertile ? t.legendFertile : null,
    !bleeding && mostLikelyStart ? t.legendMostLikelyStart : null,
    !bleeding && !mostLikelyStart && possibleStart ? t.legendPossibleStart : null,
    !bleeding && estimatedBleeding ? t.legendEstimatedBleeding : null,
    !bleeding && estimatedFertile ? t.legendFertileWindow : null,
    showGenericSymptomDot ? t.legendSymptoms : null,
    note ? t.legendNote : null,
    ...filterMatches.map((id) => symptomLabel(symptomMeta(id, customSymptoms), t)),
  ].filter(Boolean);

  return (
    <div
      className={cn(
        "flex flex-col items-center transition-[min-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        filtersActive || showMoon ? "min-h-14" : "min-h-10",
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          showMoon
            ? "mb-0.5 h-4 translate-y-0 scale-100 opacity-100"
            : "mb-0 h-0 -translate-y-1 scale-90 opacity-0",
        )}
        aria-hidden={!showMoon}
      >
        {moonInfo && moonLabel ? <MoonPhaseIcon info={moonInfo} label={moonLabel} /> : null}
      </span>
      <button
        type="button"
        onClick={onClick}
        disabled={isFuture}
        aria-disabled={isFuture}
        aria-label={markers.join(", ")}
        className={cn(
          "animate-pop-in relative flex size-10 flex-col items-center justify-center rounded-full text-sm font-medium",
          isFuture ? "cursor-default" : "transition-transform active:scale-90",
          bleedFill ??
            (observedFertile
              ? "bg-fertile text-fertile-foreground"
              : probabilityFill
                ? probabilityFill
                : estimatedBleeding
                  ? "border-2 border-dashed border-bleed bg-bleed/10 text-bleed"
                  : estimatedFertile
                    ? "bg-fertile/20 text-fertile-foreground ring-1 ring-inset ring-fertile/50"
                    : isFuture
                      ? "text-muted-foreground/50"
                      : "text-card-foreground hover:bg-muted"),
          !bleeding && estimatedBleeding && (mostLikelyStart || possibleStart)
            ? "border-2 border-dashed border-bleed"
            : null,
          isToday && !bleeding && "ring-2 ring-primary ring-offset-1 ring-offset-card",
        )}
        style={{ animationDelay: `${Math.min(index * 12, 320)}ms` }}
      >
        {day}
        <span className="absolute bottom-1 flex gap-0.5">
          {observedFertile && !bleeding ? <Sparkles className="size-2 text-fertile-foreground" /> : null}
          {showGenericSymptomDot ? (
            <span
              className={cn(
                "size-1 rounded-full",
                bleeding ? "bg-bleed-foreground/80" : "bg-secondary-foreground/60",
              )}
            />
          ) : null}
          {note ? (
            <span
              className={cn(
                "size-1 rounded-full",
                bleeding ? "bg-bleed-foreground" : "bg-primary/80",
              )}
            />
          ) : null}
        </span>
      </button>
      <span
        className={cn(
          "flex max-w-10 flex-wrap justify-center gap-0.5 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          filtersActive
            ? "mt-0.5 max-h-3 translate-y-0 scale-100 opacity-100"
            : "mt-0 max-h-0 -translate-y-1 scale-90 opacity-0",
        )}
        aria-hidden
      >
        {showFilterDots
          ? filterMatches.slice(0, 4).map((id) => (
              <span
                key={id}
                className="size-1.5 rounded-full"
                style={{ backgroundColor: symptomColor(id, customSymptoms) }}
              />
            ))
          : (
            <span className="size-1.5 rounded-full opacity-0" />
          )}
      </span>
    </div>
  );
}

function NavButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
    >
      {children}
    </button>
  );
}

function LegendDot({
  className,
  label,
  style,
}: {
  className: string;
  label: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("size-2.5 rounded-full", className)} style={style} />
      {label}
    </span>
  );
}
