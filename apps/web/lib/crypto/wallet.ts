// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import * as ed25519 from "@noble/ed25519";
import { hkdf } from "@noble/hashes/hkdf.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { sha512 } from "@noble/hashes/sha2.js";

import { bytesToHex, hexToBytes, utf8ToBytes } from "./bytes";

ed25519.hashes.sha512 = sha512;

const AES_INFO = utf8ToBytes("oddy-aes-v1");
const SIGN_INFO = utf8ToBytes("oddy-sign-v1");
export const AUTH_MESSAGE_PREFIX = "CICLO-AUTH-V1";
export const LEGACY_AUTH_MESSAGE_PREFIX = "ODDY-AUTH-V1";

export class InvalidPhraseError extends Error {
  constructor() {
    super("Invalid recovery phrase");
    this.name = "InvalidPhraseError";
  }
}

function challengeBytes(prefix: string, pubkeyHash: string, nonce: string): Uint8Array {
  return utf8ToBytes(`${prefix}\n${pubkeyHash}\n${nonce}`);
}

export type Wallet = {
  mnemonic: string;
  aesKey: Uint8Array;
  signSeed: Uint8Array;
  publicKeyHex: string;
  pubkeyHash: string;
};

export function createMnemonic(): string {
  return generateMnemonic(wordlist, 128);
}

export function unlockWallet(mnemonic: string): Wallet {
  const normalized = mnemonic.trim().toLowerCase().replace(/\s+/g, " ");
  if (!validateMnemonic(normalized, wordlist)) {
    throw new InvalidPhraseError();
  }
  const seed = mnemonicToSeedSync(normalized);
  const aesKey = hkdf(sha256, seed, undefined, AES_INFO, 32);
  const signSeed = hkdf(sha256, seed, undefined, SIGN_INFO, 32);
  const publicKey = ed25519.getPublicKey(signSeed);
  const pubkeyHash = bytesToHex(sha256(publicKey));
  return {
    mnemonic: normalized,
    aesKey,
    signSeed,
    publicKeyHex: bytesToHex(publicKey),
    pubkeyHash,
  };
}

export function createWallet(): Wallet {
  return unlockWallet(createMnemonic());
}

export function challengeMessage(pubkeyHash: string, nonce: string): Uint8Array {
  return challengeBytes(AUTH_MESSAGE_PREFIX, pubkeyHash, nonce);
}

export function signChallenge(wallet: Wallet, nonce: string): string {
  const signature = ed25519.sign(challengeMessage(wallet.pubkeyHash, nonce), wallet.signSeed);
  return bytesToHex(signature);
}

export function verifyChallenge(
  publicKeyHex: string,
  pubkeyHash: string,
  nonce: string,
  signatureHex: string,
): boolean {
  const publicKey = hexToBytes(publicKeyHex);
  const expectedHash = bytesToHex(sha256(publicKey));
  if (expectedHash !== pubkeyHash) return false;
  for (const prefix of [AUTH_MESSAGE_PREFIX, LEGACY_AUTH_MESSAGE_PREFIX]) {
    if (
      ed25519.verify(
        hexToBytes(signatureHex),
        challengeBytes(prefix, pubkeyHash, nonce),
        publicKey,
      )
    ) {
      return true;
    }
  }
  return false;
}
