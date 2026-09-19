// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { ReactNode } from "react";

export type MarkdownBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export function parseMarkdown(source: string): MarkdownBlock[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        body.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", language, code: body.join("\n") });
      continue;
    }

    const heading = line.match(/^(#{1,3}) (.+)$/);
    if (heading) {
      const level = heading[1].length as 1 | 2 | 3;
      blocks.push({ type: "heading", level, text: heading[2] });
      index += 1;
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      const table = parseTable(tableLines);
      if (table) blocks.push(table);
      continue;
    }

    if (/^\s*[-*] /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*] /.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*] /, ""));
        index += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (/^\s*\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\. /.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\. /, ""));
        index += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

export function MarkdownDocument({ source }: { source: string }) {
  const blocks = parseMarkdown(source);
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => (
        <MarkdownBlockView key={index} block={block} />
      ))}
    </div>
  );
}

function MarkdownBlockView({ block }: { block: MarkdownBlock }) {
  if (block.type === "heading") {
    const className =
      block.level === 1
        ? "font-serif text-3xl text-balance text-foreground"
        : block.level === 2
          ? "mt-4 font-serif text-2xl text-balance text-foreground"
          : "mt-2 font-serif text-xl text-balance text-foreground";
    const Tag = block.level === 1 ? "h1" : block.level === 2 ? "h2" : "h3";
    return <Tag className={className}>{renderInline(block.text)}</Tag>;
  }

  if (block.type === "paragraph") {
    return <p className="text-base leading-relaxed text-pretty text-foreground/85">{renderInline(block.text)}</p>;
  }

  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag className={block.ordered ? "flex list-decimal flex-col gap-2 pl-5" : "flex list-disc flex-col gap-2 pl-5"}>
        {block.items.map((item) => (
          <li key={item} className="text-base leading-relaxed text-foreground/85">
            {renderInline(item)}
          </li>
        ))}
      </Tag>
    );
  }

  if (block.type === "code") {
    return (
      <pre className="overflow-x-auto rounded-2xl bg-card p-4 text-sm shadow-sm">
        <code className="font-mono text-[13px] leading-relaxed text-card-foreground">{block.code}</code>
      </pre>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-card shadow-sm">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            {block.headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold text-card-foreground">
                {renderInline(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-border last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className="px-4 py-3 align-top leading-relaxed text-muted-foreground">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function parseTable(lines: string[]): Extract<MarkdownBlock, { type: "table" }> | null {
  const rows = lines
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim()),
    )
    .filter((row) => row.some((cell) => cell.length > 0));
  if (rows.length < 2) return null;
  const headers = rows[0];
  const data = rows.slice(1).filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell)));
  return { type: "table", headers, rows: data };
}

function isBlockStart(line: string): boolean {
  return (
    line.startsWith("```") ||
    /^#{1,3} /.test(line) ||
    line.startsWith("|") ||
    /^\s*[-*] /.test(line) ||
    /^\s*\d+\. /.test(line)
  );
}

function isSafeHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("https://") || href.startsWith("http://") || href.startsWith("#");
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key} className="rounded-md bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (link && isSafeHref(link[2])) {
        const external = link[2].startsWith("http");
        nodes.push(
          <a
            key={key}
            href={link[2]}
            className="font-medium text-primary underline underline-offset-2"
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {link[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    }
    key += 1;
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
