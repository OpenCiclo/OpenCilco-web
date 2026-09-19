// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HELP_ARTICLES, findHelpArticle } from "@/lib/help/articles";
import { loadHelpMarkdown, stripLeadingH1 } from "@/lib/help/load";
import { MarkdownDocument } from "@/lib/help/markdown";

export function generateStaticParams() {
  return HELP_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findHelpArticle(slug);
  if (!article) return { title: "Help · Ciclo" };
  return {
    title: `${article.title} · Help`,
    description: article.summary,
  };
}

export default async function HelpArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findHelpArticle(slug);
  if (!article) notFound();

  let source: string;
  try {
    source = loadHelpMarkdown(article.slug);
  } catch {
    notFound();
  }

  return (
    <article className="flex flex-col gap-6">
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        <Link href="/help" className="hover:underline">
          Help
        </Link>
      </p>
      <h1 className="font-serif text-4xl text-balance">{article.title}</h1>
      <p className="text-base leading-relaxed text-pretty text-muted-foreground">{article.summary}</p>
      <MarkdownDocument source={stripLeadingH1(source)} />
      <p className="pt-4">
        <Link href="/help" className="text-sm font-semibold text-primary underline underline-offset-2">
          All Help articles
        </Link>
      </p>
    </article>
  );
}
