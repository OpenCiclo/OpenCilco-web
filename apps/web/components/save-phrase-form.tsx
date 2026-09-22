"use client";

import { useState } from "react";

import { storeBrowserPassword } from "@/lib/client/credentials";
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
  const [askName, setAskName] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="flex flex-col gap-3"
      autoComplete="on"
      onSubmit={(event) => {
        event.preventDefault();
        if (!askName) {
          setAskName(true);
          setMessage(null);
          return;
        }
        const id = username.trim();
        if (!id) return;
        setBusy(true);
        void storeBrowserPassword(id, mnemonic).finally(() => {
          setMessage(t.savedInBrowser);
          setBusy(false);
        });
      }}
    >
      {askName ? (
        <>
          <Label htmlFor="ciclo-phrase-username">{t.passwordManagerAccount}</Label>
          <Input
            id="ciclo-phrase-username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </>
      ) : null}
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
