# How data is stored

Ciclo is built so that **the people who run the server cannot read your diary**. That is a design choice, not a policy we could quietly reverse without changing the code.

## The short version

Period dates, symptoms, mucus, and day notes are encrypted **in the browser** (AES-256-GCM) before they are sent. Postgres stores that ciphertext. Forecasting runs in the browser too. There is no analytics SDK.

Ciclo cannot reset your password or your 12-word phrase. If both are gone, the hosted diary is gone. Export a backup while you still can.

## What happens on save

1. You are signed in. The browser already holds a key derived from your 12-word phrase.
2. The diary is encrypted. Only the encrypted blob and a nonce go to the server.
3. The server stores that blob on your account row. It does not add columns for flow, symptoms, or notes.

A new symptom label or a day note does not change the database schema. It stays inside the blob.

## What the server does store

- **Account identity** — a public key hash, not your phrase.
- **Diary ciphertext** — unreadable without the device key.
- **Email accounts only** — an HMAC of your email, plus a copy of the phrase **wrapped with your password**. Email alone cannot unwrap it.
- **Optional research rows** — cycle lengths as whole numbers, with a random pool id. No link from your account to that id.

The password never leaves the browser in the clear. Login is a short-lived cryptographic challenge: you prove you still hold the key.

## What does not leave the device

By default: no period dates in the clear, no symptom lists, no notes.

The research pool is a separate, off-by-default consent. It sends lengths only. It is not a backup.

## Deletion and export

Settings can export JSON or CSV after decrypting on the device. Import restores **diary data** into the same or a new account. It does not restore the old keys.

Delete account removes your ciphertext and mailbox row. Research rows that were already uploaded without an account link cannot be found later, so they cannot be deleted on request. That limit is shown before you contribute.

## The Python library

`openciclo` still runs offline. You pass dates in; you get a forecast back in memory. No hosted app required.
