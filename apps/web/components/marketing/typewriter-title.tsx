// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useEffect, useState } from "react";

type TypewriterTitleProps = {
  lines: string[];
  prefix?: string;
};

export function TypewriterTitle({ lines, prefix }: TypewriterTitleProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState(lines[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || lines.length < 2) {
      setText(lines[0] ?? "");
      return;
    }

    const currentLine = lines[lineIndex] ?? "";
    const isComplete = text === currentLine;
    const isEmpty = text.length === 0;
    const delay = isDeleting ? 42 : isComplete ? 2200 : 68;

    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setLineIndex((index) => (index + 1) % lines.length);
        setIsDeleting(false);
        return;
      }

      setText((value) => (isDeleting ? value.slice(0, -1) : currentLine.slice(0, value.length + 1)));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, lineIndex, lines, reducedMotion, text]);

  const currentLine = lines[lineIndex] ?? lines[0] ?? "";
  const accessible = prefix ? `${prefix} ${currentLine}` : currentLine;

  return (
    <span aria-live="polite" aria-label={accessible} className="block min-h-[1.15em]">
      {text}
      <span aria-hidden className="ml-1 inline-block h-[0.85em] w-px translate-y-1 animate-pulse bg-current" />
    </span>
  );
}
