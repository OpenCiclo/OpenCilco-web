# Host on Vercel

This is the intended way to run a public Ciclo instance. Vercel serves the Next.js app. Neon holds Postgres. The diary in that database is ciphertext. Period dates never sit in a readable column.

You need access to the OpenCiclo git repository. The Vercel project **root directory** must be `apps/web`. The rest of the repo (Python library, training data notes) is not deployed with the site.

## 1. Create the Vercel project

1. Import the repository.
2. Set **Root Directory** to `apps/web`.
3. Framework: Next.js. Build command and output can stay at the defaults from `package.json`.

## 2. Add Postgres

Provision **Neon** from the Vercel Marketplace (or point `DATABASE_URL` at any Postgres 16 you control).

On that database, run the SQL in:

- `apps/web/drizzle/0000_init.sql`
- `apps/web/drizzle/0001_pool_upsert.sql`

Those files create accounts, ciphertext columns, sessions, and the anonymous research pool. They do not create health columns.

## 3. Environment variables

Set these in Vercel (Production, and Preview if you use it):

- `DATABASE_URL` — Neon connection string.
- `SESSION_SECRET` — long random string. Signs the session cookie.
- `EMAIL_LOOKUP_SECRET` — long random string. Used to HMAC emails so the database is not a marketing list.
- `APP_URL` — the public origin, for example `https://your-app.vercel.app`. No trailing slash.

Optional:

- `RESEND_API_KEY` and `MAIL_FROM` if you send mail. Email + password sign-in does **not** require opening an inbox; the password unwraps the key in the browser.

Do not put period dates, phrases, or AES keys in env vars or logs.

## 4. Check the deployment

Open `/` (sign-in), `/privacy`, and `/help`. Create a throwaway account and confirm a diary round-trip. If sign-in works and `/privacy` still says the host cannot read the diary, the instance is doing what this architecture expects.

## What you are not hosting

The Python package, mcPHASES CSV, and training scripts stay off Vercel. Installers of the library get aggregate parameters in `openciclo/artifacts/released_model.json`. They do not need those CSVs to forecast.
