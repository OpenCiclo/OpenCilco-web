# OpenCiclo V0 baseline benchmark

**Data:** SYNTHETIC / NON-PRODUCTION
**Engine:** 0.1.0
**Generated:** 2026-08-13T03:51:34Z

These numbers are produced by walk-forward evaluation on **simulated**
cycles. They are not clinical accuracy and must not be quoted as product
performance.

## Overall (held-out synthetic users)

| model_id | subgroup | n | mae | medae | exact | within_1 | within_2 | within_3 | within_5 | nll | brier_within_2 | coverage_80 | width_80 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| v0.baseline.last_cycle | all | 246 | 4.228 | 2.000 | 0.167 | 0.427 | 0.622 | 0.720 | 0.813 | 3.279 | 0.222 | 0.756 | 11.939 |
| v0.baseline.mean | all | 246 | 4.122 | 2.000 | 0.146 | 0.386 | 0.569 | 0.663 | 0.776 | 3.213 | 0.189 | 0.760 | 10.203 |
| v0.baseline.median | all | 246 | 4.037 | 2.000 | 0.175 | 0.415 | 0.610 | 0.679 | 0.776 | 3.575 | 0.231 | 0.691 | 7.297 |
| v0.baseline.population_prior | all | 246 | 3.752 | 2.000 | 0.167 | 0.443 | 0.610 | 0.695 | 0.809 | 3.214 | 0.221 | 0.760 | 9.232 |
| v0.baseline.recency_weighted_mean | all | 246 | 4.085 | 2.000 | 0.146 | 0.386 | 0.581 | 0.675 | 0.780 | 3.179 | 0.181 | 0.789 | 10.455 |
| v0.baseline.recency_weighted_mean.l070 | all | 246 | 4.057 | 2.000 | 0.150 | 0.386 | 0.610 | 0.699 | 0.797 | 3.154 | 0.181 | 0.797 | 10.772 |
| v0.baseline.recency_weighted_mean.l080 | all | 246 | 4.045 | 2.000 | 0.150 | 0.386 | 0.589 | 0.691 | 0.785 | 3.161 | 0.174 | 0.793 | 10.626 |
| v0.baseline.recency_weighted_mean.l095 | all | 246 | 4.085 | 2.000 | 0.150 | 0.390 | 0.573 | 0.675 | 0.785 | 3.193 | 0.182 | 0.772 | 10.333 |
| v0.baseline.recency_weighted_mean.l100 | all | 246 | 4.122 | 2.000 | 0.146 | 0.386 | 0.569 | 0.663 | 0.776 | 3.213 | 0.189 | 0.760 | 10.203 |
| v0.baseline.recency_weighted_median | all | 246 | 4.098 | 2.000 | 0.159 | 0.390 | 0.606 | 0.671 | 0.793 | 3.474 | 0.222 | 0.687 | 7.528 |
| v0.baseline.recency_weighted_median.l070 | all | 246 | 3.943 | 2.000 | 0.171 | 0.411 | 0.638 | 0.715 | 0.829 | 3.315 | 0.221 | 0.715 | 8.898 |
| v0.baseline.recency_weighted_median.l080 | all | 246 | 3.988 | 2.000 | 0.167 | 0.398 | 0.618 | 0.691 | 0.813 | 3.366 | 0.215 | 0.703 | 7.992 |
| v0.baseline.recency_weighted_median.l095 | all | 246 | 4.110 | 2.000 | 0.163 | 0.390 | 0.606 | 0.671 | 0.785 | 3.483 | 0.224 | 0.679 | 7.488 |
| v0.baseline.recency_weighted_median.l100 | all | 246 | 4.024 | 2.000 | 0.179 | 0.415 | 0.614 | 0.675 | 0.772 | 3.575 | 0.233 | 0.683 | 7.224 |
| v0.baseline.rolling_mean | all | 246 | 4.089 | 2.000 | 0.146 | 0.378 | 0.573 | 0.687 | 0.780 | 3.195 | 0.186 | 0.776 | 10.435 |
| v0.baseline.rolling_median | all | 246 | 3.963 | 2.000 | 0.167 | 0.419 | 0.622 | 0.699 | 0.793 | 3.554 | 0.227 | 0.703 | 7.386 |

