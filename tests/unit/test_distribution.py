# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

import numpy as np

from openciclo.forecasting.distribution import (
    discrete_asymmetric_laplace_pmf,
    discrete_laplace_pmf,
    discrete_lognormal_pmf,
    estimate_scale,
    fit_empirical_pmf,
    length_distribution,
    most_likely_length,
    shift_empirical_pmf,
)
from openciclo.schemas.config import ForecastConfig, literature_placeholder_prior


def test_discrete_laplace_normalizes() -> None:
    support = np.arange(1, 91)
    pmf = discrete_laplace_pmf(28.0, 2.0, support)
    assert abs(float(pmf.sum()) - 1.0) < 1e-9
    assert np.all(pmf >= 0.0)


def test_mode_near_center() -> None:
    dist = length_distribution(28.0, 1.5, ForecastConfig())
    assert most_likely_length(dist) in {27, 28, 29}


def test_scale_floor_prevents_zero_uncertainty() -> None:
    prior = literature_placeholder_prior()
    config = ForecastConfig()
    lengths = np.array([28.0, 28.0, 28.0])
    scale = estimate_scale(lengths, 28.0, prior, config.min_laplace_scale)
    assert scale >= config.min_laplace_scale


def test_discrete_lognormal_normalizes() -> None:
    support = np.arange(1, 91)
    pmf = discrete_lognormal_pmf(29.0, 0.18, support)
    assert abs(float(pmf.sum()) - 1.0) < 1e-9
    assert most_likely_length(
        length_distribution(29.0, 2.0, ForecastConfig(length_family="lognormal"))
    ) in {28, 29, 30}


def test_empirical_histogram_and_shift() -> None:
    probs = fit_empirical_pmf([2, 2, 4], min_length=1, max_length=5, alpha=0.0)
    assert abs(sum(probs) - 1.0) < 1e-9
    support = np.arange(1, 6)
    shifted = shift_empirical_pmf(np.asarray(probs, dtype=np.float64), support, target_median=4.0)
    assert abs(float(shifted.sum()) - 1.0) < 1e-9


def test_asymmetric_laplace_normalizes() -> None:
    support = np.arange(1, 91)
    pmf = discrete_asymmetric_laplace_pmf(29.0, 2.0, 1.5, support)
    assert abs(float(pmf.sum()) - 1.0) < 1e-9
    dist = length_distribution(
        29.0, 2.0, ForecastConfig(length_family="asymmetric_laplace", laplace_asymmetry=1.5)
    )
    assert most_likely_length(dist) in {28, 29, 30}
