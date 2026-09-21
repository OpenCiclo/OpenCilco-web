// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import postgres from "postgres";
import { describe, expect, it } from "vitest";

const databaseUrl = process.env.DATABASE_URL;

describe.skipIf(!databaseUrl)("mailbox pending database", () => {
  it("does not fetch pending kits; verified kits fetch; delete frees the lookup", async () => {
    const sql = postgres(databaseUrl as string, { max: 1 });
    try {
      const pendingTable = await sql`
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'mailbox_pending'
      `;
      if (pendingTable.length === 0) return;

      await sql`BEGIN`;
      try {
        const stamp = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const [account] = await sql<{ id: string }[]>`
          INSERT INTO accounts (pubkey_hash, pubkey, ciphertext, nonce)
          VALUES (${`pending-test-${stamp}`}, 'pub', 'ct', 'nonce')
          RETURNING id
        `;
        const pendingLookup = `pending-${stamp}`;
        const verifiedLookup = `verified-${stamp}`;
        const wrap = sql.json({ kdf: "pbkdf2-sha256", iterations: 1, hash: "SHA-256" });

        await sql`
          INSERT INTO mailbox_pending (
            email_lookup, account_id, wrapped_secret, wrap_nonce, wrap_salt, wrap_params, code_hash, expires_at
          ) VALUES (
            ${pendingLookup}, ${account.id}, 'wrapped', 'nonce', 'salt', ${wrap}, 'codehash',
            now() + interval '15 minutes'
          )
        `;

        const pendingFetch = await sql`
          SELECT wrapped_secret FROM recovery_mailboxes
          WHERE email_lookup = ${pendingLookup} AND verified_at IS NOT NULL
        `;
        expect(pendingFetch).toHaveLength(0);

        await sql`
          INSERT INTO recovery_mailboxes (
            email_lookup, wrapped_secret, wrap_nonce, wrap_salt, wrap_params, account_id, verified_at
          ) VALUES (
            ${verifiedLookup}, 'wrapped', 'nonce', 'salt', ${wrap}, ${account.id}, now()
          )
        `;
        const verifiedFetch = await sql`
          SELECT wrapped_secret FROM recovery_mailboxes
          WHERE email_lookup = ${verifiedLookup} AND verified_at IS NOT NULL
        `;
        expect(verifiedFetch).toHaveLength(1);

        await sql`DELETE FROM accounts WHERE id = ${account.id}`;

        const leftoverMailbox = await sql`
          SELECT 1 FROM recovery_mailboxes WHERE email_lookup IN (${pendingLookup}, ${verifiedLookup})
        `;
        const leftoverPending = await sql`
          SELECT 1 FROM mailbox_pending WHERE email_lookup = ${pendingLookup}
        `;
        expect(leftoverMailbox).toHaveLength(0);
        expect(leftoverPending).toHaveLength(0);
      } finally {
        await sql`ROLLBACK`;
      }
    } finally {
      await sql.end({ timeout: 2 });
    }
  });
});
