// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";

import type { Messages } from "@/lib/i18n";

export function ForecastInfoDialog({ t, onClose }: { t: Messages; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <button
        type="button"
        aria-label={t.close}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-sm rounded-3xl bg-card p-5 text-card-foreground shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
        >
          <X className="size-5" aria-hidden />
        </button>
        <h2 id={titleId} className="pr-10 font-serif text-xl text-balance">
          {t.forecastInfoTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-pretty">{t.forecastInfoPrior}</p>
        <p className="mt-3 text-sm leading-relaxed text-pretty">{t.forecastInfoPersonal}</p>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">{t.disclaimer}</p>
        <Link
          href="/help/how-the-forecast-works"
          className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          {t.forecastInfoMore}
        </Link>
      </div>
    </div>,
    document.body,
  );
}
