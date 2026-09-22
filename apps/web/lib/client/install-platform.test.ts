// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { detectInstallPlatform, isInstalledDisplay } from "./install-platform";

const SAFARI_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const CHROME_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.54 Mobile/15E148 Safari/604.1";
const FIREFOX_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/127.0 Mobile/15E148 Safari/605.1.15";
const EDGE_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/126.0.2592.87 Version/17.0 Mobile/15E148 Safari/604.1";
const CHROME_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.122 Mobile Safari/537.36";
const SAMSUNG =
  "Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.6167.164 Mobile Safari/537.36";
const FIREFOX_ANDROID =
  "Mozilla/5.0 (Android 14; Mobile; rv:127.0) Gecko/127.0 Firefox/127.0";
const EDGE_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.122 Mobile Safari/537.36 EdgA/126.0.2592.68";
const DESKTOP =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

describe("install platform", () => {
  it("picks a dedicated hint for each mobile browser", () => {
    expect(detectInstallPlatform(SAFARI_IOS)).toBe("ios-safari");
    expect(detectInstallPlatform(CHROME_IOS)).toBe("ios-chrome");
    expect(detectInstallPlatform(FIREFOX_IOS)).toBe("ios-firefox");
    expect(detectInstallPlatform(EDGE_IOS)).toBe("ios-edge");
    expect(detectInstallPlatform(CHROME_ANDROID)).toBe("android-chrome");
    expect(detectInstallPlatform(SAMSUNG)).toBe("android-samsung");
    expect(detectInstallPlatform(FIREFOX_ANDROID)).toBe("android-firefox");
    expect(detectInstallPlatform(EDGE_ANDROID)).toBe("android-edge");
  });

  it("treats a touch Mac as an iPad and skips desktop", () => {
    expect(detectInstallPlatform("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15", { maxTouchPoints: 5 })).toBe(
      "ios-safari",
    );
    expect(detectInstallPlatform(DESKTOP)).toBeNull();
  });

  it("treats standalone display as already installed", () => {
    expect(isInstalledDisplay({ displayModeStandalone: true, iosStandalone: false })).toBe(true);
    expect(isInstalledDisplay({ displayModeStandalone: false, iosStandalone: true })).toBe(true);
    expect(isInstalledDisplay({ displayModeStandalone: false, iosStandalone: false })).toBe(false);
  });
});
