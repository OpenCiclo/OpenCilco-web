# Optional anonymous research pool

Ciclo can send **cycle lengths** (whole numbers, in days) to an anonymous pool. This is off until you opt in. It is not a backup, and it is not required to use the app.

## What is sent

Completed cycle lengths only. No period dates, no symptoms, no mucus, no notes, no public key.

The server assigns an opaque `pool_id`. It does **not** store a map from your account to that id. We cannot look up “your” contribution later.

“I already contributed this month” is remembered **on the device**.

## What it is for

OpenCiclo’s forecast is an open-source model. Aggregate timing from people who opt in can, later, inform that model. Today the **released** prior still comes from the published mcPHASES study, not from this pool. Training on the pool is explicitly out of scope until that is designed and documented.

## What you give up

Because there is no account link, you cannot later prove which row is yours, and we cannot delete “your” row on request. Settings shows that limit before you contribute.

Turn the opt-in off any time to stop **future** uploads. Rows already in the pool stay.

## What this is not

- Not a way for Ciclo to read your diary.
- Not sync. Sync of the encrypted diary is a different mechanism (ciphertext on your account).
- Not medical research enrolment with a reversible consent ledger.

If you want a copy of your own data, use Export in Settings. That file stays on your device until you move it.
