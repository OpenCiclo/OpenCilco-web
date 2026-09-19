# Privacy

OpenCiclo
Built by Emma Flora Harbison & Luis Rey Sánchez
Copyright © 2026
Apache License 2.0

This page is for people using Ciclo, not only for engineers.

## The short version

**Your period dates, diary symptoms, and short day notes are encrypted on your device before they are stored.** The hosted app cannot read your diary. Forecasting runs in your browser. There is no analytics SDK.

Ciclo provides cycle **forecasts**. Forecasts can be wrong. Ciclo is not a medical device, a diagnosis, or a contraceptive method. You can hide forecasts in Settings; your logs and completed-cycle statistics stay on the device.

Shorter in-app pages: `/privacy` and Help (`/help/how-data-is-stored`).

## How a diary gets stored

1. You sign in with email + password, or with a 12-word phrase.
2. The browser derives an encryption key on the device (from the phrase; on the email path the password wraps that phrase).
3. The diary is encrypted with AES-256-GCM. That blob is what Postgres stores.
4. Forecasts run in the browser. Period dates are not sent to a forecast API.

## Identity (email + password, or a 12-word phrase)

Ciclo does not use Clerk or Auth0. You can create an account in two ways. In both cases the diary is encrypted in the browser; the host stores ciphertext only.

- **Email and password (the simple path).** The browser still generates a 12-word secret in the background. Your password wraps that secret. Email cannot decrypt the diary by itself. Your browser can save the password like any other site.
- **Super private mode (12 words, no email).** You keep the phrase. We cannot show it again if you lose it. You can save it in the browser’s password manager.

The server knows a public identifier derived from the secret (like an address), not the phrase or your password. Login is a signature of a short-lived challenge, proving you still hold the key. **Ciclo cannot reset your password or phrase** — that is intentional so nobody, including us, can read your diary on the server.

On the email path, signing in on a new device uses the same email and password. If this browser does not have your wrapped key yet, the app downloads the **encrypted** kit automatically (rate-limited). Your password unwraps it locally. You do not need to open your inbox.

## What the server stores

On Neon Postgres (or your own Postgres if you self-host):

1. **Ciphertext of your diary** — AES-256-GCM. The host does not have the AES key. Flow, cervical mucus, the symptom map (cramps, headache, and later labels), and optional short day notes stay inside this blob. Postgres has no health columns.
2. **Recovery mailbox (email accounts)** — an HMAC of your email plus a **password-wrapped** copy of the recovery phrase. The email cannot decrypt anything by itself. You need the password you chose. If you forget the password (and the phrase, if you saved one), the diary is gone.
3. **Optional anonymous research rows** — cycle lengths (integers) only, with an opaque pool id. Symptoms, mucus, notes, and dates are **not** sent. There is **no** map from your account to that pool id. We cannot look up “your” contribution later. “I already contributed” is stored on your device.

The server stores an HMAC lookup of your email when you create an email account, not a marketing list.

## What leaves the device

**By default: ciphertext of the diary, and a public key hash.** No period dates in the clear.

Two optional, **separate** consents:

1. **Anonymous research pool** — send cycle lengths without your public key. This is not a backup. You cannot later prove which row is yours, and we cannot delete “your” row because we cannot find it.

There is **no telemetry** and no advertising pixels.

## The Python library

The `openciclo` package still runs offline. It receives the dates you pass in and returns a forecast in memory. You do not need the web app to forecast.

## Deletion and export

In the web app you can export JSON or CSV **on your device** after decrypting, import that backup into the same or a new account (this restores diary data, not the old cryptographic identity), and delete your account ciphertext and recovery mailbox.

Research rows that were already uploaded without an account link cannot be deleted by us on request, because we cannot identify them. That limitation is shown before you contribute.

## What we will not do

- Sell your health data
- Require a cloud account for the Python library
- Quietly add advertising or third-party trackers
- Use email as a backdoor to decrypt your diary
- Treat a day you did not open the app as proof that your period did not happen
- Mix Utah/Creighton data into the published prior in `released_model.json`

Engineers: see [docs/privacy.md](docs/privacy.md) and [docs/threat-model.md](docs/threat-model.md).
