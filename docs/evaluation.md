# Evaluation

OpenCiclo
Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

We score forecasts the way a real user would live them: only dates that already happened may be used to predict the next start. Randomly shuffling a person’s cycles into train/test leaks the future and makes the model look better than it is.

Walk-forward on **mcPHASES** chooses the released prior. CI uses **synthetic** cycles and must not pick `model_id`. Utah/Creighton is an external check only.

## Forbidden split

Do **not** shuffle a person’s cycles into random train/test rows. That leaks the future (the person’s later typical length) into earlier predictions.

## Existing-user walk-forward

For a user with period starts `s0, s1, …, s_{n-1}`:

```text
visible starts s0 … s_{k-1}  →  forecast the start at s_k
k = 1, 2, …, n-1
```

The model may use only starts before `s_k`. Cycle lengths after that point must not appear in features, prior fitting, or scaling.

Prediction time for this protocol is `reference_date = s_{k-1}` (the last known period). The next start is then in the future, so date truncation does not apply.

## New-user protocol

1. Split **users** (not cycles) into train and test, stratified by subgroup when labels exist.
2. Fit the population prior on **train users only**.
3. On each test user, run the same walk-forward, including the cold-start step (only `s0` visible).

This measures both unseen-user generalization (especially k=1) and personal forecasting as history grows.

## Daily online backtest (later)

A fuller product simulation would step calendar day by day, reveal only logs that existed that day, and update P(start on day t). If the expected period passes without a log, the state is **unknown**, not an automatic model failure. That daily loop is not required to score V0 length forecasts and is deferred.

## Metrics

### Point

- Mean absolute error (days)
- Median absolute error
- Error distribution quantiles (reported in CSV)

### Windows

Fraction of forecasts with absolute error ≤ 0, 1, 2, 3, 5 days.

### Probabilistic

- Mean negative log-likelihood of the **actual length** under the discrete PMF (`-log p(L_true)`)
- Brier score for the event `|L - μ_point| ≤ 2` (predicted probability vs 0/1 outcome)
- 80% central prediction-interval coverage and mean width

### Calibration

Bin predicted P(|error| ≤ 2) and compare to observed frequency. Report coverage of the 80% interval. Miscalibration is a first-class failure mode.

## Subgroups

Where labels exist (synthetic by construction):

- regular vs irregular
- sparse vs longer history
- regime change
- skipped-log artifacts

Do not invent demographic medical claims from tiny slices.

## Leakage guards

Tests must assert:

- walk-forward history never contains the target start
- population prior fitted on train does not include held-out users’ lengths

## mcPHASES protocol (model selection)

Restricted CSV stays on disk (`training/dataset-do-not-commit/` or `$OPENCICLO_MCPHASES_CSV`). Git never receives microdata.

**Default protocol is leave-one-person-out.** For each person, fit the prior on everyone else, then walk-forward on that person's series. This uses all 130 next-start forecasts without leaking the scored person into the prior.

Holdout (30% of people) remains available for confirmation and is noisier (`n ≈ 40` per split).

1. Extract period starts as the first day of each `phase == Menstrual` run, grouped by `(id, study_interval)`. Do not concatenate a person’s 2022 and 2024 intervals.
2. Split **people** (not cycles, not intervals).
3. Fit the population prior on **train people only**. Default location: median of per-person medians.
4. Walk-forward with V0 baselines and shrinkage variants (`k` grid, mean/last/recency, optional last-cycle blend and clipping).
5. Choose the winner (MAE primary; require ≥0.05 days vs personal median; do not tank 80% coverage; prefer no extra knobs when MAE is within 0.05 of the best). Refit aggregate parameters on **all** people and write `openciclo/artifacts/released_model.json`.

```bash
python -m openciclo.evaluation.mcphases --fit-release
```

Local reports under `benchmarks/results/mcphases_*` may contain study ids and are gitignored. The model card may quote **aggregate** MAE, coverage, and n only.

## Creighton / Utah protocol (external check)

If `training/dataset-do-not-commit/CrMcyclelength_share.csv` (or `$OPENCICLO_CREIGHTON_CSV`) is present:

```bash
python -m openciclo.evaluation.creighton
```

Same leave-one-person-out walk-forward as mcPHASES, on charted cycle **starts**. Reports stay local (`benchmarks/results/creighton_*`) and are gitignored. This does **not** overwrite `released_model.json`. Use `--grid core` for baselines plus median-shrinkage `k`; `--grid full` matches the mcPHASES selection grid.

## Cross-dataset transfer (Utah ↔ mcPHASES)

Fit the population prior on one local cohort and walk-forward on the other. Same-dataset numbers use leave-one-person-out so the scored person is not in the prior.

```bash
python -m openciclo.evaluation.cross_dataset
```

This does **not** overwrite `released_model.json`. Reports stay under `benchmarks/results/cross_*`.

## Kaggle synthetic factors (non-production)

If `training/dataset-do-not-commit/menstrual_cycle_dataset_with_factors.csv` is present:

```bash
python -m openciclo.evaluation.kaggle_factors
```

Label: **SYNTHETIC / NON-PRODUCTION**. Does not overwrite `released_model.json`.

## Synthetic protocol (CI only)

The default `python -m openciclo.evaluation` path still uses the OpenCiclo synthetic V0 cohort. Label: **SYNTHETIC / NON-PRODUCTION**. It proves the pipeline. It does **not** select the production `model_id`.
