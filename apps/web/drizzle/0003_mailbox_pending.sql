-- Email confirmation before a recovery mailbox is claimed.
-- Stores HMAC(email) only — never plaintext. Code is hashed. Wrapped kit matches recovery_mailboxes.
-- ON DELETE CASCADE frees the lookup when the account is deleted.

ALTER TABLE recovery_mailboxes
  ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;

UPDATE recovery_mailboxes
  SET verified_at = created_at
  WHERE verified_at IS NULL;

CREATE TABLE IF NOT EXISTS mailbox_pending (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_lookup TEXT NOT NULL UNIQUE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  wrapped_secret TEXT NOT NULL,
  wrap_nonce TEXT NOT NULL,
  wrap_salt TEXT NOT NULL,
  wrap_params JSONB NOT NULL,
  code_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS mailbox_pending_account_idx
  ON mailbox_pending (account_id);
