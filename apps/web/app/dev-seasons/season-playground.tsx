// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useMemo, useState } from "react";

import { CycleStatusCard } from "@/components/calendar/cycle-status-card";
import {
  CYCLE_PHASES,
  phaseSeason,
  type CycleOverview,
  type CyclePhase,
  type PhaseSource,
} from "@/lib/cycle/phases";
import { messages, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const PHASE_SAMPLES: Record<CyclePhase, { cycleDay: number; nextPeriodInDays: number }> = {
  menstrual: { cycleDay: 2, nextPeriodInDays: 26 },
  follicular: { cycleDay: 6, nextPeriodInDays: 23 },
  ovulation: { cycleDay: 14, nextPeriodInDays: 14 },
  luteal: { cycleDay: 22, nextPeriodInDays: 6 },
};

const EMPTY_DURATION = {
  closedRuns: [],
  nRuns: 0,
  meanDays: 5,
  medianDays: 5,
  expectedDays: 5,
  range: { min: 4, max: 6 },
  source: "history" as const,
};

function previewOverview(phase: CyclePhase, source: PhaseSource): CycleOverview {
  const sample = PHASE_SAMPLES[phase];
  return {
    currentCycleDay: sample.cycleDay,
    currentPhase: {
      phase,
      source,
      cycleDay: sample.cycleDay,
      cycleStart: "2026-08-18",
      nextStart: "2026-09-15",
    },
    avgCycleLength: 28,
    avgPeriodLength: 5,
    expectedPeriodLength: 5,
    expectedBleedingWindow: null,
    periodLengthRange: { min: 4, max: 6 },
    nextPeriodDate: "2026-09-15",
    nextPeriodInDays: sample.nextPeriodInDays,
    initialStartProbability: null,
    forecast: null,
    forecastingEnabled: true,
    periodRuns: [],
    periodDuration: EMPTY_DURATION,
  };
}

export function SeasonPlayground() {
  const [locale, setLocale] = useState<Locale>("es");
  const [source, setSource] = useState<PhaseSource>("estimated");
  const [visualSeasons, setVisualSeasons] = useState(true);
  const t = messages[locale];

  const overviews = useMemo(
    () => CYCLE_PHASES.map((phase) => ({ phase, overview: previewOverview(phase, source) })),
    [source],
  );

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-8">
        <header className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Playground
            </p>
            <h1 className="mt-1 font-serif text-3xl">Season cards</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              All four cycle seasons with the live <code className="font-mono text-xs">CycleStatusCard</code>.
              Edit <code className="font-mono text-xs">cycle-status-card.tsx</code> or{" "}
              <code className="font-mono text-xs">globals.css</code> and Fast Refresh updates this page.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ToggleGroup
              label="Language"
              value={locale}
              options={[
                { value: "es", label: "ES" },
                { value: "en", label: "EN" },
              ]}
              onChange={setLocale}
            />
            <ToggleGroup
              label="Source"
              value={source}
              options={[
                { value: "estimated", label: "Estimated" },
                { value: "observed", label: "Observed" },
              ]}
              onChange={setSource}
            />
            <ToggleGroup
              label="Visual seasons"
              value={visualSeasons ? "on" : "off"}
              options={[
                { value: "on", label: "On" },
                { value: "off", label: "Plain" },
              ]}
              onChange={(value) => setVisualSeasons(value === "on")}
            />
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {overviews.map(({ phase, overview }) => {
            const season = phaseSeason(phase);
            return (
              <div key={phase} className="mx-auto w-full max-w-md">
                <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {season} · {phase}
                </p>
                <CycleStatusCard
                  overview={overview}
                  today="2026-08-23"
                  locale={locale}
                  t={t}
                  visualSeasons={visualSeasons}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ToggleGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-2 rounded-full border border-border bg-card p-1"
    >
      <span className="pl-2.5 text-[11px] font-semibold text-muted-foreground">{label}</span>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
