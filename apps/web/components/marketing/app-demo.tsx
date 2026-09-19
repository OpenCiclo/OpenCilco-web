// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Droplet,
  Lightbulb,
  LineChart,
  Moon,
  RotateCcw,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

import {
  isEstimatedBleedingDate,
  isEstimatedFertileDate,
  possiblePeriodStartDates,
} from "@/lib/cycle/calendar-markers";
import { cycleOverview, phaseBody, phaseLabel } from "@/lib/cycle/phases";
import {
  addDaysIso,
  emptyDayLog,
  emptyDiary,
  hasNote,
  hasSymptoms,
  monthCells,
  todayIsoUtc,
  weekdayLabels,
  type DayLog,
  type Diary,
  type FlowLevel,
  type SymptomId,
} from "@/lib/diary";
import { formatIsoUtc } from "@/lib/format-date";
import { messages, type Locale } from "@/lib/i18n";
import { LEARN_ARTICLES, articleCopy, type LearnCategory } from "@/lib/learn/articles";
import { lunarDayInfo } from "@/lib/lunar/phases";
import { patternStats } from "@/lib/patterns/stats";
import { buildTipContext } from "@/lib/tips/context";
import { selectTips } from "@/lib/tips/rules";
import { findSymptomMeta, resolveSymptomCatalog, symptomLabel } from "@/lib/symptoms/catalog";
import { quickSymptomCatalog, toggleLoggedSymptom } from "@/lib/symptoms/selection";
import { cn } from "@/lib/utils";
import { MoonPhaseIcon } from "@/components/calendar/moon-phase-icon";

/**
 * Builds a realistic sample diary (five ~28-day cycles) so the demo drives
 * the same forecasting, pattern-stats and tips engines used by the real app —
 * no screenshots, just the app's own logic fed with fixture data instead of
 * an encrypted wallet.
 */
function buildSampleDiary(locale: Locale, today: string): Diary {
  const base = emptyDiary(locale);
  const lastStart = addDaysIso(today, -13);
  const periodStarts = [
    addDaysIso(lastStart, -113),
    addDaysIso(lastStart, -85),
    addDaysIso(lastStart, -56),
    addDaysIso(lastStart, -28),
    lastStart,
  ];
  const days: Record<string, DayLog> = {};
  for (const start of periodStarts) {
    days[start] = { flow: "medium", symptoms: { cramps: "mild" } };
    days[addDaysIso(start, 1)] = { flow: "heavy", symptoms: { cramps: "moderate", fatigue: "mild" } };
    days[addDaysIso(start, 2)] = { flow: "light", symptoms: { fatigue: "mild" } };
    days[addDaysIso(start, 3)] = { flow: "spotting", symptoms: {} };
    days[addDaysIso(start, 12)] = { symptoms: { cramps: "mild", bloating: "mild" } };
    days[addDaysIso(start, 22)] = { symptoms: { moodSwings: "moderate", cravings: "mild" } };
  }
  days[lastStart] = {
    flow: "medium",
    symptoms: { cramps: "moderate" },
    note:
      locale === "es"
        ? "Día tranquilo. Menos cólicos que el mes pasado."
        : "Calm day. Fewer cramps than last month.",
  };
  return { ...base, periodStarts, days };
}

const FLOW_LEVELS: FlowLevel[] = ["spotting", "light", "medium", "heavy"];
const FLOW_DOTS: Record<FlowLevel, number> = { spotting: 1, light: 1, medium: 2, heavy: 3 };
const FLOW_LABELS: Record<FlowLevel, keyof (typeof messages)["es"]> = {
  spotting: "flowSpotting",
  light: "flowLight",
  medium: "flowMedium",
  heavy: "flowHeavy",
};

const TILE_TONE = {
  primary: "bg-primary text-primary-foreground",
  bleed: "bg-bleed text-bleed-foreground",
  fertile: "bg-fertile/20 text-fertile-foreground",
  accent: "bg-accent text-accent-foreground",
} as const;

const TIP_TONE = {
  primary: "border-primary/25 bg-primary/8",
  fertile: "border-fertile/30 bg-fertile/10",
  accent: "border-accent-foreground/15 bg-accent/40",
} as const;

