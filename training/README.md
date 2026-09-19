# Training

Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

The **released** OpenCiclo model is fitted locally on mcPHASES (restricted). The CSV
never goes to git. Clones of the repository load
`openciclo/artifacts/released_model.json` (aggregate parameters only).

## Restricted data (local)

Everything under `training/dataset-do-not-commit/` is gitignored. Drop **any**
cycle microdata there (mcPHASES extra tables, Utah/Creighton, BioCycle, etc.).
Do not put CSVs anywhere else in the repo.

```text
training/dataset-do-not-commit/
  hormones_and_selfreport.csv      # mcPHASES timing (already used)
  CrMcyclelength_share.csv         # Creighton/Utah cycle starts (optional)
  menstrual_cycle_dataset_with_factors.csv  # Kaggle synthetic (optional trial)
  README.txt                       # mcPHASES study readme (optional)
  mcphases/                        # other PhysioNet tables (LH, Fitbit, …)
  biocycle/                        # NICHD DASH extracts
```

mcPHASES default path stays `hormones_and_selfreport.csv` in the folder root
(or `$OPENCICLO_MCPHASES_CSV`). New datasets: one subfolder per source, CSV + the
study README if you have it. Tell me the folder name when it is in place.

Alternatively set `OPENCICLO_MCPHASES_CSV` for the mcPHASES self-report file, or
`OPENCICLO_CREIGHTON_CSV` for the Utah/Creighton CSV.

Creighton backtest (local CSV required):

```bash
python -m openciclo.evaluation.creighton
```

3. Fit / select and freeze the release artifact:

```bash
python -m openciclo.evaluation.mcphases --fit-release
```

This writes `openciclo/artifacts/released_model.json` (safe to commit) and a local
report under `benchmarks/results/` (gitignored; may contain study ids).

Do not commit `training/dataset-do-not-commit/` or per-person derived tables
under `training/derived/`.

## Synthetic data

`python -m openciclo.evaluation` still runs the **synthetic** suite for CI. It does
**not** choose the production `model_id`. End users of the library never need it.
