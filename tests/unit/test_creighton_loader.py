# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date
from pathlib import Path

import pytest

from openciclo.constants import CREIGHTON_DATA_NOTICE
from openciclo.data.creighton import (
    age_band,
    creighton_csv_available,
    load_creighton_series,
    parse_creighton_date,
)
from openciclo.evaluation.creighton import selected_candidates
from openciclo.evaluation.mcphases import run_loo_benchmark
from openciclo.schemas.config import ForecastConfig

FIXTURE = Path(__file__).resolve().parents[1] / "fixtures" / "creighton_tiny.csv"


def test_parse_two_digit_year() -> None:
    assert parse_creighton_date("5/21/03") == date(2003, 5, 21)
    assert parse_creighton_date("6/9/90") == date(1990, 6, 9)


def test_age_bands() -> None:
    assert age_band(22) == "age_18_24"
    assert age_band(28) == "age_25_29"
    assert age_band(33) == "age_30_34"
    assert age_band(40) == "age_35_40"


def test_fixture_loads_period_starts() -> None:
    series = load_creighton_series(FIXTURE)
    by_id = {item.person_id: item for item in series}
    assert set(by_id) == {"88001", "88002", "88004"}
    assert by_id["88001"].cycle_lengths == [28, 28]
    assert by_id["88002"].cycle_lengths == [30]
    assert by_id["88001"].subgroup == "age_25_29"
    # Single-start person 88003 is skipped (no completed cycle to score).
    assert "88003" not in by_id
    # Missing cycle numbers start a new series; do not treat the gap as one long cycle.
    jumped = [item for item in series if item.person_id == "88004"]
    assert len(jumped) == 2
    assert jumped[0].cycle_lengths == [28]
    assert jumped[1].cycle_lengths == [28]
    assert jumped[0].user_id != jumped[1].user_id


def test_loo_on_fixture() -> None:
    series = load_creighton_series(FIXTURE)
    candidates = [
        ("median", "v0.baseline.median", ForecastConfig()),
        ("shrinkage", "v0.shrinkage.median.k2.laplace", ForecastConfig(shrinkage_k=2.0)),
    ]
    rows, summary = run_loo_benchmark(
        series,
        candidates=candidates,
        prior_location="person_median",
        notice=CREIGHTON_DATA_NOTICE,
        prior_source="fixture",
    )
    assert not rows.empty
    assert set(summary[summary["subgroup"] == "all"]["model_id"]) == {
        "v0.baseline.median",
        "v0.shrinkage.median.k2.laplace",
    }
    # 88001: 2 forecasts; 88002: 1; 88004: 1 per contiguous run (2). Independent people.
    assert int(summary[summary["subgroup"] == "all"]["n"].iloc[0]) == 5


def test_core_grid_excludes_blend_and_clip() -> None:
    tags = [tag for _, tag, _ in selected_candidates("core")]
    assert any(tag.startswith("v0.baseline.") for tag in tags)
    assert "v0.shrinkage.median.k2.laplace" in tags
    assert not any(".blend" in tag or ".clip" in tag for tag in tags)


@pytest.mark.skipif(
    not creighton_csv_available(), reason="Creighton CSV not present (expected in CI)"
)
def test_real_creighton_loader_has_people() -> None:
    series = load_creighton_series()
    assert len(series) >= 2
