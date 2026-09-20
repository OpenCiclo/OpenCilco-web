// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useCiclo } from "@/lib/client/ciclo-context";
import { consoleCopy } from "@/lib/console/copy";

export function ConsoleForbidden() {
  const { locale } = useCiclo();
  const copy = consoleCopy(locale);
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-serif text-3xl tracking-tight">{copy.forbiddenTitle}</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">{copy.forbiddenBody}</p>
    </div>
  );
}
