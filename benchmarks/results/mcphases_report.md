# OpenCiclo mcPHASES timing benchmark

**Data:** mcPHASES restricted / do not redistribute
**Dataset:** mcPHASES 1.0.0 hormones_and_selfreport
**Engine:** 0.2.0
**Generated:** 2026-08-13T07:51:17Z

Person-level holdout walk-forward. Prior fitted on train people only.
These aggregate metrics are the model-selection criterion. They are not
worldwide clinical accuracy. Do not redistribute the underlying CSV.

## Selected model

- candidate id: `v0.shrinkage.median.k2.laplace`
- point estimator: `shrinkage`
- length family: `laplace`
- shrinkage k: 2.0
- holdout MAE: 2.600
- holdout 80% coverage: 0.825
- holdout n: 40
- reason: lowest eligible MAE vs median 3.125 (coverage 0.825 vs 0.825)

## Overall (held-out people)

| model_id | subgroup | n | mae | medae | exact | within_1 | within_2 | within_3 | within_5 | nll | brier_within_2 | coverage_80 | width_80 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| v0.baseline.last_cycle | all | 40 | 3.150 | 2.000 | 0.125 | 0.400 | 0.550 | 0.625 | 0.825 | 2.814 | 0.237 | 0.825 | 9.850 |
| v0.baseline.mean | all | 40 | 3.125 | 2.000 | 0.125 | 0.400 | 0.550 | 0.650 | 0.825 | 2.825 | 0.251 | 0.825 | 9.925 |
| v0.baseline.median | all | 40 | 3.125 | 2.000 | 0.125 | 0.400 | 0.550 | 0.650 | 0.825 | 2.825 | 0.251 | 0.825 | 9.925 |
| v0.baseline.population_prior | all | 40 | 2.800 | 2.000 | 0.200 | 0.425 | 0.650 | 0.725 | 0.825 | 2.737 | 0.229 | 0.825 | 10.100 |
| v0.baseline.recency_weighted_mean | all | 40 | 3.100 | 2.000 | 0.125 | 0.400 | 0.575 | 0.650 | 0.825 | 2.824 | 0.243 | 0.825 | 9.900 |
| v0.baseline.recency_weighted_median | all | 40 | 3.150 | 2.000 | 0.125 | 0.400 | 0.550 | 0.625 | 0.825 | 2.814 | 0.237 | 0.825 | 9.850 |
| v0.baseline.rolling_mean | all | 40 | 3.125 | 2.000 | 0.125 | 0.400 | 0.550 | 0.650 | 0.825 | 2.825 | 0.251 | 0.825 | 9.925 |
| v0.baseline.rolling_median | all | 40 | 3.125 | 2.000 | 0.125 | 0.400 | 0.550 | 0.650 | 0.825 | 2.825 | 0.251 | 0.825 | 9.925 |
| v0.shrinkage.median.k1.empirical | all | 40 | 4.775 | 4.000 | 0.000 | 0.100 | 0.200 | 0.375 | 0.725 | 3.295 | 0.169 | 0.975 | 43.000 |
| v0.shrinkage.median.k1.laplace | all | 40 | 2.750 | 2.000 | 0.225 | 0.450 | 0.650 | 0.725 | 0.825 | 2.694 | 0.232 | 0.825 | 9.725 |
| v0.shrinkage.median.k1.lognormal | all | 40 | 3.175 | 2.000 | 0.100 | 0.375 | 0.550 | 0.700 | 0.800 | 2.839 | 0.265 | 0.875 | 11.275 |
| v0.shrinkage.median.k2.empirical | all | 40 | 4.750 | 4.000 | 0.025 | 0.075 | 0.150 | 0.400 | 0.750 | 3.229 | 0.148 | 0.975 | 43.000 |
| v0.shrinkage.median.k2.laplace | all | 40 | 2.600 | 1.000 | 0.250 | 0.525 | 0.675 | 0.725 | 0.825 | 2.682 | 0.230 | 0.825 | 9.625 |
| v0.shrinkage.median.k2.lognormal | all | 40 | 3.100 | 2.000 | 0.125 | 0.375 | 0.575 | 0.725 | 0.800 | 2.833 | 0.265 | 0.875 | 11.225 |
| v0.shrinkage.median.k3.empirical | all | 40 | 4.800 | 4.000 | 0.025 | 0.075 | 0.150 | 0.375 | 0.750 | 3.233 | 0.148 | 0.975 | 43.000 |
| v0.shrinkage.median.k3.laplace | all | 40 | 2.675 | 1.500 | 0.225 | 0.500 | 0.675 | 0.725 | 0.825 | 2.683 | 0.230 | 0.825 | 9.875 |
| v0.shrinkage.median.k3.lognormal | all | 40 | 3.075 | 2.000 | 0.150 | 0.375 | 0.575 | 0.725 | 0.800 | 2.833 | 0.265 | 0.875 | 11.250 |

Ciclo provides cycle forecasts. Forecasts can be wrong. Ciclo is not a
medical device, diagnosis system, or contraceptive method.

Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez. Apache-2.0.
