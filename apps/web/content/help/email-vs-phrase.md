# Email vs 12-word accounts

Ciclo does not use Clerk, Auth0, or a “forgot password” email that can open your diary. Identity is a secret generated on the device. You choose how that secret is stored.

## Email and password (recommended)

The browser still creates a 12-word phrase in the background. Your password **wraps** that phrase (PBKDF2 + AES-GCM). The server stores the wrapped kit and an HMAC of your email.

- Email cannot decrypt the diary by itself.
- Sign-in on a new device: same email and password. If this browser does not have the kit yet, the app downloads the **encrypted** kit (rate-limited). The password unwraps it locally. You do not need to open your inbox.
- The browser can save the password like any other site.
- **Keep me signed in** (on by default) stores the unlock secret on this device so you do not type the password every visit. Sign out clears it. Anyone with this browser profile can open the diary until then.
- You can **change the password** in Settings while signed in. That re-wraps the same phrase. It does not re-encrypt the diary, and it is not a reset by email.

If you forget the password **and** you never saved the phrase, the hosted diary cannot be recovered. That is intentional.

## Super private mode (12 words, no email)

You hold the phrase. There is no mailbox row. We cannot show the phrase again if you lose it.

Save it in the browser’s password manager, or write it down somewhere you actually control. Anyone with the phrase can decrypt the diary on a new device.

On the 12-word setup screen, **Save in the browser** is a normal username + password form (the phrase is the password). The app cannot force the manager to store it; accept the browser prompt if it appears. Copy and download still work.

Settings (and the 12-word setup screen) can also show a QR of the **same** phrase. It is not a new secret. Anyone who photographs it can open the diary.

Scan it inside Ciclo: Sign in → Super private mode → Scan QR. The camera never sends the phrase to the server. The payload is not a website URL, so a generic camera app will not open a link that contains your words.

Email-and-password accounts can still sign in by typing those credentials. The QR is optional for them: it encodes the hidden 12-word phrase, not the email and password.

## What the server sees in both cases

A public identifier derived from the secret (like an address), plus ciphertext. Login is a signature of a short-lived challenge. That proves you still hold the key without sending the key.

## Switching or exporting

Export JSON/CSV from Settings while you can still decrypt. Import restores diary **data** into an account. It does not clone the old cryptographic identity. A new phrase is a new account row as far as the server is concerned.
