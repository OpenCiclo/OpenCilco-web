// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import Link from "next/link";

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="font-serif text-xl text-foreground">
            Ciclo
          </Link>
          <nav className="flex items-center gap-4 text-sm font-semibold">
            <Link href="/help" className="text-primary">
              Help
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-10">{children}</div>
      <footer className="border-t border-border">
        <p className="mx-auto max-w-3xl px-5 py-6 text-xs leading-relaxed text-muted-foreground">
          Ciclo provides cycle forecasts. Forecasts can be wrong. It is not a medical device, a diagnosis, or a
          contraceptive method. OpenCiclo / Ciclo · Apache License 2.0.
        </p>
      </footer>
    </div>
  );
}
