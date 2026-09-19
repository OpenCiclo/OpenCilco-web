# Ciclo web app (OpenCiclo V1)

**Ciclo** — web client for OpenCiclo
Built by Emma Flora Harbison & Luis Rey Sánchez
Copyright © 2026
Apache License 2.0

Mobile-first Next.js app. Period dates and daily logs (flow, cervical mucus, symptoms, short day notes ≤200 characters) are encrypted in the browser (AES-256-GCM) before they are stored. Four tabs: **Calendar**, **Patterns**, **Learn**, **Settings**. Note history lives at `/diary` (linked from Patterns), not as a fifth tab. Two sign-in modes: **email + password** (recommended) or **super private** (12-word phrase). Email never decrypts the diary; sign-in on a new device fetches the wrapped kit automatically. Forecasting is a TypeScript port of the Python shrinkage + discrete Laplace path. The host never receives dates, symptoms, or notes in the clear. The anonymous pool still sends cycle lengths only.

Ciclo provides cycle forecasts. Forecasts can be wrong. Ciclo is not a medical device, diagnosis system, or contraceptive method.

**Learn** (in the tab bar) is health education. **Help** (`/help`) is documentation of the app: hosting, encryption, and what the UI means. Help is public English and does not require sign-in.

There is **no** Clerk, Auth0, or analytics SDK.

## Host on Vercel (intended production path)

1. Create a Vercel project with **root directory** `apps/web`.
2. Provision **Neon** Postgres (Vercel Marketplace) and set `DATABASE_URL`.
3. Run `apps/web/drizzle/0000_init.sql` (and `0001_pool_upsert.sql` if you need the pool upsert) on that database.
4. Set `SESSION_SECRET` and `EMAIL_LOOKUP_SECRET` to long random strings.
5. Set `APP_URL` to the production URL (for example `https://your-app.vercel.app`).
6. Optional: `RESEND_API_KEY` if you send mail. Email sign-in does not depend on inbox links.

Copy `apps/web/.env.template` to `.env.local` for local Next.js. Do not commit secrets. Plain-language walkthrough: Help article *Host on Vercel* (`/help/host-on-vercel`).

## Local Next.js (without Docker)

You still need Postgres. Neon’s local/dev branch, or Docker Compose `db` only, both work.

```bash
cd apps/web
cp .env.template .env.local
# fill DATABASE_URL, SESSION_SECRET, EMAIL_LOOKUP_SECRET, APP_URL=http://localhost:3000
npx dotenv -e .env.local -- psql "$DATABASE_URL" -f drizzle/0000_init.sql
npm run dev
```

App: http://localhost:3000 — Help: http://localhost:3000/help

## Self-host (Docker)

From the repository root:

```bash
docker compose up --build
```

- App: http://localhost:3000
- Postgres: `postgres://openciclo:openciclo@localhost:5432/openciclo`

If you previously ran Docker with the old `oddy` database user, reset the volume once:

```bash
docker compose down -v
docker compose up --build
```

## Tests

```bash
cd apps/web
npm test
```

Parity vectors come from `python scripts/generate_forecast_parity.py` at the repo root. The TypeScript engine must match Python. Do not mix Utah/Creighton into `released_model.json`.

## Studies

- mcPHASES (Canada, published prior): https://physionet.org/content/mcphases/1.0.0/
- Utah/Creighton (external check only): https://doi.org/10.7278/S50d-4gxs-s4hj

## Product Help

English articles for operators and curious users: [`content/help/`](content/help/). Served at `/help`. Index for GitHub readers: [docs/kb/](../../docs/kb/README.md).
