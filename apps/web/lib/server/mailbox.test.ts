// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { afterEach, describe, expect, it } from "vitest";

import {
  hashMailboxCode,
  mailboxCodesEqual,
  mailboxIsFetchable,
  mailboxRegisterAction,
  parseMailboxCode,
  pendingIsExpired,
  shouldInvalidatePending,
} from "./mailbox";

describe("mailbox confirmation", () => {
  afterEach(() => {
    delete process.env.EMAIL_LOOKUP_SECRET;
  });

  it("does not claim a mailbox until confirm (start-pending)", () => {
    expect(mailboxRegisterAction({ existingMailbox: null, accountId: "a" })).toBe("start-pending");
  });

  it("updates wrap on the account's own mailbox without a new code", () => {
    expect(
      mailboxRegisterAction({ existingMailbox: { accountId: "a" }, accountId: "a" }),
    ).toBe("update-wrap");
  });

  it("does not send mail when another account already claimed the lookup", () => {
    expect(
      mailboxRegisterAction({ existingMailbox: { accountId: "bob" }, accountId: "alice" }),
    ).toBe("reject-taken");
  });

  it("fetch ignores pending or unverified kits", () => {
    expect(mailboxIsFetchable({ wrappedSecret: "wrapped", verifiedAt: null })).toBe(false);
    expect(mailboxIsFetchable({ wrappedSecret: null, verifiedAt: new Date() })).toBe(false);
  });

  it("fetch returns a verified mailbox kit", () => {
    expect(mailboxIsFetchable({ wrappedSecret: "wrapped", verifiedAt: new Date() })).toBe(true);
  });

  it("parses a 6-digit code and rejects other shapes", () => {
    expect(parseMailboxCode("123456")).toBe("123456");
    expect(parseMailboxCode(" 12 3456 ")).toBe("123456");
    expect(parseMailboxCode("12345")).toBeNull();
    expect(parseMailboxCode("abcdef")).toBeNull();
    expect(parseMailboxCode(123456)).toBeNull();
  });

  it("hashes codes with HMAC and compares in constant time", () => {
    process.env.EMAIL_LOOKUP_SECRET = "test-email-hmac-secret";
    const hash = hashMailboxCode("123456");
    expect(hash).not.toContain("123456");
    expect(hash).toHaveLength(64);
    expect(mailboxCodesEqual(hash, hashMailboxCode("123456"))).toBe(true);
    expect(mailboxCodesEqual(hash, hashMailboxCode("000000"))).toBe(false);
  });

  it("invalidates pending after expiry or too many attempts", () => {
    expect(shouldInvalidatePending({ attemptCount: 4, expired: false })).toBe(false);
    expect(shouldInvalidatePending({ attemptCount: 5, expired: false })).toBe(true);
    expect(shouldInvalidatePending({ attemptCount: 1, expired: true })).toBe(true);
    expect(pendingIsExpired(new Date(Date.now() - 1000))).toBe(true);
    expect(pendingIsExpired(new Date(Date.now() + 60_000))).toBe(false);
  });
});
