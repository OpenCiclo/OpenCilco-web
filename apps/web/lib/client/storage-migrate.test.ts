// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  MNEMONIC_KEY,
  PERSIST_UNLOCK_KEY,
  clearStoredMnemonic,
  parseLunarPhasesEnabled,
  parseLunarPhasesVisible,
  parseVisualSeasons,
  readUnlockState,
  writeStoredMnemonic,
} from "./storage-migrate";

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear() {
      data.clear();
    },
    getItem(key) {
      return data.has(key) ? data.get(key)! : null;
    },
    key(index) {
      return [...data.keys()][index] ?? null;
    },
    removeItem(key) {
      data.delete(key);
    },
    setItem(key, value) {
      data.set(String(key), String(value));
    },
  };
}

describe("visual seasons preference", () => {
  it("only enables the mode for an explicit true value", () => {
    expect(parseVisualSeasons("true")).toBe(true);
    expect(parseVisualSeasons("false")).toBe(false);
    expect(parseVisualSeasons(null)).toBe(false);
  });
});

describe("lunar phase preferences", () => {
  it("enables the master feature by default", () => {
    expect(parseLunarPhasesEnabled(null)).toBe(true);
    expect(parseLunarPhasesEnabled("true")).toBe(true);
    expect(parseLunarPhasesEnabled("false")).toBe(false);
  });

  it("keeps the calendar band hidden by default", () => {
    expect(parseLunarPhasesVisible(null)).toBe(false);
    expect(parseLunarPhasesVisible("false")).toBe(false);
    expect(parseLunarPhasesVisible("true")).toBe(true);
  });
});

describe("persist unlock storage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function stubStores() {
    const local = memoryStorage();
    const session = memoryStorage();
    vi.stubGlobal("localStorage", local);
    vi.stubGlobal("sessionStorage", session);
    return { local, session };
  }

  it("writes the mnemonic to localStorage when persist is on", () => {
    const { local, session } = stubStores();
    writeStoredMnemonic("alpha beta", true);
    expect(session.getItem(MNEMONIC_KEY)).toBe("alpha beta");
    expect(local.getItem(MNEMONIC_KEY)).toBe("alpha beta");
    expect(local.getItem(PERSIST_UNLOCK_KEY)).toBe("true");
    expect(readUnlockState()).toEqual({
      mnemonic: "alpha beta",
      persist: true,
      persistCookie: true,
    });
  });

  it("keeps the mnemonic in sessionStorage only when persist is off", () => {
    const { local, session } = stubStores();
    writeStoredMnemonic("alpha beta", false);
    expect(session.getItem(MNEMONIC_KEY)).toBe("alpha beta");
    expect(local.getItem(MNEMONIC_KEY)).toBeNull();
    expect(local.getItem(PERSIST_UNLOCK_KEY)).toBe("false");
    expect(readUnlockState()).toEqual({
      mnemonic: "alpha beta",
      persist: false,
      persistCookie: false,
    });
  });

  it("clears both stores on sign-out", () => {
    const { local, session } = stubStores();
    writeStoredMnemonic("alpha beta", true);
    clearStoredMnemonic();
    expect(session.getItem(MNEMONIC_KEY)).toBeNull();
    expect(local.getItem(MNEMONIC_KEY)).toBeNull();
    expect(local.getItem(PERSIST_UNLOCK_KEY)).toBeNull();
    expect(readUnlockState().mnemonic).toBeNull();
  });
});
