# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from collections.abc import Sequence
from dataclasses import dataclass

import numpy as np
from numpy.typing import NDArray

from openciclo.features.recency import recency_weights, weighted_mean, weighted_median
from openciclo.schemas.config import ForecastConfig, PopulationPrior


@dataclass(frozen=True)
class LengthPoint:
    point: float
    used_prior: bool
    n_lengths: int


class BaselineForecaster:
    """Deterministic point estimator for next cycle length."""

    model_id: str = "v0.baseline"

    def estimate(
        self,
        lengths: Sequence[float] | NDArray[np.floating],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        array = np.asarray(lengths, dtype=np.float64)
        if array.size == 0:
            return LengthPoint(point=float(prior.median_length), used_prior=True, n_lengths=0)
        return self._estimate(array, prior, config)

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        raise NotImplementedError


class LastCycleForecaster(BaselineForecaster):
    model_id = "v0.baseline.last_cycle"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        return LengthPoint(point=float(lengths[-1]), used_prior=False, n_lengths=int(lengths.size))


class MeanForecaster(BaselineForecaster):
    model_id = "v0.baseline.mean"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        return LengthPoint(
            point=float(np.mean(lengths)), used_prior=False, n_lengths=int(lengths.size)
        )


class MedianForecaster(BaselineForecaster):
    model_id = "v0.baseline.median"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        return LengthPoint(
            point=float(np.median(lengths)),
            used_prior=False,
            n_lengths=int(lengths.size),
        )


class RollingMeanForecaster(BaselineForecaster):
    model_id = "v0.baseline.rolling_mean"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        window = lengths[-config.rolling_window :]
        return LengthPoint(
            point=float(np.mean(window)), used_prior=False, n_lengths=int(window.size)
        )


class RollingMedianForecaster(BaselineForecaster):
    model_id = "v0.baseline.rolling_median"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        window = lengths[-config.rolling_window :]
        return LengthPoint(
            point=float(np.median(window)),
            used_prior=False,
            n_lengths=int(window.size),
        )


class RecencyWeightedMeanForecaster(BaselineForecaster):
    model_id = "v0.baseline.recency_weighted_mean"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        weights = recency_weights(int(lengths.size), config.recency_lambda)
        return LengthPoint(
            point=weighted_mean(lengths, weights),
            used_prior=False,
            n_lengths=int(lengths.size),
        )


class RecencyWeightedMedianForecaster(BaselineForecaster):
    model_id = "v0.baseline.recency_weighted_median"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        weights = recency_weights(int(lengths.size), config.recency_lambda)
        return LengthPoint(
            point=weighted_median(lengths, weights),
            used_prior=False,
            n_lengths=int(lengths.size),
        )


class PopulationPriorForecaster(BaselineForecaster):
    model_id = "v0.baseline.population_prior"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        return LengthPoint(
            point=float(prior.median_length),
            used_prior=True,
            n_lengths=int(lengths.size),
        )


FORECASTER_ALIASES: dict[str, type[BaselineForecaster]] = {
    "last": LastCycleForecaster,
    "last_cycle": LastCycleForecaster,
    "v0.baseline.last_cycle": LastCycleForecaster,
    "mean": MeanForecaster,
    "v0.baseline.mean": MeanForecaster,
    "median": MedianForecaster,
    "v0.baseline.median": MedianForecaster,
    "rolling_mean": RollingMeanForecaster,
    "v0.baseline.rolling_mean": RollingMeanForecaster,
    "rolling_median": RollingMedianForecaster,
    "v0.baseline.rolling_median": RollingMedianForecaster,
    "recency_weighted_mean": RecencyWeightedMeanForecaster,
    "v0.baseline.recency_weighted_mean": RecencyWeightedMeanForecaster,
    "recency_weighted_median": RecencyWeightedMedianForecaster,
    "v0.baseline.recency_weighted_median": RecencyWeightedMedianForecaster,
    "population": PopulationPriorForecaster,
    "population_prior": PopulationPriorForecaster,
    "v0.baseline.population_prior": PopulationPriorForecaster,
}

MANDATORY_BASELINE_ALIASES: tuple[str, ...] = (
    "last_cycle",
    "mean",
    "median",
    "rolling_mean",
    "rolling_median",
    "recency_weighted_mean",
    "recency_weighted_median",
    "population_prior",
)


def get_forecaster(name: str) -> BaselineForecaster:
    from openciclo.models.shrinkage import (
        ShrinkageLastForecaster,
        ShrinkageMeanForecaster,
        ShrinkageMedianForecaster,
        ShrinkageRecencyMedianForecaster,
    )

    shrinkage_aliases: dict[str, type[BaselineForecaster]] = {
        "shrinkage": ShrinkageMedianForecaster,
        "shrinkage_median": ShrinkageMedianForecaster,
        "v0.shrinkage.median": ShrinkageMedianForecaster,
        "shrinkage_mean": ShrinkageMeanForecaster,
        "v0.shrinkage.mean": ShrinkageMeanForecaster,
        "shrinkage_last": ShrinkageLastForecaster,
        "v0.shrinkage.last": ShrinkageLastForecaster,
        "shrinkage_recency": ShrinkageRecencyMedianForecaster,
        "shrinkage_recency_median": ShrinkageRecencyMedianForecaster,
        "v0.shrinkage.recency_median": ShrinkageRecencyMedianForecaster,
    }
    if name in shrinkage_aliases:
        return shrinkage_aliases[name]()
    try:
        return FORECASTER_ALIASES[name]()
    except KeyError as exc:
        known = ", ".join(sorted(set(FORECASTER_ALIASES) | set(shrinkage_aliases)))
        raise ValueError(f"Unknown model {name!r}. Known: {known}") from exc
