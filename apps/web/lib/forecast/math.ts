// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

/** NumPy-compatible helpers for the TypeScript port. */

export function median(values: number[]): number {
  if (values.length === 0) {
    throw new Error("median of empty array");
  }
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

export function logSumExp(values: number[]): number {
  let maximum = values[0];
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] > maximum) maximum = values[i];
  }
  let sum = 0;
  for (const value of values) {
    sum += Math.exp(value - maximum);
  }
  return maximum + Math.log(sum);
}

export function argMax(values: number[]): number {
  let best = 0;
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] > values[best]) best = i;
  }
  return best;
}

export function parseIsoDate(iso: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) {
    throw new Error(`Invalid date ${iso}`);
  }
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  const date = parseIsoDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return formatIsoDate(date);
}

export function daysBetween(startIso: string, endIso: string): number {
  const start = parseIsoDate(startIso).getTime();
  const end = parseIsoDate(endIso).getTime();
  return Math.round((end - start) / 86_400_000);
}

export function cycleLengths(starts: string[]): number[] {
  const ordered = [...starts].sort();
  const lengths: number[] = [];
  for (let i = 1; i < ordered.length; i += 1) {
    lengths.push(daysBetween(ordered[i - 1], ordered[i]));
  }
  return lengths;
}
