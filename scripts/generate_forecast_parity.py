# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Dump Python forecast vectors for TypeScript parity tests. Not a model-selection step."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

import numpy as np

from openciclo import predict
from openciclo.artifacts.release import load_released_model
from openciclo.forecasting.distribution import discrete_laplace_pmf, estimate_scale
from openciclo.models.shrinkage import mixed_scale, shrink_toward_prior
from openciclo.schemas.config import ForecastConfig, literature_placeholder_prior

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "tests" / "fixtures" / "forecast_parity.json"


def _forecast_payload(history: list[date], reference: date) -> dict[str, object]:
    forecast = predict(history, reference_date=reference)
    dist = forecast.cycle_length_distribution
    return {
        "history": [day.isoformat() for day in history],
        "reference_date": reference.isoformat(),
        "most_likely_date": forecast.most_likely_date.isoformat(),
        "most_likely_cycle_length": forecast.most_likely_cycle_length,
        "uncertainty": forecast.uncertainty.value,
        "model_id": forecast.model_id,
        "model_version": forecast.model_version,
        "probability_within_next_n_days": {
            str(k): v for k, v in forecast.probability_within_next_n_days.items()
        },
        "probability_within_n_days_of_point": {
            str(k): v for k, v in forecast.probability_within_n_days_of_point.items()
        },
        "daily_probabilities": [
            {"date": item.date.isoformat(), "probability": item.probability}
            for item in forecast.daily_probabilities
        ],
        "point_estimate": dist.point_estimate,
        "scale": dist.scale,
        "assumption": dist.assumption,
        "support_days": dist.support_days,
        "probabilities": dist.probabilities,
        "notes": forecast.notes,
    }


def main() -> None:
    released = load_released_model()
    prior = literature_placeholder_prior()
    config = ForecastConfig(shrinkage_k=2.0)
    support = np.arange(1, 91, dtype=int)
    laplace = discrete_laplace_pmf(28.0, 2.0, support)

    payload = {
        "engine_version": released.engine_version,
        "released_model_id": released.model_id,
        "released_dataset": released.dataset,
        "population_median": released.population_median,
        "population_mad": released.population_mad,
        "population_mean": released.population_mean,
        "shrinkage_k": released.shrinkage_k,
        "length_family": released.length_family,
        "shrinkage_cases": [
            {
                "personal": 22.0,
                "n": 2,
                "k": 2.0,
                "prior_median": prior.median_length,
                "expected": shrink_toward_prior(22.0, 2, prior, config),
            },
            {
                "personal": 22.0,
                "n": 1,
                "k": 2.0,
                "prior_median": prior.median_length,
                "expected": shrink_toward_prior(22.0, 1, prior, config),
            },
            {
                "personal": 22.0,
                "n": 8,
                "k": 2.0,
                "prior_median": prior.median_length,
                "expected": shrink_toward_prior(22.0, 8, prior, config),
            },
        ],
        "mixed_scale_cases": [
            {
                "lengths": [28.0, 28.0, 28.0],
                "point": 28.0,
                "shrinkage_k": 2.0,
                "min_scale": 0.75,
                "prior_median": prior.median_length,
                "prior_mad": prior.mad_length,
                "expected": mixed_scale(
                    [28.0, 28.0, 28.0],
                    28.0,
                    prior,
                    shrinkage_k=2.0,
                    min_scale=0.75,
                ),
            },
            {
                "lengths": [22.0, 30.0, 28.0],
                "point": 28.0,
                "shrinkage_k": 2.0,
                "min_scale": 0.75,
                "prior_median": prior.median_length,
                "prior_mad": prior.mad_length,
                "expected": mixed_scale(
                    [22.0, 30.0, 28.0],
                    28.0,
                    prior,
                    shrinkage_k=2.0,
                    min_scale=0.75,
                ),
            },
        ],
        "estimate_scale_cases": [
            {
                "lengths": [28.0],
                "point": 28.0,
                "min_scale": 0.75,
                "prior_mad": prior.mad_length,
                "expected": estimate_scale(np.array([28.0]), 28.0, prior, 0.75),
            }
        ],
        "laplace_pmf": {
            "center": 28.0,
            "scale": 2.0,
            "support_days": support.tolist(),
            "probabilities": [float(x) for x in laplace.tolist()],
        },
        "forecasts": [
            _forecast_payload([date(2026, 6, 1)], date(2026, 6, 1)),
            _forecast_payload(
                [date(2026, 5, 2), date(2026, 6, 1), date(2026, 6, 29)],
                date(2026, 7, 20),
            ),
            _forecast_payload(
                [date(2026, 1, 1), date(2026, 1, 29), date(2026, 2, 26), date(2026, 3, 26)],
                date(2026, 3, 26),
            ),
            _forecast_payload(
                [date(2025, 11, 1), date(2025, 12, 15), date(2026, 1, 10), date(2026, 3, 1)],
                date(2026, 3, 15),
            ),
        ],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
