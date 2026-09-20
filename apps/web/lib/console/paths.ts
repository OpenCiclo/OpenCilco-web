// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

const CONSOLE_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isSafeConsoleNextPath(path: string): boolean {
  if (path === "/console") return true;
  if (!path.startsWith("/console/")) return false;
  if (path.includes("..") || path.includes("//") || path.includes("\\") || path.includes("?") || path.includes("#")) {
    return false;
  }
  const rest = path.slice("/console/".length);
  if (!rest) return false;
  return rest.split("/").every((segment) => CONSOLE_SEGMENT.test(segment));
}

export function safeConsoleNextPath(raw: string | null | undefined): string | null {
  if (!raw) return null;
  return isSafeConsoleNextPath(raw) ? raw : null;
}

export function unlockDestination(raw: string | null | undefined): string {
  return safeConsoleNextPath(raw) ?? "/app";
}
