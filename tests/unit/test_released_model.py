# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

import pandas as pd

from openciclo import predict
from openciclo.artifacts.release import load_released_model
from openciclo.evaluation.mcphases import select_winner


def test_released_model_loads_without_csv() -> None:
    released = load_released_model()
    assert released.n_users >= 0
    assert released.population_median > 0
    dataset = released.dataset.lower()
    assert "utah" not in dataset
    assert "creighton" not in dataset
    assert "mcphases" in dataset
    assert released.point_estimator_alias in {
        "median",
        "mean",
        "last_cycle",
        "rolling_mean",
        "rolling_median",
        "recency_weighted_mean",
        "recency_weighted_median",
        "population_prior",
        "shrinkage",
        "shrinkage_mean",
        "shrinkage_last",
        "shrinkage_recency",
    }


def test_predict_default_uses_released_prior() -> None:
    released = load_released_model()
    forecast = predict([date(2026, 6, 1)])
    assert forecast.model_id.startswith("v0.")
    assert any(released.dataset in note for note in forecast.notes)
    if released.point_estimator == "shrinkage":
        assert forecast.model_id == "v0.shrinkage.median"
    elif released.point_estimator == "median":
        assert forecast.model_id == "v0.baseline.median"


def test_parse_fractional_k() -> None:
    from openciclo.evaluation.mcphases import _parse_candidate_id

    parsed = _parse_candidate_id("v0.shrinkage.median.k2.5.laplace")
    assert parsed["shrinkage_k"] == 2.5
    assert parsed["length_family"] == "laplace"
    blended = _parse_candidate_id("v0.shrinkage.median.k2.blend0.25.laplace")
    assert blended["blend_last"] == 0.25


def test_select_winner_keeps_median_when_no_gain() -> None:
    summary = pd.DataFrame(
        [
            {
                "model_id": "v0.baseline.median",
                "subgroup": "all",
                "n": 10,
                "mae": 3.0,
                "coverage_80": 0.80,
            },
            {
                "model_id": "v0.shrinkage.median.k2.lognormal",
                "subgroup": "all",
                "n": 10,
                "mae": 2.99,
                "coverage_80": 0.80,
            },
        ]
    )
    winner = select_winner(summary)
    assert winner["point_estimator"] == "median"


def test_select_winner_adopts_shrinkage_when_it_wins() -> None:
    summary = pd.DataFrame(
        [
            {
                "model_id": "v0.baseline.median",
                "subgroup": "all",
                "n": 40,
                "mae": 4.0,
                "coverage_80": 0.82,
            },
            {
                "model_id": "v0.shrinkage.median.k2.lognormal",
                "subgroup": "all",
                "n": 40,
                "mae": 3.2,
                "coverage_80": 0.80,
            },
        ]
    )
    winner = select_winner(summary)
    assert winner["point_estimator"] == "shrinkage"
    assert winner["length_family"] == "lognormal"
    assert winner["shrinkage_k"] == 2.0


def test_select_winner_prefers_simpler_within_mae_eps() -> None:
    summary = pd.DataFrame(
        [
            {
                "model_id": "v0.baseline.median",
                "subgroup": "all",
                "n": 130,
                "mae": 4.05,
                "coverage_80": 0.62,
            },
            {
                "model_id": "v0.shrinkage.median.k2.laplace",
                "subgroup": "all",
                "n": 130,
                "mae": 3.51,
                "coverage_80": 0.71,
            },
            {
                "model_id": "v0.shrinkage.median.k3.clip8.laplace",
                "subgroup": "all",
                "n": 130,
                "mae": 3.49,
                "coverage_80": 0.69,
            },
        ]
    )
    winner = select_winner(summary)
    assert winner["model_id"] == "v0.shrinkage.median.k2.laplace"


def test_select_winner_picks_best_k_among_plain_shrinkage() -> None:
    summary = pd.DataFrame(
        [
            {
                "model_id": "v0.baseline.median",
                "subgroup": "all",
                "n": 130,
                "mae": 4.02,
                "coverage_80": 0.73,
            },
            {
                "model_id": "v0.shrinkage.median.k1.laplace",
                "subgroup": "all",
                "n": 130,
                "mae": 3.54,
                "coverage_80": 0.77,
            },
            {
                "model_id": "v0.shrinkage.median.k2.laplace",
                "subgroup": "all",
                "n": 130,
                "mae": 3.50,
                "coverage_80": 0.78,
            },
        ]
    )
    winner = select_winner(summary)
    assert winner["shrinkage_k"] == 2.0
