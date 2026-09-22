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

  it("stores learn articles without account or health columns", () => {
    const learn = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../drizzle/0002_learn_articles.sql"),
      "utf8",
    );
    expect(learn).toContain("CREATE TABLE IF NOT EXISTS learn_articles");
    expect(learn.toLowerCase()).not.toContain("account_id");
    expect(learn.toLowerCase()).not.toContain("pubkey");
    expect(learn.toLowerCase()).not.toContain("ciphertext");
    expect(learn.toLowerCase()).not.toContain("cycle_lengths");
  });

  it("confirms mailboxes via hashed codes without plaintext email or health columns", () => {
    const pending = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../drizzle/0003_mailbox_pending.sql"),
      "utf8",
    );
    expect(pending).toContain("CREATE TABLE IF NOT EXISTS mailbox_pending");
    expect(pending).toContain("email_lookup");
    expect(pending).toContain("code_hash");
    expect(pending).toContain("ON DELETE CASCADE");
    expect(pending).toContain("verified_at");
    expect(pending).not.toContain("recovery_tokens");
    expect(pending.toLowerCase()).not.toContain("email text");
    expect(pending.toLowerCase()).not.toContain("cycle_lengths");
    expect(pending.toLowerCase()).not.toContain("pubkey");
    expect(pending.toLowerCase()).not.toContain("ciphertext");
  });

  it("cascades mailbox rows when an account is deleted", () => {
    const init = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../drizzle/0000_init.sql"),
      "utf8",
    );
    expect(init).toMatch(/REFERENCES accounts\(id\) ON DELETE CASCADE/);
  });

  it("counts sign-ins by day without email or health columns", () => {
    const activity = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../drizzle/0004_account_activity.sql"),
      "utf8",
    );
    expect(activity).toContain("CREATE TABLE IF NOT EXISTS account_activity_days");
    expect(activity).toContain("PRIMARY KEY (account_id, day)");
    expect(activity).toContain("ON DELETE CASCADE");
    expect(activity.toLowerCase()).not.toContain("email");
    expect(activity.toLowerCase()).not.toContain("ciphertext");
    expect(activity.toLowerCase()).not.toContain("cycle_lengths");
    expect(activity.toLowerCase()).not.toContain("pubkey");
  });
});
