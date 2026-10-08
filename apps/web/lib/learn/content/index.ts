// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";
import { CYCLE_ARTICLES } from "@/lib/learn/content/cycle";
import { PERIODS_ARTICLES } from "@/lib/learn/content/periods";
import { SYMPTOMS_ARTICLES } from "@/lib/learn/content/symptoms";
import { CONDITIONS_ARTICLES } from "@/lib/learn/content/conditions";
import { INTIMATE_HEALTH_ARTICLES } from "@/lib/learn/content/intimate-health";
import { FERTILITY_ARTICLES } from "@/lib/learn/content/fertility";
import { CONTRACEPTION_ARTICLES } from "@/lib/learn/content/contraception";
import { PREGNANCY_ARTICLES } from "@/lib/learn/content/pregnancy";
import { SEXUAL_HEALTH_ARTICLES } from "@/lib/learn/content/sexual-health";
import { MENOPAUSE_ARTICLES } from "@/lib/learn/content/menopause";
import { MIND_ARTICLES } from "@/lib/learn/content/mind";
import { LIFESTYLE_ARTICLES } from "@/lib/learn/content/lifestyle";
import { PUBERTY_ARTICLES } from "@/lib/learn/content/puberty";
import { CARE_ARTICLES } from "@/lib/learn/content/care";

// Shipped Learn library, grouped in LEARN_CATEGORIES order. Server-only: client components get articles as props.
export const LEARN_ARTICLES: LearnArticle[] = [
  ...CYCLE_ARTICLES,
  ...PERIODS_ARTICLES,
  ...SYMPTOMS_ARTICLES,
  ...CONDITIONS_ARTICLES,
  ...INTIMATE_HEALTH_ARTICLES,
  ...FERTILITY_ARTICLES,
  ...CONTRACEPTION_ARTICLES,
  ...PREGNANCY_ARTICLES,
  ...SEXUAL_HEALTH_ARTICLES,
  ...MENOPAUSE_ARTICLES,
  ...MIND_ARTICLES,
  ...LIFESTYLE_ARTICLES,
  ...PUBERTY_ARTICLES,
  ...CARE_ARTICLES,
];

export function findArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((article) => article.slug === slug);
}
