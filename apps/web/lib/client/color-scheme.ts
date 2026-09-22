// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

export const COLOR_SCHEME_KEY = "ciclo.colorScheme";
export const THEME_COLOR_LIGHT = "#f7f7f8";
export const THEME_COLOR_DARK = "#1c1c1f";

export type ColorScheme = "light" | "dark" | "system";

export function parseColorScheme(value: string | null): ColorScheme {
  if (value === "light" || value === "dark") return value;
  return "system";
}

export function resolvedDark(scheme: ColorScheme, systemDark: boolean): boolean {
  if (scheme === "dark") return true;
  if (scheme === "light") return false;
  return systemDark;
}

export function applyColorScheme(scheme: ColorScheme, systemDark: boolean): void {
  const dark = resolvedDark(scheme, systemDark);
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? THEME_COLOR_DARK : THEME_COLOR_LIGHT);
}

export function themeBootScript(): string {
  return `(function(){try{var v=localStorage.getItem("${COLOR_SCHEME_KEY}");var scheme=v==="light"||v==="dark"?v:"system";var system=matchMedia("(prefers-color-scheme: dark)").matches;var dark=scheme==="dark"||(scheme!=="light"&&system);var root=document.documentElement;root.classList.toggle("dark",dark);root.style.colorScheme=dark?"dark":"light";var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute("content",dark?"${THEME_COLOR_DARK}":"${THEME_COLOR_LIGHT}");}catch(e){}})();`;
}
