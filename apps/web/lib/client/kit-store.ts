// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { WrappedKit } from "@/lib/crypto/wrap";

const KITS_KEY = "ciclo.kits";
const LAST_EMAIL_KEY = "ciclo.lastEmail";

export class InvalidCredentialsError extends Error {
  constructor() {
    super("INVALID_CREDENTIALS");
    this.name = "InvalidCredentialsError";
  }
}

export class MailNotConfiguredError extends Error {
  constructor() {
    super("MAIL_NOT_CONFIGURED");
    this.name = "MailNotConfiguredError";
  }
}

export class RateLimitedError extends Error {
  constructor() {
    super("RATE_LIMITED");
    this.name = "RateLimitedError";
  }
}

export class InvalidConfirmError extends Error {
  constructor() {
    super("INVALID_CONFIRM");
    this.name = "InvalidConfirmError";
  }
}

function hasBrowserStorage() {
  return typeof window !== "undefined";
}

function loadAll(): Record<string, WrappedKit> {
  if (!hasBrowserStorage()) return {};
  try {
    const raw = localStorage.getItem(KITS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, WrappedKit>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function maskEmail(email: string): string {
  const normalized = normalizeEmail(email);
  const at = normalized.indexOf("@");
  if (at <= 0 || at === normalized.length - 1) return "***";
  const local = normalized.slice(0, at);
  const domain = normalized.slice(at + 1);
  return `${local.charAt(0)}***@${domain}`;
}

export function saveLocalKit(email: string, kit: WrappedKit) {
  if (!hasBrowserStorage()) return;
  const normalized = normalizeEmail(email);
  const all = loadAll();
  all[normalized] = kit;
  localStorage.setItem(KITS_KEY, JSON.stringify(all));
  localStorage.setItem(LAST_EMAIL_KEY, normalized);
}

export function loadLocalKit(email: string): WrappedKit | null {
  return loadAll()[normalizeEmail(email)] ?? null;
}

export function lastEmail(): string {
  if (!hasBrowserStorage()) return "";
  return localStorage.getItem(LAST_EMAIL_KEY) ?? "";
}

export function clearLocalKits() {
  if (!hasBrowserStorage()) return;
  localStorage.removeItem(KITS_KEY);
  localStorage.removeItem(LAST_EMAIL_KEY);
}

export async function fetchRemoteKit(email: string): Promise<WrappedKit> {
  const response = await fetch("/api/recovery/fetch", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: normalizeEmail(email) }),
  });
  if (!response.ok) throw new InvalidCredentialsError();
  return (await response.json()) as WrappedKit;
}
