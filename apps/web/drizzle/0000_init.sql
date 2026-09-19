-- OpenCiclo V1 schema. Ciphertext only on accounts; research rows have no account_id.

CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pubkey_hash TEXT NOT NULL UNIQUE,
  pubkey TEXT NOT NULL,
  ciphertext TEXT NOT NULL,
  nonce TEXT NOT NULL,
  schema_version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recovery_mailboxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_lookup TEXT NOT NULL UNIQUE,
  wrapped_secret TEXT NOT NULL,
  wrap_nonce TEXT NOT NULL,
  wrap_salt TEXT NOT NULL,
  wrap_params JSONB NOT NULL,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS research_contributions (
  pool_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_lengths INTEGER[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auth_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pubkey_hash TEXT NOT NULL,
  nonce TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recovery_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_lookup TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recovery_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_lookup TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS recovery_attempts_lookup_created_idx
  ON recovery_attempts (email_lookup, created_at);
CREATE INDEX IF NOT EXISTS auth_challenges_hash_idx
  ON auth_challenges (pubkey_hash);
