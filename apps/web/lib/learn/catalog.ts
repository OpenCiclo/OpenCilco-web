// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import {
  LEARN_ARTICLES,
  isLearnCategory,
  type LearnArticle,
  type LearnArticleCopy,
  type LearnCategory,
  type LearnSource,
} from "@/lib/learn/articles";
import { learnArticles } from "@/lib/db/schema";
import { getDb } from "@/lib/db";

export const LEARN_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type LearnStatus = "draft" | "published";

export type CatalogDbEntry = {
  slug: string;
  category: LearnCategory;
  reviewedAt: string;
  status: LearnStatus;
  sources: LearnSource[];
  es: LearnArticleCopy;
  en: LearnArticleCopy;
};

export type ConsoleLearnListItem = {
  slug: string;
  titleEs: string;
  titleEn: string;
  category: LearnCategory;
  status: LearnStatus;
  origin: "shipped" | "database";
  hasShipped: boolean;
};

export function isLearnSlug(value: string): boolean {
  return LEARN_SLUG_PATTERN.test(value);
}

export function isSafeLearnHref(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function emptyLearnCopy(): LearnArticleCopy {
  return {
    title: "",
    summary: "",
    sections: [{ heading: "", body: "" }],
    notice: "",
  };
}

export function emptyLearnArticle(slug = ""): LearnArticle {
  return {
    slug,
    category: "cycle",
    reviewedAt: new Date().toISOString().slice(0, 10),
    sources: [{ label: "", href: "" }],
    es: emptyLearnCopy(),
    en: emptyLearnCopy(),
  };
}

export function parseLearnArticleCopy(value: unknown): LearnArticleCopy | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (typeof record.title !== "string" || typeof record.summary !== "string" || typeof record.notice !== "string") {
    return null;
  }
  if (!Array.isArray(record.sections)) return null;
  const sections: LearnArticleCopy["sections"] = [];
  for (const section of record.sections) {
    if (!section || typeof section !== "object") return null;
    const row = section as Record<string, unknown>;
    if (typeof row.heading !== "string" || typeof row.body !== "string") return null;
    sections.push({ heading: row.heading, body: row.body });
  }
  return {
    title: record.title,
    summary: record.summary,
    notice: record.notice,
    sections,
  };
}

export function parseLearnSources(value: unknown): LearnSource[] | null {
  if (!Array.isArray(value)) return null;
  const sources: LearnSource[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const row = item as Record<string, unknown>;
    if (typeof row.label !== "string" || typeof row.href !== "string") return null;
    sources.push({ label: row.label, href: row.href });
  }
  return sources;
}

export function isReviewedAt(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function copyIsPublishable(copy: LearnArticleCopy): boolean {
  if (!copy.title.trim() || !copy.summary.trim() || !copy.notice.trim()) return false;
  return copy.sections.some((section) => section.heading.trim() && section.body.trim());
}

export function isPublishReady(article: {
  sources: LearnSource[];
  es: LearnArticleCopy;
  en: LearnArticleCopy;
}): boolean {
  const sources = article.sources.filter((source) => source.label.trim() && source.href.trim());
  if (sources.length < 1) return false;
  if (!sources.every((source) => isSafeLearnHref(source.href.trim()))) return false;
  return copyIsPublishable(article.es) && copyIsPublishable(article.en);
}

export function catalogEntryToArticle(entry: CatalogDbEntry): LearnArticle {
  return {
    slug: entry.slug,
    category: entry.category,
    reviewedAt: entry.reviewedAt,
    sources: entry.sources,
    es: entry.es,
    en: entry.en,
  };
}

export function mergeLearnCatalog(shipped: LearnArticle[], dbRows: CatalogDbEntry[]): LearnArticle[] {
  const dbBySlug = new Map(dbRows.map((row) => [row.slug, row]));
  const published: LearnArticle[] = [];
  const seen = new Set<string>();

  for (const article of shipped) {
    seen.add(article.slug);
    const override = dbBySlug.get(article.slug);
    if (!override) {
      published.push(article);
      continue;
    }
    if (override.status === "published") {
      published.push(catalogEntryToArticle(override));
    }
  }

  for (const row of dbRows) {
    if (seen.has(row.slug)) continue;
    if (row.status === "published") published.push(catalogEntryToArticle(row));
  }

  return published;
}

export function listLearnForConsole(shipped: LearnArticle[], dbRows: CatalogDbEntry[]): ConsoleLearnListItem[] {
  const dbBySlug = new Map(dbRows.map((row) => [row.slug, row]));
  const items: ConsoleLearnListItem[] = [];
  const seen = new Set<string>();

  for (const article of shipped) {
    seen.add(article.slug);
    const row = dbBySlug.get(article.slug);
    if (row) {
      items.push({
        slug: article.slug,
        titleEs: row.es.title || article.es.title,
        titleEn: row.en.title || article.en.title,
        category: row.category,
        status: row.status,
        origin: "database",
        hasShipped: true,
      });
      continue;
    }
    items.push({
      slug: article.slug,
      titleEs: article.es.title,
      titleEn: article.en.title,
      category: article.category,
      status: "published",
      origin: "shipped",
      hasShipped: true,
    });
  }

  for (const row of dbRows) {
    if (seen.has(row.slug)) continue;
    items.push({
      slug: row.slug,
      titleEs: row.es.title,
      titleEn: row.en.title,
      category: row.category,
      status: row.status,
      origin: "database",
      hasShipped: false,
    });
  }

  return items;
}

export function dbRowToCatalogEntry(row: {
  slug: string;
  category: string;
  reviewedAt: string;
  status: string;
  sources: unknown;
  copyEs: unknown;
  copyEn: unknown;
}): CatalogDbEntry | null {
  if (row.status !== "draft" && row.status !== "published") return null;
  if (!isLearnCategory(row.category)) return null;
  const sources = parseLearnSources(row.sources);
  const es = parseLearnArticleCopy(row.copyEs);
  const en = parseLearnArticleCopy(row.copyEn);
  if (!sources || !es || !en) return null;
  return {
    slug: row.slug,
    category: row.category,
    reviewedAt: row.reviewedAt,
    status: row.status,
    sources,
    es,
    en,
  };
}

export async function loadDbLearnEntries(): Promise<CatalogDbEntry[]> {
  try {
    const db = getDb();
    const rows = await db.select().from(learnArticles);
    return rows
      .map((row) => dbRowToCatalogEntry(row))
      .filter((row): row is CatalogDbEntry => row !== null);
  } catch {
    return [];
  }
}

export async function loadPublishedLearnArticles(): Promise<LearnArticle[]> {
  const dbRows = await loadDbLearnEntries();
  return mergeLearnCatalog(LEARN_ARTICLES, dbRows);
}
