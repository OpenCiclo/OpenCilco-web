# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from collections.abc import Sequence
from datetime import date
from typing import Protocol

import pandas as pd

from openciclo.data.cycles import cycle_lengths
from openciclo.evaluation.metrics import brier_within_k, interval_stats, nll
from openciclo.forecasting.distribution import probability_within_window
from openciclo.forecasting.engine import predict
from openciclo.schemas.config import ForecastConfig, PopulationPrior, literature_placeholder_prior


class WalkForwardSubject(Protocol):
    """Anything with a period-start history. Synthetic users and mcPHASES series both qualify."""

    @property
    def user_id(self) -> str: ...

    @property
    def subgroup(self) -> str: ...

    @property
    def period_starts(self) -> Sequence[date]: ...


class PersonHoldoutSeries(WalkForwardSubject, Protocol):
    """Walk-forward subject plus a person id for leave-one-person-out priors."""

    @property
    def person_id(self) -> str: ...

    @property
    def cycle_lengths(self) -> list[int]: ...


def walk_forward_user(
    user: WalkForwardSubject,
    *,
    model: str,
    prior: PopulationPrior,
    config: ForecastConfig | None = None,
) -> list[dict[str, object]]:
    """Predict each next start using only earlier starts. No future leakage."""

    cfg = config or ForecastConfig()
    starts = list(user.period_starts)
    rows: list[dict[str, object]] = []
    for k in range(1, len(starts)):
        visible = starts[:k]
        actual_next = starts[k]
        last_visible = visible[-1]
        if actual_next in visible:
            raise RuntimeError("Walk-forward leakage: target start was in the history.")
        if max(visible) >= actual_next:
            raise RuntimeError(
                "Walk-forward leakage: history contains a start on or after the target."
            )

        actual_length = (actual_next - last_visible).days
        forecast = predict(
            visible,
            reference_date=last_visible,
            model=model,
            population_prior=prior,
            config=cfg,
        )
        predicted_length = forecast.most_likely_cycle_length
        abs_error = abs(predicted_length - actual_length)
        covered, width, low, high = interval_stats(forecast, actual_length, cfg.interval_coverage)
        p_within_2 = probability_within_window(
            forecast.cycle_length_distribution, predicted_length, 2
        )
        rows.append(
            {
                "user_id": user.user_id,
                "subgroup": user.subgroup,
                "model_id": forecast.model_id,
                "n_starts_visible": k,
                "n_lengths_visible": k - 1,
                "last_start": last_visible.isoformat(),
                "actual_next_start": actual_next.isoformat(),
                "actual_length": actual_length,
                "predicted_length": predicted_length,
                "predicted_date": forecast.most_likely_date.isoformat(),
                "abs_error": abs_error,
                "nll": nll(forecast, actual_length),
                "p_within_2": p_within_2,
                "within_2_hit": int(abs_error <= 2),
                "brier_within_2": brier_within_k(forecast, actual_length, 2),
                "in_interval_80": int(covered),
                "interval_width": width,
                "interval_low": low,
                "interval_high": high,
                "uncertainty": forecast.uncertainty.value,
                "prior_source": prior.source,
                "max_history_start": max(visible).isoformat(),
            }
        )
    return rows


def walk_forward_cohort(
    users: Sequence[WalkForwardSubject],
    *,
    models: Sequence[str],
    prior: PopulationPrior | None = None,
    config: ForecastConfig | None = None,
) -> pd.DataFrame:
    cfg = config or ForecastConfig()
    fitted_prior = prior or literature_placeholder_prior()
    records: list[dict[str, object]] = []
    for user in users:
        if len(user.period_starts) < 2:
            continue
        for model in models:
            records.extend(walk_forward_user(user, model=model, prior=fitted_prior, config=cfg))
    return pd.DataFrame.from_records(records)


def train_lengths(users: Sequence[WalkForwardSubject]) -> list[list[int]]:
    return [cycle_lengths(list(user.period_starts)) for user in users]


def assert_no_future_dates(rows: pd.DataFrame) -> None:
    """Guard used in tests: history max start is strictly before the actual next start."""

    for _, row in rows.iterrows():
        history_max = date.fromisoformat(str(row["max_history_start"]))
        actual = date.fromisoformat(str(row["actual_next_start"]))
        if history_max >= actual:
            raise AssertionError(
                f"Leakage for {row['user_id']}: history {history_max} is not before {actual}."
            )
