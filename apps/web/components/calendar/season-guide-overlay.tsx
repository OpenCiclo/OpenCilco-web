// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { SeasonDecor } from "@/components/calendar/season-scene";
import { phaseBody, phaseLabel, type CyclePhase, type CycleSeason } from "@/lib/cycle/phases";
import { seasonGuide } from "@/lib/cycle/season-guide";
import type { Locale, Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type SeasonOriginRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const SEASON_LABELS: Record<CycleSeason, keyof Messages> = {
  winter: "seasonWinter",
  spring: "seasonSpring",
  summer: "seasonSummer",
  fall: "seasonFall",
};

export function SeasonGuideOverlay({
  origin,
  closing,
  season,
  phase,
  sourceEstimated,
  cycleDay,
  nextChip,
  locale,
  t,
  onClose,
  onClosed,
}: {
  origin: SeasonOriginRect;
  closing: boolean;
  season: CycleSeason;
  phase: CyclePhase;
  sourceEstimated: boolean;
  cycleDay: number;
  nextChip: string | null;
  locale: Locale;
  t: Messages;
  onClose: () => void;
  onClosed: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const ignoreCloseUntil = useRef(Date.now() + 450);
  const reduceMotion = prefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(reduceMotion);
  const canClose = expanded || reduceMotion;
  const onCloseRef = useRef(onClose);
  const onClosedRef = useRef(onClosed);
  onCloseRef.current = onClose;
  onClosedRef.current = onClosed;
  const seasonName = String(t[SEASON_LABELS[season]]);
  const guide = seasonGuide(season, locale);
  const target = columnTarget();
  const frame = !reduceMotion && (closing || !expanded) ? origin : target;

  function requestClose() {
    if (Date.now() < ignoreCloseUntil.current) return;
    onCloseRef.current();
  }

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const id = requestAnimationFrame(() => {
      setReady(true);
      requestAnimationFrame(() => setExpanded(true));
    });
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (!canClose) return;
    closeRef.current?.focus();
  }, [canClose]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (!closing) return;
    const id = window.setTimeout(() => onClosedRef.current(), reduceMotion ? 0 : 500);
    return () => window.clearTimeout(id);
  }, [closing, reduceMotion]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") requestClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="season-guide-overlay fixed z-50 flex flex-col overflow-hidden bg-background"
      style={{
        top: frame.top,
        left: frame.left,
        width: frame.width,
        height: frame.height,
        borderRadius: frame === origin ? "1.5rem" : 0,
        transition: reduceMotion || !ready ? "none" : undefined,
        pointerEvents: canClose ? "auto" : "none",
      }}
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        if (!closing || event.propertyName !== "height") return;
        onClosedRef.current();
      }}
    >
      <header
        className={cn(
          "relative isolate shrink-0 overflow-hidden p-5 text-primary-foreground",
          `cycle-season-card season-${season}`,
          expanded && !closing ? "pt-[max(1.25rem,env(safe-area-inset-top))]" : null,
        )}
      >
        <SeasonDecor season={season} />
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium opacity-90">
              {t.cycleDay.replace("{day}", String(cycleDay))}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={requestClose}
              disabled={!canClose}
              aria-label={t.close}
              className="inline-flex min-h-6 min-w-8 items-center justify-center rounded-full bg-white/15 px-2.5 py-1 text-primary-foreground backdrop-blur-sm transition-transform active:scale-90 disabled:pointer-events-none"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <p id={titleId} className="mt-1 font-serif text-2xl">
            {phaseLabel(phase, t)}
            {sourceEstimated ? (
              <span className="ml-2 align-middle font-sans text-sm font-medium opacity-80">
                · {t.phaseEstimated}
              </span>
            ) : null}
          </p>
          <p className="mt-1.5 max-w-[18rem] text-sm leading-relaxed text-pretty opacity-90">
            {phaseBody(phase, t)}
          </p>
          {nextChip ? (
            <p className="mt-3 inline-flex items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
              {nextChip}
            </p>
          ) : null}
        </div>
      </header>
      <article className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-background px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-foreground">
        <h2 className="font-serif text-2xl text-balance">{seasonName}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t.seasonGuidePhaseHint.replace("{season}", seasonName).replace("{phase}", phaseLabel(phase, t))}
        </p>
        <GuideSection heading={t.seasonGuideMeaning} body={guide.meaning} />
        <GuideSection heading={t.seasonGuideGoodFor} body={guide.goodFor} />
        <GuideList heading={t.seasonGuideDo} items={guide.do} tone="do" />
        <GuideList heading={t.seasonGuideDont} items={guide.dont} tone="dont" />
        <p className="mt-4 rounded-3xl border border-primary/20 bg-primary/8 p-4 text-sm leading-relaxed text-muted-foreground">
          {t.seasonGuideNotice}
        </p>
      </article>
    </div>
  );

  return createPortal(overlay, document.body);
}

function GuideSection({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="mt-4 rounded-3xl bg-card p-4 shadow-sm">
      <h3 className="font-serif text-lg text-card-foreground">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </section>
  );
}

function GuideList({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: string[];
  tone: "do" | "dont";
}) {
  return (
    <section className="mt-4 rounded-3xl bg-card p-4 shadow-sm">
      <h3 className="font-serif text-lg text-card-foreground">{heading}</h3>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <span
              aria-hidden
              className={cn(
                "mt-1.5 size-1.5 shrink-0 rounded-full",
                tone === "do" ? "bg-primary" : "bg-destructive/70",
              )}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function columnTarget(): SeasonOriginRect {
  const width = Math.min(28 * 16, typeof window === "undefined" ? 448 : window.innerWidth);
  const left = typeof window === "undefined" ? 0 : Math.max(0, (window.innerWidth - width) / 2);
  const height = typeof window === "undefined" ? 800 : window.innerHeight;
  return { top: 0, left, width, height };
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
