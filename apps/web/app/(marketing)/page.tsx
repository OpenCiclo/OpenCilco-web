// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { SitePage } from "./site-page";
import { loadPublishedLearnArticles } from "@/lib/learn/load";

export const dynamic = "force-dynamic";

export default async function MarketingPage() {
  const articles = await loadPublishedLearnArticles();
  return <SitePage featured={articles.slice(0, 3)} />;
}
