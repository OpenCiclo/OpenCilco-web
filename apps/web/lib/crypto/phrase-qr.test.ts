// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";
import { encode } from "uqr";

import { encodePhraseQr, parsePhraseQr, PHRASE_QR_PREFIX } from "./phrase-qr";
import { createWallet, InvalidPhraseError } from "./wallet";

describe("phrase QR payload", () => {
  it("round-trips a BIP39 mnemonic through ciclo:v1", () => {
    const { mnemonic } = createWallet();
    const payload = encodePhraseQr(mnemonic);
    expect(payload.startsWith(PHRASE_QR_PREFIX)).toBe(true);
    expect(payload.includes("://")).toBe(false);
    expect(parsePhraseQr(payload)).toBe(mnemonic);
  });

  it("accepts a raw 12-word mnemonic without the prefix", () => {
    const { mnemonic } = createWallet();
    expect(parsePhraseQr(`  ${mnemonic.toUpperCase()}  `)).toBe(mnemonic);
  });

  it("accepts a ciclo:v1 payload with extra whitespace after the prefix", () => {
    const { mnemonic } = createWallet();
    expect(parsePhraseQr(`ciclo:v1:   ${mnemonic}`)).toBe(mnemonic);
  });

  it("rejects http(s) URLs even if they contain a phrase", () => {
    const { mnemonic } = createWallet();
    expect(parsePhraseQr(`https://example.com/unlock?phrase=${mnemonic}`)).toBeNull();
    expect(parsePhraseQr(`http://localhost:3000/#${mnemonic}`)).toBeNull();
    expect(parsePhraseQr(`${PHRASE_QR_PREFIX}https://example.com/${mnemonic}`)).toBeNull();
  });

  it("rejects empty, garbage, and invalid checksums", () => {
    expect(parsePhraseQr("")).toBeNull();
    expect(parsePhraseQr("not a qr")).toBeNull();
    expect(parsePhraseQr(`${PHRASE_QR_PREFIX}abandon abandon abandon`)).toBeNull();
  });

  it("refuses to encode an invalid mnemonic", () => {
    expect(() => encodePhraseQr("not a phrase")).toThrow(InvalidPhraseError);
  });

  it("fits a ciclo:v1 payload in a high-ECC QR matrix", () => {
    const { mnemonic } = createWallet();
    const qr = encode(encodePhraseQr(mnemonic), { ecc: "H", border: 2 });
    expect(qr.size).toBeGreaterThan(20);
    expect(qr.data.some((row) => row.includes(true))).toBe(true);
  });
});
