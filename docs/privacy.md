# Privacy (engineering)

OpenCiclo
Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

User-facing text lives in [PRIVACY.md](../PRIVACY.md). The hosted Help article is `/help/how-data-is-stored`. This note is the contributor checklist.

In one line: the Python engine never needs a network; the web host stores ciphertext plus a public key hash (and, for email accounts, an HMAC of the email plus a password-wrapped phrase). Research rows are cycle lengths with **no** link back to an account.

## Defaults

| Control | Default |
| --- | --- |
| Python engine network | Not required |
| Web identity | Email + password (hidden BIP39 wrap) or a 12-word phrase generated in the browser |
| Telemetry | Off / not present |
| Recovery mailbox | On for email + password accounts |
| Research upload | Off until explicit opt-in |

The `openciclo` package must remain importable and testable with no sockets, credentials, or analytics. The web app must not import analytics SDKs.

## Data classes

| Store | Contents | Linked to account? |
| --- | --- | --- |
| `accounts` | `pubkey_hash`, Ed25519 pubkey, AES-GCM ciphertext + nonce of the diary (schema v6: period starts, daily flow/mucus/symptoms/notes, forecasting preference). No plaintext health columns. | Yes (the account *is* the pubkey) |
| `recovery_mailboxes` | HMAC(email), wrapped mnemonic, `account_id` | Yes — this is optional PII |
| `research_contributions` | `pool_id`, integer cycle lengths, `created_at` | **No** — never symptoms, mucus, or dates |
| Device | “already contributed” flag, session keys, wrapped kit cache | Local only |

Do not add `user_id` / `account_id` / `pubkey_hash` to `research_contributions`. A join table that maps account → pool_id is a de-anonymization bug.

## Logging

Never write period dates, recovery phrases, passphrases, AES keys, or forecasts with health fields to application logs, exception trackers, or URLs.

## Email + password sign-in

The mailbox stores a kit wrapped with PBKDF2-SHA-256 (WebCrypto) and AES-GCM under the user's password. On sign-in, the client may fetch that **ciphertext** from `POST /api/recovery/fetch` (rate-limited) if it is not already in `localStorage`. Server-side code must not attempt to unwrap it. The password never leaves the browser in the clear.

If a design would let the host restore the mnemonic from email alone, reject the design.

## Key loss

Lost mnemonic and lost wrap password ⇒ lost hosted diary. Document this in the UI before the user creates an account. There is no shadow email reset. Export/import restores **diary data** into a new account; it does not restore the old keys.

## Threats

See [threat-model.md](threat-model.md).
