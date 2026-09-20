"use client";

import { useState } from "react";

import { PHRASE_USERNAME, storeBrowserPassword } from "@/lib/client/credentials";
import type { Messages } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input, PasswordInput } from "@/components/ui/input";

export function SavePhraseForm({
  mnemonic,
  t,
}: {
  mnemonic: string;
  t: Messages;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="flex flex-col gap-3"
      action="/unlock"
      method="post"
      autoComplete="on"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const id = String(data.get("username") ?? PHRASE_USERNAME).trim() || PHRASE_USERNAME;
        const password = String(data.get("password") ?? mnemonic).trim() || mnemonic;
        setBusy(true);
        void storeBrowserPassword(id, password).finally(() => {
          setMessage(t.savedInBrowser);
          setBusy(false);
        });
      }}
    >
      <Label htmlFor="ciclo-phrase-username">{t.passwordManagerAccount}</Label>
      <Input
        id="ciclo-phrase-username"
        name="username"
        type="text"
        autoComplete="username"
        defaultValue={PHRASE_USERNAME}
      />
      <Label htmlFor="ciclo-phrase-password">{t.phrase}</Label>
      <PasswordInput
        id="ciclo-phrase-password"
        name="password"
        autoComplete="new-password"
        defaultValue={mnemonic}
        showLabel={t.showPassword}
        hideLabel={t.hidePassword}
      />
      <p className="text-xs text-muted-foreground">{t.savePhraseInBrowserHint}</p>
      {message ? <p className="text-sm">{message}</p> : null}
      <Button type="submit" disabled={busy}>
        {t.saveInBrowser}
      </Button>
    </form>
  );
}
