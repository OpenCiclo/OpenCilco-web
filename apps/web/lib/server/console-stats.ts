// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { and, count, gte, gt, lt, ne, notInArray, sql } from "drizzle-orm";

import { LEARN_ARTICLES } from "@/lib/learn/articles";
import { mergeLearnCatalog } from "@/lib/learn/catalog";
import { loadDbLearnEntries } from "@/lib/learn/load";
import { accountActivityDays, accounts, recoveryMailboxes, researchContributions } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { consoleAdminAccountIds } from "@/lib/server/account-activity";

export type ConsoleDayCount = {
  day: string;
  count: number;
};

export type ConsoleStats = {
  accountsTotal: number;
  accountsNew7d: number;
  accountsNew30d: number;
  signupsToday: number;
  signupsYesterday: number;
  accountsByDay: ConsoleDayCount[];
  activeToday: number;
  active7d: number;
  active30d: number;
  activeByDay: ConsoleDayCount[];
  emailAccounts: number;
  phraseOnlyAccounts: number;
  hostedDiaries: number;
  diariesSaved7d: number;
  diariesSaved30d: number;
  researchRows: number;
  researchNew30d: number;
  learnPublishedDb: number;
  learnDraftsDb: number;
  learnPublic: number;
};

function utcDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function fillDayCounts(rows: { day: string; count: number }[], spanDays: number): ConsoleDayCount[] {
  const byDay = new Map(rows.map((row) => [row.day, row.count]));
  const result: ConsoleDayCount[] = [];
  for (let offset = spanDays - 1; offset >= 0; offset -= 1) {
    const day = utcDay(daysAgo(offset));
    result.push({ day, count: byDay.get(day) ?? 0 });
  }
  return result;
}

function startOfUtcDay(offsetDays = 0): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - offsetDays));
}

async function loadActivity(spanDays: number): Promise<{
  activeToday: number;
  active7d: number;
  active30d: number;
  activeByDay: ConsoleDayCount[];
}> {
  const empty = {
    activeToday: 0,
    active7d: 0,
    active30d: 0,
    activeByDay: fillDayCounts([], spanDays),
  };
  try {
    const db = getDb();
    const adminIds = await consoleAdminAccountIds();
    const excludeAdmins =
      adminIds.length > 0 ? notInArray(accountActivityDays.accountId, adminIds) : undefined;
    const today = utcDay(new Date());
    const day7 = utcDay(daysAgo(6));
    const day30 = utcDay(daysAgo(29));
    const day28 = utcDay(daysAgo(spanDays - 1));
    const distinct = sql<number>`count(distinct ${accountActivityDays.accountId})::int`;
    const [todayRows, weekRows, monthRows, byDay] = await Promise.all([
      db.select({ n: count() }).from(accountActivityDays).where(and(gte(accountActivityDays.day, today), excludeAdmins)),
      db.select({ n: distinct }).from(accountActivityDays).where(and(gte(accountActivityDays.day, day7), excludeAdmins)),
      db.select({ n: distinct }).from(accountActivityDays).where(and(gte(accountActivityDays.day, day30), excludeAdmins)),
      db
        .select({
          day: accountActivityDays.day,
          count: sql<number>`count(*)::int`,
        })
        .from(accountActivityDays)
        .where(and(gte(accountActivityDays.day, day28), excludeAdmins))
        .groupBy(accountActivityDays.day),
    ]);
    return {
      activeToday: Number(todayRows[0]?.n ?? 0),
      active7d: Number(weekRows[0]?.n ?? 0),
      active30d: Number(monthRows[0]?.n ?? 0),
      activeByDay: fillDayCounts(
        byDay.map((row) => ({ day: String(row.day), count: Number(row.count) })),
        spanDays,
      ),
    };
  } catch {
    return empty;
  }
}

export async function loadConsoleStats(): Promise<ConsoleStats> {
  const db = getDb();
  const since7 = daysAgo(7);
  const since30 = daysAgo(30);
  const since28 = daysAgo(27);
  const todayStart = startOfUtcDay(0);
  const yesterdayStart = startOfUtcDay(1);

  const [
    totalRows,
    new7Rows,
    new30Rows,
    todayRows,
    yesterdayRows,
    emailRows,
    hostedRows,
    saved7Rows,
    saved30Rows,
    researchTotalRows,
    researchNewRows,
    recentSignups,
    activity,
  ] = await Promise.all([
    db.select({ n: count() }).from(accounts),
    db.select({ n: count() }).from(accounts).where(gt(accounts.createdAt, since7)),
    db.select({ n: count() }).from(accounts).where(gt(accounts.createdAt, since30)),
    db.select({ n: count() }).from(accounts).where(gte(accounts.createdAt, todayStart)),
    db
      .select({ n: count() })
      .from(accounts)
      .where(and(gte(accounts.createdAt, yesterdayStart), lt(accounts.createdAt, todayStart))),
    db.select({ n: count() }).from(recoveryMailboxes),
    db.select({ n: count() }).from(accounts).where(ne(accounts.ciphertext, "")),
    db
      .select({ n: count() })
      .from(accounts)
      .where(and(ne(accounts.ciphertext, ""), gt(accounts.updatedAt, since7))),
    db
      .select({ n: count() })
      .from(accounts)
      .where(and(ne(accounts.ciphertext, ""), gt(accounts.updatedAt, since30))),
    db.select({ n: count() }).from(researchContributions),
    db.select({ n: count() }).from(researchContributions).where(gt(researchContributions.createdAt, since30)),
    db.select({ createdAt: accounts.createdAt }).from(accounts).where(gt(accounts.createdAt, since28)),
    loadActivity(28),
  ]);

  const signupCounts = new Map<string, number>();
  for (const row of recentSignups) {
    const day = utcDay(row.createdAt);
    signupCounts.set(day, (signupCounts.get(day) ?? 0) + 1);
  }

  const dbLearn = await loadDbLearnEntries();
  const learnPublishedDb = dbLearn.filter((row) => row.status === "published").length;
  const learnDraftsDb = dbLearn.filter((row) => row.status === "draft").length;

  const accountsTotal = Number(totalRows[0]?.n ?? 0);
  const emailAccounts = Number(emailRows[0]?.n ?? 0);

  return {
    accountsTotal,
    accountsNew7d: Number(new7Rows[0]?.n ?? 0),
    accountsNew30d: Number(new30Rows[0]?.n ?? 0),
    signupsToday: Number(todayRows[0]?.n ?? 0),
    signupsYesterday: Number(yesterdayRows[0]?.n ?? 0),
    accountsByDay: fillDayCounts(
      [...signupCounts.entries()].map(([day, count]) => ({ day, count })),
      28,
    ),
    activeToday: activity.activeToday,
    active7d: activity.active7d,
    active30d: activity.active30d,
    activeByDay: activity.activeByDay,
    emailAccounts,
    phraseOnlyAccounts: Math.max(0, accountsTotal - emailAccounts),
    hostedDiaries: Number(hostedRows[0]?.n ?? 0),
    diariesSaved7d: Number(saved7Rows[0]?.n ?? 0),
    diariesSaved30d: Number(saved30Rows[0]?.n ?? 0),
    researchRows: Number(researchTotalRows[0]?.n ?? 0),
    researchNew30d: Number(researchNewRows[0]?.n ?? 0),
    learnPublishedDb,
    learnDraftsDb,
    learnPublic: mergeLearnCatalog(LEARN_ARTICLES, dbLearn).length,
  };
}
