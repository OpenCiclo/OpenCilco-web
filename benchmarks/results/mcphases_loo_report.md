# OpenCiclo mcPHASES timing benchmark

**Data:** mcPHASES restricted / do not redistribute
**Dataset:** mcPHASES 1.0.0 hormones_and_selfreport
**Engine:** 0.2.1
**Protocol:** loo
**Generated:** 2026-08-13T08:10:17Z

Leave-one-person-out walk-forward. Prior fitted on the other people only.
These aggregate metrics are the model-selection criterion. They are not
worldwide clinical accuracy. Do not redistribute the underlying CSV.

## Selected model

- candidate id: `v0.shrinkage.median.k2.laplace`
- point estimator: `shrinkage`
- length family: `laplace`
- shrinkage k: 2.0
- blend last: 0.0
- clip radius: None
- holdout MAE: 3.500
- holdout 80% coverage: 0.777
- holdout n: 130
- reason: lowest eligible MAE vs median 4.023 (coverage 0.777 vs 0.731)

## Overall

| model_id | subgroup | n | mae | medae | exact | within_1 | within_2 | within_3 | within_5 | nll | brier_within_2 | coverage_80 | width_80 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| v0.baseline.last_cycle | all | 130 | 4.231 | 3.000 | 0.092 | 0.269 | 0.423 | 0.523 | 0.715 | 3.301 | 0.280 | 0.715 | 10.077 |
| v0.baseline.mean | all | 130 | 4.038 | 3.000 | 0.100 | 0.285 | 0.431 | 0.562 | 0.731 | 3.255 | 0.297 | 0.731 | 10.000 |
| v0.baseline.median | all | 130 | 4.023 | 3.000 | 0.100 | 0.285 | 0.431 | 0.562 | 0.738 | 3.253 | 0.299 | 0.731 | 9.938 |
| v0.baseline.population_prior | all | 130 | 3.646 | 3.000 | 0.085 | 0.308 | 0.454 | 0.608 | 0.777 | 3.109 | 0.292 | 0.792 | 11.085 |
| v0.baseline.recency_weighted_mean | all | 130 | 4.038 | 3.000 | 0.100 | 0.285 | 0.438 | 0.562 | 0.731 | 3.256 | 0.294 | 0.731 | 10.023 |
| v0.baseline.recency_weighted_median | all | 130 | 4.146 | 3.000 | 0.092 | 0.269 | 0.423 | 0.523 | 0.731 | 3.290 | 0.284 | 0.723 | 9.900 |
| v0.baseline.rolling_mean | all | 130 | 4.038 | 3.000 | 0.100 | 0.285 | 0.431 | 0.562 | 0.731 | 3.255 | 0.297 | 0.731 | 10.000 |
| v0.baseline.rolling_median | all | 130 | 4.023 | 3.000 | 0.100 | 0.285 | 0.431 | 0.562 | 0.738 | 3.253 | 0.299 | 0.731 | 9.938 |
| v0.shrinkage.last.k0.5.laplace | all | 130 | 3.792 | 3.000 | 0.123 | 0.292 | 0.454 | 0.577 | 0.754 | 3.131 | 0.280 | 0.769 | 10.085 |
| v0.shrinkage.last.k1.5.laplace | all | 130 | 3.585 | 3.000 | 0.138 | 0.331 | 0.462 | 0.577 | 0.785 | 3.077 | 0.282 | 0.777 | 10.208 |
| v0.shrinkage.last.k1.laplace | all | 130 | 3.654 | 3.000 | 0.115 | 0.331 | 0.454 | 0.592 | 0.777 | 3.096 | 0.282 | 0.769 | 10.054 |
| v0.shrinkage.last.k2.5.laplace | all | 130 | 3.600 | 3.000 | 0.115 | 0.315 | 0.469 | 0.592 | 0.785 | 3.073 | 0.283 | 0.769 | 10.208 |
| v0.shrinkage.last.k2.laplace | all | 130 | 3.600 | 3.000 | 0.123 | 0.315 | 0.462 | 0.592 | 0.777 | 3.073 | 0.284 | 0.769 | 10.146 |
| v0.shrinkage.last.k3.laplace | all | 130 | 3.615 | 3.000 | 0.092 | 0.315 | 0.477 | 0.592 | 0.792 | 3.076 | 0.284 | 0.769 | 10.115 |
| v0.shrinkage.last.k4.laplace | all | 130 | 3.631 | 3.000 | 0.100 | 0.300 | 0.477 | 0.592 | 0.785 | 3.082 | 0.286 | 0.769 | 10.169 |
| v0.shrinkage.last.k5.laplace | all | 130 | 3.654 | 3.000 | 0.092 | 0.292 | 0.462 | 0.600 | 0.785 | 3.085 | 0.285 | 0.762 | 10.131 |
| v0.shrinkage.last.k6.laplace | all | 130 | 3.662 | 3.000 | 0.092 | 0.285 | 0.462 | 0.600 | 0.785 | 3.088 | 0.286 | 0.754 | 10.069 |
| v0.shrinkage.last.k8.laplace | all | 130 | 3.677 | 3.000 | 0.092 | 0.292 | 0.454 | 0.592 | 0.785 | 3.092 | 0.288 | 0.769 | 10.031 |
| v0.shrinkage.mean.k0.5.laplace | all | 130 | 3.677 | 3.000 | 0.123 | 0.308 | 0.477 | 0.592 | 0.769 | 3.109 | 0.283 | 0.777 | 9.892 |
| v0.shrinkage.mean.k1.5.laplace | all | 130 | 3.523 | 3.000 | 0.131 | 0.331 | 0.477 | 0.608 | 0.785 | 3.055 | 0.282 | 0.777 | 10.023 |
| v0.shrinkage.mean.k1.laplace | all | 130 | 3.554 | 3.000 | 0.123 | 0.331 | 0.485 | 0.615 | 0.777 | 3.072 | 0.282 | 0.769 | 9.892 |
| v0.shrinkage.mean.k2.5.laplace | all | 130 | 3.523 | 3.000 | 0.123 | 0.331 | 0.485 | 0.608 | 0.785 | 3.053 | 0.282 | 0.769 | 10.069 |
| v0.shrinkage.mean.k2.laplace | all | 130 | 3.508 | 3.000 | 0.115 | 0.331 | 0.477 | 0.623 | 0.777 | 3.053 | 0.283 | 0.777 | 10.038 |
| v0.shrinkage.mean.k3.laplace | all | 130 | 3.523 | 3.000 | 0.115 | 0.331 | 0.477 | 0.608 | 0.792 | 3.055 | 0.285 | 0.769 | 9.977 |
| v0.shrinkage.mean.k4.laplace | all | 130 | 3.562 | 3.000 | 0.100 | 0.315 | 0.485 | 0.608 | 0.792 | 3.062 | 0.287 | 0.769 | 10.077 |
| v0.shrinkage.mean.k5.laplace | all | 130 | 3.562 | 3.000 | 0.108 | 0.300 | 0.485 | 0.615 | 0.792 | 3.068 | 0.287 | 0.762 | 10.054 |
| v0.shrinkage.mean.k6.laplace | all | 130 | 3.585 | 3.000 | 0.100 | 0.285 | 0.485 | 0.615 | 0.792 | 3.073 | 0.287 | 0.754 | 9.992 |
| v0.shrinkage.mean.k8.laplace | all | 130 | 3.615 | 3.000 | 0.092 | 0.292 | 0.469 | 0.615 | 0.785 | 3.080 | 0.289 | 0.769 | 9.985 |
| v0.shrinkage.median.k0.5.laplace | all | 130 | 3.669 | 3.000 | 0.123 | 0.308 | 0.477 | 0.600 | 0.769 | 3.105 | 0.285 | 0.777 | 9.854 |
| v0.shrinkage.median.k1.5.laplace | all | 130 | 3.508 | 3.000 | 0.131 | 0.338 | 0.477 | 0.608 | 0.792 | 3.053 | 0.283 | 0.777 | 10.054 |
| v0.shrinkage.median.k1.laplace | all | 130 | 3.538 | 3.000 | 0.123 | 0.331 | 0.492 | 0.615 | 0.785 | 3.066 | 0.280 | 0.769 | 9.931 |
| v0.shrinkage.median.k2.5.laplace | all | 130 | 3.515 | 3.000 | 0.131 | 0.331 | 0.485 | 0.608 | 0.785 | 3.052 | 0.283 | 0.777 | 10.100 |
| v0.shrinkage.median.k2.blend0.25.laplace | all | 130 | 3.508 | 3.000 | 0.131 | 0.331 | 0.469 | 0.623 | 0.777 | 3.055 | 0.284 | 0.769 | 10.023 |
| v0.shrinkage.median.k2.blend0.5.laplace | all | 130 | 3.538 | 3.000 | 0.123 | 0.323 | 0.454 | 0.623 | 0.777 | 3.064 | 0.285 | 0.777 | 9.992 |
| v0.shrinkage.median.k2.clip12.laplace | all | 130 | 3.500 | 3.000 | 0.123 | 0.331 | 0.477 | 0.623 | 0.777 | 3.051 | 0.284 | 0.777 | 10.062 |
| v0.shrinkage.median.k2.clip8.laplace | all | 130 | 3.515 | 3.000 | 0.108 | 0.331 | 0.477 | 0.615 | 0.777 | 3.052 | 0.284 | 0.777 | 10.092 |
| v0.shrinkage.median.k2.laplace | all | 130 | 3.500 | 3.000 | 0.123 | 0.331 | 0.477 | 0.623 | 0.777 | 3.051 | 0.284 | 0.777 | 10.062 |
| v0.shrinkage.median.k3.blend0.25.laplace | all | 130 | 3.515 | 3.000 | 0.123 | 0.338 | 0.477 | 0.608 | 0.792 | 3.057 | 0.285 | 0.769 | 9.992 |
| v0.shrinkage.median.k3.blend0.5.laplace | all | 130 | 3.531 | 3.000 | 0.108 | 0.338 | 0.469 | 0.608 | 0.792 | 3.062 | 0.283 | 0.769 | 10.000 |
| v0.shrinkage.median.k3.clip12.laplace | all | 130 | 3.531 | 3.000 | 0.108 | 0.331 | 0.477 | 0.608 | 0.792 | 3.056 | 0.285 | 0.777 | 10.000 |
| v0.shrinkage.median.k3.clip8.laplace | all | 130 | 3.523 | 3.000 | 0.108 | 0.331 | 0.477 | 0.615 | 0.792 | 3.058 | 0.285 | 0.777 | 10.069 |
| v0.shrinkage.median.k3.laplace | all | 130 | 3.531 | 3.000 | 0.108 | 0.331 | 0.477 | 0.608 | 0.792 | 3.056 | 0.285 | 0.777 | 10.000 |
| v0.shrinkage.median.k4.blend0.25.laplace | all | 130 | 3.577 | 3.000 | 0.092 | 0.315 | 0.485 | 0.608 | 0.792 | 3.064 | 0.287 | 0.769 | 10.077 |
| v0.shrinkage.median.k4.blend0.5.laplace | all | 130 | 3.577 | 3.000 | 0.108 | 0.315 | 0.469 | 0.608 | 0.792 | 3.066 | 0.286 | 0.769 | 10.062 |
| v0.shrinkage.median.k4.clip12.laplace | all | 130 | 3.562 | 3.000 | 0.100 | 0.315 | 0.485 | 0.608 | 0.792 | 3.064 | 0.287 | 0.769 | 10.092 |
| v0.shrinkage.median.k4.clip8.laplace | all | 130 | 3.569 | 3.000 | 0.100 | 0.300 | 0.485 | 0.615 | 0.792 | 3.066 | 0.287 | 0.762 | 10.100 |
| v0.shrinkage.median.k4.laplace | all | 130 | 3.562 | 3.000 | 0.100 | 0.315 | 0.485 | 0.608 | 0.792 | 3.064 | 0.287 | 0.769 | 10.092 |
| v0.shrinkage.median.k5.laplace | all | 130 | 3.569 | 3.000 | 0.108 | 0.292 | 0.485 | 0.615 | 0.792 | 3.069 | 0.287 | 0.762 | 10.069 |
| v0.shrinkage.median.k6.laplace | all | 130 | 3.585 | 3.000 | 0.100 | 0.285 | 0.485 | 0.615 | 0.792 | 3.074 | 0.287 | 0.754 | 10.000 |
| v0.shrinkage.median.k8.laplace | all | 130 | 3.623 | 3.000 | 0.092 | 0.292 | 0.462 | 0.615 | 0.785 | 3.080 | 0.288 | 0.769 | 9.985 |
| v0.shrinkage.recency_median.k1.laplace | all | 130 | 3.638 | 3.000 | 0.115 | 0.315 | 0.462 | 0.592 | 0.785 | 3.083 | 0.280 | 0.777 | 9.985 |
| v0.shrinkage.recency_median.k2.laplace | all | 130 | 3.562 | 3.000 | 0.131 | 0.323 | 0.462 | 0.600 | 0.777 | 3.065 | 0.283 | 0.785 | 10.069 |
| v0.shrinkage.recency_median.k3.laplace | all | 130 | 3.562 | 3.000 | 0.108 | 0.331 | 0.469 | 0.585 | 0.792 | 3.068 | 0.284 | 0.785 | 10.031 |
| v0.shrinkage.recency_median.k4.laplace | all | 130 | 3.608 | 3.000 | 0.100 | 0.308 | 0.469 | 0.585 | 0.792 | 3.072 | 0.286 | 0.777 | 10.092 |

Ciclo provides cycle forecasts. Forecasts can be wrong. Ciclo is not a
medical device, diagnosis system, or contraceptive method.

Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez. Apache-2.0.
