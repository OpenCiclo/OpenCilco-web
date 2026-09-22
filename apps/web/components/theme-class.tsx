"use client";

import { useEffect } from "react";

import { applyColorScheme } from "@/lib/client/color-scheme";
import { useCiclo } from "@/lib/client/ciclo-context";

export function ThemeClass() {
  const { colorScheme } = useCiclo();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => applyColorScheme(colorScheme, media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [colorScheme]);

  return null;
}
