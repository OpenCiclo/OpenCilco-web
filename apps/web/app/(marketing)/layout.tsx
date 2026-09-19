// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Metadata } from "next";

import { MarketingShell } from "@/components/marketing/marketing-shell";

export const metadata: Metadata = {
  title: "OpenCiclo — Pronósticos de ciclo, privados por diseño",
  description:
    "OpenCiclo sigue y pronostica tu ciclo menstrual cifrando tu diario en tu navegador. Código abierto, sin rastreo. No es un dispositivo médico ni un método anticonceptivo.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <MarketingShell>{children}</MarketingShell>;
}
