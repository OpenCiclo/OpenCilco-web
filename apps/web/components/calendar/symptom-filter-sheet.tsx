// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronRight, Filter, X } from "lucide-react";

import type { CustomSymptomDefinition, SymptomId } from "@/lib/diary";
import type { Messages } from "@/lib/i18n";
import { visibleSymptomCatalog } from "@/lib/symptoms/catalog";
import { toggleSymptomSelection } from "@/lib/symptoms/filter";
import {
  idsToSymptomMap,
  quickSymptomCatalogFromIds,
  toggleFavoriteSymptom,
} from "@/lib/symptoms/selection";
import { cn } from "@/lib/utils";
import { MoreSymptomsView } from "@/components/calendar/more-symptoms-view";
import { SymptomChip } from "@/components/calendar/symptom-chip";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SymptomFilterSheet({
  open,
  present,
  selected,
  favoriteSymptomIds,
  customSymptoms,
  t,
  onClose,
  onExited,
  onApply,
  onUpdateFavorites,
}: {
  open: boolean;
  present: boolean;
  selected: SymptomId[];
  favoriteSymptomIds: SymptomId[];
  customSymptoms: CustomSymptomDefinition[];
  t: Messages;
  onClose: () => void;
  onExited: () => void;
  onApply: (next: SymptomId[]) => void;
  onUpdateFavorites: (next: SymptomId[]) => void | Promise<void>;
}) {
  const titleId = useId();
  const [draft, setDraft] = useState<SymptomId[]>(selected);
  const [draftReady, setDraftReady] = useState(false);
  const [view, setView] = useState<"quick" | "all">("quick");
  const catalog = useMemo(() => visibleSymptomCatalog(customSymptoms), [customSymptoms]);
  const quickCatalog = useMemo(
    () => quickSymptomCatalogFromIds(catalog, favoriteSymptomIds, draft),
    [catalog, draft, favoriteSymptomIds],
  );
  const draftMap = useMemo(() => idsToSymptomMap(draft), [draft]);

  if (present && !draftReady) {
    setDraftReady(true);
    setDraft(selected);
    setView("quick");
  }
  if (!present && draftReady) {
    setDraftReady(false);
    setView("quick");
  }

  const closing = present && !open;
  const busy = closing;

  useEffect(() => {
    if (!present || open) return;
    if (prefersReducedMotion()) {
      onExited();
      return;
    }
    const timer = window.setTimeout(onExited, 450);
    return () => window.clearTimeout(timer);
  }, [present, open, onExited]);

  useEffect(() => {
    if (!present || busy) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [present, busy, onClose]);

  if (!present) return null;

  function requestClose() {
    if (busy) return;
    onClose();
  }

  function toggle(id: SymptomId) {
    setDraft((current) => toggleSymptomSelection(current, id));
  }

  function toggleFavorite(id: SymptomId) {
    void onUpdateFavorites(toggleFavoriteSymptom(favoriteSymptomIds, id, catalog));
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
          "relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-4xl bg-card shadow-2xl",
          closing ? "animate-sheet-down" : "animate-sheet-up",
        )}
      >
        <div className="flex items-start justify-between gap-3 px-6 pt-7 pb-3">
          <div className="flex min-w-0 flex-1 items-start gap-2 pr-2">
            {view === "all" ? (
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
                className="flex items-center gap-2 font-serif text-xl leading-tight text-card-foreground text-balance"
              >
                {view === "quick" ? (
                  <Filter className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                ) : null}
                {view === "all" ? t.moreSymptoms : t.filterSymptomsTitle}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {view === "all" ? t.filterSymptomsTitle : t.filterSymptomsHint}
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

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-2">
          {view === "quick" ? (
            <div className="py-2">
              <div className="flex flex-wrap gap-2">
                {quickCatalog.map((item) => (
                  <SymptomChip
                    key={item.id}
                    item={item}
                    active={draft.includes(item.id)}
                    favorite={favoriteSymptomIds.includes(item.id)}
                    disabled={busy}
                    t={t}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={() => setView("all")}
                className="mt-3 flex w-full items-center justify-between rounded-2xl bg-muted px-4 py-3 text-sm font-semibold text-card-foreground transition-transform active:scale-[0.98]"
              >
                {t.moreSymptoms}
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
              </button>
            </div>
          ) : (
            <MoreSymptomsView
              catalog={catalog}
              selected={draftMap}
              favorites={favoriteSymptomIds}
              disabled={busy}
              t={t}
              onToggle={toggle}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-border bg-card px-6 py-4">
          {draft.length > 0 || selected.length > 0 ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setDraft([]);
                onApply([]);
                onClose();
              }}
              className="rounded-2xl bg-muted px-4 py-3.5 text-sm font-semibold text-muted-foreground transition-transform active:scale-95"
            >
              {t.clearFilters}
            </button>
          ) : null}
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
          >
            <Check className="size-5" />
            {t.applyFilters}
          </button>
        </div>
      </div>
    </div>
  );
}
