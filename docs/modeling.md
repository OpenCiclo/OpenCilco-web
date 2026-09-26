# Modeling

OpenCiclo
Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

This file is the contract for the Python engine: what is observed, what is assumed, and what is predicted. The web app copies the released path; it does not invent a second model. Calendar **phase labels** (follicular, “estimated”, inner seasons) are a separate UI heuristic — see Help `/help/calendar-phases-estimated`.

**Shrinkage** here means: mix the person’s own median cycle length with a published population typical length, so one or two cycles do not dominate.

## Observed fact vs assumption vs prediction

| Kind | Example |
| --- | --- |
| Observed fact | Period start logged on 2026-06-29; consecutive `flow` days in a closed cycle |
| Unknown | No log on 2026-07-28 — not the same as “no period” |
| Descriptive statistic | Mean length of completed cycles; mean/range of closed period (bleeding) runs |
| Assumption | V0.2 may use discrete Laplace, a discrete log-normal, or a shifted empirical histogram over lengths 1–90 |
| Prediction | Most likely next start, with probabilities |
| Derived estimate | Expected bleeding length = median of closed period runs; expected period interval = modal start + that length |

The API keeps these separate (`quality_issues`, `notes`, distribution `assumption`, forecast fields).

## V0 / V0.2 models

Point estimators output a **point length**. A scale (or log-normal sigma / empirical histogram) then defines the PMF.

| Id / alias | Point estimate |
| --- | --- |
| `v0.baseline.last_cycle` | Most recent cycle length |
| `v0.baseline.mean` | Arithmetic mean of observed lengths |
| `v0.baseline.median` | Median of observed lengths |
| `v0.baseline.rolling_mean` | Mean of the last `rolling_window` lengths (default 6) |
| `v0.baseline.rolling_median` | Median of that window |
| `v0.baseline.recency_weighted_mean` | Mean with weights `λ^{age}` (newest age 0) |
| `v0.baseline.recency_weighted_median` | Weighted median, same weights |
| `v0.baseline.population_prior` | Prior median only (ignores personal lengths) |
| `v0.shrinkage.median` | Personal median shrunk toward the population prior |

Shrinkage (empirical Bayes, not a neural net):

```text
μ = n/(n+k) * personal_median + k/(n+k) * μ_pop
```

`k` is chosen on mcPHASES holdout (see the released artifact). If the user has **no completed cycle** (zero or one start date), every personal baseline falls back to the population prior. Uncertainty is high.

Default `λ = 0.90`. Benchmarks also run `λ ∈ {0.70, 0.80, 0.90, 0.95, 1.00}`. `λ = 1` is equal weights (should match mean/median aside from rolling).

## Population prior

Default `predict()` loads `openciclo/artifacts/released_model.json`: aggregate median / MAD / mean fitted on **mcPHASES 1.0.0** (42 people; timing only). Dataset: [https://physionet.org/content/mcphases/1.0.0/](https://physionet.org/content/mcphases/1.0.0/). The location is the **median of per-person medians** (30.5 days, MAD 3.0), not the pooled row median. That JSON is not microdata. It is a convenience prior for this cohort, **not** a global accuracy claim about everyone who menstruates.

Creighton/Utah charted cycles (local CSV only) are an **external check**, not mixed into the released prior: NFP / fertility-care users, 1990–2013, tighter and slightly shorter cycles (person-median 29.0, MAD 2.0). Source: [https://doi.org/10.7278/S50d-4gxs-s4hj](https://doi.org/10.7278/S50d-4gxs-s4hj). Walk-forward there does not overwrite `released_model.json`.

Other sources:

- `literature_placeholder`: median **29** days, MAD **4** days. Used only if the release file is missing.
- `synthetic_train`: median/MAD of training users’ observed lengths in the synthetic split (CI pipeline only).

Regenerate the release file locally (DUA required): `python -m openciclo.evaluation.mcphases --fit-release`.

## Probabilistic representation

Let `μ` be the point length. The released `length_family` chooses the PMF on integers 1–90:

- `laplace`: `P(L = k) ∝ exp(-|k - μ| / b)` with scale `b` from residual MAD (floored)
- `lognormal`: discrete log-normal with median `μ` and `sigma` from the release file
- `empirical`: Laplace-smoothed train histogram, shifted so its discrete median matches `μ`

These are **model assumptions**, not biological laws. Cycle lengths are often right-skewed; that is why log-normal and empirical families are ablated on mcPHASES.

Mapping to dates: `next_start = last_start + L days`.

If `reference_date` is after `last_start`, probability mass on dates **before** `reference_date` is removed and the remainder renormalized for the **display** forecast. That is a practical “what is still in the future?” view. Walk-forward scoring uses `reference_date = last_start` so the next cycle is entirely in the future (no truncation). Incomplete-history notes fire when elapsed days look suspiciously long; the observation is not deleted.

The calendar does not follow that truncated date. It keeps the unconditional mode (the most likely day of the full distribution) marked, including after that day has passed. The home card then counts days late from that day and quotes today's probability from the untruncated distribution. Patterns still shows the truncated display forecast.

## Period duration (web, derived)

The published `predict()` path still forecasts **cycle length / next start only**. The web app then derives bleeding duration separately:

- Closed period runs: consecutive `flow` days from a start, cut at the next observed start. The open cycle is excluded.
- Descriptive UI stats use the **mean** and min–max of those closed lengths.
- The expected bleeding length is the **median** of the same closed lengths (rounded). No recency weights.
- The expected period interval on the calendar is `[anchor, anchor + expectedDays - 1]`, where `anchor` is the unconditional mode. That matches `mostLikelyDate` until that day has passed. Alternate probable start dates keep their start markers and do not spawn extra bleeding bands.
- Intermenstrual bleeding is a symptom. It is not `flow` and does not create starts, period runs, or pool lengths.
- If the user turns forecasts off, `predict()` is not called in the UI. Observed means, ranges, completed-cycle history, and current cycle day remain.

These duration fields are not part of the Python forecast object and must not be mixed into `daily_probabilities`.

## Uncertainty labels

Configurable thresholds (defaults):

- **High** if fewer than 3 completed cycles or scale is large
- **Low** if at least 6 completed cycles and scale is small
- **Medium** otherwise

Labels are summaries, not extra scientific claims.

## Evidence strength (future features)

Starting **priors** for optional signals, to be replaced by empirical weights:

| Signal | Starting evidence |
| --- | --- |
| Observed period start | Very high |
| LH test, BBT shift, observed ovulation | High |
| Cervical mucus | Medium |
| Symptoms | Low–medium |
| Sleep, stress, mood | Low |

V0 does not apply these. Personalized feature effects need an evidence threshold; one or two cramp logs must not dominate.

## Recency and regime change

Exponential recency is **investigated** via benchmarks. It is not forced if it loses to equal weights.

Regime-change detectors (change-point, rolling-only models) are Phase 3. Rolling mean/median are the V0 probes.

## What V0 will not do

- Drop outliers without an explicit, documented rule (V0 does not drop them)
- Treat unknown as “no period”
- Use deep learning
- Emit causal copy (“cramps caused your period”)

## Adoption rule for later models

A candidate must beat the median baseline on walk-forward MAE **and** be no worse on 80% interval coverage without a documented trade-off (see `openciclo.evaluation.mcphases`). Prefer the simpler model when the MAE gain is smaller than 0.05 days. **Synthetic** scores never choose the released `model_id`.
