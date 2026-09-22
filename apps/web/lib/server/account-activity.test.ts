// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { mailboxIsConsoleAdmin } from "./account-activity";

describe("console admin visits", () => {
  it("skips a verified mailbox that matches the admin list", () => {
    expect(mailboxIsConsoleAdmin(["abc"], ["abc", "def"])).toBe(true);
    expect(mailboxIsConsoleAdmin(["zzz"], ["abc"])).toBe(false);
    expect(mailboxIsConsoleAdmin([], ["abc"])).toBe(false);
    expect(mailboxIsConsoleAdmin(["abc"], [])).toBe(false);
  });
});
