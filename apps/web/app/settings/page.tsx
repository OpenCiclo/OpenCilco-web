"use client";

import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { InvalidCredentialsError, useCiclo } from "@/lib/client/ciclo-context";
import { lastEmail } from "@/lib/client/kit-store";
import { storeBrowserPassword } from "@/lib/client/credentials";
import { diaryToCsv, diaryToJson, mergeDiaries, parseImportedFile, previewImport } from "@/lib/diary-io";
import { otherLocale } from "@/lib/i18n";
import { AppShell } from "@/components/app-shell";
import { InstallPrompt } from "@/components/install-prompt";
import { PhraseQrCode } from "@/components/phrase-qr-code";
import { SavePhraseForm } from "@/components/save-phrase-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function SettingsDisclosure({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="mt-4 flex flex-col gap-3 rounded-3xl">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 text-left font-medium"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <ChevronDown className={cn("size-5 shrink-0 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open ? children : null}
    </Card>
  );
}

function download(filename: string, body: string, type: string) {
  const blob = new Blob([body], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function SettingsPage() {
  const {
    t,
    locale,
    setLocale,
    visualSeasons,
    setVisualSeasons,
    lunarPhasesEnabled,
    setLunarPhasesEnabled,
    weekStartsOn,
    setWeekStartsOn,
    colorScheme,
    setColorScheme,
    diary,
    wallet,
    enablePoolOptIn,
    disablePoolOptIn,
    persistDiary,
    wipe,
    signOut,
    changePassword,
  } = useCiclo();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState(() => lastEmail());
  const [browserPassword, setBrowserPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [researchOk, setResearchOk] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPhrase, setShowPhrase] = useState(false);
  const canChangePassword = diary.recoveryEmailSet || Boolean(lastEmail());
  const [importPreview, setImportPreview] = useState<{ days: number; starts: number; raw: string } | null>(
    null,
  );

  if (!wallet) {
    return (
      <AppShell>
        <p>{t.unlockTitle}</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className="animate-fade-up">
        <p className="text-sm font-medium text-muted-foreground">{t.appName}</p>
        <h1 className="font-serif text-3xl leading-tight text-foreground">{t.settings}</h1>
      </header>
      <Card className="mt-4 flex flex-col gap-3 rounded-3xl">
        <Button variant="secondary" onClick={() => setLocale(otherLocale(locale))}>
          {t.language}: {locale.toUpperCase()}
        </Button>
        <label
          htmlFor="visual-seasons"
          className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-muted/60 p-3"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-card-foreground">{t.visualSeasons}</p>
            <p id="visual-seasons-hint" className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {t.visualSeasonsHint}
            </p>
          </div>
          <input
            id="visual-seasons"
            type="checkbox"
            role="switch"
            aria-describedby="visual-seasons-hint"
            checked={visualSeasons}
            onChange={(event) => setVisualSeasons(event.target.checked)}
            className="h-7 w-12 shrink-0 cursor-pointer appearance-none rounded-full bg-muted-foreground/30 p-1 transition-colors before:block before:size-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform checked:bg-primary checked:before:translate-x-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </label>
        <label
          htmlFor="forecasting-enabled"
          className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-muted/60 p-3"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-card-foreground">{t.forecastingEnabled}</p>
            <p id="forecasting-enabled-hint" className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {t.forecastingEnabledHint}
            </p>
          </div>
          <input
            id="forecasting-enabled"
            type="checkbox"
            role="switch"
            aria-describedby="forecasting-enabled-hint"
            checked={diary.forecastingEnabled !== false}
            onChange={(event) => {
              void persistDiary({ ...diary, forecastingEnabled: event.target.checked });
            }}
            className="h-7 w-12 shrink-0 cursor-pointer appearance-none rounded-full bg-muted-foreground/30 p-1 transition-colors before:block before:size-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform checked:bg-primary checked:before:translate-x-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </label>
        <label
          htmlFor="lunar-phases"
          className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-muted/60 p-3"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-card-foreground">{t.lunarPhases}</p>
            <p id="lunar-phases-hint" className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {t.lunarPhasesHint}
            </p>
          </div>
          <input
            id="lunar-phases"
            type="checkbox"
            role="switch"
            aria-describedby="lunar-phases-hint"
            checked={lunarPhasesEnabled}
            onChange={(event) => setLunarPhasesEnabled(event.target.checked)}
            className="h-7 w-12 shrink-0 cursor-pointer appearance-none rounded-full bg-muted-foreground/30 p-1 transition-colors before:block before:size-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform checked:bg-primary checked:before:translate-x-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </label>
        <div>
          <p className="text-sm font-semibold text-card-foreground">{t.weekStartsOn}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={weekStartsOn === 1 ? "default" : "outline"}
              onClick={() => setWeekStartsOn(1)}
            >
              {t.weekStartsMonday}
            </Button>
            <Button
              type="button"
              variant={weekStartsOn === 0 ? "default" : "outline"}
              onClick={() => setWeekStartsOn(0)}
            >
              {t.weekStartsSunday}
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-card-foreground">{t.colorScheme}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={colorScheme === "light" ? "default" : "outline"}
              onClick={() => setColorScheme("light")}
            >
              {t.colorSchemeLight}
            </Button>
            <Button
              type="button"
              variant={colorScheme === "dark" ? "default" : "outline"}
              onClick={() => setColorScheme("dark")}
            >
              {t.colorSchemeDark}
            </Button>
            <Button
              type="button"
              variant={colorScheme === "system" ? "default" : "outline"}
              onClick={() => setColorScheme("system")}
            >
              {t.colorSchemeSystem}
            </Button>
          </div>
        </div>
        <Link href="/privacy" className="text-sm font-medium text-primary underline">
          {t.privacy}
        </Link>
        <Link href="/help" className="text-sm font-medium text-primary underline">
          {t.helpDocs}
        </Link>
        <p className="break-all text-xs text-muted-foreground">
          {t.address}: {wallet.pubkeyHash}
        </p>
      </Card>
      <InstallPrompt mode="settings" />
      <Card className="mt-4 rounded-3xl border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
        {t.noResetHint}
      </Card>
      {canChangePassword ? (
        <SettingsDisclosure title={t.changePassword}>
          <p className="text-xs text-muted-foreground">{t.changePasswordHint}</p>
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (nextPassword.length < 8) {
                setMessage(t.passwordTooShort);
                return;
              }
              if (nextPassword !== confirmPassword) {
                setMessage(t.passwordMismatch);
                return;
              }
              setPasswordBusy(true);
              void changePassword(email, currentPassword, nextPassword)
                .then(async () => {
                  await storeBrowserPassword(email.trim().toLowerCase(), nextPassword);
                  setCurrentPassword("");
                  setNextPassword("");
                  setConfirmPassword("");
                  setMessage(t.changePasswordOk);
                })
                .catch((cause) => {
                  setMessage(cause instanceof InvalidCredentialsError ? t.invalidCredentials : t.errorGeneric);
                })
                .finally(() => {
                  setPasswordBusy(false);
                });
            }}
          >
            <Label htmlFor="settings-change-email">{t.email}</Label>
            <Input
              id="settings-change-email"
              name="username"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Label htmlFor="settings-current-password">{t.currentPassword}</Label>
            <PasswordInput
              id="settings-current-password"
              name="current-password"
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              showLabel={t.showPassword}
              hideLabel={t.hidePassword}
            />
            <Label htmlFor="settings-new-password">{t.newPassword}</Label>
            <PasswordInput
              id="settings-new-password"
              name="new-password"
              autoComplete="new-password"
              required
              minLength={8}
              value={nextPassword}
              onChange={(event) => setNextPassword(event.target.value)}
              showLabel={t.showPassword}
              hideLabel={t.hidePassword}
            />
            <Label htmlFor="settings-confirm-password">{t.confirmPassword}</Label>
            <PasswordInput
              id="settings-confirm-password"
              name="new-password-confirm"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              showLabel={t.showPassword}
              hideLabel={t.hidePassword}
            />
            <Button type="submit" disabled={passwordBusy}>
              {t.changePassword}
            </Button>
          </form>
        </SettingsDisclosure>
      ) : null}
      <SettingsDisclosure title={t.backupTitle}>
        <Button
          variant="outline"
          onClick={() => download("ciclo-diary.json", diaryToJson(diary), "application/json")}
        >
          {t.exportJson}
        </Button>
        <Button variant="outline" onClick={() => download("ciclo-diary.csv", diaryToCsv(diary), "text/csv")}>
          {t.exportCsv}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".json,.csv,application/json,text/csv,text/plain"
          className="hidden"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (!file) return;
            try {
              const raw = await file.text();
              const incoming = parseImportedFile(raw);
              const preview = previewImport(incoming);
              setImportPreview({ ...preview, raw });
              setMessage(null);
            } catch {
              setImportPreview(null);
              setMessage(t.importInvalid);
            }
          }}
        />
        <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
          {t.importData}
        </Button>
        <p className="text-xs text-muted-foreground">{t.importHint}</p>
        {importPreview ? (
          <>
            <p className="text-sm">
              {t.importPreview
                .replace("{days}", String(importPreview.days))
                .replace("{starts}", String(importPreview.starts))}
            </p>
            <Button
              onClick={async () => {
                try {
                  const incoming = parseImportedFile(importPreview.raw);
                  await persistDiary(mergeDiaries(diary, incoming, locale));
                  setImportPreview(null);
                  setMessage(t.importOk);
                } catch {
                  setMessage(t.importInvalid);
                }
              }}
            >
              {t.importConfirm}
            </Button>
          </>
        ) : null}
      </SettingsDisclosure>
      <SettingsDisclosure title={t.saveInBrowser}>
        <form
          className="flex flex-col gap-3"
          onSubmit={async (event) => {
            event.preventDefault();
            if (email && browserPassword) {
              await storeBrowserPassword(email.trim().toLowerCase(), browserPassword);
              setMessage(t.savedInBrowser);
            }
          }}
        >
          <Label htmlFor="settings-email">{t.email}</Label>
          <Input
            id="settings-email"
            name="username"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Label htmlFor="settings-browser-password">{t.password}</Label>
          <PasswordInput
            id="settings-browser-password"
            name="password"
            autoComplete="current-password"
            value={browserPassword}
            onChange={(event) => setBrowserPassword(event.target.value)}
            showLabel={t.showPassword}
            hideLabel={t.hidePassword}
          />
          <Button type="submit">{t.saveInBrowser}</Button>
        </form>
        <SavePhraseForm mnemonic={wallet.mnemonic} t={t} />
        <button type="button" className="text-left text-sm underline" onClick={() => setShowPhrase((v) => !v)}>
          {showPhrase ? t.hideBackupPhrase : t.showBackupPhrase}
        </button>
        {showPhrase ? (
          <div className="flex flex-col items-center gap-2">
            <PhraseQrCode mnemonic={wallet.mnemonic} label={t.backupQrLabel} />
            <p className="text-center text-xs text-muted-foreground">{t.backupQrHint}</p>
          </div>
        ) : null}
      </SettingsDisclosure>
      <Card className="mt-4 flex flex-col gap-3 rounded-3xl">
        <h2 className="font-medium">{t.researchTitle}</h2>
        <p className="text-sm text-muted-foreground">{t.researchBenefit}</p>
        <p className="text-sm text-muted-foreground">{t.researchBody}</p>
        <p className="text-sm text-muted-foreground">{t.researchMonthly}</p>
        {diary.poolOptIn ? (
          <>
            <p className="text-sm">{t.poolOptInActive}</p>
            {diary.poolLastSyncedAt ? (
              <p className="text-sm text-muted-foreground">
                {t.poolLastSync.replace(
                  "{date}",
                  new Intl.DateTimeFormat(locale === "es" ? "es" : "en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(`${diary.poolLastSyncedAt}T00:00:00Z`)),
                )}
              </p>
            ) : null}
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked
                onChange={async () => {
                  try {
                    await disablePoolOptIn();
                    setResearchOk(false);
                  } catch {
                    setMessage(t.errorGeneric);
                  }
                }}
              />
              {t.poolOptInLabel}
            </label>
          </>
        ) : (
          <>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={researchOk}
                onChange={(event) => setResearchOk(event.target.checked)}
              />
              {t.researchConsent}
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={false}
                disabled={!researchOk}
                onChange={async (event) => {
                  if (!event.target.checked) return;
                  try {
                    await enablePoolOptIn();
                  } catch {
                    setMessage(t.poolNeedCycle);
                    event.target.checked = false;
                  }
                }}
              />
              {t.poolOptInLabel}
            </label>
          </>
        )}
      </Card>
      <Card className="mt-4 flex flex-col gap-3 rounded-3xl">
        <Button variant="outline" onClick={() => void signOut().then(() => router.push("/app"))}>
          {t.logout}
        </Button>
        <Button
          variant="destructive"
          onClick={async () => {
            if (!window.confirm(t.deleteConfirm)) return;
            await wipe();
            router.push("/app");
          }}
        >
          {t.deleteAccount}
        </Button>
      </Card>
      {message ? <p className="mt-3 text-sm">{message}</p> : null}
    </AppShell>
  );
}
