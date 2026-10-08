// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import type { LearnArticleCopy } from "./articles";
import { LEARN_ARTICLES } from "./content";
import {
  dbRowToCatalogEntry,
  emptyLearnCopy,
  isPublishReady,
  isSafeLearnHref,
  mergeLearnCatalog,
  type CatalogDbEntry,
} from "./catalog";

const sampleCopy: LearnArticleCopy = {
  title: "Sample",
  summary: "Summary",
  sections: [{ heading: "Heading", body: "Body" }],
  notice: "Notice",
};

function dbEntry(overrides: Partial<CatalogDbEntry> & Pick<CatalogDbEntry, "slug" | "status">): CatalogDbEntry {
  return {
    category: "care",
    reviewedAt: "2026-09-20",
    sources: [{ label: "NHS", href: "https://www.nhs.uk/" }],
    es: { ...sampleCopy, title: "DB ES" },
    en: { ...sampleCopy, title: "DB EN" },
    ...overrides,
  };
}

describe("learn catalog merge", () => {
  it("keeps shipped articles when the database is empty", () => {
    expect(mergeLearnCatalog(LEARN_ARTICLES, []).map((article) => article.slug)).toEqual(
      LEARN_ARTICLES.map((article) => article.slug),
    );
  });

  it("lets a published database row replace shipped copy and keeps shipped related links", () => {
    const shipped = LEARN_ARTICLES.find((article) => article.slug === "cycle-phases");
    const merged = mergeLearnCatalog(LEARN_ARTICLES, [dbEntry({ slug: "cycle-phases", status: "published" })]);
    const article = merged.find((item) => item.slug === "cycle-phases");
    expect(article?.es?.title).toBe("DB ES");
    expect(article?.related).toEqual(shipped?.related);
  });

  it("hides a shipped article when the database row is a draft", () => {
    const merged = mergeLearnCatalog(LEARN_ARTICLES, [dbEntry({ slug: "cycle-phases", status: "draft" })]);
    expect(merged.some((article) => article.slug === "cycle-phases")).toBe(false);
  });

  it("adds database-only published slugs", () => {
    const merged = mergeLearnCatalog(LEARN_ARTICLES, [dbEntry({ slug: "iron-and-cycles", status: "published" })]);
    expect(merged.some((article) => article.slug === "iron-and-cycles")).toBe(true);
  });
});

describe("learn database rows", () => {
  const row = {
    slug: "cervical-mucus",
    category: "cycle",
    reviewedAt: "2026-09-20",
    status: "published",
    sources: [{ label: "NHS", href: "https://www.nhs.uk/" }],
    copyEs: sampleCopy,
    copyEn: sampleCopy,
  };

  it("keeps rows saved under the legacy mucus category", () => {
    expect(dbRowToCatalogEntry({ ...row, category: "mucus" })?.category).toBe("cycle");
    expect(dbRowToCatalogEntry({ ...row, category: "unknown" })).toBeNull();
  });

  it("treats a blank Spanish copy as untranslated", () => {
    expect(dbRowToCatalogEntry({ ...row, copyEs: emptyLearnCopy() })?.es).toBeUndefined();
    expect(dbRowToCatalogEntry(row)?.es?.title).toBe("Sample");
  });
});

describe("learn href and publish rules", () => {
  it("allows http(s) sources only", () => {
    expect(isSafeLearnHref("https://www.nhs.uk/")).toBe(true);
    expect(isSafeLearnHref("javascript:alert(1)")).toBe(false);
    expect(isSafeLearnHref("/help")).toBe(false);
  });

  it("requires English copy, a notice, and a safe source to publish", () => {
    const ready = dbEntry({ slug: "cycle-phases", status: "published" });
    expect(isPublishReady(ready)).toBe(true);
    expect(isPublishReady({ ...ready, sources: [] })).toBe(false);
    expect(isPublishReady({ ...ready, en: { ...ready.en, notice: "" } })).toBe(false);
  });

  it("allows blank Spanish copy but not a half-written translation", () => {
    const ready = dbEntry({ slug: "cycle-phases", status: "published" });
    expect(isPublishReady({ ...ready, es: undefined })).toBe(true);
    expect(isPublishReady({ ...ready, es: emptyLearnCopy() })).toBe(true);
    expect(isPublishReady({ ...ready, es: { ...sampleCopy, notice: "" } })).toBe(false);
  });
});
