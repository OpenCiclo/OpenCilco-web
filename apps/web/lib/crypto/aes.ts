// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { bytesToBase64, base64ToBytes, toBufferSource } from "./bytes";

const AES_ALGORITHM = "AES-GCM";
const IV_LENGTH = 12;

async function importAesKey(raw: Uint8Array): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", toBufferSource(raw), AES_ALGORITHM, false, [
    "encrypt",
    "decrypt",
  ]);
}

export async function encryptAesGcm(
  rawKey: Uint8Array,
  plaintext: Uint8Array,
): Promise<{ ciphertext: string; nonce: string }> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await importAesKey(rawKey);
  const encrypted = await crypto.subtle.encrypt(
    { name: AES_ALGORITHM, iv: toBufferSource(iv) },
    key,
    toBufferSource(plaintext),
  );
  return {
    ciphertext: bytesToBase64(new Uint8Array(encrypted)),
    nonce: bytesToBase64(iv),
  };
}

export async function decryptAesGcm(
  rawKey: Uint8Array,
  ciphertextB64: string,
  nonceB64: string,
): Promise<Uint8Array> {
  const key = await importAesKey(rawKey);
  const iv = base64ToBytes(nonceB64);
  const data = base64ToBytes(ciphertextB64);
  const decrypted = await crypto.subtle.decrypt(
    { name: AES_ALGORITHM, iv: toBufferSource(iv) },
    key,
    toBufferSource(data),
  );
  return new Uint8Array(decrypted);
}
