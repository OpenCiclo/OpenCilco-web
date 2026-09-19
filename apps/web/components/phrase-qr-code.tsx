// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useMemo } from "react";
import { encode } from "uqr";

import { encodePhraseQr } from "@/lib/crypto/phrase-qr";
import { cn } from "@/lib/utils";

export function PhraseQrCode({
  mnemonic,
  label,
  className,
}: {
  mnemonic: string;
  label: string;
  className?: string;
}) {
  const qr = useMemo(() => {
    try {
      const matrix = encode(encodePhraseQr(mnemonic), { ecc: "H", border: 2 });
      let path = "";
      for (let y = 0; y < matrix.size; y += 1) {
        const row = matrix.data[y];
        for (let x = 0; x < matrix.size; x += 1) {
          if (row[x]) path += `M${x} ${y}h1v1h-1z`;
        }
      }
      return { size: matrix.size, path };
    } catch {
      return null;
    }
  }, [mnemonic]);

  if (!qr) return null;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${qr.size} ${qr.size}`}
      className={cn("h-52 w-52 rounded-xl bg-white", className)}
      shapeRendering="crispEdges"
    >
      <rect width={qr.size} height={qr.size} fill="#fff" />
      <path fill="#000" d={qr.path} />
    </svg>
  );
}
