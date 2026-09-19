// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronRight, Droplet, PenLine, Sparkles, Trash2, X } from "lucide-react";

import {
  FLOW_LEVELS,
  MAX_DAILY_NOTE_LENGTH,
  MUCUS_LEVELS,
  emptyDayLog,
  isEmptyDayLog,
  type CervicalMucus,
  type CustomSymptomCategory,
  type CustomSymptomDefinition,
  type DayLog,
  type FlowLevel,
  type SymptomId,
} from "@/lib/diary";
import { formatIsoUtc } from "@/lib/format-date";
import type { Locale, Messages } from "@/lib/i18n";
import {
  resolveSymptomCatalog,
  visibleSymptomCatalog,
} from "@/lib/symptoms/catalog";
import { createCustomSymptomId, isCustomSymptomId } from "@/lib/symptoms/definitions";
import {
  quickSymptomCatalog,
  removeCustomSymptom,
  toggleFavoriteSymptom,
  toggleLoggedSymptom,
} from "@/lib/symptoms/selection";
import { cn } from "@/lib/utils";
import { MoreSymptomsView } from "@/components/calendar/more-symptoms-view";
import { SymptomChip } from "@/components/calendar/symptom-chip";
import { Textarea } from "@/components/ui/input";

const FLOW_DOTS: Record<FlowLevel, number> = {
  spotting: 1,
  light: 1,
  medium: 2,
  heavy: 3,
};

const MUCUS_HINTS: Record<CervicalMucus, keyof Messages> = {
  dry: "mucusHintDry",
  sticky: "mucusHintSticky",
  creamy: "mucusHintCreamy",
  watery: "mucusHintWatery",
  eggwhite: "mucusHintEggwhite",
};

const MUCUS_LABELS: Record<CervicalMucus, keyof Messages> = {
  dry: "mucusDry",
  sticky: "mucusSticky",
  creamy: "mucusCreamy",
  watery: "mucusWatery",
  eggwhite: "mucusEggwhite",
};

