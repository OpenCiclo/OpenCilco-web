# OpenCiclo

**OpenCiclo is an open-source, privacy-first menstrual-cycle forecasting engine. It is designed to provide useful probabilistic cycle forecasts while keeping personal health data under the user's control.**

Built by Emma Flora Harbison & Luis Rey Sánchez  
Copyright © 2026  
Apache License 2.0

Ciclo provides cycle forecasts. Forecasts can be wrong. Ciclo is not a medical device, diagnosis system, or contraceptive method.

## Why it exists

People who menstruate should be able to understand and forecast their cycle without surrendering sensitive health data to a company. The Python library is local-first: no account, no mandatory cloud, no mandatory telemetry. The optional V1 web app stores only AES-GCM ciphertext. The hosted instance is meant to run on **Vercel + Neon**. How to set that up, and what the UI labels mean, is in the in-app Help pages (`/help`).

V1 predicts only:

1. Next period start
2. Cycle length

It does **not** predict ovulation, fertile windows, pregnancy, or contraception. Do not use Ciclo as birth control or as medical advice.

## Studies

The published prior is **mcPHASES only**. Utah/Creighton is an external check and is **not** mixed into `openciclo/artifacts/released_model.json`.

| Study | Role | Link |
| --- | --- | --- |
| mcPHASES 1.0.0 (Canada) | Source of the released aggregate prior; model selection (LOO MAE **3.50** days, n=130) | [https://physionet.org/content/mcphases/1.0.0/](https://physionet.org/content/mcphases/1.0.0/) |
| Utah / Creighton (1990–2013) | External walk-forward check (LOO MAE **~3.02** days, n=2557). Not used to overwrite the prior. | [https://doi.org/10.7278/S50d-4gxs-s4hj](https://doi.org/10.7278/S50d-4gxs-s4hj) |

These numbers describe those cohorts. They are not worldwide product accuracy.

## Privacy

**Python library:** default mode is local only. See [PRIVACY.md](PRIVACY.md).

**V1 web app:** email + password (recommended) or super private 12-word phrase (no Clerk/Auth0). The diary is encrypted in the browser. Email accounts sync via a password-wrapped kit fetched on sign-in; email cannot decrypt by itself. Ciclo cannot reset your password or phrase. Optional anonymous research contribution sends cycle lengths with **no** `user_id → pool_id` map. No analytics.

## How forecasting works (high level)

OpenCiclo does not return a single “certain” date. Internally it produces a **probability distribution** over future dates and cycle lengths, then summarizes:

- most likely date
- probability within N days
- an uncertainty label (low / medium / high)

The current engine (**V0.2**) uses interpretable statistical models: V0 baselines plus a shrinkage estimator toward a published population prior. The default `predict()` configuration is the winner of a local mcPHASES timing evaluation, stored as aggregate parameters in `openciclo/artifacts/released_model.json`. The web app ports that same path to TypeScript and checks it against Python parity fixtures.

Optional symptoms, temperature, and lab-style signals are stored in the data model but **are not used** in this release.

## Status

- Python forecasting library: V0.2.1 timing models
- Walk-forward selection on **mcPHASES** (restricted, local): source of truth for the released prior
- Utah/Creighton: external check only
- Synthetic benchmarks: CI only, **not** used to choose `model_id`
- Web app: `apps/web` (Next.js). Hosted path: Vercel + Neon. Local path: Next.js or Docker.
- Public research datasets: documented, not redistributed

Installers get the published aggregate prior. They do **not** need the mcPHASES or Utah CSVs to forecast.

## Install

Python 3.11 or newer:

```bash
python -m pip install -e ".[dev]"
```

Web app: see [apps/web/README.md](apps/web/README.md). Once it is running, product Help is at `/help`.

## Quick start

```python
from datetime import date

from openciclo import predict

forecast = predict(
    history=[date(2026, 5, 2), date(2026, 6, 1), date(2026, 6, 29)],
    reference_date=date(2026, 7, 20),
)
print(forecast.most_likely_date)
print(forecast.uncertainty)
print(forecast.probability_within_next_n_days[3])
```

A single remembered date is enough to produce a forecast. Uncertainty will be high.

## Tests

```bash
pytest
ruff check .
ruff format --check .
mypy openciclo
cd apps/web && npm test
```

Regenerate TypeScript parity vectors (does not change the released model):

```bash
python scripts/generate_forecast_parity.py
```

## Benchmarks

Model selection (requires a local DUA copy of mcPHASES):

```bash
python -m openciclo.evaluation.mcphases --fit-release
```

CI / pipeline check on **SYNTHETIC / NON-PRODUCTION** data:

```bash
python -m openciclo.evaluation
```

Synthetic reports under `benchmarks/results/` do not choose the production `model_id`. Reproduce reports from code; do not invent metrics. Do not commit restricted CSVs.

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests that change forecasting behavior must run the relevant benchmark suite and report old vs new metrics.

## Documentation

| Document | Contents |
| --- | --- |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System layers, wallet, ciphertext, research pool |
| [PRIVACY.md](PRIVACY.md) | User-facing privacy explanation |
| [DATASETS.md](DATASETS.md) | Dataset provenance and licenses |
| [MODEL_CARD.md](MODEL_CARD.md) | Released timing model (mcPHASES prior; Utah external) |
| [docs/research.md](docs/research.md) | Literature notes and citations |
| [docs/modeling.md](docs/modeling.md) | Modeling assumptions |
| [docs/evaluation.md](docs/evaluation.md) | Walk-forward protocol and metrics |
| [docs/api.md](docs/api.md) | Library API |
| [docs/threat-model.md](docs/threat-model.md) | Privacy/security threats |
| [docs/kb/](docs/kb/README.md) | Index of product Help articles (source: `apps/web/content/help/`) |
| [SECURITY.md](SECURITY.md) | Vulnerability reporting |
| [apps/web/README.md](apps/web/README.md) | Vercel + Neon (primary), local Next.js, Docker |
| [agents.txt](agents.txt) | Map for coding agents |

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).

Commercial use, modification, self-hosting, and integration into other projects are permitted under that license. Preserve Apache-2.0 notices.

## Limitations

- V0 baselines are not personalized hierarchical models.
- Default `predict()` loads aggregate parameters from `openciclo/artifacts/released_model.json` (mcPHASES-fitted prior; no microdata; no Utah mix-in).
- Evaluation in this repo’s CI uses simulated cycles. Model **selection** uses local mcPHASES when the DUA file is present.
- Forecasts are estimates with uncertainty. They are not diagnoses and not contraception.
