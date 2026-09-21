// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { afterEach, describe, expect, it, vi } from "vitest";

import { InvalidCredentialsError, fetchRemoteKit, maskEmail, normalizeEmail } from "./kit-store";

describe("kit-store", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("normalizes email addresses", () => {
    expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
  });

  it("masks local mailbox labels for the confirmation screen", () => {
    expect(maskEmail("bob@example.com")).toBe("b***@example.com");
    expect(maskEmail("  Ada@OpenCiclo.com ")).toBe("a***@openciclo.com");
  });

  it("throws InvalidCredentialsError when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("{}", { status: 404 })),
    );
    await expect(fetchRemoteKit("missing@example.com")).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("returns wrapped kit when fetch succeeds", async () => {
    const kit = {
      wrappedSecret: "abc",
      wrapNonce: "def",
      wrapSalt: "ghi",
      wrapParams: { kdf: "pbkdf2-sha256" as const, iterations: 600_000, hash: "SHA-256" as const },
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json(kit)),
    );
    await expect(fetchRemoteKit("user@example.com")).resolves.toEqual(kit);
  });
});