const FLOW_LABELS: Record<FlowLevel, keyof Messages> = {
  spotting: "flowSpotting",
  light: "flowLight",
  medium: "flowMedium",
  heavy: "flowHeavy",
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DaySheet({
  open,
  iso,
  log,
  locale,
  t,
  favoriteSymptomIds,
  customSymptoms,
  saving,
  error,
  onClose,
  onExited,
  onSave,
  onUpdateSymptomPreferences,
}: {
  open: boolean;
  iso: string | null;
  log: DayLog | undefined;
  locale: Locale;
  t: Messages;
  favoriteSymptomIds: SymptomId[];
  customSymptoms: CustomSymptomDefinition[];
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onExited: () => void;
  onSave: (log: DayLog) => void | Promise<void>;
  onUpdateSymptomPreferences: (
    favoriteSymptomIds: SymptomId[],
    customSymptoms: CustomSymptomDefinition[],
  ) => void | Promise<void>;
}) {
  const titleId = useId();
  const [draft, setDraft] = useState<DayLog>(() =>
    log ? { ...log, symptoms: { ...log.symptoms }, note: log.note } : emptyDayLog(),
  );
  const [draftForIso, setDraftForIso] = useState<string | null>(iso);
  const [view, setView] = useState<"quick" | "more">("quick");
  const catalog = useMemo(() => resolveSymptomCatalog(customSymptoms), [customSymptoms]);
  const visibleCatalog = useMemo(() => visibleSymptomCatalog(customSymptoms), [customSymptoms]);
  const quickCatalog = useMemo(
    () => quickSymptomCatalog(catalog, favoriteSymptomIds, draft.symptoms),
    [catalog, draft.symptoms, favoriteSymptomIds],
  );

  if (!iso && draftForIso !== null) {
    setDraftForIso(null);
    setView("quick");
  }
  if (open && iso && iso !== draftForIso) {
    setDraftForIso(iso);
    setDraft(log ? { ...log, symptoms: { ...log.symptoms }, note: log.note } : emptyDayLog());
    setView("quick");
  }

  const closing = Boolean(iso) && !open;
  const busy = saving || closing;

  useEffect(() => {
    if (!iso || open) return;
    if (prefersReducedMotion()) {
      onExited();
      return;
    }
    const timer = window.setTimeout(onExited, 450);
    return () => window.clearTimeout(timer);
  }, [iso, open, onExited]);

  useEffect(() => {
    if (!iso || busy) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [iso, busy, onClose]);

  if (!iso) return null;

  const dateLabel = formatIsoUtc(iso, locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const hasData = !isEmptyDayLog(draft);
  const hadData = Boolean(log && !isEmptyDayLog(log));

  function requestClose() {
    if (busy) return;
    onClose();
  }

  function toggleFlow(value: FlowLevel) {
    setDraft((current) => ({
      ...current,
      flow: current.flow === value ? undefined : value,
    }));
  }

  function toggleMucus(value: CervicalMucus) {
    setDraft((current) => ({
      ...current,
      cervicalMucus: current.cervicalMucus === value ? undefined : value,
    }));
  }

  function toggleSymptom(id: SymptomId) {
    setDraft((current) => ({
      ...current,
      symptoms: toggleLoggedSymptom(current.symptoms, id, catalog),
    }));
  }

  function toggleFavorite(id: SymptomId) {
    const next = toggleFavoriteSymptom(favoriteSymptomIds, id, catalog);
    void onUpdateSymptomPreferences(next, customSymptoms);
  }

  function createCustomSymptom(
    label: string,
    emoji: string,
    category: CustomSymptomCategory,
  ) {
    const definition: CustomSymptomDefinition = {
      id: createCustomSymptomId(),
      label,
      emoji,
      category,
    };
    setDraft((current) => ({
      ...current,
      symptoms: { ...current.symptoms, [definition.id]: "present" },
    }));
    void onUpdateSymptomPreferences(favoriteSymptomIds, [...customSymptoms, definition]);
  }

  function deleteCustomSymptom(id: SymptomId) {
    if (!isCustomSymptomId(id)) return;
    const next = removeCustomSymptom(id, {
      customSymptoms,
      favoriteSymptomIds,
      symptoms: draft.symptoms,
    });
    setDraft((current) => ({ ...current, symptoms: next.symptoms }));
    void onUpdateSymptomPreferences(next.favoriteSymptomIds, next.customSymptoms);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label={t.close}
        onClick={requestClose}
        className={cn(
          "absolute inset-0 bg-foreground/30 backdrop-blur-[2px]",
          closing ? "animate-overlay-out" : "animate-overlay-in",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (closing) onExited();
        }}
        className={cn(
          "relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-4xl bg-card shadow-2xl [scrollbar-gutter:stable]",
          closing ? "animate-sheet-down" : "animate-sheet-up",
        )}
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 min-[360px]:px-6">
          <div className="flex min-w-0 items-start gap-2">
            {view === "more" ? (
              <button
                type="button"
                onClick={() => setView("quick")}
                disabled={busy}
                aria-label={t.backToQuickSymptoms}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
              >
                <ArrowLeft className="size-5" aria-hidden />
              </button>
            ) : null}
            <div className="min-w-0">
              <p
                id={titleId}
                className="font-serif text-xl leading-tight text-card-foreground capitalize text-balance"
              >
                {view === "more" ? t.moreSymptoms : dateLabel}
              </p>
              <p className="text-sm text-muted-foreground">
                {view === "more" ? dateLabel : t.howFeeling}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={requestClose}
            disabled={busy}
            aria-label={t.close}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-2 min-[360px]:px-6">
          {view === "quick" ? (
            <>
          <Section title={t.dayNote} icon={<PenLine className="size-4 text-primary" />}>
            <Textarea
              value={draft.note ?? ""}
              maxLength={MAX_DAILY_NOTE_LENGTH}
              disabled={busy}
              placeholder={t.dayNotePlaceholder}
              aria-label={t.dayNote}
              onChange={(event) => {
                const next = event.target.value.slice(0, MAX_DAILY_NOTE_LENGTH);
                setDraft((current) => ({
                  ...current,
                  note: next || undefined,
                }));
              }}
              className="min-h-24 resize-none"
            />
            <p className="mt-1.5 text-right text-xs text-muted-foreground">
              {t.dayNoteCount.replace("{count}", String((draft.note ?? "").length))}
            </p>
          </Section>

          <Section title={t.flow} icon={<Droplet className="size-4 text-bleed" />}>
            <div className="grid grid-cols-2 gap-2 min-[360px]:grid-cols-4">
              {FLOW_LEVELS.map((level) => {
                const active = draft.flow === level;
                return (
                  <button
                    key={level}
                    type="button"
                    aria-pressed={active}
                    disabled={busy}
                    onClick={() => toggleFlow(level)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-2xl border-2 py-3 transition-all active:scale-95",
                      active
                        ? "border-bleed bg-bleed text-bleed-foreground shadow-sm"
                        : "border-border bg-background text-muted-foreground",
                    )}
                  >
                    <span className="flex gap-0.5">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Droplet
                          key={index}
                          className={cn(
                            "size-3.5",
                            index < FLOW_DOTS[level]
                              ? active
                                ? "fill-bleed-foreground text-bleed-foreground"
                                : "fill-bleed text-bleed"
                              : "opacity-25",
                          )}
                        />
                      ))}
                    </span>
                    <span className="text-xs font-semibold">{t[FLOW_LABELS[level]]}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.flowPeriodHint}</p>
          </Section>

          <Section title={t.cervicalMucus} icon={<Sparkles className="size-4 text-fertile" />}>
            <div className="grid grid-cols-2 gap-2">
              {MUCUS_LEVELS.map((level) => {
                const active = draft.cervicalMucus === level;
                return (
                  <button
                    key={level}
                    type="button"
                    aria-pressed={active}
                    disabled={busy}
                    onClick={() => toggleMucus(level)}
                    className={cn(
                      "flex flex-col items-start rounded-2xl border-2 px-3 py-2.5 text-left transition-all active:scale-95",
                      active
                        ? "border-fertile bg-fertile/15 text-fertile-foreground"
                        : "border-border bg-background text-muted-foreground",
                    )}
                  >
                    <span className="text-sm font-semibold text-card-foreground">{t[MUCUS_LABELS[level]]}</span>
                    <span className="text-xs text-muted-foreground">{t[MUCUS_HINTS[level]]}</span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title={t.symptoms}>
            <div className="flex flex-wrap gap-2">
              {quickCatalog.map((item) => (
                <SymptomChip
                  key={item.id}
                  item={item}
                  active={Boolean(draft.symptoms[item.id])}
                  favorite={favoriteSymptomIds.includes(item.id)}
                  disabled={busy}
                  t={t}
                  onToggle={() => toggleSymptom(item.id)}
                />
              ))}
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => setView("more")}
              className="mt-3 flex w-full items-center justify-between rounded-2xl bg-muted px-4 py-3 text-sm font-semibold text-card-foreground transition-transform active:scale-[0.98]"
            >
              {t.moreSymptoms}
              <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
            </button>
          </Section>
            </>
          ) : (
            <MoreSymptomsView
              catalog={visibleCatalog}
              selected={draft.symptoms}
              favorites={favoriteSymptomIds}
              disabled={busy}
              t={t}
              onToggle={toggleSymptom}
              onToggleFavorite={toggleFavorite}
              onCreateCustom={createCustomSymptom}
              onDeleteCustom={deleteCustomSymptom}
            />
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-border bg-card px-5 py-4 min-[360px]:px-6">
          {hadData ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => void onSave(emptyDayLog())}
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-transform active:scale-90"
              aria-label={t.clearDay}
            >
              <Trash2 className="size-5" />
            </button>
          ) : null}
          <button
            type="button"
            disabled={busy}
            onClick={() => void onSave(hasData ? draft : emptyDayLog())}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
          >
            <Check className="size-5" />
            {saving ? t.saving : t.saveEntry}
          </button>
        </div>
        {error ? <p className="px-5 pb-4 text-sm text-destructive min-[360px]:px-6">{error}</p> : null}
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="py-3">
      <div className="mb-2.5 flex items-center gap-1.5">
        {icon}
        <h3 className="text-sm font-bold tracking-wide text-card-foreground uppercase">{title}</h3>
      </div>
      {children}
    </div>
  );
}
