// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { timingSafeEqual, randomInt } from "node:crypto";

import { hmac } from "@noble/hashes/hmac.js";
import { sha256 } from "@noble/hashes/sha2.js";

import { bytesToHex, hexToBytes, utf8ToBytes } from "@/lib/crypto/bytes";
import { requireSecret } from "@/lib/server/env";

export const MAILBOX_CODE_TTL_MS = 15 * 60 * 1000;
export const MAILBOX_CODE_MAX_ATTEMPTS = 5;
export const MAILBOX_SEND_MAX_PER_HOUR = 3;

export type MailboxRegisterAction = "update-wrap" | "reject-taken" | "start-pending";

export function mailboxRegisterAction(args: {
  existingMailbox: { accountId: string } | null;
  accountId: string;
}): MailboxRegisterAction {
  if (!args.existingMailbox) return "start-pending";
  if (args.existingMailbox.accountId === args.accountId) return "update-wrap";
  return "reject-taken";
}

export function mailboxIsFetchable(row: {
  wrappedSecret: string | null | undefined;
  verifiedAt: Date | null | undefined;
}): boolean {
  return Boolean(row.wrappedSecret) && row.verifiedAt != null;
}

export function parseMailboxCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const digits = raw.replace(/\s/g, "");
  if (!/^\d{6}$/.test(digits)) return null;
  return digits;
}

export function parseMailLocale(raw: unknown): "es" | "en" {
  return raw === "en" ? "en" : "es";
}

export function generateMailboxCode(): string {
  return String(randomInt(100000, 1000000));
}

export function hashMailboxCode(code: string): string {
  const secret = requireSecret("EMAIL_LOOKUP_SECRET");
  return bytesToHex(hmac(sha256, utf8ToBytes(secret), utf8ToBytes(`mailbox-code:${code}`)));
}

export function mailboxCodesEqual(leftHash: string, rightHash: string): boolean {
  try {
    const left = hexToBytes(leftHash);
    const right = hexToBytes(rightHash);
    if (left.length !== right.length || left.length === 0) return false;
    return timingSafeEqual(Buffer.from(left), Buffer.from(right));
  } catch {
    return false;
  }
}

export function pendingIsExpired(expiresAt: Date, now = new Date()): boolean {
  return expiresAt.getTime() <= now.getTime();
}

export function shouldInvalidatePending(args: { attemptCount: number; expired: boolean }): boolean {
  return args.expired || args.attemptCount >= MAILBOX_CODE_MAX_ATTEMPTS;
}