const CATEGORY_LABELS: Record<LearnCategory, { es: string; en: string }> = {
  cycle: { es: "Ciclo", en: "Cycle" },
  symptoms: { es: "Síntomas", en: "Symptoms" },
  mucus: { es: "Moco cervical", en: "Cervical mucus" },
  care: { es: "Cuándo consultar", en: "When to seek care" },
};

type Tab = "calendar" | "patterns" | "learn" | "settings";

export function AppDemo({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const today = useMemo(() => todayIsoUtc(), []);
  const sample = useMemo(() => buildSampleDiary(locale, today), [locale, today]);
  const [overrides, setOverrides] = useState<Record<string, DayLog>>({});
  const [forecasting, setForecasting] = useState(true);
  const [seasons, setSeasons] = useState(true);
  const diary = useMemo<Diary>(
    () => ({
      ...sample,
      days: { ...sample.days, ...overrides },
      forecastingEnabled: forecasting,
    }),
    [sample, overrides, forecasting],
  );
  const overview = useMemo(() => cycleOverview(diary, today), [diary, today]);
  const stats = useMemo(() => patternStats(diary, today), [diary, today]);
  const tips = useMemo(() => selectTips(buildTipContext(diary, today), t), [diary, today, t]);
  const catalog = useMemo(() => resolveSymptomCatalog(diary.customSymptoms), [diary.customSymptoms]);

  const [selected, setSelected] = useState<string | null>(today);
  const [tab, setTab] = useState<Tab>("calendar");
  const [showMoon, setShowMoon] = useState(false);
  const [editingIso, setEditingIso] = useState<string | null>(null);
  const [draft, setDraft] = useState<DayLog>(() => emptyDayLog());

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
  const quickCatalog = useMemo(
    () => quickSymptomCatalog(catalog, diary.favoriteSymptomIds, draft.symptoms),
    [catalog, diary.favoriteSymptomIds, draft.symptoms],
  );

  const history = stats.completedCycles;
  const maxLen = Math.max(35, ...history.map((cycle) => cycle.length));

  function describeDay(iso: string): string | null {
    const log = diary.days[iso];
    if (log?.flow) return t.legendBleeding;
    if (hasSymptoms(log)) return t.legendSymptoms;
    if (!overview.forecastingEnabled) return null;
    if (mostLikelyStart === iso) return t.legendMostLikelyStart;
    if (possibleStarts.has(iso)) return t.legendPossibleStart;
    if (isEstimatedBleedingDate(iso, overview.expectedBleedingWindow)) return t.legendEstimatedBleeding;
    if (isEstimatedFertileDate(iso, diary.periodStarts, overview.nextPeriodDate)) return t.legendFertileWindow;
    return null;
  }

  function openEditor(iso: string) {
    setSelected(iso);
    setDraft(diary.days[iso] ? { ...diary.days[iso], symptoms: { ...diary.days[iso].symptoms } } : emptyDayLog());
    setEditingIso(iso);
  }

  function saveDraft() {
    if (!editingIso) return;
    setOverrides((current) => ({ ...current, [editingIso]: draft }));
    setEditingIso(null);
  }

  function toggleFlow(value: FlowLevel) {
    setDraft((current) => ({ ...current, flow: current.flow === value ? undefined : value }));
  }

  function toggleSymptom(id: SymptomId) {
    setDraft((current) => ({ ...current, symptoms: toggleLoggedSymptom(current.symptoms, id, catalog) }));
  }

  const selectedInfo = selected ? describeDay(selected) : null;

  const tabs: { id: Tab; label: string; icon: typeof CalendarDays }[] = [
    { id: "calendar", label: t.calendar, icon: CalendarDays },
    { id: "patterns", label: t.patterns, icon: LineChart },
    { id: "learn", label: t.learn, icon: BookOpen },
    { id: "settings", label: t.settings, icon: Settings },
  ];

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
      <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[2.1rem] bg-background">
        <div className="flex items-center justify-between px-4 pt-6 pb-1">
          <span className="font-serif text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            {t.appName}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowMoon((value) => !value)}
              aria-label={t.lunarPhases}
              aria-pressed={showMoon}
              className={cn(
                "flex size-6 items-center justify-center rounded-full transition-colors",
                showMoon ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              <Moon className="size-3.5" aria-hidden />
            </button>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-semibold text-muted-foreground">
              Demo
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          {tab === "calendar" ? (
            <CalendarTab
              t={t}
              locale={locale}
              today={today}
              diary={diary}
              overview={overview}
              phase={phase}
              labels={labels}
              cells={cells}
              showMoon={showMoon}
              selected={selected}
              selectedInfo={selectedInfo}
              possibleStarts={possibleStarts}
              mostLikelyStart={mostLikelyStart}
              openEditor={openEditor}
            />
          ) : tab === "patterns" ? (
            <PatternsTab
              t={t}
              locale={locale}
              stats={stats}
              tips={tips}
              diary={diary}
              history={history}
              maxLen={maxLen}
            />
          ) : tab === "learn" ? (
            <LearnTab t={t} locale={locale} />
          ) : (
            <SettingsTab
              t={t}
              locale={locale}
              seasons={seasons}
              setSeasons={setSeasons}
              forecasting={forecasting}
              setForecasting={setForecasting}
              showMoon={showMoon}
              setShowMoon={setShowMoon}
            />
          )}
        </div>

        <div className="grid grid-cols-4 gap-0.5 border-t border-border px-2 py-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[8.5px] font-semibold transition-colors",
                tab === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>

        {editingIso ? (
          <div className="absolute inset-0 z-20 flex items-end">
            <button
              type="button"
              aria-label={t.close}
              onClick={() => setEditingIso(null)}
              className="absolute inset-0 bg-foreground/30"
            />
            <div className="relative flex max-h-[85%] w-full flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl">
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <p className="font-serif text-sm capitalize text-card-foreground">
                  {formatIsoUtc(editingIso, locale, { weekday: "short", month: "long", day: "numeric" })}
                </p>
                <button
                  type="button"
                  onClick={() => setEditingIso(null)}
                  aria-label={t.close}
                  className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-2">
                <p className="mb-1.5 flex items-center gap-1 text-[9px] font-bold tracking-wide text-card-foreground uppercase">
                  <Droplet className="size-3 text-bleed" /> {t.flow}
                </p>
                <div className="mb-3 grid grid-cols-4 gap-1.5">
                  {FLOW_LEVELS.map((level) => {
                    const active = draft.flow === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => toggleFlow(level)}
                        aria-pressed={active}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-xl border-2 py-2 transition-all active:scale-95",
                          active ? "border-bleed bg-bleed text-bleed-foreground" : "border-border bg-background text-muted-foreground",
                        )}
                      >
                        <span className="flex gap-0.5">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <Droplet
                              key={index}
                              className={cn(
                                "size-2.5",
                                index < FLOW_DOTS[level]
                                  ? active
                                    ? "fill-bleed-foreground text-bleed-foreground"
                                    : "fill-bleed text-bleed"
                                  : "opacity-25",
                              )}
                            />
                          ))}
                        </span>
                        <span className="text-[9px] font-semibold">{t[FLOW_LABELS[level]]}</span>
                      </button>
                    );
                  })}
                </div>

                <p className="mb-1.5 text-[9px] font-bold tracking-wide text-card-foreground uppercase">
                  {t.symptoms}
                </p>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {quickCatalog.map((item) => {
                    const active = Boolean(draft.symptoms[item.id]);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleSymptom(item.id)}
                        aria-pressed={active}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border-2 px-2.5 py-1.5 text-[10px] font-medium transition-all active:scale-95",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground",
                        )}
                      >
                        {item.emoji ? (
                          <span aria-hidden>{item.emoji}</span>
                        ) : (
                          <Icon className="size-3" aria-hidden />
                        )}
                        {symptomLabel(item, t)}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="border-t border-border px-4 py-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground active:scale-[0.98]"
                >
                  <Check className="size-3.5" /> {t.saveEntry}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type Messages = (typeof messages)["es"];

