"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCiclo } from "@/lib/client/ciclo-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { otherLocale } from "@/lib/i18n";

export function WelcomeScreen() {
  const { t, locale, setLocale } = useCiclo();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <div className="flex flex-col gap-6 pt-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{t.appName}</p>
        <button
          type="button"
          className="text-sm underline"
          onClick={() => setLocale(otherLocale(locale))}
        >
          {locale === "es" ? "EN" : "ES"}
        </button>
      </div>
      <div>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">{t.appName}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t.tagline}</p>
        <p className="mt-3 text-sm text-muted-foreground">{t.welcomeCta}</p>
      </div>
      <Card className="border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
        {t.privacyBanner}
      </Card>
      <Card className="flex flex-col gap-3">
        <Button
          disabled={busy}
          onClick={() => {
            setBusy(true);
            router.push("/onboarding");
          }}
        >
          {t.createAccount}
        </Button>
        <Button variant="secondary" onClick={() => router.push("/unlock")}>
          {t.haveAccount}
        </Button>
      </Card>
    </div>
  );
}
