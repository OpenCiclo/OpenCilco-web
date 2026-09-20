"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { PHRASE_USERNAME, getBrowserPassword, storeBrowserPassword } from "@/lib/client/credentials";
import { InvalidCredentialsError, lastEmail, useCiclo } from "@/lib/client/ciclo-context";
import { InvalidPhraseError } from "@/lib/crypto/wallet";
import { unlockDestination } from "@/lib/console/paths";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input, PasswordInput, Textarea } from "@/components/ui/input";

const PhraseQrScanner = dynamic(
  () => import("@/components/phrase-qr-scanner").then((mod) => mod.PhraseQrScanner),
  { ssr: false },
);

type Tab = "email" | "phrase";

export default function UnlockPage() {
  const { t, unlock, unlockWithPassword } = useCiclo();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phrase, setPhrase] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const stored = lastEmail();
    if (stored) setEmail(stored);
    void getBrowserPassword().then((cred) => {
      if (!cred) return;
      if (cred.id.includes("@")) {
        setTab("email");
        setEmail(cred.id);
        setPassword(cred.password);
      } else if (cred.id === PHRASE_USERNAME || cred.id === "oddy" || cred.password.includes(" ")) {
        setTab("phrase");
        setPhrase(cred.password);
      }
    });
  }, []);

  async function submitEmail(event: React.FormEvent) {
    event.preventDefault();
    try {
      setBusy(true);
      setError(null);
      await unlockWithPassword(email, password, { persist: keepLoggedIn });
      await storeBrowserPassword(email.trim().toLowerCase(), password);
      router.push(unlockDestination(new URLSearchParams(window.location.search).get("next")));
    } catch (cause) {
      if (cause instanceof InvalidCredentialsError) {
        setError(t.invalidCredentials);
      } else {
        setError(t.errorGeneric);
      }
    } finally {
      setBusy(false);
    }
  }

  async function unlockFromPhrase(nextPhrase: string) {
    try {
      setBusy(true);
      setError(null);
      const normalized = nextPhrase.trim().toLowerCase().replace(/\s+/g, " ");
      await unlock(normalized, { persist: keepLoggedIn });
      await storeBrowserPassword(PHRASE_USERNAME, normalized);
      router.push(unlockDestination(new URLSearchParams(window.location.search).get("next")));
    } catch (cause) {
      setError(cause instanceof InvalidPhraseError ? t.invalidPhrase : t.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  async function submitPhrase(event: React.FormEvent) {
    event.preventDefault();
    await unlockFromPhrase(phrase);
  }

  const keepLoggedInField = (
    <label htmlFor="keep-logged-in" className="flex items-start gap-2 text-sm">
      <input
        id="keep-logged-in"
        type="checkbox"
        className="mt-1"
        checked={keepLoggedIn}
        onChange={(event) => setKeepLoggedIn(event.target.checked)}
      />
      <span>
        {t.keepLoggedIn}
        <span className="mt-0.5 block text-xs text-muted-foreground">{t.keepLoggedInHint}</span>
      </span>
    </label>
  );

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">{t.unlockTitle}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t.unlockBody}</p>
      <Card className="mt-4 border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
        {t.noResetHint}
      </Card>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button type="button" variant={tab === "email" ? "default" : "outline"} onClick={() => setTab("email")}>
          {t.loginWithEmail}
        </Button>
        <Button type="button" variant={tab === "phrase" ? "default" : "outline"} onClick={() => setTab("phrase")}>
          {t.loginWithPhrase}
        </Button>
      </div>
      {tab === "email" ? (
        <Card className="mt-4">
          <form className="flex flex-col gap-3" onSubmit={(event) => void submitEmail(event)}>
            <Label htmlFor="unlock-email">{t.email}</Label>
            <Input
              id="unlock-email"
              name="username"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Label htmlFor="unlock-password">{t.password}</Label>
            <PasswordInput
              id="unlock-password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              showLabel={t.showPassword}
              hideLabel={t.hidePassword}
            />
            {keepLoggedInField}
            <p className="text-xs text-muted-foreground">{t.emailLoginHint}</p>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" disabled={busy}>
              {t.unlock}
            </Button>
          </form>
        </Card>
      ) : (
        <Card className="mt-4">
          <form className="flex flex-col gap-3" onSubmit={(event) => void submitPhrase(event)}>
            <input
              type="text"
              name="username"
              autoComplete="username"
              defaultValue={PHRASE_USERNAME}
              readOnly
              className="sr-only"
              tabIndex={-1}
              aria-hidden
            />
            <Label htmlFor="unlock-phrase">{t.phrase}</Label>
            <Textarea
              id="unlock-phrase"
              name="password"
              autoComplete="current-password"
              value={phrase}
              onChange={(event) => setPhrase(event.target.value)}
            />
            {keepLoggedInField}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" disabled={busy}>
              {t.unlock}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => {
                setError(null);
                setScanning(true);
              }}
            >
              {t.scanBackupQr}
            </Button>
          </form>
        </Card>
      )}
      {scanning ? (
        <PhraseQrScanner
          t={t}
          onCancel={() => setScanning(false)}
          onPhrase={(mnemonic) => {
            setPhrase(mnemonic);
            setScanning(false);
            void unlockFromPhrase(mnemonic);
          }}
        />
      ) : null}
    </AppShell>
  );
}
