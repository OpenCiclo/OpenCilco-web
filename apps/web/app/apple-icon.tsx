// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same mark as the landing header, on a filled square for iOS home-screen rounding. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#24272a",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 56,
            background: "#fcfcfc",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
