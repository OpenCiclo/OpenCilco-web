# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

import pytest

from openciclo import predict
from openciclo.constants import SYNTHETIC_DATA_NOTICE
from openciclo.schemas.enums import SymptomIntensity
from openciclo.schemas.observations import DailyObservation


def test_one_date_produces_forecast() -> None:
    forecast = predict([date(2026, 7, 30)], reference_date=date(2026, 7, 30), model="median")
    assert forecast.most_likely_date > date(2026, 7, 30)
    assert forecast.uncertainty.value == "high"
    total = sum(item.probability for item in forecast.daily_probabilities)
    assert abs(total - 1.0) < 1e-8
    assert forecast.observations_used is False


def test_two_and_three_dates() -> None:
    two = predict(
        [date(2026, 7, 1), date(2026, 7, 30)],
        reference_date=date(2026, 7, 30),
        model="last_cycle",
    )
    assert two.most_likely_cycle_length == 29
    three = predict(
        [date(2026, 5, 2), date(2026, 6, 1), date(2026, 6, 29)],
        reference_date=date(2026, 6, 29),
        model="median",
    )
    assert three.most_likely_cycle_length in {28, 29, 30}
    assert three.probability_within_n_days_of_point[2] > 0.0


def test_observations_are_ignored_by_v0() -> None:
    history = [date(2026, 5, 2), date(2026, 6, 1), date(2026, 6, 29)]
    obs = [
        DailyObservation(
            date=date(2026, 6, 28),
            cramps=SymptomIntensity.SEVERE,
        )
    ]
    with_obs = predict(history, observations=obs, reference_date=date(2026, 6, 29), model="mean")
    without = predict(history, reference_date=date(2026, 6, 29), model="mean")
    assert with_obs.most_likely_date == without.most_likely_date
    assert with_obs.observations_used is False
    assert any("not used by V0" in note for note in with_obs.notes)


def test_duplicate_history_raises() -> None:
    with pytest.raises(ValueError, match="Duplicate"):
        predict([date(2026, 6, 1), date(2026, 6, 1)], model="median")


def test_disclaimer_present() -> None:
    forecast = predict([date(2026, 6, 1)], model="population_prior")
    assert any("not a medical device" in note.lower() for note in forecast.notes)


def test_synthetic_notice_constant() -> None:
    assert "NON-PRODUCTION" in SYNTHETIC_DATA_NOTICE
