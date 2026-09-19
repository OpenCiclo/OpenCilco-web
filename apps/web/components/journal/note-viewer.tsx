// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import { useEffect, useId } from "react";
import { CalendarDays, Droplet, Sparkles, X } from "lucide-react";

import type { DayLog, FlowLevel, CervicalMucus } from "@/lib/diary";
import { formatIsoUtc } from "@/lib/format-date";
import type { Locale, Messages } from "@/lib/i18n";
import type { JournalEntry } from "@/lib/journal/entries";
import { phaseLabel } from "@/lib/cycle/phases";
import { resolveSymptomCatalog, symptomLabel } from "@/lib/symptoms/catalog";
import type { CustomSymptomDefinition } from "@/lib/symptoms/definitions";
import { cn } from "@/lib/utils";

const FLOW_LABELS: Record<FlowLevel, keyof Messages> = {
  spotting: "flowSpotting",
  light: "flowLight",
  medium: "flowMedium",
  heavy: "flowHeavy",
};

const MUCUS_LABELS: Record<CervicalMucus, keyof Messages> = {
  dry: "mucusDry",
  sticky: "mucusSticky",
  creamy: "mucusCreamy",
  watery: "mucusWatery",
  eggwhite: "mucusEggwhite",
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function NoteViewer({
  entry,
  log,
  locale,
  t,
  customSymptoms,
  closing,
  onClose,
  onExited,
}: {
  entry: JournalEntry;
  log: DayLog | undefined;
  locale: Locale;
  t: Messages;
  customSymptoms: CustomSymptomDefinition[];
  closing: boolean;
  onClose: () => void;
  onExited: () => void;
}) {
  const titleId = useId();
  const dateLabel = formatIsoUtc(entry.iso, locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const meta = [
    entry.cycleDay !== null ? t.notesCycleDay.replace("{day}", String(entry.cycleDay)) : null,
    entry.phase ? phaseLabel(entry.phase, t) : t.notesPhaseUnknown,
  ]
    .filter(Boolean)
    .join(" · ");

  const catalog = resolveSymptomCatalog(customSymptoms);
  const symptomIds = Object.keys(log?.symptoms ?? {}) as (keyof NonNullable<DayLog["symptoms"]>)[];
  const symptomItems = symptomIds
    .map((id) => catalog.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const hasFlow = Boolean(log?.flow);
  const hasMucus = Boolean(log?.cervicalMucus);
  const hasSymptoms = symptomItems.length > 0;
  const hasFooter = hasFlow || hasMucus || hasSymptoms;

  useEffect(() => {
    if (!closing) return;
    if (prefersReducedMotion()) {
      onExited();
      return;
    }
    const timer = window.setTimeout(onExited, 280);
    return () => window.clearTimeout(timer);
  }, [closing, onExited]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-[env(safe-area-inset-bottom)] sm:items-center sm:p-6">
      <button
        type="button"
        aria-label={t.close}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-foreground/40",
          closing ? "animate-overlay-out" : "animate-overlay-in",
        )}
      />
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (closing) onExited();
        }}
        className={cn(
          "relative z-10 flex max-h-[88vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-card shadow-2xl",
          closing ? "animate-learn-card-out" : "animate-learn-card-in",
        )}
      >
        <div className="border-b border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
          >
            <X className="size-5" />
          </button>
          <p id={titleId} className="pr-10 font-serif text-2xl capitalize text-card-foreground">
            {dateLabel}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <p className="text-base leading-relaxed text-card-foreground text-pretty whitespace-pre-wrap">
            {entry.note}
          </p>

          {hasFooter ? (
            <footer className="space-y-3 rounded-3xl bg-background p-4">
              <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                {t.notesDayLogFooter}
              </p>
              <div className="flex flex-wrap gap-2">
                {log?.flow ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-bleed/15 px-3 py-1.5 text-xs font-semibold text-bleed-foreground">
                    <Droplet className="size-3.5" aria-hidden />
                    {t.flow}: {t[FLOW_LABELS[log.flow]]}
                  </span>
                ) : null}
                {log?.cervicalMucus ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-fertile/15 px-3 py-1.5 text-xs font-semibold text-fertile-foreground">
                    <Sparkles className="size-3.5" aria-hidden />
                    {t.cervicalMucus}: {t[MUCUS_LABELS[log.cervicalMucus]]}
                  </span>
                ) : null}
              </div>
              {hasSymptoms ? (
                <div className="flex flex-wrap gap-2">
                  {symptomItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground"
                      >
                        {item.emoji ? (
                          <span aria-hidden>{item.emoji}</span>
                        ) : (
                          <Icon className="size-3.5 text-muted-foreground" aria-hidden />
                        )}
                        {symptomLabel(item, t)}
                      </span>
                    );
                  })}
                </div>
              ) : null}
            </footer>
          ) : (
            <p className="rounded-3xl bg-background p-4 text-sm text-muted-foreground">
              {t.notesDayLogEmpty}
            </p>
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          <Link
            href={`/?day=${entry.iso}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
          >
            <CalendarDays className="size-5" aria-hidden />
            {t.notesEditInCalendar}
          </Link>
        </div>
      </article>
    </div>
  );
}
