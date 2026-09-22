// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { ImageResponse } from "next/og";

const SIZES = new Set(["192", "512"]);

export async function GET(_request: Request, context: { params: Promise<{ size: string }> }) {
  const { size } = await context.params;
  if (!SIZES.has(size)) return new Response("Not found", { status: 404 });
  const px = Number(size);
  const inner = Math.round(px * (10 / 32));
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
            width: inner,
            height: inner,
            borderRadius: inner,
            background: "#fcfcfc",
          }}
        />
      </div>
    ),
    { width: px, height: px },
  );
}
