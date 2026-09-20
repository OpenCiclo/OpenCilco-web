// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { LearnIndex } from "@/components/learn/learn-index";
import { loadPublishedLearnArticles } from "@/lib/learn/catalog";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const articles = await loadPublishedLearnArticles();
  return <LearnIndex articles={articles} />;
}
