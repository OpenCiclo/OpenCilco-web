# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from openciclo.schemas.consent import Consent
from openciclo.schemas.cycle import PeriodStart
from openciclo.schemas.forecast import Forecast
from openciclo.schemas.observations import DailyObservation


def test_consent_defaults_are_opt_out() -> None:
    consent = Consent()
    assert consent.sync_consent is False
    assert consent.research_consent is False
    assert consent.telemetry_consent is False


def test_forecast_roundtrip_json() -> None:
    from openciclo import predict

    forecast = predict(
        [date(2026, 5, 2), date(2026, 6, 1), date(2026, 6, 29)],
        reference_date=date(2026, 6, 29),
        model="median",
    )
    payload = forecast.model_dump(mode="json")
    restored = Forecast.model_validate(payload)
    assert restored.most_likely_date == forecast.most_likely_date
    assert restored.model_id == forecast.model_id
    assert "cycle_length_distribution" in payload
    assert "drivers" in payload


def test_daily_observation_optional_fields() -> None:
    obs = DailyObservation(date=date(2026, 6, 2))
    assert obs.cramps is None
    assert obs.bbt_celsius is None


def test_period_start_defaults_observed() -> None:
    start = PeriodStart(date=date(2026, 6, 1))
    assert start.status.value == "observed"
    assert start.source == "user"
