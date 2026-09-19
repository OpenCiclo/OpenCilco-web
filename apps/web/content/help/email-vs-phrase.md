# Email vs 12-word accounts

Ciclo does not use Clerk, Auth0, or a “forgot password” email that can open your diary. Identity is a secret generated on the device. You choose how that secret is stored.

## Email and password (recommended)

The browser still creates a 12-word phrase in the background. Your password **wraps** that phrase (PBKDF2 + AES-GCM). The server stores the wrapped kit and an HMAC of your email.

- Email cannot decrypt the diary by itself.
- Sign-in on a new device: same email and password. If this browser does not have the kit yet, the app downloads the **encrypted** kit (rate-limited). The password unwraps it locally. You do not need to open your inbox.
- The browser can save the password like any other site.

If you forget the password **and** you never saved the phrase, the hosted diary cannot be recovered. That is intentional.

## Super private mode (12 words, no email)

You hold the phrase. There is no mailbox row. We cannot show the phrase again if you lose it.

Save it in the browser’s password manager, or write it down somewhere you actually control. Anyone with the phrase can decrypt the diary on a new device.

## What the server sees in both cases

A public identifier derived from the secret (like an address), plus ciphertext. Login is a signature of a short-lived challenge. That proves you still hold the key without sending the key.

## Switching or exporting

Export JSON/CSV from Settings while you can still decrypt. Import restores diary **data** into an account. It does not clone the old cryptographic identity. A new phrase is a new account row as far as the server is concerned.
