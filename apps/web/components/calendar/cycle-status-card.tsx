// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useCallback, useRef, useState } from "react";

import { coverageInterval, ForecastChart } from "@/components/forecast-chart";
import { SeasonGuideOverlay, type SeasonOriginRect } from "@/components/calendar/season-guide-overlay";
import { SeasonDecor } from "@/components/calendar/season-scene";
import {
  isPeriodDueOrOverdue,
  phaseBody,
  phaseLabel,
  phaseSeason,
  type CycleOverview,
  type CyclePhase,
  type CycleSeason,
} from "@/lib/cycle/phases";
import type { Locale, Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SEASON_LABELS: Record<CycleSeason, keyof Messages> = {
  winter: "seasonWinter",
  spring: "seasonSpring",
  summer: "seasonSummer",
  fall: "seasonFall",
};

export function CycleStatusCard({
  overview,
  today,
  locale,
  t,
  visualSeasons,
}: {
  overview: CycleOverview;
  today: string;
  locale: Locale;
  t: Messages;
  visualSeasons: boolean;
}) {
  const phase = overview.currentPhase;
  const nextChip =
    overview.nextPeriodInDays === null
      ? null
      : overview.nextPeriodInDays === 0
        ? t.nextPeriodToday
        : overview.nextPeriodInDays < 0
          ? t.nextPeriodOverdue
          : t.nextPeriodIn.replace("{days}", String(overview.nextPeriodInDays));

  if (phase) {
    const season = phaseSeason(phase.phase);
    return (
      <PhaseStatusCard
        cycleDay={phase.cycleDay}
        locale={locale}
        nextChip={nextChip}
        phaseName={phase.phase}
        season={season}
        sourceEstimated={phase.source === "estimated"}
        t={t}
        visualSeasons={visualSeasons}
      />
    );
  }

  if (!isPeriodDueOrOverdue(overview) || !overview.forecast) {
    if (overview.currentCycleDay === null) return null;
    return (
      <section
        className="animate-fade-up relative overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground shadow-sm"
        style={{ animationDelay: "60ms" }}
      >
        <StatusDecor />
        <p className="text-sm font-medium opacity-90">
          {t.cycleDay.replace("{day}", String(overview.currentCycleDay))}
        </p>
      </section>
    );
  }

  const forecast = overview.forecast;
  const uncertaintyLabel =
    forecast.uncertainty === "low"
      ? t.uncertaintyLow
      : forecast.uncertainty === "medium"
        ? t.uncertaintyMedium
        : t.uncertaintyHigh;
  const interval = coverageInterval(forecast.dailyProbabilities, 0.8);

  return (
    <section
      className="animate-fade-up relative overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground shadow-sm"
      style={{ animationDelay: "60ms" }}
    >
      <StatusDecor />
      <p className="font-serif text-2xl text-balance">{t.periodDueTitle}</p>
      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-pretty opacity-90">
        {t.periodDueBody}
      </p>
      {nextChip ? (
        <p className="mt-3 inline-flex items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
          {nextChip}
        </p>
      ) : null}
      <p className="mt-2 text-xs font-semibold opacity-80">
        {t.periodDueUncertainty.replace("{level}", uncertaintyLabel)}
      </p>
      <div className="relative mt-4">
        <ForecastChart
          daily={forecast.dailyProbabilities}
          mostLikelyDate={forecast.mostLikelyDate}
          interval={interval}
          referenceDate={today}
          locale={locale}
          t={t}
          tone="onPrimary"
          compact
        />
      </div>
    </section>
  );
}

function PhaseStatusCard({
  cycleDay,
  locale,
  nextChip,
  phaseName,
  season,
  sourceEstimated,
  t,
  visualSeasons,
}: {
  cycleDay: number;
  locale: Locale;
  nextChip: string | null;
  phaseName: CyclePhase;
  season: CycleSeason;
  sourceEstimated: boolean;
  t: Messages;
  visualSeasons: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [origin, setOrigin] = useState<SeasonOriginRect | null>(null);
  const seasonName = String(t[SEASON_LABELS[season]]);
  const overlayVisible = visualSeasons && origin !== null && (guideOpen || closing);

  const closeGuide = useCallback(() => {
    if (!guideOpen || closing) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGuideOpen(false);
      setClosing(false);
      setOrigin(null);
      openButtonRef.current?.focus();
      return;
    }
    setClosing(true);
  }, [closing, guideOpen]);

  function openGuide() {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    setClosing(false);
    setGuideOpen(true);
  }

  return (
    <>
      <section
        ref={cardRef}
        className={cn(
          "animate-fade-up relative isolate overflow-hidden rounded-3xl p-5 text-primary-foreground shadow-sm",
          visualSeasons ? `cycle-season-card season-${season}` : "bg-primary",
          overlayVisible ? "invisible" : null,
        )}
        style={{ animationDelay: "60ms" }}
      >
        {visualSeasons ? <SeasonDecor season={season} /> : <StatusDecor />}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium opacity-90">
              {t.cycleDay.replace("{day}", String(cycleDay))}
            </p>
            {visualSeasons ? (
              <button
                ref={openButtonRef}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openGuide();
                }}
                aria-expanded={guideOpen}
                aria-haspopup="dialog"
                aria-label={t.seasonGuideOpen.replace("{season}", seasonName)}
                className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm transition-transform active:scale-90"
              >
                {seasonName}
              </button>
            ) : null}
          </div>
          <p className="mt-1 font-serif text-2xl">
            {phaseLabel(phaseName, t)}
            {sourceEstimated ? (
              <span className="ml-2 align-middle font-sans text-sm font-medium opacity-80">
                · {t.phaseEstimated}
              </span>
            ) : null}
          </p>
          <p className="mt-1.5 max-w-[18rem] text-sm leading-relaxed text-pretty opacity-90">
            {phaseBody(phaseName, t)}
          </p>
          {nextChip ? (
            <p className="mt-3 inline-flex items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
              {nextChip}
            </p>
          ) : null}
        </div>
      </section>
      {overlayVisible && origin ? (
        <SeasonGuideOverlay
          origin={origin}
          closing={closing}
          season={season}
          phase={phaseName}
          sourceEstimated={sourceEstimated}
          cycleDay={cycleDay}
          nextChip={nextChip}
          locale={locale}
          t={t}
          onClose={closeGuide}
          onClosed={() => {
            setGuideOpen(false);
            setClosing(false);
            setOrigin(null);
            openButtonRef.current?.focus();
          }}
        />
      ) : null}
    </>
  );
}

function StatusDecor() {
  return (
    <>
      <div className="absolute -right-8 -top-10 size-36 rounded-full bg-primary-foreground/10" />
      <div className="absolute -right-2 top-12 size-20 rounded-full bg-primary-foreground/10" />
    </>
  );
}
