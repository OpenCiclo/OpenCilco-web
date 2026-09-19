// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { MarketingCopy } from "@/lib/marketing/copy";

const PHASE_COLORS: Record<string, string> = {
  menstrual: "var(--bleed)",
  follicular: "var(--chart-2)",
  ovulation: "var(--fertile)",
  luteal: "var(--chart-4)",
};

// Approximate proportions of a 28-day cycle, expressed as conic-gradient stops.
const RING = `conic-gradient(
  var(--bleed) 0deg 64deg,
  var(--chart-2) 64deg 167deg,
  var(--fertile) 167deg 218deg,
  var(--chart-4) 218deg 360deg
)`;

export function CyclePreview({ copy }: { copy: MarketingCopy["preview"] }) {
  return (
    <div className="animate-fade-up rounded-4xl border border-border bg-card p-6 shadow-xl sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">Ciclo</p>
          <p className="mt-1 font-serif text-lg text-card-foreground">{copy.cycleDay}</p>
        </div>
        <span className="rounded-full bg-[var(--fertile)]/15 px-3 py-1 text-xs font-semibold text-[var(--fertile-foreground)]">
          {copy.phase}
        </span>
      </div>

      <div className="mt-6 flex justify-center">
        <div
          className="relative grid size-44 place-items-center rounded-full sm:size-52"
          style={{ background: RING }}
          role="img"
          aria-label={`${copy.cycleDay} — ${copy.phase}`}
        >
          <div className="absolute inset-[16%] grid place-items-center rounded-full bg-card text-center shadow-inner">
            <div>
              <p className="font-serif text-3xl leading-none text-card-foreground sm:text-4xl">14</p>
              <p className="mt-1 text-[11px] font-medium text-muted-foreground">{copy.phase}</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
        {copy.legend.map((item) => (
          <li key={item.key} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: PHASE_COLORS[item.key] }}
            />
            {item.label}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl bg-background p-4">
        <p className="font-medium text-foreground">{copy.nextPeriod}</p>
        <p className="mt-1 text-sm text-muted-foreground">{copy.uncertainty}</p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">{copy.caption}</p>
    </div>
  );
}
