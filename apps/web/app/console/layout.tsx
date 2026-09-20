// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConsoleChrome } from "@/components/console/console-chrome";
import { consoleIsEnabled } from "@/lib/console/emails";

export const metadata: Metadata = {
  title: "Console · Ciclo",
  robots: { index: false, follow: false },
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  if (!consoleIsEnabled()) notFound();
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <ConsoleChrome />
      <div className="mx-auto w-full max-w-3xl px-5 py-10">{children}</div>
    </div>
  );
}
