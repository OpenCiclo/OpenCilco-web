# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from collections.abc import Sequence
from datetime import date, timedelta

import numpy as np

from openciclo.artifacts.release import load_released_model
from openciclo.constants import ENGINE_VERSION
from openciclo.data.cycles import cycle_lengths
from openciclo.data.validation import validate_history, validate_observations
from openciclo.explanations.baseline import baseline_drivers
from openciclo.forecasting.distribution import (
    estimate_scale,
    length_distribution,
    most_likely_length,
    probability_within_window,
    uncertainty_label,
)
from openciclo.models.baselines import get_forecaster
from openciclo.models.shrinkage import mixed_scale
from openciclo.schemas.config import ForecastConfig, PopulationPrior
from openciclo.schemas.cycle import PeriodHistory, PeriodStart
from openciclo.schemas.enums import IssueSeverity
from openciclo.schemas.forecast import DailyProbability, Forecast, LengthDistribution
from openciclo.schemas.observations import DailyObservation


def predict(
    history: PeriodHistory | Sequence[PeriodStart] | Sequence[date],
    observations: Sequence[DailyObservation] | None = None,
    reference_date: date | None = None,
    *,
    model: str | None = None,
    population_prior: PopulationPrior | None = None,
    config: ForecastConfig | None = None,
) -> Forecast:
    """Forecast next period start from period-start history.

    Defaults load aggregate parameters from ``openciclo/artifacts/released_model.json``.
    ``observations`` are accepted for API stability but are not used by V0 models.
    """

    released = load_released_model()
    cfg = config or released.to_forecast_config()
    prior = population_prior or released.to_population_prior()
    model_name = model or released.point_estimator_alias
    period_history = _coerce_history(history)
    issues = validate_history(period_history, reference_date=reference_date, config=cfg)
    errors = [issue for issue in issues if issue.severity is IssueSeverity.ERROR]
    if errors:
        joined = "; ".join(issue.message for issue in errors)
        raise ValueError(joined)

    if observations:
        issues = issues + validate_observations(list(observations), reference_date=reference_date)

    starts = period_history.ordered_dates()
    last_start = starts[-1]
    ref = reference_date or last_start
    lengths = np.asarray(cycle_lengths(starts), dtype=np.float64)

    forecaster = get_forecaster(model_name)
    point_est = forecaster.estimate(lengths, prior, cfg)
    if "shrinkage" in forecaster.model_id:
        scale = mixed_scale(
            lengths,
            point_est.point,
            prior,
            shrinkage_k=cfg.shrinkage_k,
            min_scale=cfg.min_laplace_scale,
        )
    else:
        scale = estimate_scale(lengths, point_est.point, prior, cfg.min_laplace_scale)
    distribution = length_distribution(point_est.point, scale, cfg)
    modal_length = most_likely_length(distribution)

    elapsed = (ref - last_start).days
    daily, display_mode_date, display_mode_length = _dates_from_lengths(
        last_start=last_start,
        reference_date=ref,
        distribution=distribution,
        config=cfg,
    )
    within_next = {
        window: _probability_from(ref, daily, window) for window in cfg.probability_windows
    }
    within_of_point = {
        window: probability_within_window(distribution, modal_length, window)
        for window in cfg.probability_windows
    }

    notes = [
        "Ciclo provides cycle forecasts. Forecasts can be wrong. Ciclo is not a medical "
        "device, diagnosis system, or contraceptive method."
    ]
    if observations:
        notes.append("Optional observations were provided but are not used by V0 baseline models.")
    if point_est.used_prior:
        notes.append(
            f"Personal history had {int(lengths.size)} completed cycle(s); "
            f"the {prior.source} population prior contributed to the point forecast."
        )
    if elapsed >= cfg.incomplete_history_days:
        notes.append(
            "A long gap since the last recorded period may mean a missed log. "
            "Missing data is treated as unknown, not as a confirmed negative."
        )

    return Forecast(
        most_likely_date=display_mode_date,
        most_likely_cycle_length=display_mode_length,
        daily_probabilities=daily,
        probability_within_next_n_days=within_next,
        probability_within_n_days_of_point=within_of_point,
        uncertainty=uncertainty_label(
            n_lengths=int(lengths.size),
            scale=scale,
            used_prior=point_est.used_prior,
            config=cfg,
        ),
        cycle_length_distribution=distribution,
        drivers=baseline_drivers(
            model_id=forecaster.model_id,
            used_prior=point_est.used_prior,
            n_lengths=int(lengths.size),
            elapsed_days=max(elapsed, 0),
        ),
        model_id=forecaster.model_id,
        model_version=ENGINE_VERSION,
        reference_date=ref,
        last_period_start=last_start,
        notes=notes,
        quality_issues=issues,
        observations_used=False,
    )


def _coerce_history(
    history: PeriodHistory | Sequence[PeriodStart] | Sequence[date],
) -> PeriodHistory:
    if isinstance(history, PeriodHistory):
        return history
    items = list(history)
    if not items:
        raise ValueError("At least one period start date is required.")
    if isinstance(items[0], PeriodStart):
        return PeriodHistory(starts=list(items))  # type: ignore[arg-type]
    return PeriodHistory(starts=[PeriodStart(date=day) for day in items])  # type: ignore[arg-type]


def _dates_from_lengths(
    *,
    last_start: date,
    reference_date: date,
    distribution: LengthDistribution,
    config: ForecastConfig,
) -> tuple[list[DailyProbability], date, int]:
    """Map length PMF to calendar dates. Past dates are dropped for display only."""

    elapsed = (reference_date - last_start).days
    min_k = max(config.min_cycle_length, elapsed)
    rows: list[tuple[int, date, float]] = []
    for length, prob in zip(distribution.support_days, distribution.probabilities, strict=True):
        if length < min_k:
            continue
        rows.append((length, last_start + timedelta(days=length), prob))

    if not rows:
        span = config.max_cycle_length - config.min_cycle_length + 1
        extra_support = list(range(min_k, min_k + span))
        uniform = 1.0 / len(extra_support)
        rows = [(length, last_start + timedelta(days=length), uniform) for length in extra_support]

    total = sum(prob for _, _, prob in rows)
    if total <= 0.0:
        uniform = 1.0 / len(rows)
        daily = [DailyProbability(date=day, probability=uniform) for _, day, _ in rows]
    else:
        daily = [
            DailyProbability(date=day, probability=float(prob / total)) for _, day, prob in rows
        ]

    best_index = int(np.argmax([item.probability for item in daily]))
    best_date = daily[best_index].date
    best_length = (best_date - last_start).days
    return daily, best_date, best_length


def _probability_from(
    reference_date: date,
    daily: list[DailyProbability],
    window_days: int,
) -> float:
    end = reference_date + timedelta(days=window_days)
    total = 0.0
    for item in daily:
        if reference_date <= item.date <= end:
            total += item.probability
    return float(min(max(total, 0.0), 1.0))
