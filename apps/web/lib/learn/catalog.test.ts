// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { LEARN_ARTICLES } from "./articles";
import {
  isPublishReady,
  isSafeLearnHref,
  mergeLearnCatalog,
  type CatalogDbEntry,
} from "./catalog";

const sampleCopy = LEARN_ARTICLES[0].es;

function dbEntry(overrides: Partial<CatalogDbEntry> & Pick<CatalogDbEntry, "slug" | "status">): CatalogDbEntry {
  return {
    category: "care",
    reviewedAt: "2026-09-20",
    sources: [{ label: "NHS", href: "https://www.nhs.uk/" }],
    es: { ...sampleCopy, title: "DB ES" },
    en: { ...LEARN_ARTICLES[0].en, title: "DB EN" },
    ...overrides,
  };
}

describe("learn catalog merge", () => {
  it("keeps shipped articles when the database is empty", () => {
    expect(mergeLearnCatalog(LEARN_ARTICLES, []).map((article) => article.slug)).toEqual(
      LEARN_ARTICLES.map((article) => article.slug),
    );
  });

  it("lets a published database row replace shipped copy", () => {
    const merged = mergeLearnCatalog(LEARN_ARTICLES, [dbEntry({ slug: "cycle-phases", status: "published" })]);
    expect(merged.find((article) => article.slug === "cycle-phases")?.es.title).toBe("DB ES");
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

describe("learn href and publish rules", () => {
  it("allows http(s) sources only", () => {
    expect(isSafeLearnHref("https://www.nhs.uk/")).toBe(true);
    expect(isSafeLearnHref("javascript:alert(1)")).toBe(false);
    expect(isSafeLearnHref("/help")).toBe(false);
  });

  it("requires bilingual copy, notice, and a safe source to publish", () => {
    const ready = dbEntry({ slug: "cycle-phases", status: "published" });
    expect(isPublishReady(ready)).toBe(true);
    expect(isPublishReady({ ...ready, sources: [] })).toBe(false);
    expect(isPublishReady({ ...ready, es: { ...ready.es, notice: "" } })).toBe(false);
  });
});
