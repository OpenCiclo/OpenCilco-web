-- Operator-published Learn articles. Educational copy only; no account or health columns.

CREATE TABLE IF NOT EXISTS learn_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  reviewed_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  sources JSONB NOT NULL,
  copy_es JSONB NOT NULL,
  copy_en JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
