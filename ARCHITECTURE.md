# Architecture

OpenCiclo
Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

OpenCiclo is two pieces. A **Python library** forecasts the next period from dates you already have. It never needs the internet. An optional **web app** (Ciclo) stores an encrypted diary and runs the same forecast in the browser. Vercel, Docker, or any host of the app sees ciphertext, not period dates.

How to host it, and what the calendar labels mean, is in Help (`/help`). This file is the engineering map.

## Principle

The forecasting library is independent of UI, accounts, sync, research contribution, and telemetry. Those concerns must not be imported by `openciclo.forecasting`.

```text
Data layer        schemas, validation, cycle construction
     ↓
Feature layer     lengths, recency weights, (later) optional signals
     ↓
Forecasting       V0 baselines / shrinkage → later probabilistic / hierarchical models
     ↓
Explanation       structured drivers, no fabricated causation
     ↓
API               openciclo.predict(...)  |  TypeScript port in apps/web (browser)
     ↓
UI / eval         V1 web app or benchmark harness
```

## Package map

| Module | Role |
| --- | --- |
| `openciclo.schemas` | Canonical Pydantic models |
| `openciclo.data` | Cycle math, validation, synthetic cohort, mcPHASES loader |
| `openciclo.features` | Recency weights and length summaries |
| `openciclo.models` | Baseline predictors, shrinkage, population prior |
| `openciclo.artifacts` | Published aggregate `released_model.json` (mcPHASES only) |
| `openciclo.forecasting` | Length PMF, date mapping, public `predict` |
| `openciclo.explanations` | Driver lists for V0 |
| `openciclo.evaluation` | Walk-forward, metrics, Markdown/CSV reports |
| `openciclo.calibration` | Reliability-style summaries |
| `apps/web` | Next.js app: email+password or phrase identity, AES-GCM vault (diary schema v6), calendar, short day notes, estimated phases, patterns, Learn wiki, Help docs, TS forecast |

## Data model (conceptual)

- **Cycle** — period start, optional end, observed vs unknown, source
- **Daily observation** — optional flow, cervical mucus, a symptom map, and an optional short note (≤200 characters; encrypted in the web vault; unused by the Python forecast)
- **Prediction** — distribution, point, uncertainty, model version
- **Consent** — recovery email / research pool, stored apart from health plaintext

The web vault is a single AES-GCM blob. New symptom labels, the forecasting preference, and short day notes do not add Postgres columns. The monthly pool still uploads **cycle lengths only**. Estimated calendar phases (menstrual / follicular / ovulation / luteal) and expected bleeding days are derived on-device from period starts, closed period lengths, and the existing start forecast; they are not a fertility test. Intermenstrual bleeding is a diary symptom and never becomes a period start. Notes are private context only: they are never analyzed or sent to the research pool. Users can turn forecasts off; observed cycle and period statistics remain.

Period starts are calendar `date` values, not timezone-aware timestamps.

## Scientific engine vs browser port

The Python package is the source of truth. The V1 web app does **not** send period dates to a forecast API. It ports the released path (shrinkage median, k=2, discrete Laplace 1–90) to TypeScript and checks it against `tests/fixtures/forecast_parity.json`.

`released_model.json` stays an mcPHASES aggregate. Utah/Creighton metrics are documented as an external check and are not mixed into that file.

## V1 web runtime

```text
Email + password (recommended) or 12-word phrase
        ↓ password wraps BIP39 (email path) / phrase is the key
HKDF-SHA-256 → AES-256-GCM key + Ed25519 identity
        ↓
plaintext diary (memory only)
        ↓ AES-GCM
Neon Postgres ciphertext (no dates in the clear)
```

Identity is still a device-generated secret. Email never decrypts the diary: the user's password wraps the phrase. The server authenticates a signature over a short-lived challenge. There is no Clerk or Auth0.

Email accounts store a **password-wrapped** kit (PBKDF2-SHA-256 + AES-GCM). On a new browser, `POST /api/recovery/fetch` returns that ciphertext (rate-limited); the password unwraps it locally. The same kit may be cached in `localStorage`.

Optional research contribution POSTs cycle **lengths** (integers) with no public key. The server assigns an opaque `pool_id` and **does not** store `user_id → pool_id`. “Already contributed” is remembered on the device.

## Local Python runtime

```text
local records → openciclo.predict → forecast object
```

No remote database is required for the library. The web app is an optional hosted UI, not a requirement to forecast.

## Privacy architecture

Default for the library: local only. For the web app: the host sees ciphertext, public key material, and (for email accounts) an HMAC email lookup. Research rows are unlinkable to accounts by design.

## Model versioning

A production forecast should be recoverable from:

`model version + user data + configuration (+ code version)`

V0 baselines are deterministic given those inputs (no RNG in `predict`).

## Out of scope for this layer

Native mobile apps, federated learning, custom cryptography, deep learning, confirmed ovulation/fertility claims, training on the anonymous pool.
