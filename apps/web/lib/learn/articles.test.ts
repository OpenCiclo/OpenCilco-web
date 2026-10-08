// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import {
  LEARN_CATEGORIES,
  LEARN_CATEGORY_COPY,
  articleCopy,
  hasArticleCopy,
  isLearnCategory,
  normalizeLearnCategory,
  relatedArticles,
  type LearnArticleCopy,
} from "./articles";
import { isLearnSlug, isPublishReady, isReviewedAt, isSafeLearnHref } from "./catalog";
import { LEARN_ARTICLES, findArticle } from "./content";
import { messages } from "@/lib/i18n";

function expectCompleteCopy(copy: LearnArticleCopy) {
  expect(copy.title.trim()).not.toBe("");
  expect(copy.summary.trim()).not.toBe("");
  expect(copy.notice.trim()).not.toBe("");
  expect(copy.sections.length).toBeGreaterThan(0);
  for (const section of copy.sections) {
    expect(section.heading.trim()).not.toBe("");
    expect(section.body.trim()).not.toBe("");
  }
  const headings = copy.sections.map((section) => section.heading);
  expect(new Set(headings).size).toBe(headings.length);
}

describe("learn articles", () => {
  it("has unique, valid slugs", () => {
    const slugs = LEARN_ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(isLearnSlug(slug)).toBe(true);
  });

  it("has complete English copy, and complete Spanish copy when present", () => {
    for (const article of LEARN_ARTICLES) {
      expectCompleteCopy(article.en);
      if (article.es) expectCompleteCopy(article.es);
      expect(isLearnCategory(article.category)).toBe(true);
      expect(isReviewedAt(article.reviewedAt)).toBe(true);
      expect(isPublishReady(article)).toBe(true);
    }
  });

  it("cites at least one safe, unique source per article", () => {
    for (const article of LEARN_ARTICLES) {
      expect(article.sources.length).toBeGreaterThan(0);
      for (const source of article.sources) {
        expect(source.label.trim()).not.toBe("");
        expect(isSafeLearnHref(source.href)).toBe(true);
      }
      const hrefs = article.sources.map((source) => source.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });

  it("links related articles that exist", () => {
    const slugs = new Set(LEARN_ARTICLES.map((article) => article.slug));
    for (const article of LEARN_ARTICLES) {
      for (const slug of article.related ?? []) {
        expect(slug).not.toBe(article.slug);
        expect(slugs.has(slug)).toBe(true);
      }
    }
  });

  it("has articles in every category, listed in category order", () => {
    for (const category of LEARN_CATEGORIES) {
      expect(LEARN_ARTICLES.some((article) => article.category === category)).toBe(true);
    }
    const order = LEARN_ARTICLES.map((article) => LEARN_CATEGORIES.indexOf(article.category));
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("finds an article by slug", () => {
    expect(findArticle("cycle-phases")?.category).toBe("cycle");
    expect(findArticle("missing")).toBeUndefined();
  });
});

describe("learn categories", () => {
  it("has UI copy in both locales for every category", () => {
    for (const category of LEARN_CATEGORIES) {
      const keys = LEARN_CATEGORY_COPY[category];
      for (const locale of ["es", "en"] as const) {
        expect(messages[locale][keys.title].trim()).not.toBe("");
        expect(messages[locale][keys.description].trim()).not.toBe("");
      }
    }
  });

  it("maps the legacy mucus category onto cycle", () => {
    expect(normalizeLearnCategory("mucus")).toBe("cycle");
    expect(normalizeLearnCategory("periods")).toBe("periods");
    expect(normalizeLearnCategory("unknown")).toBeNull();
  });
});

describe("learn copy helpers", () => {
  const englishOnly = LEARN_ARTICLES.find((article) => !article.es)!;
  const bilingual = LEARN_ARTICLES.find((article) => article.es)!;

  it("falls back to English when Spanish is missing", () => {
    expect(hasArticleCopy(englishOnly, "es")).toBe(false);
    expect(articleCopy(englishOnly, "es")).toBe(englishOnly.en);
    expect(hasArticleCopy(bilingual, "es")).toBe(true);
    expect(articleCopy(bilingual, "es")).toBe(bilingual.es);
  });

  it("resolves related articles in order and skips missing ones", () => {
    const article = findArticle("cycle-phases")!;
    const related = relatedArticles(article, LEARN_ARTICLES);
    expect(related.map((item) => item.slug)).toEqual(article.related);
    const withoutFirst = LEARN_ARTICLES.filter((item) => item.slug !== article.related![0]);
    expect(relatedArticles(article, withoutFirst).map((item) => item.slug)).toEqual(article.related!.slice(1));
  });
});
