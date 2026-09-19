// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

function sslFor(url: string): false | "require" {
  const override = process.env.DATABASE_SSL;
  if (override === "disable") return false;
  if (override === "require") return "require";
  if (/sslmode=disable/i.test(url) || /localhost|127\.0\.0\.1/i.test(url)) return false;
  // Neon and similar hosted URLs; docker-compose Postgres has no TLS.
  if (/sslmode=require/i.test(url) || /neon\.tech/i.test(url)) return "require";
  return false;
}

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = postgres(url, {
    max: 1,
    ssl: sslFor(url),
  });
  return drizzle(client, { schema });
}

let cached: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!cached) cached = createDb();
  return cached;
}
