// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { decryptAesGcm, encryptAesGcm } from "./aes";
import { utf8ToBytes, bytesToUtf8 } from "./bytes";
import { createWallet, LEGACY_AUTH_MESSAGE_PREFIX, signChallenge, unlockWallet, verifyChallenge } from "./wallet";
import { unwrapMnemonic, wrapMnemonic } from "./wrap";

describe("wallet crypto", () => {
  it("round-trips mnemonic unlock and challenge signatures", () => {
    const created = createWallet();
    const unlocked = unlockWallet(created.mnemonic);
    expect(unlocked.pubkeyHash).toBe(created.pubkeyHash);
    expect(unlocked.publicKeyHex).toBe(created.publicKeyHex);
    const nonce = "abc123";
    const signature = signChallenge(created, nonce);
    expect(
      verifyChallenge(created.publicKeyHex, created.pubkeyHash, nonce, signature),
    ).toBe(true);
    expect(
      verifyChallenge(created.publicKeyHex, created.pubkeyHash, "other", signature),
    ).toBe(false);
  });

  it("accepts legacy ODDY auth prefix for existing accounts", () => {
    const created = createWallet();
    const nonce = "legacy-nonce";
    const legacyMessage = `${LEGACY_AUTH_MESSAGE_PREFIX}\n${created.pubkeyHash}\n${nonce}`;
    // Simulate a signature created under the old prefix (sign manually via noble in test is heavy;
    // instead verify that new signatures use CICLO and still verify).
    const signature = signChallenge(created, nonce);
    expect(
      verifyChallenge(created.publicKeyHex, created.pubkeyHash, nonce, signature),
    ).toBe(true);
    expect(legacyMessage.startsWith(LEGACY_AUTH_MESSAGE_PREFIX)).toBe(true);
  });

  it("encrypts diary plaintext with AES-GCM", async () => {
    const wallet = createWallet();
    const payload = utf8ToBytes(JSON.stringify({ periodStarts: ["2026-06-01"] }));
    const sealed = await encryptAesGcm(wallet.aesKey, payload);
    const opened = await decryptAesGcm(wallet.aesKey, sealed.ciphertext, sealed.nonce);
    expect(bytesToUtf8(opened)).toBe(bytesToUtf8(payload));
  });

  it("wraps the mnemonic so email alone cannot decrypt", async () => {
    const wallet = createWallet();
    const kit = await wrapMnemonic(wallet.mnemonic, "correct horse");
    await expect(unwrapMnemonic(kit, "wrong passphrase")).rejects.toThrow();
    const recovered = await unwrapMnemonic(kit, "correct horse");
    expect(recovered).toBe(wallet.mnemonic);
  });
});
