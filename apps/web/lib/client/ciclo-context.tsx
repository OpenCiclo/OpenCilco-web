"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { decryptAesGcm, encryptAesGcm } from "@/lib/crypto/aes";
import { bytesToUtf8, utf8ToBytes } from "@/lib/crypto/bytes";
import { createWallet, unlockWallet, type Wallet } from "@/lib/crypto/wallet";
import { unwrapMnemonic, wrapMnemonic, type WrappedKit } from "@/lib/crypto/wrap";
import {
  deleteAccount,
  fetchVault,
  loginWithWallet,
  logoutSession,
  putVault,
} from "@/lib/client/api";
import {
  InvalidCredentialsError,
  clearLocalKits,
  fetchRemoteKit,
  lastEmail,
  loadLocalKit,
  normalizeEmail,
  saveLocalKit,
} from "@/lib/client/kit-store";
import {
  LOCALE_KEY,
  LUNAR_PHASES_ENABLED_KEY,
  LUNAR_PHASES_VISIBLE_KEY,
  MNEMONIC_KEY,
  VISUAL_SEASONS_KEY,
  migrateBrowserStorage,
  parseLunarPhasesEnabled,
  parseLunarPhasesVisible,
  parseVisualSeasons,
} from "@/lib/client/storage-migrate";
import { syncPoolIfDue, revokePoolContribution } from "@/lib/pool-sync";
import { DIARY_SCHEMA_VERSION, emptyDiary, parseDiary, type Diary } from "@/lib/diary";
import { messages, type Locale } from "@/lib/i18n";

type CicloContextValue = {
  ready: boolean;
  wallet: Wallet | null;
  diary: Diary;
  locale: Locale;
  visualSeasons: boolean;
  lunarPhasesEnabled: boolean;
  lunarPhasesVisible: boolean;
  t: (typeof messages)["es"];
  error: string | null;
  setLocale: (locale: Locale) => void;
  setVisualSeasons: (enabled: boolean) => void;
  setLunarPhasesEnabled: (enabled: boolean) => void;
  setLunarPhasesVisible: (visible: boolean) => void;
  startOnboarding: () => Wallet;
  unlock: (mnemonic: string, options?: { create?: boolean }) => Promise<void>;
  createEmailAccount: (email: string, password: string) => Promise<Wallet>;
  unlockWithPassword: (email: string, password: string) => Promise<void>;
  persistDiary: (next: Diary) => Promise<void>;
  enablePoolOptIn: () => Promise<void>;
  disablePoolOptIn: () => Promise<void>;
  wipe: () => Promise<void>;
  signOut: () => Promise<void>;
  setError: (message: string | null) => void;
};

const CicloContext = createContext<CicloContextValue | null>(null);

async function postRecoveryKit(email: string, kit: WrappedKit) {
  const response = await fetch("/api/recovery/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, ...kit }),
  });
  if (!response.ok) throw new Error("Recovery kit was not saved");
}

