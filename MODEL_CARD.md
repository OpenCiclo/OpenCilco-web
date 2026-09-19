# Model card — OpenCiclo V0.2.1 timing model

OpenCiclo
Built by Emma Flora Harbison & Luis Rey Sánchez
Copyright © 2026
Apache License 2.0

**Status:** research / engineering scaffold. **Not** a released clinical or consumer accuracy claim.

## Purpose

Provide simple, interpretable statistical forecasts of **next period start** and **cycle length**, with an explicit probability distribution and uncertainty label.

## Intended use

- Local, offline cycle forecasting from period-start dates
- Browser forecasting via a TypeScript port of the same shrinkage + discrete Laplace path
- Benchmarking more complex models against honest baselines
- Research on how much signal exists in cycle history alone

## Non-intended use

- Contraception or pregnancy prevention
- Pregnancy detection or fertility treatment
- Medical diagnosis or treatment decisions
- Any claim of medically validated or worldwide accuracy

## Training data

The published prior in `openciclo/artifacts/released_model.json` is an **aggregate** fit on **mcPHASES 1.0.0** (`hormones_and_selfreport`), timing only. Dataset: [mcPHASES on PhysioNet](https://physionet.org/content/mcphases/1.0.0/).

| Field | Value |
| --- | --- |
| People (`n_users`) | 42 |
| Series (`id`, `study_interval`) | 62 |
| Completed cycle lengths | 130 |
| Prior location | median of per-person medians (not pooled cycle rows) |
| Population median / MAD / mean | 30.5 / 3.0 / 29.5 days |
| Shrinkage `k` | 2 |
| Length family | discrete Laplace |

The CSV is **not** in git (PhysioNet Restricted Health Data). Installers never need it. Personalization uses the user's own dates on-device, shrunk toward this prior.

**Utah / Creighton is not mixed into this artifact.** The University of Utah Hive cycle-length resource ([doi:10.7278/S50d-4gxs-s4hj](https://doi.org/10.7278/S50d-4gxs-s4hj)) is an **external check** only. Walk-forward there does not overwrite `released_model.json`.

V0 point estimators are descriptive statistics, not a trained neural net. Optional **literature_placeholder** (median 29, MAD 4) is used only if the release file is missing.

Synthetic cohorts are **CI-only** and were **not** used to choose `model_id`.

## Evaluation data

**Primary protocol (model selection):** leave-one-person-out walk-forward on mcPHASES. For each of 42 people, the prior is fitted on the other people only, then every next-start in that person's series is scored. n = **130** forecasts. Cohort: consenting Canadian young-adult menstruators. Source: [https://physionet.org/content/mcphases/1.0.0/](https://physionet.org/content/mcphases/1.0.0/).

**External check (not used for selection):** leave-one-person-out walk-forward on Creighton Model / University of Utah charted cycles (1990–2013, US/Canada fertility-care users). n = **2557** forecasts. Source: [https://doi.org/10.7278/S50d-4gxs-s4hj](https://doi.org/10.7278/S50d-4gxs-s4hj).

Confirmation on mcPHASES: repeated 30% person holdout (8 seeds) and a family ablation (log-normal, empirical, asymmetric Laplace). Clip/blend variants were not adopted: MAE gains were under 0.05 days.

Protocol: [docs/evaluation.md](docs/evaluation.md).

## Selected model

`v0.shrinkage.median` with discrete Laplace PMF (`k = 2`), person-median population prior **from mcPHASES only**.

Leave-one-person-out on **mcPHASES (Canada)**, n = 130:

| Model | MAE (days) | Median AE | ±2 days | 80% coverage | Mean 80% width | NLL |
| --- | --- | --- | --- | --- | --- | --- |
| `v0.baseline.median` | 4.02 | 3.0 | 0.43 | 0.73 | 9.9 | 3.25 |
| `v0.baseline.population_prior` | 3.65 | 3.0 | 0.45 | 0.79 | 11.1 | 3.11 |
| **`v0.shrinkage.median` (k=2, Laplace)** | **3.50** | 3.0 | 0.48 | 0.78 | 10.1 | 3.05 |

Leave-one-person-out on **Utah / Creighton** (same estimator family, **Utah-fitted prior, not mixed into release**), n = 2557:

| Model | MAE (days) | Median AE | ±2 days | 80% coverage |
| --- | --- | --- | --- | --- |
| `v0.baseline.median` | 3.21 | 2.0 | 0.61 | 0.70 |
| **`v0.shrinkage.median` (k=2, Laplace)** | **~3.02** | 2.0 | 0.63 | 0.78 |

These two numbers describe **two different cohorts**. They are not product accuracy for all people who menstruate. Do not average them into a worldwide claim. Mean MAE over 8 mcPHASES person-holdout seeds (pooled-prior grid, shrinkage vs median): 3.52 vs 4.00.

Log-normal, empirical, and clip/blend variants did not beat the mcPHASES winner by 0.05 MAE. Asymmetric Laplace was within noise and was not adopted.

## Population

- **mcPHASES:** consenting Canadian young-adult menstruators; no recent hormonal contraception by study eligibility. [PhysioNet record](https://physionet.org/content/mcphases/1.0.0/). See [DATASETS.md](DATASETS.md).
- **Utah / Creighton (external only):** heterosexually active women 18–40 with no known subfertility; Creighton Model FertilityCare charting in US/Canada centres, 1990–2013. [Hive DOI](https://doi.org/10.7278/S50d-4gxs-s4hj).

## Limitations

- Small n on the selection cohort; geographically and demographically narrow
- Discrete Laplace around a shrinkage point is still an assumption, not a biological law
- Period truth on mcPHASES is `phase == Menstrual` onsets, not `flow_volume`
- LH, hormones, and symptoms are unused in this release
- Missing logs are not yet a generative skip model
- 2–4 starts per mcPHASES series: a raw personal median is unstable, which is why shrinkage is the default
- mcPHASES LOO 80% coverage is ~0.78, not 0.80; the interval is slightly under-dispersed
- Utah users are fertility-awareness / NFP charting; that is not a general app population

## Metrics

Reports must include MAE, median AE, exact / ±1 / ±2 / ±3 / ±5 day rates, NLL, a Brier score for the ±2-day event, 80% interval coverage and width. Local detail CSVs under `benchmarks/results/` may contain study ids and must not be committed. This card quotes **aggregates only**.

## Calibration

Poor calibration is treated as a model defect. Switching the mcPHASES prior from a pooled-cycle median (29, MAD 2.5) to an equal-person median (30.5, MAD 3.0) raised LOO 80% coverage from 0.71 to 0.78 without harming MAE.

## Model version

Engine version: `0.2.1`
Default model id: `v0.shrinkage.median`
Release artifact: `openciclo/artifacts/released_model.json` (mcPHASES aggregate only)

The V1 web app ports this same path to TypeScript and checks it against `tests/fixtures/forecast_parity.json`. The Python package remains the scientific source of truth.

## Features

**Used:** historical period-start dates → cycle lengths; published population prior; shrinkage `k`; Laplace scale from residual MAD mixed with the prior MAD.

**Not used:** symptoms, flow, BBT, LH, mucus, sleep, stress, exercise, contraception, sexual activity.

## Assumptions

Listed in [docs/modeling.md](docs/modeling.md). Observed facts, model assumptions, and predictions are kept distinct in the API.

## Failure modes

- Sparse history → high uncertainty, prior-dominated forecasts
- Regime change → mean/median of the full history lag
- Skipped logs → very long observed cycles pull mean more than median
- Invented precision if scale were allowed to collapse to zero (scale is floored)

## Privacy

The Python engine forecasts locally. The V1 web app encrypts the diary with AES-GCM before it leaves the device; the host stores ciphertext. See [PRIVACY.md](PRIVACY.md).
