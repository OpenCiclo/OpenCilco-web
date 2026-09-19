// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import {
  parseLunarPhasesEnabled,
  parseLunarPhasesVisible,
  parseVisualSeasons,
} from "./storage-migrate";

describe("visual seasons preference", () => {
  it("only enables the mode for an explicit true value", () => {
    expect(parseVisualSeasons("true")).toBe(true);
    expect(parseVisualSeasons("false")).toBe(false);
    expect(parseVisualSeasons(null)).toBe(false);
  });
});

describe("lunar phase preferences", () => {
  it("enables the master feature by default", () => {
    expect(parseLunarPhasesEnabled(null)).toBe(true);
    expect(parseLunarPhasesEnabled("true")).toBe(true);
    expect(parseLunarPhasesEnabled("false")).toBe(false);
  });

  it("keeps the calendar band hidden by default", () => {
    expect(parseLunarPhasesVisible(null)).toBe(false);
    expect(parseLunarPhasesVisible("false")).toBe(false);
    expect(parseLunarPhasesVisible("true")).toBe(true);
  });
});
