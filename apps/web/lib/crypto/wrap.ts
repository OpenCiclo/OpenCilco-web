// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { bytesToBase64, base64ToBytes, bytesToUtf8, utf8ToBytes, toBufferSource } from "./bytes";
import { decryptAesGcm, encryptAesGcm } from "./aes";

export const PBKDF2_ITERATIONS = 600_000;
export const PBKDF2_HASH = "SHA-256";

export type WrapParams = {
  kdf: "pbkdf2-sha256";
  iterations: number;
  hash: "SHA-256";
};

export type WrappedKit = {
  wrappedSecret: string;
  wrapNonce: string;
  wrapSalt: string;
  wrapParams: WrapParams;
};

async function deriveWrapKey(passphrase: string, salt: Uint8Array): Promise<Uint8Array> {
  const material = await crypto.subtle.importKey(
    "raw",
    toBufferSource(utf8ToBytes(passphrase)),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: PBKDF2_HASH,
      salt: toBufferSource(salt),
      iterations: PBKDF2_ITERATIONS,
    },
    material,
    256,
  );
  return new Uint8Array(bits);
}

export async function wrapMnemonic(mnemonic: string, passphrase: string): Promise<WrappedKit> {
  if (passphrase.length < 8) {
    throw new Error("Passphrase must be at least 8 characters");
  }
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveWrapKey(passphrase, salt);
  const encrypted = await encryptAesGcm(key, utf8ToBytes(mnemonic));
  return {
    wrappedSecret: encrypted.ciphertext,
    wrapNonce: encrypted.nonce,
    wrapSalt: bytesToBase64(salt),
    wrapParams: {
      kdf: "pbkdf2-sha256",
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
  };
}

export async function unwrapMnemonic(kit: WrappedKit, passphrase: string): Promise<string> {
  const salt = base64ToBytes(kit.wrapSalt);
  const key = await deriveWrapKey(passphrase, salt);
  const plain = await decryptAesGcm(key, kit.wrappedSecret, kit.wrapNonce);
  return bytesToUtf8(plain);
}
