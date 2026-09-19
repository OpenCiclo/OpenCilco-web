// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";

import { InvalidPhraseError } from "./wallet";

export const PHRASE_QR_PREFIX = "ciclo:v1:";

function normalizePhrase(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

export function encodePhraseQr(mnemonic: string): string {
  const normalized = normalizePhrase(mnemonic);
  if (!validateMnemonic(normalized, wordlist)) {
    throw new InvalidPhraseError();
  }
  return `${PHRASE_QR_PREFIX}${normalized}`;
}

export function parsePhraseQr(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (/^https?:/i.test(trimmed)) return null;

  const prefix = trimmed.match(/^ciclo:v1:/i);
  const payload = prefix ? trimmed.slice(prefix[0].length) : trimmed;
  if (/^https?:/i.test(payload.trim())) return null;

  const normalized = normalizePhrase(payload);
  if (!normalized || !validateMnemonic(normalized, wordlist)) {
    return null;
  }
  return normalized;
}
