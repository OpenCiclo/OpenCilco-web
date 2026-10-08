// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { Locale, Messages } from "@/lib/i18n";

export const LEARN_CATEGORIES = [
  "cycle",
  "periods",
  "symptoms",
  "conditions",
  "intimate-health",
  "fertility",
  "contraception",
  "pregnancy",
  "sexual-health",
  "menopause",
  "mind",
  "lifestyle",
  "puberty",
  "care",
] as const;

export type LearnCategory = (typeof LEARN_CATEGORIES)[number];

export function isLearnCategory(value: string): value is LearnCategory {
  return (LEARN_CATEGORIES as readonly string[]).includes(value);
}

// Categories that existing learn_articles rows may still use.
const LEGACY_CATEGORIES: Record<string, LearnCategory> = {
  mucus: "cycle",
};

export function normalizeLearnCategory(value: string): LearnCategory | null {
  if (isLearnCategory(value)) return value;
  return LEGACY_CATEGORIES[value] ?? null;
}

export const LEARN_CATEGORY_COPY: Record<LearnCategory, { title: keyof Messages; description: keyof Messages }> = {
  cycle: { title: "learnCategoryCycle", description: "learnCategoryCycleDescription" },
  periods: { title: "learnCategoryPeriods", description: "learnCategoryPeriodsDescription" },
  symptoms: { title: "learnCategorySymptoms", description: "learnCategorySymptomsDescription" },
  conditions: { title: "learnCategoryConditions", description: "learnCategoryConditionsDescription" },
  "intimate-health": { title: "learnCategoryIntimateHealth", description: "learnCategoryIntimateHealthDescription" },
  fertility: { title: "learnCategoryFertility", description: "learnCategoryFertilityDescription" },
  contraception: { title: "learnCategoryContraception", description: "learnCategoryContraceptionDescription" },
  pregnancy: { title: "learnCategoryPregnancy", description: "learnCategoryPregnancyDescription" },
  "sexual-health": { title: "learnCategorySexualHealth", description: "learnCategorySexualHealthDescription" },
  menopause: { title: "learnCategoryMenopause", description: "learnCategoryMenopauseDescription" },
  mind: { title: "learnCategoryMind", description: "learnCategoryMindDescription" },
  lifestyle: { title: "learnCategoryLifestyle", description: "learnCategoryLifestyleDescription" },
  puberty: { title: "learnCategoryPuberty", description: "learnCategoryPubertyDescription" },
  care: { title: "learnCategoryCare", description: "learnCategoryCareDescription" },
};

export type LearnSource = {
  label: string;
  href: string;
};

export type LearnArticleCopy = {
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
  notice: string;
};

export type LearnArticle = {
  slug: string;
  category: LearnCategory;
  reviewedAt: string;
  sources: LearnSource[];
  related?: string[];
  // Optional until translated; the Spanish UI falls back to English.
  es?: LearnArticleCopy;
  en: LearnArticleCopy;
};

export function hasArticleCopy(article: LearnArticle, locale: Locale): boolean {
  return Boolean(article[locale]);
}

export function articleCopy(article: LearnArticle, locale: Locale): LearnArticleCopy {
  return article[locale] ?? article.en;
}

export function relatedArticles(article: LearnArticle, articles: LearnArticle[]): LearnArticle[] {
  const bySlug = new Map(articles.map((item) => [item.slug, item]));
  return (article.related ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((item): item is LearnArticle => item !== undefined);
}
