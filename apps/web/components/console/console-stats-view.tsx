// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useCiclo } from "@/lib/client/ciclo-context";
import { consoleCopy } from "@/lib/console/copy";
import type { ConsoleStats } from "@/lib/server/console-stats";
import { Card } from "@/components/ui/card";

export function ConsoleStatsView({ stats }: { stats: ConsoleStats }) {
  const { locale } = useCiclo();
  const copy = consoleCopy(locale);
  const maxDay = Math.max(1, ...stats.accountsByDay.map((row) => row.count));

  const cards = [
    { label: copy.accountsTotal, value: stats.accountsTotal },
    { label: copy.accountsNew7d, value: stats.accountsNew7d },
    { label: copy.accountsNew30d, value: stats.accountsNew30d },
    { label: copy.emailAccounts, value: stats.emailAccounts },
    { label: copy.phraseOnly, value: stats.phraseOnlyAccounts },
    { label: copy.hostedDiaries, value: stats.hostedDiaries },
    { label: copy.diariesSaved7d, value: stats.diariesSaved7d },
    { label: copy.diariesSaved30d, value: stats.diariesSaved30d },
    { label: copy.researchRows, value: stats.researchRows },
    { label: copy.researchNew30d, value: stats.researchNew30d },
    { label: copy.learnPublishedDb, value: stats.learnPublishedDb },
    { label: copy.learnDraftsDb, value: stats.learnDraftsDb },
    { label: copy.learnPublic, value: stats.learnPublic },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl tracking-tight">{copy.overview}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.statsIntro}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.label} className="flex flex-col gap-1">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{card.label}</p>
            <p className="font-serif text-3xl tracking-tight">{card.value}</p>
          </Card>
        ))}
      </div>
      <div>
        <h2 className="text-sm font-semibold">{copy.signups28d}</h2>
        <div className="mt-3 flex h-32 items-end gap-1">
          {stats.accountsByDay.map((row) => (
            <div
              key={row.day}
              title={`${row.day}: ${row.count}`}
              className="flex-1 rounded-t bg-primary/80"
              style={{ height: `${Math.max(6, (row.count / maxDay) * 100)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
