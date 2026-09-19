# Product knowledge base

OpenCiclo / Ciclo
Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

This index is for people reading the git repo. The **canonical articles** live with the web app so they deploy on Vercel:

[`apps/web/content/help/`](../../apps/web/content/help/)

They are served in English at **`/help`** (no sign-in). They explain the **software**: hosting, encryption, forecasts, and UI labels.

Health education (cycle biology, symptoms, when to seek care) stays in the in-app **Learn** tab (`/learn`). Do not copy Learn articles here.

## Articles

### The app

| Article | Topic |
| --- | --- |
| [What Ciclo is (and is not)](../../apps/web/content/help/what-ciclo-is.md) | Logging + forecast vs medical device / contraception |
| [How the forecast works](../../apps/web/content/help/how-the-forecast-works.md) | Probabilities, shrinkage, what is not predicted |
| [Calendar phases and “estimated”](../../apps/web/content/help/calendar-phases-estimated.md) | Observed vs estimated phase labels |
| [Inner seasons](../../apps/web/content/help/inner-seasons.md) | Season badge and expand-to-guide overlay |

### Run and host

| Article | Topic |
| --- | --- |
| [Host on Vercel](../../apps/web/content/help/host-on-vercel.md) | Intended production path |
| [Run it yourself](../../apps/web/content/help/run-it-yourself.md) | Local Next.js and Docker |

### Privacy and accounts

| Article | Topic |
| --- | --- |
| [How data is stored](../../apps/web/content/help/how-data-is-stored.md) | Ciphertext, no password reset |
| [Email vs 12-word accounts](../../apps/web/content/help/email-vs-phrase.md) | The two sign-in modes |
| [Anonymous research pool](../../apps/web/content/help/research-pool.md) | Cycle lengths only, no account map |

## Related engineering docs

Deeper than Help, same facts:

- [apps/web/README.md](../../apps/web/README.md)
- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [PRIVACY.md](../../PRIVACY.md)
- [docs/modeling.md](../modeling.md)
- [docs/api.md](../api.md)
- [agents.txt](../../agents.txt) — file map for coding agents
