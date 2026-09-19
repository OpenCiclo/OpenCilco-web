-- Anonymous pool upsert: one row per device contributor key hash (no account link).

ALTER TABLE research_contributions
  ADD COLUMN IF NOT EXISTS contributor_key_hash TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE UNIQUE INDEX IF NOT EXISTS research_contributions_contributor_key_hash_idx
  ON research_contributions (contributor_key_hash)
  WHERE contributor_key_hash IS NOT NULL;
