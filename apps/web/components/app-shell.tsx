// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useCiclo } from "@/lib/client/ciclo-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useCiclo();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
      <p className="border-b border-border px-4 py-2 text-center text-xs text-muted-foreground">
        {t.disclaimer}
      </p>
      <main id="main-content" className="flex-1 px-5 pt-6 pb-28">
        {children}
      </main>
    </div>
  );
}
