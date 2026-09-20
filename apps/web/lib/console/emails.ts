// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

export function parseConsoleEmails(raw: string | undefined): string[] {
  if (!raw) return [];
  const emails = raw
    .split(/[,;\s]+/)
    .map((value) => value.trim().toLowerCase())
    .filter((value) => value.includes("@") && value.includes("."));
  return [...new Set(emails)];
}

export function consoleIsEnabled(raw: string | undefined = process.env.CONSOLE_EMAILS): boolean {
  return parseConsoleEmails(raw).length > 0;
}
