// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { Suspense } from "react";

import { useCiclo } from "@/lib/client/ciclo-context";
import { AppShell } from "@/components/app-shell";
import { CalendarScreen } from "@/components/calendar/calendar-screen";
import { WelcomeScreen } from "@/components/welcome-screen";

export function HomeView() {
  const { ready, wallet } = useCiclo();
  if (!ready) {
    return <div className="p-8 text-sm text-muted-foreground">…</div>;
  }
  if (!wallet) {
    return (
      <AppShell>
        <WelcomeScreen />
      </AppShell>
    );
  }
  return (
    <AppShell>
      <Suspense fallback={<p className="text-sm text-muted-foreground">…</p>}>
        <CalendarScreen />
      </Suspense>
    </AppShell>
  );
}
