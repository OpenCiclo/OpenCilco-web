// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Locale } from "@/lib/i18n";

export function formatIsoUtc(
  iso: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es" : "en", {
    ...options,
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
