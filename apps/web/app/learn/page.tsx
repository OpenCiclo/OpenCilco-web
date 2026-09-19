// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { useCiclo } from "@/lib/client/ciclo-context";
import { formatIsoUtc } from "@/lib/format-date";
import { LEARN_ARTICLES, articleCopy, findArticle, type LearnCategory } from "@/lib/learn/articles";
import type { Messages } from "@/lib/i18n";

const CATEGORY_KEYS: Record<LearnCategory, keyof Messages> = {
  cycle: "learnCategoryCycle",
  symptoms: "learnCategorySymptoms",
  mucus: "learnCategoryMucus",
  care: "learnCategoryCare",
};

export default function LearnPage() {
  const { t, locale } = useCiclo();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const activeArticle = useMemo(
    () => (activeSlug ? findArticle(activeSlug) ?? null : null),
    [activeSlug],
  );
  const activeCopy = activeArticle ? articleCopy(activeArticle, locale) : null;

  const closeOverlay = useCallback(() => {
    if (!activeArticle || closing) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveSlug(null);
      setClosing(false);
      return;
    }
    setClosing(true);
  }, [activeArticle, closing]);

  useEffect(() => {
    if (!activeArticle || closing) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeOverlay();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeArticle, closing, closeOverlay]);

  return (
    <AppShell>
      <div className="flex flex-col gap-5 pb-4">
        <ul className="flex flex-col gap-3">
          {LEARN_ARTICLES.map((article, index) => {
            const copy = articleCopy(article, locale);
            return (
              <li key={article.slug}>
                <Link
                  href={`/learn/${article.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setClosing(false);
                    setActiveSlug(article.slug);
                  }}
                  className="animate-fade-up block rounded-3xl bg-card p-5 shadow-sm transition-transform active:scale-[0.99]"
                  style={{ animationDelay: `${60 + index * 50}ms` }}
                >
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {t[CATEGORY_KEYS[article.category]]}
                  </p>
                  <h2 className="mt-1 font-serif text-xl text-card-foreground">{copy.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {activeArticle && activeCopy ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-[env(safe-area-inset-bottom)] sm:items-center sm:p-6">
          <button
            type="button"
            aria-label={t.close}
            onClick={closeOverlay}
            className={closing ? "animate-overlay-out absolute inset-0 bg-foreground/40" : "animate-overlay-in absolute inset-0 bg-foreground/40"}
          />
          <article
            role="dialog"
            aria-modal="true"
            aria-label={activeCopy.title}
            onAnimationEnd={(event) => {
              if (event.target !== event.currentTarget) return;
              if (closing) {
                setActiveSlug(null);
                setClosing(false);
              }
            }}
            className={
              closing
                ? "animate-learn-card-out relative z-10 max-h-[88vh] w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl"
                : "animate-learn-card-in relative z-10 max-h-[88vh] w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl"
            }
          >
            <div className="border-b border-border px-5 py-4">
              <button
                type="button"
                onClick={closeOverlay}
                aria-label={t.close}
                className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
              >
                <X className="size-5" />
              </button>
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                {t[CATEGORY_KEYS[activeArticle.category]]}
              </p>
              <h2 className="mt-1 pr-10 font-serif text-2xl text-card-foreground">{activeCopy.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.learnReviewed}: {formatIsoUtc(activeArticle.reviewedAt, locale, { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="max-h-[calc(88vh-7rem)] space-y-4 overflow-y-auto px-5 py-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{activeCopy.summary}</p>
              {activeCopy.sections.map((section) => (
                <section key={section.heading} className="rounded-3xl bg-background p-4">
                  <h3 className="font-serif text-lg text-card-foreground">{section.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
                </section>
              ))}
              <p className="rounded-3xl border border-primary/20 bg-primary/8 p-4 text-sm leading-relaxed text-muted-foreground">
                {activeCopy.notice}
              </p>
              <section>
                <h3 className="font-serif text-lg text-foreground">{t.learnSources}</h3>
                <ul className="mt-2 flex flex-col gap-2 text-sm">
                  {activeArticle.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} className="text-primary underline" target="_blank" rel="noreferrer">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        </div>
      ) : null}
    </AppShell>
  );
}
