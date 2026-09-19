// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LunarDayInfo } from "@/lib/lunar/phases";
import { cn } from "@/lib/utils";

/**
 * Compact northern-hemisphere moon disk.
 * Lit portion is on the right while waxing and on the left while waning.
 */
export function MoonPhaseIcon({
  info,
  label,
  className,
}: {
  info: LunarDayInfo;
  label: string;
  className?: string;
}) {
  const { fraction, waxing, isMajor } = info;
  const cx = 8;
  const cy = 8;
  const r = 6.5;
  const terminatorRx = Math.abs(1 - 2 * fraction) * r;
  const gibbous = fraction >= 0.5;
  const nearlyNew = fraction <= 0.02;
  const nearlyFull = fraction >= 0.98;
  const litOnRight = waxing;

  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-4 shrink-0 drop-shadow-[0_1px_1px_rgb(0_0_0/0.12)]", className)}
      aria-hidden
    >
      <title>{label}</title>
      {/* Unlit disk */}
      <circle cx={cx} cy={cy} r={r} className="fill-foreground/60" />

      {nearlyFull ? (
        <circle cx={cx} cy={cy} r={r} className="fill-card" />
      ) : nearlyNew ? null : (
        <>
          {/* Lit hemisphere */}
          <path
            d={
              litOnRight
                ? `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`
                : `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`
            }
            className="fill-card"
          />
          {/* Terminator ellipse: dark for crescent, lit for gibbous */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={terminatorRx}
            ry={r}
            className={gibbous ? "fill-card" : "fill-foreground/60"}
          />
          {/* A subtle colored rim makes waxing and waning direction legible at small sizes. */}
          <path
            d={
              litOnRight
                ? `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r}`
                : `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r}`
            }
            fill="none"
            className="stroke-foreground/80"
            strokeWidth={0.9}
            strokeLinecap="round"
          />
        </>
      )}

      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        className={isMajor ? "stroke-foreground/90" : "stroke-foreground/55"}
        strokeWidth={isMajor ? 1.2 : 0.7}
      />
    </svg>
  );
}
