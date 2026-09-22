// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

export type InstallPlatform =
  | "ios-safari"
  | "ios-chrome"
  | "ios-firefox"
  | "ios-edge"
  | "ios-other"
  | "android-chrome"
  | "android-samsung"
  | "android-firefox"
  | "android-edge"
  | "android-other";

export function detectInstallPlatform(
  userAgent: string,
  options?: { maxTouchPoints?: number },
): InstallPlatform | null {
  const touch = options?.maxTouchPoints ?? 0;
  const ios = /iPad|iPhone|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && touch > 1);
  const android = /Android/i.test(userAgent);
  if (!ios && !android) return null;

  if (ios) {
    if (/CriOS/i.test(userAgent)) return "ios-chrome";
    if (/FxiOS/i.test(userAgent)) return "ios-firefox";
    if (/EdgiOS/i.test(userAgent)) return "ios-edge";
    if (/Safari/i.test(userAgent)) return "ios-safari";
    return "ios-other";
  }

  if (/SamsungBrowser/i.test(userAgent)) return "android-samsung";
  if (/Firefox/i.test(userAgent)) return "android-firefox";
  if (/EdgA|Edg\//i.test(userAgent)) return "android-edge";
  if (/Chrome/i.test(userAgent)) return "android-chrome";
  return "android-other";
}

export function isInstalledDisplay(args: {
  displayModeStandalone: boolean;
  iosStandalone: boolean;
}): boolean {
  return args.displayModeStandalone || args.iosStandalone;
}
