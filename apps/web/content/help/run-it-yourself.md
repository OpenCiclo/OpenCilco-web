# Run it yourself

Two local paths: **Next.js** for day-to-day UI work, and **Docker Compose** when you want the app + Postgres together. Both talk to Postgres. Neither needs a public tunnel.

Help at `/help` is public even when you are signed out.

## Next.js on your machine

You still need a database. A Neon branch, or the `db` service from Docker Compose, both work.

```bash
cd apps/web
cp .env.template .env.local
```

Fill in:

- `DATABASE_URL`
- `SESSION_SECRET`
- `EMAIL_LOOKUP_SECRET`
- `APP_URL=http://localhost:3000`

Then:

```bash
npx dotenv -e .env.local -- psql "$DATABASE_URL" -f drizzle/0000_init.sql
npm run dev
```

Open http://localhost:3000. Fast Refresh updates the UI without rebuilding an image.

## Docker Compose

From the repository root:

```bash
docker compose up --build
```

- App: http://localhost:3000
- Postgres: `postgres://openciclo:openciclo@localhost:5432/openciclo`

Compose binds the app to `127.0.0.1:3000` on the host. That is enough for a browser on the same machine.

If an old volume still uses the previous `oddy` database user:

```bash
docker compose down -v
docker compose up --build
```

That **wipes local Postgres**. Export diaries first if you care about them.

## Tests

```bash
cd apps/web
npm test
```

Python tests and forecast parity live at the repo root (`pytest`, `python scripts/generate_forecast_parity.py`). The TypeScript forecast must match the Python one.

## Production is still Vercel

Local Docker is for development and self-hosting. The documented production path is Vercel + Neon. See [Host on Vercel](/help/host-on-vercel).
