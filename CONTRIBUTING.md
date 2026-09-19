# Contributing to OpenCiclo

Built by Emma Flora Harbison & Luis Rey Sánchez. Copyright © 2026. Apache License 2.0.

Thank you for considering a contribution. OpenCiclo is a scientific project first: evidence over novelty, privacy over convenience, and reproducible evaluation over marketing claims.

## Development setup

Python 3.11+:

```bash
python -m pip install -e ".[dev]"
pytest
ruff check .
ruff format .
mypy openciclo
cd apps/web && npm test
```

Web app notes: [apps/web/README.md](apps/web/README.md). Do not add Clerk, Auth0, or analytics SDKs.

## Code style

- English for code, comments, and documentation.
- Type hints on public functions.
- Ruff for lint and format (line length 100).
- Do not add a dependency unless you can state why it is required.
- Do not introduce neural networks, transformers, or other deep learning.

## Documentation voice

Write for a smart reader who may not live in this codebase. Prefer short sentences. Explain *why* once. Define jargon the first time it appears (for example: shrinkage, ciphertext, walk-forward). Skip marketing filler.

Product Help (how the app is hosted, encrypted, and labelled) lives in `apps/web/content/help/` and is served at `/help`. Health education stays in the in-app **Learn** tab. Agent-facing maps live in [`agents.txt`](agents.txt).

## Tests

Every behavioral change needs tests. At minimum:

- unit tests for date/cycle math, missing data, and distributions
- a walk-forward **no future leakage** test if you touch evaluation or forecasting
- integration coverage if you change `openciclo.predict`

## Benchmarks

Model **selection** uses local mcPHASES (restricted; never commit the CSV):

```bash
python -m openciclo.evaluation.mcphases --fit-release
```

CI uses the synthetic suite only:

```bash
python -m openciclo.evaluation
```

Any pull request that changes a forecasting algorithm, feature definition, or preprocessing must:

1. Run the relevant benchmark suite.
2. Report old model vs new model on the same data split and seed.
3. Include MAE, windowed accuracy, NLL, and calibration/coverage — not MAE alone.
4. Note computational cost if it changes materially.

Do not merge on “this looks better.”

## Model-change requirements

See the policy in [docs/modeling.md](docs/modeling.md). A proposal needs:

- old model and new model identifiers
- dataset and version
- validation methodology (temporal, not random cycle splits)
- metrics and calibration
- uncertainty of the comparison where applicable
- computational cost

A more complex model is adopted only if it demonstrably improves out-of-sample forecasting, calibration, or another **pre-declared** metric.

## Dataset requirements

- Document provenance in [DATASETS.md](DATASETS.md).
- Do not commit datasets unless the license clearly allows redistribution.
- Prefer acquisition/preprocessing scripts.
- Mark synthetic and example data as **NON-PRODUCTION**.

## Privacy requirements

- The `openciclo` forecasting package must not depend on accounts, network, or telemetry.
- Do not log period dates or other health fields.
- Do not add analytics SDKs.
- Sync consent, research consent, and telemetry consent stay independent.

## Pull requests

- Keep diffs focused.
- Update docs when behavior or assumptions change.
- Include the medical disclaimer if you add user-facing copy: Ciclo forecasts cycles; forecasts can be wrong; it is not a medical device or contraceptive method.
