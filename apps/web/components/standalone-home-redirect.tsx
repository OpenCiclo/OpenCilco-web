"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { isInstalledDisplay } from "@/lib/client/install-platform";

export function StandaloneHomeRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;
    const standalone = isInstalledDisplay({
      displayModeStandalone: window.matchMedia("(display-mode: standalone)").matches,
      iosStandalone:
        "standalone" in navigator &&
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone),
    });
    if (standalone) router.replace("/app");
  }, [pathname, router]);

  return null;
}
