// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { parseColorScheme, resolvedDark } from "./color-scheme";

describe("color scheme", () => {
  it("defaults to the system and accepts light or dark", () => {
    expect(parseColorScheme(null)).toBe("system");
    expect(parseColorScheme("nope")).toBe("system");
    expect(parseColorScheme("light")).toBe("light");
    expect(parseColorScheme("dark")).toBe("dark");
  });

  it("follows the system only when that mode is selected", () => {
    expect(resolvedDark("system", true)).toBe(true);
    expect(resolvedDark("system", false)).toBe(false);
    expect(resolvedDark("dark", false)).toBe(true);
    expect(resolvedDark("light", true)).toBe(false);
  });
});
