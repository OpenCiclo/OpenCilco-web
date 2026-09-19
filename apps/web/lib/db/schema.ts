// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  pubkeyHash: text("pubkey_hash").notNull().unique(),
  pubkey: text("pubkey").notNull(),
  ciphertext: text("ciphertext").notNull(),
  nonce: text("nonce").notNull(),
  schemaVersion: integer("schema_version").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const recoveryMailboxes = pgTable("recovery_mailboxes", {
  id: uuid("id").defaultRandom().primaryKey(),
  emailLookup: text("email_lookup").notNull().unique(),
  wrappedSecret: text("wrapped_secret").notNull(),
  wrapNonce: text("wrap_nonce").notNull(),
  wrapSalt: text("wrap_salt").notNull(),
  wrapParams: jsonb("wrap_params").notNull(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const researchContributions = pgTable("research_contributions", {
  poolId: uuid("pool_id").defaultRandom().primaryKey(),
  contributorKeyHash: text("contributor_key_hash").unique(),
  cycleLengths: integer("cycle_lengths").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const authChallenges = pgTable("auth_challenges", {
  id: uuid("id").defaultRandom().primaryKey(),
  pubkeyHash: text("pubkey_hash").notNull(),
  nonce: text("nonce").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const recoveryAttempts = pgTable("recovery_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  emailLookup: text("email_lookup").notNull(),
  ipHash: text("ip_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const recoveryTokens = pgTable("recovery_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  emailLookup: text("email_lookup").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
