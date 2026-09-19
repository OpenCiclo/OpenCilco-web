// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Metadata } from "next";
import Link from "next/link";

import { HELP_ARTICLES, HELP_SECTIONS, helpArticlesInSection } from "@/lib/help/articles";

export const metadata: Metadata = {
  title: "Help · Ciclo",
  description: "How Ciclo is hosted, how the diary is encrypted, and what the calendar labels mean.",
};

export default function HelpIndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">Help</p>
        <h1 className="font-serif text-4xl text-balance">How Ciclo works</h1>
        <p className="max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
          This is documentation of the app: hosting, encryption, forecasts, and UI labels. Health education (the
          cycle itself, symptoms, when to seek care) lives in the in-app Learn tab.
        </p>
      </header>
      {HELP_SECTIONS.map((section) => (
        <section key={section.id} className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">{section.title}</h2>
          <ul className="flex flex-col gap-3">
            {helpArticlesInSection(section.id).map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/help/${article.slug}`}
                  className="block rounded-3xl bg-card p-5 shadow-sm transition-transform active:scale-[0.99]"
                >
                  <h3 className="font-serif text-xl text-card-foreground">{article.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="text-sm text-muted-foreground">
        {HELP_ARTICLES.length} articles · English · no sign-in required
      </p>
    </div>
  );
}
