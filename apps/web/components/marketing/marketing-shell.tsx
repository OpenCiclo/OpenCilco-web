// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import { type ReactNode } from "react";

import { useCiclo } from "@/lib/client/ciclo-context";
import { otherLocale } from "@/lib/i18n";
import { marketingCopy } from "@/lib/marketing/copy";
import { Button } from "@/components/ui/button";

function NavLink({
  href,
  external,
  children,
  className,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  if (external || href.startsWith("#")) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function MarketingShell({ children }: { children: ReactNode }) {
  const { locale, setLocale } = useCiclo();
  const copy = marketingCopy(locale);

  return (
    <div className="marketing-theme flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <Link href="/site" className="flex items-center gap-2">
            <span aria-hidden className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <span className="size-2.5 rounded-full bg-primary-foreground" />
            </span>
            <span className="font-serif text-xl tracking-tight">{copy.brand}</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground lg:flex">
            {copy.nav.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                external={item.external}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocale(otherLocale(locale))}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              {copy.langToggle}
            </button>
            <Link
              href="/"
              className="inline-flex min-h-9 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {copy.openApp}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <Link href="/site" className="font-serif text-lg">
                {copy.brand}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.footer.disclaimer}</p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground">
              {copy.footer.links.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  external={item.external}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <p className="text-xs text-muted-foreground">{copy.footer.license}</p>
        </div>
      </footer>
    </div>
  );
}
