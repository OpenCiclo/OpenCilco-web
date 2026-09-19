// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { readFileSync } from "node:fs";
import { join } from "node:path";

export function helpContentDir(): string {
  return join(process.cwd(), "content", "help");
}

export function loadHelpMarkdown(slug: string): string {
  return readFileSync(join(helpContentDir(), `${slug}.md`), "utf8");
}

export function stripLeadingH1(source: string): string {
  return source.replace(/^# [^\n]+\n+/, "");
}
