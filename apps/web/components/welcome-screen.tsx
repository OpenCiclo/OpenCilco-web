"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCiclo } from "@/lib/client/ciclo-context";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { otherLocale } from "@/lib/i18n";

export function WelcomeScreen() {
  const { t, locale, setLocale } = useCiclo();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <div className="flex flex-col gap-6 pt-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 font-serif text-xl tracking-tight">
          <BrandMark />
          {t.appName}
        </h1>
        <button
          type="button"
          className="inline-flex shrink-0 items-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted"
          onClick={() => setLocale(otherLocale(locale))}
        >
          {locale === "es" ? "EN" : "ES"}
        </button>
      </div>
      <div>
        <p className="text-lg text-muted-foreground">{t.tagline}</p>
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
