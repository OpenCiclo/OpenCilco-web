// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("database schema", () => {
  const sql = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../drizzle/0000_init.sql"),
    "utf8",
  );

  it("does not map accounts to the research pool", () => {
    const start = sql.indexOf("CREATE TABLE IF NOT EXISTS research_contributions");
    const end = sql.indexOf(";", start);
    const table = sql.slice(start, end);
    expect(table).toContain("cycle_lengths");
    expect(table.toLowerCase()).not.toContain("account_id");
    expect(table.toLowerCase()).not.toContain("pubkey");
    expect(table.toLowerCase()).not.toContain("user_id");
  });

  it("supports anonymous upsert keys without account linkage", () => {
    const upsert = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../drizzle/0001_pool_upsert.sql"),
      "utf8",
    );
    expect(upsert).toContain("contributor_key_hash");
    expect(upsert.toLowerCase()).not.toContain("account_id");
  });
});
