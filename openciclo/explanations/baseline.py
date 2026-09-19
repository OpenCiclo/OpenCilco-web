# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from openciclo.schemas.enums import FeatureImportance
from openciclo.schemas.forecast import ForecastDriver


def baseline_drivers(
    *,
    model_id: str,
    used_prior: bool,
    n_lengths: int,
    elapsed_days: int,
) -> list[ForecastDriver]:
    """Structured contributors. These are not causal claims about menstruation."""

    drivers: list[ForecastDriver] = []
    if used_prior or n_lengths == 0:
        drivers.append(
            ForecastDriver(
                feature="population_prior",
                importance=FeatureImportance.HIGH,
                note=(
                    "Personal completed cycles were insufficient; the population prior contributed."
                ),
            )
        )
    if n_lengths >= 1 and "population_prior" not in model_id:
        importance = FeatureImportance.HIGH if n_lengths >= 3 else FeatureImportance.MEDIUM
        feature = (
            "recent_cycle_lengths"
            if "last" in model_id or "rolling" in model_id or "recency" in model_id
            else "historical_cycle_lengths"
        )
        drivers.append(
            ForecastDriver(
                feature=feature,
                importance=importance,
                note="Contributed to the predicted cycle length.",
            )
        )
    if n_lengths >= 2:
        drivers.append(
            ForecastDriver(
                feature="cycle_variability",
                importance=FeatureImportance.MEDIUM,
                note="Residual spread contributed to the uncertainty of the forecast.",
            )
        )
    drivers.append(
        ForecastDriver(
            feature="current_cycle_day",
            importance=FeatureImportance.HIGH if elapsed_days > 0 else FeatureImportance.MEDIUM,
            note=(
                "The time elapsed since the last recorded period start "
                "contributed to the dated forecast."
            ),
        )
    )
    return drivers
