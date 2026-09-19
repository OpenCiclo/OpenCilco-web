"use client";

import { useMemo, useState } from "react";

import type { DailyProbability } from "@/lib/forecast/types";
import type { Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const DAY_COUNT = 28;

function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function ForecastChart({
  daily,
  mostLikelyDate,
  interval,
  referenceDate,
  locale,
  t,
  tone = "default",
  compact = false,
}: {
  daily: DailyProbability[];
  mostLikelyDate: string;
  interval: { lower: string; upper: string } | null;
  referenceDate: string;
  locale: string;
  t: Messages;
  tone?: "default" | "onPrimary";
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState<DailyProbability | null>(null);
  const onPrimary = tone === "onPrimary";

  const end = addDays(referenceDate, DAY_COUNT - 1);
  const points = daily.filter((item) => item.date >= referenceDate && item.date <= end).slice(0, DAY_COUNT);
  const longFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "es" ? "es" : "en", {
        weekday: "short",
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }),
    [locale],
  );
  if (points.length === 0) return null;

  const max = Math.max(...points.map((item) => item.probability), 0.01);
  const inInterval = (iso: string) =>
    interval ? iso >= interval.lower && iso <= interval.upper : false;

  const active = hovered ?? points.find((item) => item.date === mostLikelyDate) ?? points[0];
  const todayIndex = points.findIndex((item) => item.date === referenceDate);
  const slotWidthPct = 100 / points.length;

  return (
    <div>
      {compact ? null : (
        <>
          <p className="text-sm font-medium">{t.forecastChart}</p>
          <p className={cn("mt-1 text-xs", onPrimary ? "text-primary-foreground/75" : "text-muted-foreground")}>
            {t.forecastChartHint}
          </p>
        </>
      )}
      <p className={cn("min-h-5 text-center text-sm", compact ? "mt-0" : "mt-3")} aria-live="polite">
        <span className="font-medium">
          {longFormatter.format(new Date(`${active.date}T00:00:00Z`))}
        </span>
        <span className={onPrimary ? "text-primary-foreground/75" : "text-muted-foreground"}>
          {" · "}
          {Math.round(active.probability * 100)}%
        </span>
      </p>
      <div className="relative mt-2 w-full pb-4">
        <div className="flex h-24 w-full items-end gap-px" role="img" aria-label={t.forecastChart}>
          {points.map((item) => {
            const heightPct = Math.max((item.probability / max) * 100, 2);
            const highlighted = item.date === mostLikelyDate;
            const isHovered = hovered?.date === item.date;
            const activeBar = isHovered || (!hovered && highlighted);
            return (
              <div
                key={item.date}
                className={cn(
                  "flex h-full min-w-0 flex-1 flex-col justify-end rounded-t-sm",
                  inInterval(item.date) && (onPrimary ? "bg-primary-foreground/10" : "bg-primary/10"),
                )}
              >
                <button
                  type="button"
                  className={cn(
                    "w-full rounded-t-sm transition-colors",
                    onPrimary
                      ? activeBar
                        ? "bg-primary-foreground"
                        : "bg-primary-foreground/40 hover:bg-primary-foreground/70"
                      : activeBar
                        ? "bg-primary"
                        : "bg-primary/40 hover:bg-primary/70",
                  )}
                  style={{ height: `${heightPct}%` }}
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(item)}
                  onBlur={() => setHovered(null)}
                  aria-label={`${longFormatter.format(new Date(`${item.date}T00:00:00Z`))} ${Math.round(item.probability * 100)}%`}
                />
              </div>
            );
          })}
        </div>
        {todayIndex >= 0 ? (
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 whitespace-nowrap text-[10px] font-medium leading-none",
              onPrimary ? "text-primary-foreground/75" : "text-muted-foreground",
            )}
            style={{
              left: `${todayIndex * slotWidthPct + slotWidthPct / 2}%`,
              transform: "translateX(-50%)",
            }}
          >
            {t.today}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function coverageInterval(daily: DailyProbability[], coverage: number) {
  if (daily.length === 0) return null;
  const tail = (1 - coverage) / 2;
  let cdf = 0;
  let lower = daily[0].date;
  let upper = daily[daily.length - 1].date;
  let lowerSet = false;
  for (const item of daily) {
    cdf += item.probability;
    if (!lowerSet && cdf >= tail) {
      lower = item.date;
      lowerSet = true;
    }
    if (cdf >= 1 - tail) {
      upper = item.date;
      break;
    }
  }
  return { lower, upper };
}