function CalendarTab({
  t,
  locale,
  today,
  diary,
  overview,
  phase,
  labels,
  cells,
  showMoon,
  selected,
  selectedInfo,
  possibleStarts,
  mostLikelyStart,
  openEditor,
}: {
  t: Messages;
  locale: Locale;
  today: string;
  diary: Diary;
  overview: ReturnType<typeof cycleOverview>;
  phase: ReturnType<typeof cycleOverview>["currentPhase"];
  labels: string[];
  cells: (string | null)[];
  showMoon: boolean;
  selected: string | null;
  selectedInfo: string | null;
  possibleStarts: Set<string>;
  mostLikelyStart: string | null;
  openEditor: (iso: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {phase ? (
        <div className="relative overflow-hidden rounded-2xl bg-primary p-3.5 text-primary-foreground">
          <div aria-hidden className="absolute -right-6 -top-8 size-24 rounded-full bg-primary-foreground/10" />
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
            <p className="mt-1 text-[11px] leading-snug text-pretty opacity-90">{phaseBody(phase.phase, t)}</p>
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
        <div className={cn("grid grid-cols-7", showMoon ? "gap-y-1.5" : "gap-y-0.5")}>
          {cells.map((iso, index) => {
            if (!iso) return <div key={`empty-${index}`} />;
            const log = diary.days[iso];
            const isToday = iso === today;
            const bleeding = log?.flow;
            const symptoms = hasSymptoms(log);
            const note = hasNote(log);
            const estFertile =
              overview.forecastingEnabled &&
              isEstimatedFertileDate(iso, diary.periodStarts, overview.nextPeriodDate);
            const estBleeding =
              overview.forecastingEnabled && isEstimatedBleedingDate(iso, overview.expectedBleedingWindow);
            const likelyStart = overview.forecastingEnabled && mostLikelyStart === iso;
            const possibleStart = overview.forecastingEnabled && possibleStarts.has(iso);
            const dayLabel = formatIsoUtc(iso, locale, { month: "long", day: "numeric" });
            const moonInfo = showMoon ? lunarDayInfo(iso) : null;

            return (
              <div key={iso} className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex items-center justify-center overflow-hidden transition-all",
                    showMoon ? "mb-0.5 h-3 opacity-100" : "h-0 opacity-0",
                  )}
                  aria-hidden
                >
                  {moonInfo ? <MoonPhaseIcon info={moonInfo} label="" className="size-3" /> : null}
                </span>
                <button
                  type="button"
                  onClick={() => openEditor(iso)}
                  aria-label={dayLabel}
                  aria-pressed={selected === iso}
                  className={cn(
                    "relative mx-auto flex size-7 items-center justify-center rounded-full text-[10px] font-medium transition-transform active:scale-90",
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
                    isToday && !bleeding ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : null,
                    selected === iso ? "outline outline-2 outline-offset-2 outline-primary/40" : null,
                  )}
                >
                  {Number(iso.slice(8, 10))}
                  <span className="absolute -bottom-0.5 flex gap-0.5">
                    {symptoms ? (
                      <span
                        className={cn(
                          "size-1 rounded-full",
                          bleeding ? "bg-bleed-foreground/80" : "bg-secondary-foreground/60",
                        )}
                      />
                    ) : null}
                    {note ? (
                      <span className={cn("size-1 rounded-full", bleeding ? "bg-bleed-foreground" : "bg-primary/80")} />
                    ) : null}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] text-muted-foreground">
        <LegendDot className="bg-bleed" label={t.legendBleeding} />
        <LegendDot className="bg-fertile/40" label={t.legendFertileWindow} />
        <LegendDot className="bg-primary" label={t.legendMostLikelyStart} />
      </div>

      {selected ? (
        <button
          type="button"
          onClick={() => openEditor(selected)}
          className="flex items-center gap-1.5 rounded-xl bg-muted px-2.5 py-1.5 text-left text-[10px] font-medium text-muted-foreground transition-transform active:scale-[0.98]"
        >
          <Sparkles className="size-3 shrink-0 text-primary" aria-hidden />
          <span className="capitalize">{formatIsoUtc(selected, locale, { month: "long", day: "numeric" })}</span>
          {selectedInfo ? <span>· {selectedInfo}</span> : null}
          <span className="ml-auto shrink-0 text-primary">{locale === "es" ? "Editar" : "Edit"}</span>
        </button>
      ) : null}
    </div>
  );
}

function PatternsTab({
  t,
  locale,
  stats,
  tips,
  diary,
  history,
  maxLen,
}: {
  t: Messages;
  locale: Locale;
  stats: ReturnType<typeof patternStats>;
  tips: ReturnType<typeof selectTips>;
  diary: Diary;
  history: ReturnType<typeof patternStats>["completedCycles"];
  maxLen: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <StatTile
          value={stats.avgCycleLength ?? "—"}
          unit={t.days}
          label={t.avgCycleLength}
          icon={<RotateCcw className="size-3.5" />}
          tone="primary"
        />
        <StatTile
          value={stats.avgPeriodLength ?? "—"}
          unit={t.days}
          label={t.avgPeriodLength}
          icon={<Droplet className="size-3.5" />}
          tone="bleed"
        />
        <StatTile
          value={stats.currentCycleDay ?? "—"}
          unit=""
          label={t.currentCycleDayLabel}
          icon={<CalendarDays className="size-3.5" />}
          tone="fertile"
        />
        {stats.forecastingEnabled ? (
          <StatTile
            value={stats.nextPeriodInDays ?? "—"}
            unit={t.days}
            label={t.untilNextPeriod}
            icon={<CalendarDays className="size-3.5" />}
            tone="accent"
          />
        ) : stats.periodLengthRange ? (
          <StatTile
            value={`${stats.periodLengthRange.min}–${stats.periodLengthRange.max}`}
            unit={t.days}
            label={t.periodLengthRange}
            icon={<Droplet className="size-3.5" />}
            tone="accent"
          />
        ) : null}
      </div>

      {history.length > 0 ? (
        <div className="rounded-2xl bg-card p-3 shadow-sm">
          <p className="font-serif text-sm text-card-foreground">{t.cycleLengthOverTime}</p>
          <p className="mb-2 text-[9px] text-muted-foreground">
            {t.lastCompletedCycles.replace("{n}", String(history.length))}
          </p>
          <div className="flex items-stretch justify-between gap-1.5" style={{ height: "92px" }}>
            {history.map((cycle) => {
              const heightPct = (cycle.length / maxLen) * 100;
              return (
                <div key={cycle.start} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-[9px] font-semibold text-card-foreground">{cycle.length}</span>
                  <div className="flex w-full flex-1 items-end">
                    <div className="w-full rounded-t-md bg-primary" style={{ height: `${heightPct}%` }} />
                  </div>
                  <span className="text-[8px] font-medium text-muted-foreground">
                    {formatIsoUtc(cycle.start, locale, { month: "short" })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {stats.recurringSymptoms.length > 0 ? (
        <div className="rounded-2xl bg-card p-3 shadow-sm">
          <p className="font-serif text-sm text-card-foreground">{t.recurringSymptoms}</p>
          <p className="mb-2 text-[9px] text-muted-foreground text-pretty">{t.recurringSymptomsHint}</p>
          <div className="flex flex-col gap-2">
            {stats.recurringSymptoms.slice(0, 4).map((item) => {
              const meta = findSymptomMeta(item.id, diary.customSymptoms);
              const Icon = meta?.icon ?? Droplet;
              return (
                <div key={item.id} className="flex items-center gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    {meta?.emoji ? (
                      <span className="text-[10px]" aria-hidden>
                        {meta.emoji}
                      </span>
                    ) : (
                      <Icon className="size-3" />
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="mb-0.5 flex items-center justify-between gap-1">
                      <span className="text-[10px] font-medium text-card-foreground">
                        {meta ? symptomLabel(meta, t) : item.id}
                      </span>
                      <span className="text-[8px] font-semibold text-muted-foreground">
                        {t.symptomCycleCount
                          .replace("{cycles}", String(item.cycleCount))
                          .replace("{total}", String(item.cycleTotal))}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-chart-2"
                        style={{ width: `${Math.max(10, item.ratio * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {tips.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="size-3.5 text-primary" />
            <p className="font-serif text-sm text-foreground">{t.personalizedTips}</p>
          </div>
          {tips.map((tip) => (
            <article key={tip.id} className={cn("rounded-2xl border p-3", TIP_TONE[tip.tone])}>
              <h3 className="text-[11px] font-semibold text-card-foreground text-pretty">{tip.title}</h3>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground text-pretty">{tip.body}</p>
            </article>
          ))}
        </div>
      ) : null}

      <p className="px-1 text-center text-[9px] leading-relaxed text-muted-foreground text-pretty">
        {t.tipsDisclaimer}
      </p>
    </div>
  );
}

function LearnTab({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div>
        <p className="font-serif text-base text-foreground">{t.learn}</p>
        <p className="text-[10px] leading-relaxed text-muted-foreground text-pretty">
          {locale === "es"
            ? "Guías breves con fuentes citadas. Educación, no diagnóstico."
            : "Short, source-cited guides. Education, not diagnosis."}
        </p>
      </div>
      {LEARN_ARTICLES.map((article) => {
        const copy = articleCopy(article, locale);
        return (
          <div key={article.slug} className="rounded-2xl bg-card p-3 shadow-sm">
            <span className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-[8px] font-semibold text-secondary-foreground uppercase">
              {CATEGORY_LABELS[article.category][locale]}
            </span>
            <p className="mt-1.5 font-serif text-[13px] leading-tight text-card-foreground">{copy.title}</p>
            <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground text-pretty">{copy.summary}</p>
            <span className="mt-1.5 inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary">
              {locale === "es" ? "Leer" : "Read"}
              <ChevronRight className="size-3" aria-hidden />
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SettingsTab({
  t,
  locale,
  seasons,
  setSeasons,
  forecasting,
  setForecasting,
  showMoon,
  setShowMoon,
}: {
  t: Messages;
  locale: Locale;
  seasons: boolean;
  setSeasons: (value: boolean) => void;
  forecasting: boolean;
  setForecasting: (value: boolean) => void;
  showMoon: boolean;
  setShowMoon: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="rounded-2xl bg-card p-1 shadow-sm">
        <div className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2">
          <span className="text-[11px] font-semibold text-card-foreground">{t.language}</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            {locale.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-card p-2 shadow-sm">
        <ToggleRow
          label={t.visualSeasons}
          hint={t.visualSeasonsHint}
          checked={seasons}
          onChange={setSeasons}
        />
        <ToggleRow
          label={t.forecastingEnabled}
          hint={t.forecastingEnabledHint}
          checked={forecasting}
          onChange={setForecasting}
        />
        <ToggleRow
          label={t.lunarPhases}
          hint={t.lunarPhasesHint}
          checked={showMoon}
          onChange={setShowMoon}
        />
      </div>

      <div className="flex flex-col gap-1.5 rounded-2xl bg-card p-3 shadow-sm">
        <span className="text-[11px] font-medium text-primary">{t.privacy}</span>
        <span className="text-[11px] font-medium text-primary">{t.helpDocs}</span>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3">
        <p className="text-[9px] leading-relaxed text-muted-foreground text-pretty">
          {locale === "es"
            ? "Tu diario se cifra en tu dispositivo. Exporta o importa tus datos cuando quieras."
            : "Your diary is encrypted on your device. Export or import your data whenever you want."}
        </p>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-2 text-left"
    >
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold text-card-foreground">{label}</span>
        <span className="mt-0.5 block text-[9px] leading-snug text-muted-foreground text-pretty">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors",
          checked ? "bg-primary" : "bg-muted-foreground/30",
        )}
      >
        <span
          className={cn(
            "block size-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

function StatTile({
  value,
  unit,
  label,
  icon,
  tone,
}: {
  value: number | string;
  unit: string;
  label: string;
  icon: React.ReactNode;
  tone: keyof typeof TILE_TONE;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-card p-3 shadow-sm">
      <span className={cn("mb-2 flex size-7 items-center justify-center rounded-lg", TILE_TONE[tone])}>{icon}</span>
      <div>
        <p className="font-serif text-xl leading-none text-card-foreground">
          {value}
          {unit ? <span className="ml-1 font-sans text-[10px] text-muted-foreground">{unit}</span> : null}
        </p>
        <p className="mt-0.5 text-[9px] font-medium text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={cn("size-1.5 rounded-full", className)} />
      {label}
    </span>
  );
}
