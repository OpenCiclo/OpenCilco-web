"use client";

import { useState } from "react";
import Link from "next/link";

import { useCiclo } from "@/lib/client/ciclo-context";
import { cycleOverview } from "@/lib/cycle/phases";
import { initialProbabilityLabel, periodTimingChip } from "@/lib/cycle/period-timing";
import { todayIsoUtc } from "@/lib/diary";
import { daysBetween } from "@/lib/forecast/math";
import type { DailyProbability } from "@/lib/forecast/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { coverageInterval, ForecastChart } from "@/components/forecast-chart";

const NEXT_WINDOWS = ["1", "2", "3", "5", "7"] as const;
const AROUND_WINDOWS = ["1", "2", "3", "5"] as const;

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "es" ? "es" : "en", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${iso}T00:00:00Z`));
}

function percent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function probabilityWithinNextDays(daily: DailyProbability[], reference: string, days: number) {
  const end = new Date(`${reference}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + days);
  const endIso = end.toISOString().slice(0, 10);
  let total = 0;
  for (const item of daily) {
    if (item.date >= reference && item.date <= endIso) total += item.probability;
  }
  return Math.min(Math.max(total, 0), 1);
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-medium">{value}</p>
    </div>
  );
}

export function ForecastCard() {
  const { diary, t, locale } = useCiclo();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const today = todayIsoUtc();
  const overview = cycleOverview(diary, today);
  if (!overview.forecastingEnabled) return null;
  if (diary.periodStarts.length === 0 || !overview.forecast) {
    return (
      <Card className="flex flex-col gap-4">
        <p>{t.noDates}</p>
        <Link
          href="/app"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          {t.addStart}
        </Link>
      </Card>
    );
  }

  const forecast = overview.forecast;
  const anchorDate = overview.nextPeriodDate ?? forecast.mostLikelyDate;
  const anchorLength = daysBetween(forecast.lastPeriodStart, anchorDate);
  const observed = overview.currentPhase?.source === "observed";
  const dueOrLate = overview.nextPeriodInDays !== null && overview.nextPeriodInDays <= 0;
  const timing = dueOrLate ? periodTimingChip(overview.nextPeriodInDays, observed, t) : null;
  const initialProbability =
    dueOrLate && !observed && overview.initialStartProbability !== null
      ? initialProbabilityLabel(overview.initialStartProbability, t)
      : null;
  const uncertaintyLabel =
    forecast.uncertainty === "low"
      ? t.uncertaintyLow
      : forecast.uncertainty === "medium"
        ? t.uncertaintyMedium
        : t.uncertaintyHigh;
  const interval = coverageInterval(forecast.dailyProbabilities, 0.8);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <p className="text-sm text-muted-foreground">{t.nextStart}</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight">
          {formatDate(anchorDate, locale)}
        </p>
        {timing ? <p className="mt-2 text-sm font-semibold text-foreground">{timing}</p> : null}
        {initialProbability ? (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{initialProbability}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge>
            {t.cycleLength}: {anchorLength} {t.days}
          </Badge>
          <Badge>
            {t.uncertainty}: {uncertaintyLabel}
          </Badge>
          {overview.expectedPeriodLength ? (
            <Badge>
              {t.expectedPeriodLength}: {overview.expectedPeriodLength} {t.days}
            </Badge>
          ) : null}
        </div>
        {overview.expectedBleedingWindow ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {t.expectedPeriodWindow}: {formatDate(overview.expectedBleedingWindow.start, locale)} –{" "}
            {formatDate(overview.expectedBleedingWindow.end, locale)}
          </p>
        ) : null}
      </Card>
      <Card>
        <ForecastChart
          daily={forecast.dailyProbabilities}
          mostLikelyDate={forecast.mostLikelyDate}
          interval={interval}
          referenceDate={today}
          locale={locale}
          t={t}
        />
      </Card>
      <button
        type="button"
        onClick={() => setShowMoreInfo((current) => !current)}
        className="inline-flex w-fit items-center rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted"
        aria-expanded={showMoreInfo}
      >
        {showMoreInfo ? t.forecastLessInfo : t.forecastMoreInfo}
      </button>
      {showMoreInfo ? (
        <>
          <Card>
            <p className="mb-3 text-sm font-medium">{t.fromToday}</p>
            <div className="grid grid-cols-2 gap-4">
              {NEXT_WINDOWS.map((window) => {
                const value =
                  forecast.probabilityWithinNextNDays[window] ??
                  probabilityWithinNextDays(forecast.dailyProbabilities, today, Number(window));
                return (
                  <Stat
                    key={`next-${window}`}
                    label={`${t.within} ${window} ${t.days}`}
                    value={percent(value)}
                  />
                );
              })}
            </div>
          </Card>
          <Card>
            <p className="mb-3 text-sm font-medium">{t.aroundLikely}</p>
            <div className="grid grid-cols-2 gap-4">
              {AROUND_WINDOWS.map((window) => (
                <Stat
                  key={`around-${window}`}
                  label={t.plusMinusDays.replace("{n}", window)}
                  value={percent(forecast.probabilityWithinNDaysOfPoint[window] ?? 0)}
                />
              ))}
            </div>
          </Card>
          {interval ? (
            <Card>
              <p className="text-sm font-medium">{t.interval80}</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">
                {formatDate(interval.lower, locale)} – {formatDate(interval.upper, locale)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{t.interval80Hint}</p>
            </Card>
          ) : null}
          {forecast.usedPrior ? (
            <p className="text-sm text-muted-foreground">{t.priorNote}</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
