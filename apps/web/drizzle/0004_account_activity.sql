-- One row per account per UTC day when they sign in.
-- Counts only. No diary and no health columns.
-- ON DELETE CASCADE drops the days when the account is deleted.

CREATE TABLE IF NOT EXISTS account_activity_days (
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  day DATE NOT NULL,
  PRIMARY KEY (account_id, day)
);
