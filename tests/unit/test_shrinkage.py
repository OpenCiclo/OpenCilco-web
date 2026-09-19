# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from openciclo.models.baselines import get_forecaster
from openciclo.models.shrinkage import mixed_scale
from openciclo.schemas.config import ForecastConfig, literature_placeholder_prior


def test_shrinkage_moves_toward_prior() -> None:
    prior = literature_placeholder_prior()
    config = ForecastConfig(shrinkage_k=2.0)
    personal = [22.0, 22.0]
    result = get_forecaster("shrinkage").estimate(personal, prior, config)
    assert result.used_prior is True
    # n=2, k=2 → 0.5 * 22 + 0.5 * 29 = 25.5
    assert abs(result.point - 25.5) < 1e-9


def test_shrinkage_weight_grows_with_n() -> None:
    prior = literature_placeholder_prior()
    config = ForecastConfig(shrinkage_k=2.0)
    short = get_forecaster("v0.shrinkage.median").estimate([22.0], prior, config)
    long = get_forecaster("shrinkage").estimate([22.0] * 8, prior, config)
    assert short.point > long.point
    assert abs(long.point - 22.0) < abs(short.point - 22.0)


def test_shrinkage_mean_and_last() -> None:
    prior = literature_placeholder_prior()
    config = ForecastConfig(shrinkage_k=1.0)
    mean_point = get_forecaster("shrinkage_mean").estimate([20.0, 24.0], prior, config).point
    # n=2, k=1 → 2/3 * 22 + 1/3 * 29
    assert abs(mean_point - (2.0 / 3.0 * 22.0 + 1.0 / 3.0 * 29.0)) < 1e-9
    last_point = get_forecaster("shrinkage_last").estimate([20.0, 40.0], prior, config).point
    # n=1 for last → 0.5 * 40 + 0.5 * 29
    assert abs(last_point - 34.5) < 1e-9


def test_mixed_scale_floors() -> None:
    prior = literature_placeholder_prior()
    scale = mixed_scale([28.0, 28.0, 28.0], 28.0, prior, shrinkage_k=2.0, min_scale=0.75)
    assert scale >= 0.75
