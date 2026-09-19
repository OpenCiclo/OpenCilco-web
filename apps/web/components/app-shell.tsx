// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useCiclo } from "@/lib/client/ciclo-context";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t, wallet } = useCiclo();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
      <main id="main-content" className="flex-1 px-5 pt-6 pb-8">
        {children}
      </main>
      <p
        className={cn(
          "mt-auto border-t border-border px-4 pt-3 text-center text-xs text-muted-foreground",
          wallet ? "pb-28" : "pb-6",
        )}
      >
        {t.disclaimer}
      </p>
    </div>
  );
}
