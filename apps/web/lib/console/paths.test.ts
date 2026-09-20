// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { consoleIsEnabled, parseConsoleEmails } from "./emails";
import { isSafeConsoleNextPath, unlockDestination } from "./paths";

describe("parseConsoleEmails", () => {
  it("returns empty when unset", () => {
    expect(parseConsoleEmails(undefined)).toEqual([]);
    expect(parseConsoleEmails("")).toEqual([]);
    expect(parseConsoleEmails("   ")).toEqual([]);
    expect(consoleIsEnabled(undefined)).toBe(false);
  });

  it("normalizes a comma-separated allowlist", () => {
    expect(parseConsoleEmails("Ops@Example.com, other@example.com")).toEqual([
      "ops@example.com",
      "other@example.com",
    ]);
  });
});

describe("safe console next path", () => {
  it("allows only /console paths", () => {
    expect(isSafeConsoleNextPath("/console")).toBe(true);
    expect(isSafeConsoleNextPath("/console/learn")).toBe(true);
    expect(isSafeConsoleNextPath("/console/learn/cycle-phases")).toBe(true);
    expect(isSafeConsoleNextPath("/app")).toBe(false);
    expect(isSafeConsoleNextPath("//evil")).toBe(false);
    expect(isSafeConsoleNextPath("/console/../app")).toBe(false);
    expect(isSafeConsoleNextPath("https://evil.example/console")).toBe(false);
    expect(unlockDestination(null)).toBe("/app");
    expect(unlockDestination("/console/learn")).toBe("/console/learn");
    expect(unlockDestination("/unlock")).toBe("/app");
  });
});