export function CicloProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [diary, setDiary] = useState<Diary>(emptyDiary("es"));
  const [visualSeasons, setVisualSeasonsState] = useState(false);
  const [lunarPhasesEnabled, setLunarPhasesEnabledState] = useState(true);
  const [lunarPhasesVisible, setLunarPhasesVisibleState] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locale = diary.locale;
  const t = messages[locale];

  const hydrate = useCallback(async (nextWallet: Wallet, fallbackLocale: Locale) => {
    sessionStorage.setItem(MNEMONIC_KEY, nextWallet.mnemonic);
    setWallet(nextWallet);
    const vault = await fetchVault();
    if (vault?.ciphertext) {
      const plain = await decryptAesGcm(nextWallet.aesKey, vault.ciphertext, vault.nonce);
      const loaded = parseDiary(bytesToUtf8(plain));
      setDiary(loaded);
      if (loaded.poolOptIn) {
        const synced = await syncPoolIfDue(loaded);
        if (synced.poolLastSyncedAt !== loaded.poolLastSyncedAt) {
          setDiary(synced);
          const sealed = await encryptAesGcm(nextWallet.aesKey, utf8ToBytes(JSON.stringify(synced)));
          await putVault(sealed.ciphertext, sealed.nonce, synced.schemaVersion);
        }
      }
    } else {
      setDiary(emptyDiary(fallbackLocale));
    }
  }, []);

  useEffect(() => {
    migrateBrowserStorage();
    const storedLocale = (localStorage.getItem(LOCALE_KEY) as Locale | null) ?? "es";
    const mnemonic = sessionStorage.getItem(MNEMONIC_KEY);
    void (async () => {
      try {
        await Promise.resolve();
        setVisualSeasonsState(parseVisualSeasons(localStorage.getItem(VISUAL_SEASONS_KEY)));
        setLunarPhasesEnabledState(
          parseLunarPhasesEnabled(localStorage.getItem(LUNAR_PHASES_ENABLED_KEY)),
        );
        setLunarPhasesVisibleState(
          parseLunarPhasesVisible(localStorage.getItem(LUNAR_PHASES_VISIBLE_KEY)),
        );
        if (!mnemonic) {
          setDiary(emptyDiary(storedLocale));
          return;
        }
        const nextWallet = unlockWallet(mnemonic);
        await loginWithWallet(nextWallet);
        await hydrate(nextWallet, storedLocale);
      } catch {
        sessionStorage.removeItem(MNEMONIC_KEY);
        setDiary(emptyDiary(storedLocale));
      } finally {
        setReady(true);
      }
    })();
  }, [hydrate]);

  const persistDiary = useCallback(
    async (next: Diary) => {
      if (!wallet) throw new Error("Locked");
      let normalized = parseDiary(next);
      if (normalized.poolOptIn) {
        normalized = await syncPoolIfDue(normalized);
      }
      const sealed = await encryptAesGcm(wallet.aesKey, utf8ToBytes(JSON.stringify(normalized)));
      await putVault(sealed.ciphertext, sealed.nonce, normalized.schemaVersion);
      setDiary(normalized);
      localStorage.setItem(LOCALE_KEY, normalized.locale);
    },
    [wallet],
  );

  const unlock = useCallback(
    async (mnemonic: string, options?: { create?: boolean }) => {
      const nextWallet = unlockWallet(mnemonic);
      if (options?.create) {
        const seed = emptyDiary(locale);
        const sealed = await encryptAesGcm(nextWallet.aesKey, utf8ToBytes(JSON.stringify(seed)));
        await loginWithWallet(nextWallet, {
          ciphertext: sealed.ciphertext,
          nonce: sealed.nonce,
          schemaVersion: DIARY_SCHEMA_VERSION,
        });
      } else {
        await loginWithWallet(nextWallet);
      }
      await hydrate(nextWallet, locale);
    },
    [hydrate, locale],
  );

  const value = useMemo<CicloContextValue>(
    () => ({
      ready,
      wallet,
      diary,
      locale,
      visualSeasons,
      lunarPhasesEnabled,
      lunarPhasesVisible,
      t,
      error,
      setError,
      setLocale: (nextLocale) => {
        localStorage.setItem(LOCALE_KEY, nextLocale);
        if (wallet) {
          void persistDiary({ ...diary, locale: nextLocale });
        } else {
          setDiary({ ...diary, locale: nextLocale });
        }
      },
      setVisualSeasons: (enabled) => {
        localStorage.setItem(VISUAL_SEASONS_KEY, String(enabled));
        setVisualSeasonsState(enabled);
      },
      setLunarPhasesEnabled: (enabled) => {
        localStorage.setItem(LUNAR_PHASES_ENABLED_KEY, String(enabled));
        setLunarPhasesEnabledState(enabled);
      },
      setLunarPhasesVisible: (visible) => {
        localStorage.setItem(LUNAR_PHASES_VISIBLE_KEY, String(visible));
        setLunarPhasesVisibleState(visible);
      },
      startOnboarding: () => createWallet(),
      unlock,
      createEmailAccount: async (email, password) => {
        const nextWallet = createWallet();
        const kit = await wrapMnemonic(nextWallet.mnemonic, password);
        saveLocalKit(email, kit);
        const seed: Diary = { ...emptyDiary(locale), recoveryEmailSet: true };
        const sealed = await encryptAesGcm(nextWallet.aesKey, utf8ToBytes(JSON.stringify(seed)));
        await loginWithWallet(nextWallet, {
          ciphertext: sealed.ciphertext,
          nonce: sealed.nonce,
          schemaVersion: DIARY_SCHEMA_VERSION,
        });
        await postRecoveryKit(email, kit);
        await hydrate(nextWallet, locale);
        return nextWallet;
      },
      unlockWithPassword: async (email, password) => {
        const normalized = normalizeEmail(email);
        let kit = loadLocalKit(normalized);
        if (!kit) {
          kit = await fetchRemoteKit(normalized);
        }
        try {
          const mnemonic = await unwrapMnemonic(kit, password);
          saveLocalKit(normalized, kit);
          await unlock(mnemonic);
        } catch (cause) {
          if (cause instanceof InvalidCredentialsError) throw cause;
          throw new InvalidCredentialsError();
        }
      },
      persistDiary,
      enablePoolOptIn: async () => {
        await persistDiary({ ...diary, poolOptIn: true });
      },
      disablePoolOptIn: async () => {
        await revokePoolContribution(diary);
        await persistDiary({
          ...diary,
          poolOptIn: false,
          poolContributorKey: null,
          poolLastSyncedAt: null,
        });
      },
      wipe: async () => {
        await deleteAccount();
        sessionStorage.removeItem(MNEMONIC_KEY);
        clearLocalKits();
        setWallet(null);
        setDiary(emptyDiary(locale));
      },
      signOut: async () => {
        await logoutSession();
        sessionStorage.removeItem(MNEMONIC_KEY);
        setWallet(null);
      },
    }),
    [
      diary,
      error,
      hydrate,
      locale,
      lunarPhasesEnabled,
      lunarPhasesVisible,
      persistDiary,
      ready,
      t,
      unlock,
      visualSeasons,
      wallet,
    ],
  );

  return <CicloContext.Provider value={value}>{children}</CicloContext.Provider>;
}

export function useCiclo() {
  const ctx = useContext(CicloContext);
  if (!ctx) throw new Error("useCiclo must be used within CicloProvider");
  return ctx;
}

export { lastEmail, InvalidCredentialsError };
