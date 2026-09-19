// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { CYCLE_SEASONS } from "@/lib/cycle/phases";
import { seasonGuide, seasonGuideComplete } from "@/lib/cycle/season-guide";

describe("season guide copy", () => {
  it("has complete copy for every season and locale", () => {
    expect(seasonGuideComplete()).toBe(true);
  });

  it("returns the matching locale", () => {
    expect(seasonGuide("spring", "en").meaning).toMatch(/follicular/i);
    expect(seasonGuide("spring", "es").meaning).toMatch(/folicular/i);
  });

  it("covers all visual seasons", () => {
    for (const season of CYCLE_SEASONS) {
      expect(seasonGuide(season, "en").do.length).toBeGreaterThanOrEqual(3);
      expect(seasonGuide(season, "es").dont.length).toBeGreaterThanOrEqual(3);
    }
  });
});
