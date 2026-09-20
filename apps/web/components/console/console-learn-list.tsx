// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";

import { useCiclo } from "@/lib/client/ciclo-context";
import { consoleCopy } from "@/lib/console/copy";
import type { ConsoleLearnListItem } from "@/lib/learn/catalog";
export function ConsoleLearnList({ items }: { items: ConsoleLearnListItem[] }) {
  const { locale } = useCiclo();
  const copy = consoleCopy(locale);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl tracking-tight">{copy.learnListTitle}</h1>
        <Link
          href="/console/learn/new"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {copy.newArticle}
        </Link>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/console/learn/${item.slug}`}
              className="block rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                <span className={item.status === "published" ? "text-primary" : "text-muted-foreground"}>
                  {item.status === "published" ? copy.statusPublished : copy.statusDraft}
                </span>
                <span className="text-muted-foreground">
                  {item.origin === "shipped" ? copy.originShipped : copy.originDatabase}
                </span>
              </div>
              <p className="mt-1 font-serif text-xl">{locale === "es" ? item.titleEs : item.titleEn}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.slug}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
