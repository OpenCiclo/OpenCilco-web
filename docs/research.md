# Research notes

OpenCiclo
Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

These are **summaries and citations**, not copies of papers. They inform OpenCiclo’s questions; they do not license us to reproduce proprietary apps.

OpenCiclo is inspired by the general problem of menstrual forecasting. We do **not** claim to know or reimplement Flo (or any other closed product).

## Central questions

1. How much predictive accuracy is available from period-start history alone?
2. How should uncertainty grow when history is short, irregular, or possibly incomplete?
3. When does a population prior help a new user without overstating confidence?
4. How do self-tracking artifacts (skipped logs) differ from true long cycles?
5. Which optional signals (symptoms, BBT, LH) change forecasts enough to justify user burden?

## Cycle-length variation in large digital cohorts

Li, H., Gibson, E. A., Jukic, A. M. Z., et al. (2023). Menstrual cycle length variation by demographic characteristics from the Apple Women’s Health Study. *npj Digital Medicine*, 6, 100. https://doi.org/10.1038/s41746-023-00848-1

**Takeaway for OpenCiclo:** cycle length is not a single number for “women.” Age and other demographics shift typical length and variability. A global point prior is a convenience, not a scientific endpoint. AWHS participant-level data are not in this repo; only published facts may be cited.

## Sequential / hierarchical forecasting

Bortot, P., Masarotto, G., & Scarpa, B. (2010). Sequential predictions of menstrual cycle lengths. *Biostatistics*, 11(4), 741–755. https://doi.org/10.1093/biostatistics/kxq020

**Takeaway:** treating each person as a short time series, then embedding those series in a Bayesian hierarchy, transfers strength from the population when personal history is short. State-space (temporal) structure matters; i.i.d. cycle lengths are a baseline assumption to test, not a law.

This is the conceptual ancestor of OpenCiclo Phase 2. V0 still implements the i.i.d. baselines that any hierarchical model must beat. V0.2 adds empirical-Bayes shrinkage toward an mcPHASES population median; a full hierarchical posterior remains future work.

## Self-tracking artifacts

Li, K., Urteaga, I., Wiggins, C. H., Druet, A., Shea, A., Vitzthum, V. J., & Elhadad, N. (2021). A generative, predictive model for menstrual cycle lengths that accounts for potential self-tracking artifacts in mobile health data. arXiv:2102.12439. https://arxiv.org/abs/2102.12439

**Takeaway:** observed “long cycles” in apps are a mixture of biology and **skipped period logs**. A generative skip process can improve prediction and interpretability. Clue extracts used in that work are **not redistributable** here.

OpenCiclo V0 **keeps** unusual long observations and flags them. It does not yet infer a skip. Deleting long cycles silently is forbidden.

## Skew and skipped tracking in association models

SkipTrack (2025). A Bayesian hierarchical model for self-tracked menstrual cycle length and regularity in large mobile health cohorts. arXiv:2508.05845. https://doi.org/10.48550/arXiv.2508.05845

**Takeaway:** cycle lengths are often modeled as right-skewed (e.g. log-normal) with a separate regularity (dispersion) parameter and an explicit skip multiplier. V0’s symmetric discrete Laplace around a point estimate is therefore a **known misspecification** to benchmark against, not a final likelihood. On mcPHASES timing holdout, discrete log-normal did not beat Laplace shrinkage on MAE; that result is cohort-specific.

## Multimodal but small open-ish clinical resource

Chen, J. Y., Kalani, K., Truong, K., & Mariakakis, A. (2025). mcPHASES [dataset]. PhysioNet. https://doi.org/10.13026/zx6a-2c81

**Takeaway:** rich physiology + hormones + self-report exists, but n is small (42), geographically narrow, and **restricted-access**. Useful later for optional-signal ablations after a DUA — not for claiming worldwide performance, and not for git.

## Other modeling directions (not implemented)

- State-space / random-walk cycle lengths in athletes (e.g. work in *Scientific Reports*, 2021) — relevant to regime change.
- BBT state-space models for *within-cycle* phase (Fukaya / Kawamori line of work) — relevant to ovulation, which is **out of V1 scope**.

## Evaluation methodology we commit to

- Walk-forward / temporal validation, never random splits of a person’s cycles
- Separate unseen-user vs existing-user protocols
- Calibration (NLL, interval coverage, reliability), not only MAE
- Subgroups: variability, history length, skip artifacts

See [evaluation.md](evaluation.md).

## What we will not do

- Reverse-engineer closed apps
- Treat missing app use as a negative period observation
- Copy paper text into the codebase
- Fit deep sequence models
