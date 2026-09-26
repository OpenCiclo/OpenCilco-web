// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronRight, Droplet, Lightbulb, PenLine, RotateCcw } from "lucide-react";

import { useCiclo } from "@/lib/client/ciclo-context";
import { formatIsoUtc } from "@/lib/format-date";
import { todayIsoUtc } from "@/lib/diary";
import { patternStats } from "@/lib/patterns/stats";
import { findSymptomMeta, symptomLabel } from "@/lib/symptoms/catalog";
import { buildTipContext } from "@/lib/tips/context";
import { selectTips } from "@/lib/tips/rules";
import { similarJournalEntries, listJournalEntries, type JournalEntry } from "@/lib/journal/entries";
import { phaseLabel } from "@/lib/cycle/phases";
import { nextPeriodStat } from "@/lib/cycle/period-timing";
import { AppShell } from "@/components/app-shell";
import { ForecastCard } from "@/components/forecast-card";
import { NoteViewer } from "@/components/journal/note-viewer";
import { cn } from "@/lib/utils";

const TONE_MAP = {
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

export default function PatternsPage() {
  const { t, diary, wallet, locale } = useCiclo();
  const today = todayIsoUtc();
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [closing, setClosing] = useState(false);
  const stats = useMemo(() => patternStats(diary, today), [diary, today]);
  const tips = useMemo(() => selectTips(buildTipContext(diary), t), [diary, t]);
  const allNotes = useMemo(
    () => listJournalEntries(diary, stats.nextPeriodDate),
    [diary, stats.nextPeriodDate],
  );
  const similarNotes = useMemo(
    () => similarJournalEntries(diary, today, stats.nextPeriodDate, 5),
    [diary, today, stats.nextPeriodDate],
  );
  const history = stats.completedCycles;
  const maxLen = Math.max(35, ...history.map((cycle) => cycle.length));
  const periodStat = nextPeriodStat(stats.nextPeriodInDays, t);

  const closeViewer = useCallback(() => {
    if (!activeEntry || closing) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveEntry(null);
      setClosing(false);
      return;
    }
    setClosing(true);
  }, [activeEntry, closing]);

  const handleViewerExited = useCallback(() => {
    setActiveEntry(null);
    setClosing(false);
  }, []);

  if (!wallet) {
    return (
      <AppShell>
        <p>{t.unlockTitle}</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-5 pb-4">
        {stats.forecastingEnabled ? (
          <section className="animate-fade-up">
            <h2 className="mb-3 font-serif text-xl text-foreground">{t.forecastSection}</h2>
            <ForecastCard />
          </section>
        ) : null}

        <section className="animate-fade-up" style={{ animationDelay: "60ms" }}>
          <h2 className="mb-3 font-serif text-xl text-foreground">{t.patterns}</h2>
          {stats.avgCycleLength === null && history.length === 0 && stats.currentCycleDay === null ? (
            <p className="text-sm text-muted-foreground">{t.noPatternsYet}</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
            <StatTile
              value={stats.avgCycleLength ?? "—"}
              unit={t.days}
              label={t.avgCycleLength}
              icon={<RotateCcw className="size-4" />}
              tone="primary"
            />
            <StatTile
              value={stats.avgPeriodLength ?? "—"}
              unit={t.days}
              label={t.avgPeriodLength}
              icon={<Droplet className="size-4" />}
              tone="bleed"
            />
            <StatTile
              value={stats.currentCycleDay ?? "—"}
              unit=""
              label={t.currentCycleDayLabel}
              icon={<CalendarDays className="size-4" />}
              tone="fertile"
            />
            {stats.forecastingEnabled ? (
              <StatTile
                value={periodStat.value}
                unit={t.days}
                label={periodStat.label}
                icon={<CalendarDays className="size-4" />}
                tone="accent"
              />
            ) : stats.periodLengthRange ? (
              <StatTile
                value={`${stats.periodLengthRange.min}–${stats.periodLengthRange.max}`}
                unit={t.days}
                label={t.periodLengthRange}
                icon={<Droplet className="size-4" />}
                tone="accent"
              />
            ) : null}
            </div>
          )}
        </section>

        {history.length > 0 ? (
          <section
            className="animate-fade-up rounded-3xl bg-card p-5 shadow-sm"
            style={{ animationDelay: "120ms" }}
          >
            <h2 className="font-serif text-lg text-card-foreground">{t.cycleLengthOverTime}</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {t.lastCompletedCycles.replace("{n}", String(history.length))}
            </p>
            <div className="flex items-stretch justify-between gap-2" style={{ height: "150px" }}>
              {history.map((cycle, index) => {
                const heightPct = (cycle.length / maxLen) * 100;
                return (
                  <div key={cycle.start} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <span className="text-xs font-semibold text-card-foreground">{cycle.length}</span>
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="animate-grow-bar w-full rounded-t-xl bg-primary"
                        style={{ height: `${heightPct}%`, animationDelay: `${150 + index * 90}ms` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {formatIsoUtc(cycle.start, locale, { month: "short" })}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {stats.recurringSymptoms.length > 0 ? (
          <section
            className="animate-fade-up rounded-3xl bg-card p-5 shadow-sm"
            style={{ animationDelay: "180ms" }}
          >
            <h2 className="font-serif text-lg text-card-foreground">{t.recurringSymptoms}</h2>
            <p className="mb-4 text-sm text-muted-foreground">{t.recurringSymptomsHint}</p>
            <div className="flex flex-col gap-3.5">
              {stats.recurringSymptoms.map((item, index) => {
                const meta = findSymptomMeta(item.id, diary.customSymptoms);
                const Icon = meta?.icon ?? Droplet;
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      {meta?.emoji ? <span aria-hidden>{meta.emoji}</span> : <Icon className="size-4" />}
                    </span>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-card-foreground">
                          {meta ? symptomLabel(meta, t) : item.id}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {t.symptomCycleCount
                            .replace("{cycles}", String(item.cycleCount))
                            .replace("{total}", String(item.cycleTotal))}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="animate-grow-x h-full rounded-full bg-chart-2"
                          style={{
                            width: `${Math.max(8, item.ratio * 100)}%`,
                            animationDelay: `${200 + index * 80}ms`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="animate-fade-up flex flex-col gap-3" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-2 px-1">
            <PenLine className="size-5 text-primary" />
            <h2 className="font-serif text-xl text-foreground">{t.notesSimilarTitle}</h2>
          </div>
          <p className="px-1 text-sm text-muted-foreground text-pretty">{t.notesSimilarHint}</p>
          {similarNotes.length === 0 ? (
            <p className="rounded-3xl bg-card p-4 text-sm text-muted-foreground shadow-sm">
              {allNotes.length === 0 ? t.notesEmpty : t.notesSimilarEmpty}
            </p>
          ) : (
            similarNotes.map((entry, index) => {
              const dateLabel = formatIsoUtc(entry.iso, locale, {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const meta = [
                entry.cycleDay !== null
                  ? t.notesCycleDay.replace("{day}", String(entry.cycleDay))
                  : null,
                entry.phase ? phaseLabel(entry.phase, t) : null,
              ]
                .filter(Boolean)
                .join(" · ");
              return (
                <button
                  key={entry.iso}
                  type="button"
                  onClick={() => {
                    setClosing(false);
                    setActiveEntry(entry);
                  }}
                  className="animate-fade-up rounded-3xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.99]"
                  style={{ animationDelay: `${220 + index * 50}ms` }}
                >
                  <p className="text-sm font-semibold capitalize text-card-foreground">{dateLabel}</p>
                  {meta ? <p className="mt-0.5 text-xs text-muted-foreground">{meta}</p> : null}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty whitespace-pre-wrap">
                    {entry.note}
                  </p>
                </button>
              );
            })
          )}
          <Link
            href="/diary"
            className="inline-flex items-center justify-center gap-1 px-1 pt-1 text-sm font-semibold text-primary"
          >
            {t.notesViewAll}
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </section>

        {tips.length > 0 ? (
          <section className="animate-fade-up flex flex-col gap-3" style={{ animationDelay: "240ms" }}>
            <div className="flex items-center gap-2 px-1">
              <Lightbulb className="size-5 text-primary" />
              <h2 className="font-serif text-xl text-foreground">{t.personalizedTips}</h2>
            </div>
            {tips.map((tip, index) => (
              <article
                key={tip.id}
                className={cn("animate-fade-up rounded-3xl border p-4", TIP_TONE[tip.tone])}
                style={{ animationDelay: `${280 + index * 70}ms` }}
              >
                <h3 className="font-semibold text-card-foreground text-pretty">{tip.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{tip.body}</p>
              </article>
            ))}
          </section>
        ) : null}

        <p className="px-2 pt-1 text-center text-xs leading-relaxed text-muted-foreground text-pretty">
          {t.tipsDisclaimer}
        </p>
      </div>

      {activeEntry ? (
        <NoteViewer
          entry={activeEntry}
          log={diary.days[activeEntry.iso]}
          locale={locale}
          t={t}
          customSymptoms={diary.customSymptoms}
          closing={closing}
          onClose={closeViewer}
          onExited={handleViewerExited}
        />
      ) : null}
    </AppShell>
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
  tone: keyof typeof TONE_MAP;
}) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-card p-4 shadow-sm">
      <span className={cn("mb-3 flex size-9 items-center justify-center rounded-xl", TONE_MAP[tone])}>
        {icon}
      </span>
      <div>
        <p className="font-serif text-3xl leading-none text-card-foreground">
          {value}
          {unit ? <span className="ml-1 font-sans text-sm text-muted-foreground">{unit}</span> : null}
        </p>
        <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
