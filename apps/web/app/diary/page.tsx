// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { NoteViewer } from "@/components/journal/note-viewer";
import { Input } from "@/components/ui/input";
import { useCiclo } from "@/lib/client/ciclo-context";
import { cycleOverview, phaseLabel } from "@/lib/cycle/phases";
import { formatIsoUtc } from "@/lib/format-date";
import { todayIsoUtc } from "@/lib/diary";
import { filterJournalEntries, listJournalEntries, type JournalEntry } from "@/lib/journal/entries";

export default function DiaryHistoryPage() {
  const { t, diary, wallet, locale } = useCiclo();
  const [query, setQuery] = useState("");
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [closing, setClosing] = useState(false);
  const today = todayIsoUtc();
  const overview = useMemo(() => cycleOverview(diary, today), [diary, today]);
  const entries = useMemo(
    () => listJournalEntries(diary, overview.nextPeriodDate),
    [diary, overview.nextPeriodDate],
  );
  const visible = useMemo(() => filterJournalEntries(entries, query), [entries, query]);

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
        <header className="animate-fade-up flex items-start gap-3">
          <Link
            href="/patterns"
            aria-label={t.back}
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
          >
            <ArrowLeft className="size-5" aria-hidden />
          </Link>
          <div className="min-w-0">
            <h1 className="font-serif text-2xl text-foreground">{t.notesHistory}</h1>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">{t.notesHistoryHint}</p>
          </div>
        </header>

        <label className="animate-fade-up relative block" style={{ animationDelay: "40ms" }}>
          <span className="sr-only">{t.notesSearchPlaceholder}</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.notesSearchPlaceholder}
            className="pl-10"
          />
        </label>

        {visible.length === 0 ? (
          <p className="animate-fade-up text-sm text-muted-foreground" style={{ animationDelay: "80ms" }}>
            {entries.length === 0 ? t.notesEmpty : t.notesEmptySearch}
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {visible.map((entry, index) => {
              const dateLabel = formatIsoUtc(entry.iso, locale, {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const meta = [
                entry.cycleDay !== null
                  ? t.notesCycleDay.replace("{day}", String(entry.cycleDay))
                  : null,
                entry.phase ? phaseLabel(entry.phase, t) : t.notesPhaseUnknown,
              ]
                .filter(Boolean)
                .join(" · ");
              return (
                <li
                  key={entry.iso}
                  className="animate-fade-up"
                  style={{ animationDelay: `${80 + Math.min(index, 8) * 40}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setClosing(false);
                      setActiveEntry(entry);
                    }}
                    className="block w-full rounded-3xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.99]"
                  >
                    <p className="font-serif text-base capitalize text-card-foreground">{dateLabel}</p>
                    <p className="mt-0.5 text-xs font-medium text-muted-foreground">{meta}</p>
                    <p className="mt-2 text-sm leading-relaxed text-card-foreground text-pretty whitespace-pre-wrap">
                      {entry.note}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
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
