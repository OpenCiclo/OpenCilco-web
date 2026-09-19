// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { useCiclo } from "@/lib/client/ciclo-context";
import { articleCopy, findArticle, type LearnCategory } from "@/lib/learn/articles";
import { formatIsoUtc } from "@/lib/format-date";
import type { Messages } from "@/lib/i18n";

const CATEGORY_KEYS: Record<LearnCategory, keyof Messages> = {
  cycle: "learnCategoryCycle",
  symptoms: "learnCategorySymptoms",
  mucus: "learnCategoryMucus",
  care: "learnCategoryCare",
};

export default function LearnArticlePage() {
  const params = useParams<{ slug: string }>();
  const { t, locale } = useCiclo();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const article = findArticle(slug ?? "");
  if (!article) {
    return (
      <AppShell>
        <Link href="/learn" className="text-sm font-medium text-primary underline">
          {t.backToLearn}
        </Link>
      </AppShell>
    );
  }
  const copy = articleCopy(article, locale);

  return (
    <AppShell>
      <article className="flex flex-col gap-5 pb-4">
        <header className="animate-fade-up">
          <Link href="/learn" className="text-sm font-medium text-primary underline">
            {t.backToLearn}
          </Link>
          <p className="mt-3 text-xs font-semibold tracking-wide text-primary uppercase">
            {t[CATEGORY_KEYS[article.category]]}
          </p>
          <h1 className="mt-1 font-serif text-3xl leading-tight text-foreground">{copy.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.learnReviewed}: {formatIsoUtc(article.reviewedAt, locale, { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </header>
        <p className="text-sm leading-relaxed text-muted-foreground">{copy.summary}</p>
        {copy.sections.map((section) => (
          <section key={section.heading} className="rounded-3xl bg-card p-5 shadow-sm">
            <h2 className="font-serif text-lg text-card-foreground">{section.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
          </section>
        ))}
        <p className="rounded-3xl border border-primary/20 bg-primary/8 p-4 text-sm leading-relaxed text-muted-foreground">
          {copy.notice}
        </p>
        <section>
          <h2 className="font-serif text-lg text-foreground">{t.learnSources}</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm">
            {article.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} className="text-primary underline" target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </AppShell>
  );
}
