# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from openciclo.models.baselines import MANDATORY_BASELINE_ALIASES, get_forecaster
from openciclo.schemas.config import ForecastConfig, literature_placeholder_prior


def test_mandatory_baselines_exist() -> None:
    assert len(MANDATORY_BASELINE_ALIASES) == 8
    for name in MANDATORY_BASELINE_ALIASES:
        get_forecaster(name)


def test_point_estimates_on_known_lengths() -> None:
    lengths = [28.0, 30.0, 32.0]
    prior = literature_placeholder_prior()
    config = ForecastConfig()
    assert get_forecaster("last_cycle").estimate(lengths, prior, config).point == 32.0
    assert get_forecaster("mean").estimate(lengths, prior, config).point == 30.0
    assert get_forecaster("median").estimate(lengths, prior, config).point == 30.0
    assert (
        get_forecaster("population_prior").estimate(lengths, prior, config).point
        == prior.median_length
    )


def test_empty_history_falls_back_to_prior() -> None:
    prior = literature_placeholder_prior()
    config = ForecastConfig()
    for name in ("last_cycle", "mean", "median", "rolling_mean", "shrinkage"):
        result = get_forecaster(name).estimate([], prior, config)
        assert result.used_prior is True
        assert result.point == prior.median_length


def test_recency_lambda_one_matches_mean() -> None:
    lengths = [20.0, 30.0, 40.0]
    prior = literature_placeholder_prior()
    config = ForecastConfig(recency_lambda=1.0)
    mean = get_forecaster("mean").estimate(lengths, prior, config).point
    weighted = get_forecaster("recency_weighted_mean").estimate(lengths, prior, config).point
    assert abs(mean - weighted) < 1e-9


def test_rolling_uses_recent_window() -> None:
    lengths = [20.0, 20.0, 20.0, 40.0, 40.0, 40.0]
    prior = literature_placeholder_prior()
    config = ForecastConfig(rolling_window=3)
    assert get_forecaster("rolling_mean").estimate(lengths, prior, config).point == 40.0
    assert get_forecaster("mean").estimate(lengths, prior, config).point == 30.0


def test_single_date_forecast_is_deterministic() -> None:
    from openciclo import predict

    history = [date(2026, 7, 30)]
    first = predict(history, reference_date=date(2026, 7, 30), model="median")
    second = predict(history, reference_date=date(2026, 7, 30), model="median")
    assert first.model_dump() == second.model_dump()
    assert first.uncertainty.value == "high"
