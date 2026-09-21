"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { type Wallet } from "@/lib/crypto/wallet";
import { storeBrowserPassword } from "@/lib/client/credentials";
import {
  InvalidConfirmError,
  MailNotConfiguredError,
  RateLimitedError,
  useCiclo,
} from "@/lib/client/ciclo-context";
import { maskEmail } from "@/lib/client/kit-store";
import { AppShell } from "@/components/app-shell";
import { PhraseQrCode } from "@/components/phrase-qr-code";
import { SavePhraseForm } from "@/components/save-phrase-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Method = "choose" | "email" | "phrase";

export default function OnboardingPage() {
  const { t, startOnboarding, unlock, createEmailAccount, confirmEmailAccount, resendEmailCode } =
    useCiclo();
  const router = useRouter();
  const [method, setMethod] = useState<Method>("choose");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"show" | "confirm">("show");
  const [emailPhase, setEmailPhase] = useState<"form" | "code">("form");
  const [code, setCode] = useState("");
  const [guess, setGuess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkIndex = useMemo(() => (wallet ? 2 : 0), [wallet]);

  function generate() {
    setWallet(startOnboarding());
    setStep("show");
    setError(null);
  }

  async function finishPhrase(event: React.FormEvent) {
    event.preventDefault();
    if (!wallet) return;
    const words = wallet.mnemonic.split(" ");
    if (guess.trim().toLowerCase() !== words[checkIndex]) {
      setError(t.wordMismatch);
      return;
    }
    try {
      setBusy(true);
      await unlock(wallet.mnemonic, { create: true, persist: true });
      router.push("/app");
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : t.errorGeneric;
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  async function finishEmail(event: React.FormEvent) {
    event.preventDefault();
    if (password.length < 8) {
      setError(t.passwordTooShort);
      return;
    }
    if (password !== confirm) {
      setError(t.passwordMismatch);
      return;
    }
    try {
      setBusy(true);
      setError(null);
      await createEmailAccount(email, password, { persist: true });
      await storeBrowserPassword(email.trim().toLowerCase(), password);
      setEmailPhase("code");
      setCode("");
    } catch (cause) {
      if (cause instanceof MailNotConfiguredError) setError(t.mailNotConfigured);
      else if (cause instanceof RateLimitedError) setError(t.tooManyEmailCodes);
      else setError(t.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  async function finishEmailCode(event: React.FormEvent) {
    event.preventDefault();
    try {
      setBusy(true);
      setError(null);
      await confirmEmailAccount(code);
      router.push("/app");
    } catch (cause) {
      if (cause instanceof InvalidConfirmError) setError(t.verifyEmailInvalid);
      else setError(t.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    try {
      setBusy(true);
      setError(null);
      await resendEmailCode();
      setError(t.codeSent);
    } catch (cause) {
      if (cause instanceof MailNotConfiguredError) setError(t.mailNotConfigured);
      else if (cause instanceof RateLimitedError) setError(t.tooManyEmailCodes);
      else setError(t.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  const words = wallet?.mnemonic.split(" ") ?? [];

  return (
    <AppShell>
      {method !== "choose" ? (
        <button
          type="button"
          className="mb-4 text-sm underline"
          onClick={() => {
            if (method === "email" && emailPhase === "code") {
              setEmailPhase("form");
              setCode("");
              setError(null);
              return;
            }
            setMethod("choose");
            setWallet(null);
            setEmailPhase("form");
            setCode("");
            setError(null);
          }}
        >
          {t.back}
        </button>
      ) : null}

      {method === "choose" ? (
        <>
          <h1 className="text-2xl font-semibold">{t.createAccount}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.chooseModeIntro}</p>
          <Card className="mt-4 border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
            {t.privacyBanner}
          </Card>
          <div className="mt-6 flex flex-col gap-3">
            <Card className="flex flex-col gap-3">
              <div>
                <p className="text-xs font-medium text-primary">{t.recommended}</p>
                <h2 className="mt-1 font-medium">{t.createWithEmail}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.createWithEmailHint}</p>
              </div>
              <Button onClick={() => setMethod("email")}>{t.createWithEmail}</Button>
            </Card>
            <Card className="flex flex-col gap-3">
              <div>
                <h2 className="font-medium">{t.superPrivateMode}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.superPrivateHint}</p>
              </div>
              <Button variant="outline" onClick={() => setMethod("phrase")}>
                {t.superPrivateMode}
              </Button>
            </Card>
          </div>
        </>
      ) : null}

      {method === "email" && emailPhase === "form" ? (
        <>
          <h1 className="text-2xl font-semibold">{t.emailAccountTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.emailAccountBody}</p>
          <Card className="mt-4">
            <form className="flex flex-col gap-3" onSubmit={(event) => void finishEmail(event)}>
              <Label htmlFor="ciclo-email">{t.email}</Label>
              <Input
                id="ciclo-email"
                name="username"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Label htmlFor="ciclo-password">{t.password}</Label>
              <PasswordInput
                id="ciclo-password"
                name="new-password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                showLabel={t.showPassword}
                hideLabel={t.hidePassword}
              />
              <Label htmlFor="ciclo-confirm">{t.confirmPassword}</Label>
              <PasswordInput
                id="ciclo-confirm"
                name="new-password-confirm"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                showLabel={t.showPassword}
                hideLabel={t.hidePassword}
              />
              <p className="text-xs text-muted-foreground">{t.passwordHint}</p>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button type="submit" disabled={busy}>
                {t.createAccount}
              </Button>
            </form>
          </Card>
        </>
      ) : null}

      {method === "email" && emailPhase === "code" ? (
        <>
          <h1 className="text-2xl font-semibold">{t.verifyEmailTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.verifyEmailBody.replace("{email}", maskEmail(email))}
          </p>
          <Card className="mt-4">
            <form className="flex flex-col gap-3" onSubmit={(event) => void finishEmailCode(event)}>
              <Label htmlFor="ciclo-email-code">{t.verifyEmailCode}</Label>
              <Input
                id="ciclo-email-code"
                name="one-time-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                required
                minLength={6}
                maxLength={6}
                pattern="[0-9]{6}"
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              />
              {error ? (
                <p
                  className={
                    error === t.codeSent ? "text-sm text-muted-foreground" : "text-sm text-destructive"
                  }
                >
                  {error}
                </p>
              ) : null}
              <Button type="submit" disabled={busy || code.length !== 6}>
                {t.next}
              </Button>
              <Button type="button" variant="outline" disabled={busy} onClick={() => void resend()}>
                {t.resendCode}
              </Button>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => {
                  setEmailPhase("form");
                  setCode("");
                  setError(null);
                }}
              >
                {t.changeEmail}
              </button>
            </form>
          </Card>
        </>
      ) : null}

      {method === "phrase" ? (
        <>
          <h1 className="text-2xl font-semibold">{t.superPrivateMode}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.onboardingBody}</p>
          {!wallet ? (
            <Button className="mt-6 w-full" onClick={generate}>
              {t.createWallet}
            </Button>
          ) : null}
          {wallet && step === "show" ? (
            <Card className="mt-6 flex flex-col gap-3">
              <ol className="grid grid-cols-2 gap-2 text-sm">
                {words.map((word, index) => (
                  <li key={`${word}-${index}`} className="rounded-lg bg-secondary px-3 py-2">
                    <span className="text-muted-foreground">{index + 1}.</span> {word}
                  </li>
                ))}
              </ol>
              <div className="flex flex-col items-center gap-2 py-1">
                <PhraseQrCode mnemonic={wallet.mnemonic} label={t.backupQrLabel} />
                <p className="text-center text-xs text-muted-foreground">{t.backupQrHint}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={async () => {
                    await navigator.clipboard.writeText(wallet.mnemonic);
                    setCopied(true);
                  }}
                >
                  {copied ? t.copied : t.copy}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    const blob = new Blob([wallet.mnemonic], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const anchor = document.createElement("a");
                    anchor.href = url;
                    anchor.download = "ciclo-recovery-phrase.txt";
                    anchor.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  {t.download}
                </Button>
              </div>
              <SavePhraseForm key={wallet.mnemonic} mnemonic={wallet.mnemonic} t={t} />
              <Button type="button" onClick={() => setStep("confirm")}>
                {t.next}
              </Button>
            </Card>
          ) : null}
          {wallet && step === "confirm" ? (
            <Card className="mt-6">
              <form className="flex flex-col gap-3" onSubmit={(event) => void finishPhrase(event)}>
                <h2 className="font-medium">{t.confirmTitle}</h2>
                <Label htmlFor="ciclo-word">
                  {t.confirmWord} {checkIndex + 1}
                </Label>
                <Input
                  id="ciclo-word"
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                  autoComplete="off"
                />
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
                <Button type="submit" disabled={busy}>
                  {t.next}
                </Button>
              </form>
            </Card>
          ) : null}
        </>
      ) : null}
    </AppShell>
  );
}
