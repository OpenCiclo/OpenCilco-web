"use client";

import { useEffect, useState } from "react";

import { useCiclo } from "@/lib/client/ciclo-context";
import {
  detectInstallPlatform,
  isInstalledDisplay,
  type InstallPlatform,
} from "@/lib/client/install-platform";
import { Button } from "@/components/ui/button";

const DISMISS_KEY = "ciclo.installHintUntil";
const DISMISS_MS = 30 * 24 * 60 * 60 * 1000;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function readDismissed(): boolean {
  try {
    const until = Number(localStorage.getItem(DISMISS_KEY) ?? "0");
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false;
  }
}

function installedNow(): boolean {
  return isInstalledDisplay({
    displayModeStandalone: window.matchMedia("(display-mode: standalone)").matches,
    iosStandalone:
      "standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone),
  });
}

export function InstallPrompt() {
  const { t } = useCiclo();
  const [platform, setPlatform] = useState<InstallPlatform | null>(null);
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (installedNow() || readDismissed()) return;
    const detected = detectInstallPlatform(navigator.userAgent, {
      maxTouchPoints: navigator.maxTouchPoints,
    });
    if (!detected) return;
    setPlatform(detected);

    function onPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!platform) return null;

  const body = {
    "ios-safari": t.installIosSafari,
    "ios-chrome": t.installIosChrome,
    "ios-firefox": t.installIosFirefox,
    "ios-edge": t.installIosEdge,
    "ios-other": t.installIosOther,
    "android-chrome": t.installAndroidChrome,
    "android-samsung": t.installAndroidSamsung,
    "android-firefox": t.installAndroidFirefox,
    "android-edge": t.installAndroidEdge,
    "android-other": t.installAndroidOther,
  }[platform];

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_MS));
    setPlatform(null);
  }

  async function install() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    setPromptEvent(null);
    if (choice.outcome === "accepted") dismiss();
  }

  return (
    <aside className="w-full max-w-md rounded-2xl border border-border bg-card p-4 text-sm text-card-foreground shadow-sm">
      <p className="font-medium">{t.installTitle}</p>
      <p className="mt-1 leading-6 text-muted-foreground">{body}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {promptEvent ? (
          <Button type="button" onClick={() => void install()}>
            {t.installAction}
          </Button>
        ) : null}
        <Button type="button" variant="outline" onClick={dismiss}>
          {t.installDismiss}
        </Button>
      </div>
    </aside>
  );
}
