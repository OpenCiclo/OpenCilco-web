// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { hmac } from "@noble/hashes/hmac.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { cookies } from "next/headers";

import { bytesToHex, hexToBytes, utf8ToBytes } from "@/lib/crypto/bytes";
import { requireSecret } from "@/lib/server/env";

const COOKIE = "ciclo_session";
const LEGACY_COOKIE = "oddy_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type SessionPayload = {
  h: string;
  e: number;
};

function sessionCookieSecure(): boolean {
  if (process.env.SESSION_COOKIE_SECURE === "true") return true;
  if (process.env.SESSION_COOKIE_SECURE === "false") return false;
  return process.env.NODE_ENV === "production";
}

function sign(payload: string): string {
  const secret = requireSecret("SESSION_SECRET");
  return bytesToHex(hmac(sha256, utf8ToBytes(secret), utf8ToBytes(payload)));
}

function parseSession(raw: string | undefined): { pubkeyHash: string } | null {
  if (!raw) return null;
  const [encoded, mac] = raw.split(".");
  if (!encoded || !mac) return null;
  const body = Buffer.from(encoded, "base64url").toString("utf8");
  if (sign(body) !== mac) return null;
  const payload = JSON.parse(body) as SessionPayload;
  if (!payload.h || payload.e < Math.floor(Date.now() / 1000)) return null;
  if (hexToBytes(payload.h).length !== 32) return null;
  return { pubkeyHash: payload.h };
}

export async function setSessionCookie(pubkeyHash: string): Promise<void> {
  const payload: SessionPayload = {
    h: pubkeyHash,
    e: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
  };
  const body = JSON.stringify(payload);
  const value = `${Buffer.from(body).toString("base64url")}.${sign(body)}`;
  const store = await cookies();
  store.set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: sessionCookieSecure(),
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  store.delete(LEGACY_COOKIE);
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
  store.delete(LEGACY_COOKIE);
}

export async function readSession(): Promise<{ pubkeyHash: string } | null> {
  const store = await cookies();
  const current = parseSession(store.get(COOKIE)?.value);
  if (current) return current;
  return parseSession(store.get(LEGACY_COOKIE)?.value);
}