## By subgroup

| model_id | subgroup | n | mae | medae | exact | within_1 | within_2 | within_3 | within_5 | nll | brier_within_2 | coverage_80 | width_80 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| v0.baseline.last_cycle | irregular | 56 | 5.946 | 5.500 | 0.036 | 0.179 | 0.268 | 0.304 | 0.500 | 3.932 | 0.279 | 0.607 | 18.375 |
| v0.baseline.last_cycle | regime_change | 60 | 2.033 | 2.000 | 0.150 | 0.450 | 0.700 | 0.883 | 0.967 | 2.872 | 0.302 | 0.783 | 11.433 |
| v0.baseline.last_cycle | regular | 57 | 1.211 | 1.000 | 0.316 | 0.667 | 0.877 | 0.930 | 1.000 | 1.939 | 0.099 | 0.895 | 4.912 |
| v0.baseline.last_cycle | skipped_logs | 54 | 8.907 | 2.000 | 0.222 | 0.389 | 0.556 | 0.685 | 0.704 | 4.797 | 0.232 | 0.685 | 15.593 |
| v0.baseline.last_cycle | sparse | 19 | 1.842 | 2.000 | 0.000 | 0.474 | 0.842 | 0.895 | 1.000 | 2.349 | 0.143 | 0.895 | 5.263 |
| v0.baseline.mean | irregular | 56 | 5.250 | 4.000 | 0.054 | 0.143 | 0.250 | 0.411 | 0.607 | 3.707 | 0.279 | 0.643 | 14.929 |
| v0.baseline.mean | regime_change | 60 | 3.117 | 2.000 | 0.067 | 0.333 | 0.533 | 0.617 | 0.833 | 3.050 | 0.248 | 0.700 | 6.400 |
| v0.baseline.mean | regular | 57 | 0.965 | 1.000 | 0.368 | 0.719 | 0.947 | 1.000 | 1.000 | 1.759 | 0.076 | 0.912 | 4.211 |
| v0.baseline.mean | skipped_logs | 54 | 8.241 | 3.000 | 0.111 | 0.315 | 0.444 | 0.537 | 0.574 | 4.755 | 0.163 | 0.741 | 17.556 |
| v0.baseline.mean | sparse | 19 | 1.737 | 2.000 | 0.105 | 0.474 | 0.842 | 0.895 | 1.000 | 2.251 | 0.144 | 0.895 | 5.368 |
| v0.baseline.median | irregular | 56 | 5.393 | 5.000 | 0.054 | 0.143 | 0.268 | 0.321 | 0.554 | 3.923 | 0.311 | 0.589 | 12.946 |
| v0.baseline.median | regime_change | 60 | 3.433 | 2.000 | 0.100 | 0.333 | 0.533 | 0.600 | 0.717 | 3.509 | 0.303 | 0.567 | 5.000 |
| v0.baseline.median | regular | 57 | 0.947 | 1.000 | 0.368 | 0.737 | 0.947 | 1.000 | 1.000 | 1.788 | 0.078 | 0.912 | 4.158 |
| v0.baseline.median | skipped_logs | 54 | 7.389 | 2.000 | 0.204 | 0.407 | 0.611 | 0.722 | 0.759 | 5.649 | 0.260 | 0.630 | 8.000 |
| v0.baseline.median | sparse | 19 | 1.684 | 1.000 | 0.105 | 0.526 | 0.842 | 0.895 | 1.000 | 2.226 | 0.143 | 0.895 | 5.316 |
| v0.baseline.population_prior | irregular | 56 | 5.411 | 5.000 | 0.107 | 0.179 | 0.304 | 0.393 | 0.571 | 3.756 | 0.276 | 0.696 | 16.804 |
| v0.baseline.population_prior | regime_change | 60 | 3.133 | 3.000 | 0.150 | 0.383 | 0.483 | 0.600 | 0.783 | 3.108 | 0.297 | 0.650 | 6.733 |
| v0.baseline.population_prior | regular | 57 | 1.105 | 1.000 | 0.298 | 0.719 | 0.912 | 0.965 | 1.000 | 1.978 | 0.111 | 0.930 | 5.228 |
| v0.baseline.population_prior | skipped_logs | 54 | 6.222 | 2.000 | 0.093 | 0.481 | 0.704 | 0.759 | 0.815 | 4.408 | 0.214 | 0.722 | 9.444 |
| v0.baseline.population_prior | sparse | 19 | 1.737 | 2.000 | 0.211 | 0.474 | 0.737 | 0.895 | 1.000 | 2.270 | 0.164 | 0.895 | 6.211 |
| v0.baseline.recency_weighted_mean | irregular | 56 | 5.214 | 4.000 | 0.036 | 0.125 | 0.286 | 0.429 | 0.643 | 3.710 | 0.287 | 0.679 | 15.304 |
| v0.baseline.recency_weighted_mean | regime_change | 60 | 3.000 | 2.000 | 0.050 | 0.333 | 0.550 | 0.650 | 0.833 | 2.947 | 0.212 | 0.767 | 6.933 |
| v0.baseline.recency_weighted_mean | regular | 57 | 0.930 | 1.000 | 0.386 | 0.737 | 0.947 | 1.000 | 1.000 | 1.754 | 0.075 | 0.912 | 4.158 |
| v0.baseline.recency_weighted_mean | skipped_logs | 54 | 8.296 | 3.000 | 0.111 | 0.315 | 0.444 | 0.537 | 0.556 | 4.713 | 0.163 | 0.759 | 17.778 |
| v0.baseline.recency_weighted_mean | sparse | 19 | 1.684 | 2.000 | 0.158 | 0.474 | 0.842 | 0.895 | 1.000 | 2.257 | 0.144 | 0.895 | 5.368 |
| v0.baseline.recency_weighted_mean.l070 | irregular | 56 | 5.339 | 4.000 | 0.054 | 0.125 | 0.304 | 0.375 | 0.607 | 3.741 | 0.300 | 0.643 | 15.500 |
| v0.baseline.recency_weighted_mean.l070 | regime_change | 60 | 2.550 | 2.000 | 0.050 | 0.333 | 0.650 | 0.783 | 0.900 | 2.820 | 0.206 | 0.833 | 7.867 |
| v0.baseline.recency_weighted_mean.l070 | regular | 57 | 1.000 | 1.000 | 0.351 | 0.719 | 0.930 | 1.000 | 1.000 | 1.758 | 0.084 | 0.912 | 4.193 |
| v0.baseline.recency_weighted_mean.l070 | skipped_logs | 54 | 8.463 | 3.000 | 0.148 | 0.333 | 0.463 | 0.556 | 0.593 | 4.702 | 0.144 | 0.759 | 17.944 |
| v0.baseline.recency_weighted_mean.l070 | sparse | 19 | 1.684 | 2.000 | 0.158 | 0.474 | 0.842 | 0.895 | 1.000 | 2.270 | 0.146 | 0.895 | 5.368 |
| v0.baseline.recency_weighted_mean.l080 | irregular | 56 | 5.250 | 4.000 | 0.071 | 0.125 | 0.286 | 0.393 | 0.625 | 3.719 | 0.285 | 0.643 | 15.411 |
| v0.baseline.recency_weighted_mean.l080 | regime_change | 60 | 2.717 | 2.000 | 0.067 | 0.333 | 0.567 | 0.750 | 0.850 | 2.883 | 0.201 | 0.817 | 7.383 |
| v0.baseline.recency_weighted_mean.l080 | regular | 57 | 0.982 | 1.000 | 0.351 | 0.719 | 0.947 | 1.000 | 1.000 | 1.754 | 0.074 | 0.895 | 4.140 |
| v0.baseline.recency_weighted_mean.l080 | skipped_logs | 54 | 8.333 | 3.000 | 0.111 | 0.333 | 0.463 | 0.537 | 0.574 | 4.692 | 0.144 | 0.778 | 17.963 |
| v0.baseline.recency_weighted_mean.l080 | sparse | 19 | 1.684 | 2.000 | 0.158 | 0.474 | 0.842 | 0.895 | 1.000 | 2.263 | 0.145 | 0.895 | 5.368 |
| v0.baseline.recency_weighted_mean.l095 | irregular | 56 | 5.214 | 4.000 | 0.054 | 0.143 | 0.268 | 0.411 | 0.643 | 3.707 | 0.285 | 0.661 | 15.143 |
| v0.baseline.recency_weighted_mean.l095 | regime_change | 60 | 3.033 | 2.000 | 0.050 | 0.333 | 0.550 | 0.650 | 0.833 | 2.992 | 0.222 | 0.733 | 6.717 |
| v0.baseline.recency_weighted_mean.l095 | regular | 57 | 0.930 | 1.000 | 0.386 | 0.737 | 0.947 | 1.000 | 1.000 | 1.756 | 0.076 | 0.912 | 4.158 |
| v0.baseline.recency_weighted_mean.l095 | skipped_logs | 54 | 8.259 | 3.000 | 0.111 | 0.315 | 0.426 | 0.556 | 0.574 | 4.731 | 0.155 | 0.741 | 17.630 |
| v0.baseline.recency_weighted_mean.l095 | sparse | 19 | 1.684 | 2.000 | 0.158 | 0.474 | 0.842 | 0.895 | 1.000 | 2.254 | 0.144 | 0.895 | 5.368 |
| v0.baseline.recency_weighted_mean.l100 | irregular | 56 | 5.250 | 4.000 | 0.054 | 0.143 | 0.250 | 0.411 | 0.607 | 3.707 | 0.279 | 0.643 | 14.929 |
| v0.baseline.recency_weighted_mean.l100 | regime_change | 60 | 3.117 | 2.000 | 0.067 | 0.333 | 0.533 | 0.617 | 0.833 | 3.050 | 0.248 | 0.700 | 6.400 |
| v0.baseline.recency_weighted_mean.l100 | regular | 57 | 0.965 | 1.000 | 0.368 | 0.719 | 0.947 | 1.000 | 1.000 | 1.759 | 0.076 | 0.912 | 4.211 |
| v0.baseline.recency_weighted_mean.l100 | skipped_logs | 54 | 8.241 | 3.000 | 0.111 | 0.315 | 0.444 | 0.537 | 0.574 | 4.755 | 0.163 | 0.741 | 17.556 |
| v0.baseline.recency_weighted_mean.l100 | sparse | 19 | 1.737 | 2.000 | 0.105 | 0.474 | 0.842 | 0.895 | 1.000 | 2.251 | 0.144 | 0.895 | 5.368 |
| v0.baseline.recency_weighted_median | irregular | 56 | 5.518 | 5.000 | 0.071 | 0.143 | 0.268 | 0.304 | 0.554 | 3.872 | 0.293 | 0.589 | 13.625 |
| v0.baseline.recency_weighted_median | regime_change | 60 | 3.350 | 2.000 | 0.100 | 0.283 | 0.517 | 0.617 | 0.767 | 3.462 | 0.288 | 0.600 | 5.267 |
| v0.baseline.recency_weighted_median | regular | 57 | 1.018 | 1.000 | 0.351 | 0.737 | 0.947 | 0.947 | 1.000 | 1.847 | 0.077 | 0.895 | 4.000 |
| v0.baseline.recency_weighted_median | skipped_logs | 54 | 7.500 | 2.000 | 0.167 | 0.370 | 0.611 | 0.741 | 0.778 | 5.189 | 0.258 | 0.593 | 8.241 |
| v0.baseline.recency_weighted_median | sparse | 19 | 1.842 | 2.000 | 0.000 | 0.474 | 0.842 | 0.895 | 1.000 | 2.349 | 0.143 | 0.895 | 5.263 |
| v0.baseline.recency_weighted_median.l070 | irregular | 56 | 5.482 | 5.000 | 0.036 | 0.125 | 0.286 | 0.321 | 0.589 | 3.881 | 0.298 | 0.589 | 14.482 |
| v0.baseline.recency_weighted_median.l070 | regime_change | 60 | 2.383 | 2.000 | 0.150 | 0.383 | 0.667 | 0.800 | 0.900 | 2.956 | 0.266 | 0.717 | 8.533 |
| v0.baseline.recency_weighted_median.l070 | regular | 57 | 1.053 | 1.000 | 0.351 | 0.719 | 0.930 | 0.947 | 1.000 | 1.880 | 0.093 | 0.877 | 4.211 |
| v0.baseline.recency_weighted_median.l070 | skipped_logs | 54 | 7.870 | 2.000 | 0.204 | 0.389 | 0.593 | 0.722 | 0.759 | 4.983 | 0.254 | 0.611 | 9.741 |
| v0.baseline.recency_weighted_median.l070 | sparse | 19 | 1.842 | 2.000 | 0.000 | 0.474 | 0.842 | 0.895 | 1.000 | 2.349 | 0.143 | 0.895 | 5.263 |
| v0.baseline.recency_weighted_median.l080 | irregular | 56 | 5.607 | 5.000 | 0.036 | 0.107 | 0.232 | 0.286 | 0.589 | 3.887 | 0.275 | 0.589 | 14.036 |
| v0.baseline.recency_weighted_median.l080 | regime_change | 60 | 2.883 | 2.000 | 0.133 | 0.350 | 0.600 | 0.717 | 0.817 | 3.219 | 0.280 | 0.667 | 6.583 |
| v0.baseline.recency_weighted_median.l080 | regular | 57 | 1.000 | 1.000 | 0.368 | 0.737 | 0.947 | 0.947 | 1.000 | 1.841 | 0.078 | 0.895 | 4.035 |
| v0.baseline.recency_weighted_median.l080 | skipped_logs | 54 | 7.444 | 2.000 | 0.185 | 0.370 | 0.611 | 0.741 | 0.778 | 4.957 | 0.248 | 0.593 | 8.426 |
| v0.baseline.recency_weighted_median.l080 | sparse | 19 | 1.842 | 2.000 | 0.000 | 0.474 | 0.842 | 0.895 | 1.000 | 2.349 | 0.143 | 0.895 | 5.263 |
| v0.baseline.recency_weighted_median.l095 | irregular | 56 | 5.536 | 5.000 | 0.071 | 0.143 | 0.268 | 0.304 | 0.536 | 3.875 | 0.293 | 0.589 | 13.625 |
| v0.baseline.recency_weighted_median.l095 | regime_change | 60 | 3.400 | 2.000 | 0.100 | 0.283 | 0.517 | 0.617 | 0.750 | 3.506 | 0.296 | 0.567 | 5.100 |
| v0.baseline.recency_weighted_median.l095 | regular | 57 | 1.000 | 1.000 | 0.368 | 0.737 | 0.947 | 0.947 | 1.000 | 1.834 | 0.077 | 0.895 | 4.000 |
| v0.baseline.recency_weighted_median.l095 | skipped_logs | 54 | 7.500 | 2.000 | 0.167 | 0.370 | 0.611 | 0.741 | 0.778 | 5.189 | 0.258 | 0.593 | 8.241 |
| v0.baseline.recency_weighted_median.l095 | sparse | 19 | 1.842 | 2.000 | 0.000 | 0.474 | 0.842 | 0.895 | 1.000 | 2.349 | 0.143 | 0.895 | 5.263 |
| v0.baseline.recency_weighted_median.l100 | irregular | 56 | 5.696 | 5.500 | 0.054 | 0.161 | 0.286 | 0.321 | 0.500 | 3.923 | 0.301 | 0.589 | 13.161 |
| v0.baseline.recency_weighted_median.l100 | regime_change | 60 | 3.450 | 2.000 | 0.133 | 0.333 | 0.517 | 0.600 | 0.717 | 3.598 | 0.319 | 0.550 | 4.767 |
| v0.baseline.recency_weighted_median.l100 | regular | 57 | 1.000 | 1.000 | 0.368 | 0.719 | 0.947 | 0.965 | 1.000 | 1.816 | 0.075 | 0.895 | 4.105 |
| v0.baseline.recency_weighted_median.l100 | skipped_logs | 54 | 6.907 | 2.000 | 0.204 | 0.426 | 0.630 | 0.741 | 0.796 | 5.493 | 0.264 | 0.630 | 7.778 |
| v0.baseline.recency_weighted_median.l100 | sparse | 19 | 1.789 | 2.000 | 0.053 | 0.474 | 0.842 | 0.895 | 1.000 | 2.300 | 0.143 | 0.895 | 5.263 |
| v0.baseline.rolling_mean | irregular | 56 | 5.143 | 4.000 | 0.071 | 0.143 | 0.286 | 0.446 | 0.625 | 3.693 | 0.291 | 0.679 | 15.000 |
| v0.baseline.rolling_mean | regime_change | 60 | 2.933 | 2.000 | 0.067 | 0.333 | 0.533 | 0.700 | 0.833 | 2.959 | 0.229 | 0.733 | 7.017 |
| v0.baseline.rolling_mean | regular | 57 | 1.000 | 1.000 | 0.351 | 0.702 | 0.947 | 1.000 | 1.000 | 1.763 | 0.075 | 0.912 | 4.246 |
| v0.baseline.rolling_mean | skipped_logs | 54 | 8.370 | 3.000 | 0.111 | 0.296 | 0.426 | 0.519 | 0.574 | 4.786 | 0.159 | 0.741 | 17.815 |
| v0.baseline.rolling_mean | sparse | 19 | 1.737 | 2.000 | 0.105 | 0.474 | 0.842 | 0.895 | 1.000 | 2.251 | 0.144 | 0.895 | 5.368 |
| v0.baseline.rolling_median | irregular | 56 | 5.250 | 4.500 | 0.054 | 0.161 | 0.321 | 0.357 | 0.571 | 3.911 | 0.326 | 0.571 | 13.071 |
| v0.baseline.rolling_median | regime_change | 60 | 3.167 | 2.000 | 0.100 | 0.333 | 0.533 | 0.650 | 0.767 | 3.316 | 0.275 | 0.633 | 5.683 |
| v0.baseline.rolling_median | regular | 57 | 0.982 | 1.000 | 0.351 | 0.719 | 0.947 | 1.000 | 1.000 | 1.800 | 0.072 | 0.912 | 3.947 |
| v0.baseline.rolling_median | skipped_logs | 54 | 7.463 | 2.000 | 0.185 | 0.426 | 0.611 | 0.722 | 0.759 | 5.769 | 0.265 | 0.630 | 7.741 |
| v0.baseline.rolling_median | sparse | 19 | 1.684 | 1.000 | 0.105 | 0.526 | 0.842 | 0.895 | 1.000 | 2.226 | 0.143 | 0.895 | 5.316 |

Ciclo provides cycle forecasts. Forecasts can be wrong. Ciclo is not a
medical device, diagnosis system, or contraceptive method.

Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez. Apache-2.0.
