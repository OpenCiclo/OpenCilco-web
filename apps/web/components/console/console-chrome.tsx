// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/brand-mark";
import { useCiclo } from "@/lib/client/ciclo-context";
import { consoleCopy } from "@/lib/console/copy";
import { cn } from "@/lib/utils";

export function ConsoleChrome() {
  const { locale } = useCiclo();
  const copy = consoleCopy(locale);
  const pathname = usePathname();

  const links = [
    { href: "/console", label: copy.overview, exact: true },
    { href: "/console/learn", label: copy.learn, exact: false },
  ];

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/console" className="flex items-center gap-2 font-serif text-xl tracking-tight">
          <BrandMark />
          {copy.title}
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          {links.map((link) => {
            const active = link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(active ? "text-primary" : "text-muted-foreground hover:text-foreground")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
