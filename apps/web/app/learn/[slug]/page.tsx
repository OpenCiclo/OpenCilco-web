// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { LearnArticleView } from "@/components/learn/learn-article-view";
import { loadPublishedLearnArticles } from "@/lib/learn/load";

export const dynamic = "force-dynamic";

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await loadPublishedLearnArticles();
  const article = articles.find((item) => item.slug === slug) ?? null;
  return <LearnArticleView article={article} />;
}
