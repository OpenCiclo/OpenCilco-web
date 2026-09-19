// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { hmac } from "@noble/hashes/hmac.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@/lib/crypto/bytes";

export function requireSecret(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

export function appUrl(): string {
  return process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function mailFrom(): string {
  return process.env.MAIL_FROM ?? "Ciclo <noreply@localhost>";
}

export function emailLookup(email: string): string {
  const secret = requireSecret("EMAIL_LOOKUP_SECRET");
  const normalized = email.trim().toLowerCase();
  return bytesToHex(hmac(sha256, utf8ToBytes(secret), utf8ToBytes(normalized)));
}

export function hashIp(ip: string): string {
  const secret = requireSecret("EMAIL_LOOKUP_SECRET");
  return bytesToHex(hmac(sha256, utf8ToBytes(secret), utf8ToBytes(ip)));
}

export function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}
