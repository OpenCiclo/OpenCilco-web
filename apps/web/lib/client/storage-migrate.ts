// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

const STORAGE_MIGRATIONS: Array<{ legacy: string; next: string }> = [
  { legacy: "oddy.mnemonic", next: "ciclo.mnemonic" },
  { legacy: "oddy.locale", next: "ciclo.locale" },
  { legacy: "oddy.kits", next: "ciclo.kits" },
  { legacy: "oddy.lastEmail", next: "ciclo.lastEmail" },
];

export const MNEMONIC_KEY = "ciclo.mnemonic";
export const PERSIST_UNLOCK_KEY = "ciclo.persistUnlock";
export const LOCALE_KEY = "ciclo.locale";
export const VISUAL_SEASONS_KEY = "ciclo.visualSeasons";
export const LUNAR_PHASES_ENABLED_KEY = "ciclo.lunarPhasesEnabled";
export const LUNAR_PHASES_VISIBLE_KEY = "ciclo.lunarPhasesVisible";

function hasBrowserStorage() {
  return typeof localStorage !== "undefined" && typeof sessionStorage !== "undefined";
}

export type UnlockStoreState = {
  mnemonic: string | null;
  persist: boolean;
  persistCookie: boolean;
};

export function readUnlockState(): UnlockStoreState {
  if (!hasBrowserStorage()) {
    return { mnemonic: null, persist: false, persistCookie: true };
  }
  const flag = localStorage.getItem(PERSIST_UNLOCK_KEY);
  const localMnemonic = localStorage.getItem(MNEMONIC_KEY);
  const persist = flag === "true" || (flag === null && Boolean(localMnemonic));
  const persistCookie = flag !== "false";
  const mnemonic = persist
    ? localMnemonic ?? sessionStorage.getItem(MNEMONIC_KEY)
    : sessionStorage.getItem(MNEMONIC_KEY);
  return { mnemonic, persist, persistCookie };
}

export function writeStoredMnemonic(mnemonic: string, persist: boolean): void {
  if (!hasBrowserStorage()) return;
  sessionStorage.setItem(MNEMONIC_KEY, mnemonic);
  if (persist) {
    localStorage.setItem(MNEMONIC_KEY, mnemonic);
    localStorage.setItem(PERSIST_UNLOCK_KEY, "true");
    return;
  }
  localStorage.removeItem(MNEMONIC_KEY);
  localStorage.setItem(PERSIST_UNLOCK_KEY, "false");
}

export function clearStoredMnemonic(): void {
  if (!hasBrowserStorage()) return;
  sessionStorage.removeItem(MNEMONIC_KEY);
  localStorage.removeItem(MNEMONIC_KEY);
  localStorage.removeItem(PERSIST_UNLOCK_KEY);
}

export function parseVisualSeasons(value: string | null): boolean {
  return value === "true";
}

/** Master lunar feature switch. Defaults to enabled when unset. */
export function parseLunarPhasesEnabled(value: string | null): boolean {
  return value !== "false";
}

/** Calendar moon band visibility. Defaults to hidden when unset. */
export function parseLunarPhasesVisible(value: string | null): boolean {
  return value === "true";
}

export function migrateBrowserStorage(): void {
  if (typeof window === "undefined") return;

  for (const { legacy, next } of STORAGE_MIGRATIONS) {
    migrateKey(localStorage, legacy, next);
    migrateKey(sessionStorage, legacy, next);
  }
}

function migrateKey(store: Storage, legacy: string, next: string): void {
  if (store.getItem(next) !== null) {
    store.removeItem(legacy);
    return;
  }
  const value = store.getItem(legacy);
  if (value === null) return;
  store.setItem(next, value);
  store.removeItem(legacy);
}
