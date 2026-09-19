// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { signChallenge, type Wallet } from "@/lib/crypto/wallet";

async function parseJson(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new Error(payload.error ?? `HTTP ${response.status}`);
  }
  return payload;
}

export async function loginWithWallet(
  wallet: Wallet,
  vault?: { ciphertext: string; nonce: string; schemaVersion: number },
) {
  const challenge = await parseJson(
    await fetch("/api/auth/challenge", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ pubkeyHash: wallet.pubkeyHash }),
    }),
  );
  const nonce = (challenge as { nonce: string }).nonce;
  const signature = signChallenge(wallet, nonce);
  await parseJson(
    await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        pubkeyHash: wallet.pubkeyHash,
        pubkey: wallet.publicKeyHex,
        nonce,
        signature,
        ciphertext: vault?.ciphertext,
        nonceVault: vault?.nonce,
        schemaVersion: vault?.schemaVersion,
      }),
    }),
  );
}

export async function fetchVault(): Promise<{
  ciphertext: string;
  nonce: string;
  schemaVersion: number;
} | null> {
  const response = await fetch("/api/vault");
  if (response.status === 404 || response.status === 401) return null;
  const payload = (await parseJson(response)) as {
    ciphertext: string;
    nonce: string;
    schemaVersion: number;
  };
  if (!payload.ciphertext) return null;
  return payload;
}

export async function putVault(ciphertext: string, nonce: string, schemaVersion: number) {
  await parseJson(
    await fetch("/api/vault", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ciphertext, nonce, schemaVersion }),
    }),
  );
}

export async function deleteAccount() {
  await parseJson(await fetch("/api/account", { method: "DELETE" }));
}

export async function logoutSession() {
  await fetch("/api/auth/logout", { method: "POST" });
}
