// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { parsePhraseQr } from "@/lib/crypto/phrase-qr";
import type { Messages } from "@/lib/i18n";

type QrDetector = {
  detect: (source: ImageBitmapSource) => Promise<{ rawValue: string }[]>;
};

type JsQrDecode = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
) => { data: string } | null;

function stopStream(stream: MediaStream | null) {
  if (!stream) return;
  for (const track of stream.getTracks()) {
    track.stop();
  }
}

function createQrDetector(): QrDetector | null {
  const Detector = (
    window as unknown as {
      BarcodeDetector?: new (options: { formats: string[] }) => QrDetector;
    }
  ).BarcodeDetector;
  if (!Detector) return null;
  try {
    return new Detector({ formats: ["qr_code"] });
  } catch {
    return null;
  }
}

export function PhraseQrScanner({
  t,
  onPhrase,
  onCancel,
}: {
  t: Messages;
  onPhrase: (mnemonic: string) => void;
  onCancel: () => void;
}) {
  const titleId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const onPhraseRef = useRef(onPhrase);
  const onCancelRef = useRef(onCancel);
  const notAPhraseRef = useRef(t.qrNotAPhrase);
  onPhraseRef.current = onPhrase;
  onCancelRef.current = onCancel;
  notAPhraseRef.current = t.qrNotAPhrase;

  const [status, setStatus] = useState<"starting" | "live" | "denied" | "unavailable">("starting");
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onCancelRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let stream: MediaStream | null = null;
    let raf = 0;
    let stopped = false;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    async function readFrame(detector: QrDetector | null, decodeJsQr: JsQrDecode | null): Promise<string | null> {
      const el = videoRef.current;
      if (!el || el.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return null;
      if (detector) {
        try {
          const codes = await detector.detect(el);
          return codes[0]?.rawValue ?? null;
        } catch {
          return null;
        }
      }
      if (!decodeJsQr || !ctx || !el.videoWidth || !el.videoHeight) return null;
      canvas.width = el.videoWidth;
      canvas.height = el.videoHeight;
      ctx.drawImage(el, 0, 0);
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return decodeJsQr(image.data, image.width, image.height)?.data ?? null;
    }

    function loop(detector: QrDetector | null, decodeJsQr: JsQrDecode | null) {
      if (stopped) return;
      void readFrame(detector, decodeJsQr).then((raw) => {
        if (stopped) return;
        if (raw) {
          const phrase = parsePhraseQr(raw);
          if (phrase) {
            stopped = true;
            onPhraseRef.current(phrase);
            return;
          }
          setScanError(notAPhraseRef.current);
        }
        raf = requestAnimationFrame(() => loop(detector, decodeJsQr));
      });
    }

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("unavailable");
        return;
      }
      try {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: { ideal: "environment" } },
          });
        } catch {
          stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        }
        if (stopped) {
          stopStream(stream);
          return;
        }
        const el = videoRef.current;
        if (!el) {
          stopStream(stream);
          return;
        }
        el.srcObject = stream;
        await el.play();
        if (stopped) {
          stopStream(stream);
          return;
        }
        setStatus("live");
        const detector = createQrDetector();
        let decodeJsQr: JsQrDecode | null = null;
        if (!detector) {
          const loaded = await import("jsqr");
          decodeJsQr = typeof loaded.default === "function" ? loaded.default : null;
        }
        loop(detector, decodeJsQr);
      } catch (cause) {
        if (stopped) return;
        const name = cause instanceof DOMException ? cause.name : "";
        setStatus(name === "NotAllowedError" || name === "PermissionDeniedError" ? "denied" : "unavailable");
      }
    }

    void start();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      const el = videoRef.current;
      if (el) el.srcObject = null;
      stopStream(stream);
    };
  }, []);

  const statusMessage =
    status === "denied" ? t.qrCameraDenied : status === "unavailable" ? t.qrCameraUnavailable : t.scanningQr;

  const overlay = (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black text-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <h2 id={titleId} className="text-base font-medium">
          {t.scanBackupQr}
        </h2>
        <button
          type="button"
          onClick={() => onCancel()}
          aria-label={t.close}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/15"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>
      <div className="relative min-h-0 flex-1">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          aria-hidden
        />
        {status !== "live" && status !== "starting" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 px-6 text-center text-sm leading-6">
            {statusMessage}
          </div>
        ) : null}
      </div>
      <p
        className="px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center text-sm leading-6 text-white/80"
        aria-live="polite"
      >
        {scanError ?? (status === "live" || status === "starting" ? t.scanningQr : statusMessage)}
      </p>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
