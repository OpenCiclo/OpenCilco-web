// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarDays, LineChart, Settings } from "lucide-react";

import { useCiclo } from "@/lib/client/ciclo-context";
import { cn } from "@/lib/utils";

export function FloatingTabBar() {
  const { t, wallet } = useCiclo();
  const pathname = usePathname();
  if (
    !wallet ||
    pathname === "/" ||
    pathname.startsWith("/dev-") ||
    pathname.startsWith("/help") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/console")
  )
    return null;

  const items = [
    { href: "/app", label: t.calendar, icon: CalendarDays },
    { href: "/patterns", label: t.patterns, icon: LineChart },
    { href: "/learn", label: t.learn, icon: BookOpen },
    { href: "/settings", label: t.settings, icon: Settings },
  ];
  const activeIndex = items.findIndex(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  const bubbleIndex = Math.max(0, activeIndex);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-4 mb-4 rounded-full border border-border bg-card/90 p-1.5 shadow-lg backdrop-blur-md">
        <div className="relative grid grid-cols-4">
          <span
            aria-hidden
            className="tab-bubble pointer-events-none absolute inset-y-0 left-0 w-1/4 rounded-full bg-primary shadow-sm"
            style={{ transform: `translateX(${bubbleIndex * 100}%)` }}
          />
          {items.map((item, index) => {
            const active = index === bubbleIndex && activeIndex >= 0;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative z-10 flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-2 text-[11px] font-semibold",
                  active ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
