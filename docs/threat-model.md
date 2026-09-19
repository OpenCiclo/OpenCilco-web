# Threat model

OpenCiclo
Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

This is a living document for the Python engine and the V1 web app. It is not a pentest report.

## Assets

- Period start dates (and optional future daily health observations)
- Forecasts (they reveal modeled cycle timing)
- BIP39 mnemonic, HKDF-derived AES key, Ed25519 signing seed
- Passphrase used to wrap the optional recovery kit (the user's account password on the email path)
- Wrapped kit cached in `localStorage` on a given browser
- Consent flags (recovery email / research pool)

## Trust boundaries

```text
Browser memory     — plaintext diary, keys, forecast
Browser storage    — encrypted vault cache, wrapped kit, “already contributed”
User network       — ciphertext, signatures, email lookup fetch, optional length list
OpenCiclo host / Neon   — ciphertext, pubkey, HMAC(email), anonymous pool rows
```

## Python engine (library)

| Threat | Risk | Mitigation |
| --- | --- | --- |
| Caller logs `Forecast` or dates | Health in logs | Policy: library does not log; callers must not |
| Benchmark CSV in git | Simulated dates only | Synthetic data; never commit restricted CSVs |
| Dependency compromise | Supply chain | Pin via environment; few dependencies |
| Contributor adds telemetry | Silent collection | Review; no analytics SDKs |
| Tests using real personal data | Accidental commit | Synthetic fixtures only |

Process memory on a shared computer is still in scope for the user (shoulder surfing, disk snapshots of notebooks).

## V1 web app

| Threat | Risk | Mitigation |
| --- | --- | --- |
| Honest-but-curious host | Reads diary | AES-256-GCM in the browser; host stores ciphertext only |
| Email-as-reset | Host decrypts diary | Password-wrapped kit; email fetch returns ciphertext only; unwrap is client-side |
| Kit fetch by email | Offline password guessing | PBKDF2 600k; rate limit `/api/recovery/fetch`; generic errors |
| Password manager | Phrase or password stored by the browser | Same as any site; user can decline; never sent to OpenCiclo as a login API |
| Wrapped kit in localStorage | Offline brute-force of the password | PBKDF2 600k; kit is still ciphertext |
| XSS | Script reads keys in memory | Strict CSP, no third-party scripts, no analytics |
| Research join | Re-identify contributors | No `account_id` / pubkey on pool rows; no mapping table |
| Recovery mailbox | Email ↔ account link | Optional; HMAC lookup; documented as PII |
| Challenge replay | Stolen login | Short-lived nonces, one-use |
| Ciphertext blob theft | Offline attack on AES-GCM | 256-bit key from HKDF of BIP39 seed; rate-limit kit fetch |
| Shoulder surfing of mnemonic | Full account takeover | Show once; confirm; never re-display from the server |
| Bundled consent | Forced research to get backup | Separate toggles; research is not a backup |
| Lost mnemonic + password | Permanent data loss | Honest UX; export/import offered while the device is unlocked |
| Utah mixed into prior | Silent cohort blending | `released_model.json` is mcPHASES-only; tests assert that |

## Cryptography (standard primitives only)

- BIP39 mnemonic via `@scure/bip39`
- HKDF-SHA-256 via `@noble/hashes`
- AES-256-GCM via WebCrypto
- Ed25519 challenge signatures via `@noble/ed25519`
- Recovery wrap: PBKDF2-SHA-256 (WebCrypto, 600_000 iterations) then AES-GCM

We will not invent a protocol. We will not use a “recovery email” that re-derives the AES key without a user secret.

## Out of scope (for now)

- Nation-state disk imaging of a powered-on machine
- Hardware keyloggers
- Compelled disclosure of a passphrase the user still remembers
- Native mobile app threat model
