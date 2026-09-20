// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { LEARN_ARTICLES, isLearnCategory } from "@/lib/learn/articles";
import {
  dbRowToCatalogEntry,
  emptyLearnArticle,
  isLearnSlug,
  isPublishReady,
  isReviewedAt,
  isSafeLearnHref,
  parseLearnArticleCopy,
  parseLearnSources,
  type CatalogDbEntry,
  type LearnStatus,
} from "@/lib/learn/catalog";
import { learnArticles } from "@/lib/db/schema";
import { getDb } from "@/lib/db";

export type LearnEditorPayload = {
  slug: string;
  isNew: boolean;
  origin: "shipped" | "database" | "new";
  hasShipped: boolean;
  status: LearnStatus;
  article: {
    slug: string;
    category: string;
    reviewedAt: string;
    sources: { label: string; href: string }[];
    es: ReturnType<typeof parseLearnArticleCopy>;
    en: ReturnType<typeof parseLearnArticleCopy>;
  };
};

function revalidateLearn(): void {
  revalidatePath("/learn");
  revalidatePath("/");
  revalidatePath("/console/learn");
}

export async function loadLearnEditorPayload(slug: string): Promise<LearnEditorPayload | null> {
  if (slug === "new") {
    const article = emptyLearnArticle("");
    return {
      slug: "",
      isNew: true,
      origin: "new",
      hasShipped: false,
      status: "draft",
      article,
    };
  }
  if (!isLearnSlug(slug)) return null;

  let entry: CatalogDbEntry | null = null;
  try {
    const db = getDb();
    const rows = await db.select().from(learnArticles).where(eq(learnArticles.slug, slug)).limit(1);
    entry = rows[0] ? dbRowToCatalogEntry(rows[0]) : null;
  } catch {
    entry = null;
  }
  const shipped = LEARN_ARTICLES.find((article) => article.slug === slug);

  if (entry) {
    return {
      slug,
      isNew: false,
      origin: "database",
      hasShipped: Boolean(shipped),
      status: entry.status,
      article: {
        slug: entry.slug,
        category: entry.category,
        reviewedAt: entry.reviewedAt,
        sources: entry.sources,
        es: entry.es,
        en: entry.en,
      },
    };
  }

  if (shipped) {
    return {
      slug,
      isNew: false,
      origin: "shipped",
      hasShipped: true,
      status: "published",
      article: shipped,
    };
  }

  return null;
}

export type UpsertLearnInput = {
  slug: string;
  category: string;
  reviewedAt: string;
  status: string;
  sources: unknown;
  es: unknown;
  en: unknown;
};

export function parseUpsertLearnInput(body: UpsertLearnInput): { ok: true; entry: CatalogDbEntry } | { ok: false; error: string } {
  if (!isLearnSlug(body.slug) || body.slug === "new") return { ok: false, error: "Invalid slug" };
  if (!isLearnCategory(body.category)) return { ok: false, error: "Invalid category" };
  if (!isReviewedAt(body.reviewedAt)) return { ok: false, error: "Invalid reviewed date" };
  if (body.status !== "draft" && body.status !== "published") return { ok: false, error: "Invalid status" };
  const sources = parseLearnSources(body.sources);
  const es = parseLearnArticleCopy(body.es);
  const en = parseLearnArticleCopy(body.en);
  if (!sources || !es || !en) return { ok: false, error: "Invalid article payload" };
  for (const source of sources) {
    if (source.href.trim() && !isSafeLearnHref(source.href.trim())) {
      return { ok: false, error: "Source URLs must be http(s)" };
    }
  }
  const entry: CatalogDbEntry = {
    slug: body.slug,
    category: body.category,
    reviewedAt: body.reviewedAt,
    status: body.status,
    sources: sources.map((source) => ({ label: source.label.trim(), href: source.href.trim() })),
    es,
    en,
  };
  if (entry.status === "published" && !isPublishReady(entry)) {
    return { ok: false, error: "Article is not ready to publish" };
  }
  return { ok: true, entry };
}

export async function upsertLearnArticle(entry: CatalogDbEntry): Promise<void> {
  const db = getDb();
  const existing = await db.select({ id: learnArticles.id }).from(learnArticles).where(eq(learnArticles.slug, entry.slug)).limit(1);
  const values = {
    slug: entry.slug,
    category: entry.category,
    reviewedAt: entry.reviewedAt,
    status: entry.status,
    sources: entry.sources,
    copyEs: entry.es,
    copyEn: entry.en,
    updatedAt: new Date(),
  };
  if (existing[0]) {
    await db.update(learnArticles).set(values).where(eq(learnArticles.id, existing[0].id));
  } else {
    await db.insert(learnArticles).values(values);
  }
  revalidateLearn();
}

export async function deleteLearnArticle(slug: string): Promise<boolean> {
  if (!isLearnSlug(slug)) return false;
  const db = getDb();
  const deleted = await db.delete(learnArticles).where(eq(learnArticles.slug, slug)).returning({ id: learnArticles.id });
  if (!deleted[0]) return false;
  revalidateLearn();
  return true;
}
