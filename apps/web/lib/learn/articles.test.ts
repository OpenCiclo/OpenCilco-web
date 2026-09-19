// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { LEARN_ARTICLES, findArticle } from "./articles";

describe("learn articles", () => {
  it("has unique slugs and both locales", () => {
    const slugs = LEARN_ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const article of LEARN_ARTICLES) {
      expect(article.es.title.length).toBeGreaterThan(0);
      expect(article.en.title.length).toBeGreaterThan(0);
      expect(article.sources.length).toBeGreaterThan(0);
    }
  });

  it("finds an article by slug", () => {
    expect(findArticle("cycle-phases")?.category).toBe("cycle");
    expect(findArticle("missing")).toBeUndefined();
  });
});
