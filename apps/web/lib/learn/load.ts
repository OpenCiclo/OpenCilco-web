// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { LEARN_ARTICLES } from "@/lib/learn/articles";
import { dbRowToCatalogEntry, mergeLearnCatalog, type CatalogDbEntry } from "@/lib/learn/catalog";
import { learnArticles } from "@/lib/db/schema";
import { getDb } from "@/lib/db";

export async function loadDbLearnEntries(): Promise<CatalogDbEntry[]> {
  try {
    const db = getDb();
    const rows = await db.select().from(learnArticles);
    return rows
      .map((row) => dbRowToCatalogEntry(row))
      .filter((row): row is CatalogDbEntry => row !== null);
  } catch {
    return [];
  }
}

export async function loadPublishedLearnArticles() {
  const dbRows = await loadDbLearnEntries();
  return mergeLearnCatalog(LEARN_ARTICLES, dbRows);
}
