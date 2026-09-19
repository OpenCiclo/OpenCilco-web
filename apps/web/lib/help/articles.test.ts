// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { HELP_ARTICLES, HELP_SECTIONS, findHelpArticle } from "./articles";
import { helpContentDir, loadHelpMarkdown, stripLeadingH1 } from "./load";
import { parseMarkdown } from "./markdown";

describe("help catalog", () => {
  it("has unique slugs covering every section", () => {
    const slugs = HELP_ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const section of HELP_SECTIONS) {
      expect(HELP_ARTICLES.some((article) => article.section === section.id)).toBe(true);
    }
  });

  it("finds articles by slug", () => {
    expect(findHelpArticle("what-ciclo-is")?.section).toBe("product");
    expect(findHelpArticle("missing")).toBeUndefined();
  });

  it("has a markdown file for every catalog slug", () => {
    expect(helpContentDir()).toMatch(/content[\\/]help$/);
    for (const article of HELP_ARTICLES) {
      const source = loadHelpMarkdown(article.slug);
      expect(source.startsWith(`# ${article.title}`)).toBe(true);
      expect(stripLeadingH1(source).length).toBeGreaterThan(80);
    }
  });
});

describe("help markdown", () => {
  it("parses headings, lists, code, links, and tables", () => {
    const blocks = parseMarkdown(
      [
        "# Title",
        "",
        "A **bold** word and `code` and [Help](/help).",
        "",
        "- one",
        "- two",
        "",
        "1. first",
        "2. second",
        "",
        "   - nested a",
        "   - nested b",
        "",
        "```bash",
        "npm run dev",
        "```",
        "",
        "| A | B |",
        "| --- | --- |",
        "| x | y |",
      ].join("\n"),
    );
    expect(blocks[0]).toEqual({ type: "heading", level: 1, text: "Title" });
    expect(blocks[1]).toMatchObject({ type: "paragraph" });
    expect(blocks[2]).toEqual({ type: "list", ordered: false, items: ["one", "two"] });
    expect(blocks[3]).toEqual({ type: "list", ordered: true, items: ["first", "second"] });
    expect(blocks[4]).toEqual({ type: "list", ordered: false, items: ["nested a", "nested b"] });
    expect(blocks[5]).toEqual({ type: "code", language: "bash", code: "npm run dev" });
    expect(blocks[6]).toEqual({ type: "table", headers: ["A", "B"], rows: [["x", "y"]] });
  });
});
