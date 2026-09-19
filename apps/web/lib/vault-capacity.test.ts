// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { MAX_VAULT_CIPHERTEXT_LENGTH } from "@/lib/server/vault-limits";

describe("vault capacity", () => {
  it("allows multi-year short daily notes under the ciphertext cap", () => {
    expect(MAX_VAULT_CIPHERTEXT_LENGTH).toBe(2_000_000);
    // Rough upper bound: 200 chars/day * 365 * 12 years, UTF-8 JSON + base64 overhead.
    const roughPlainChars = 200 * 365 * 12;
    const roughCipherChars = Math.ceil(roughPlainChars * 1.4);
    expect(roughCipherChars).toBeLessThan(MAX_VAULT_CIPHERTEXT_LENGTH);
  });
});
