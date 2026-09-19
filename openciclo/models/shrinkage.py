# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from collections.abc import Sequence

import numpy as np
from numpy.typing import NDArray

from openciclo.features.recency import recency_weights, weighted_median
from openciclo.forecasting.distribution import estimate_scale
from openciclo.models.baselines import BaselineForecaster, LengthPoint
from openciclo.schemas.config import ForecastConfig, PopulationPrior


def shrink_toward_prior(
    personal: float,
    n: int,
    prior: PopulationPrior,
    config: ForecastConfig,
) -> float:
    weight = n / (n + float(config.shrinkage_k)) if n + config.shrinkage_k else 0.0
    point = weight * personal + (1.0 - weight) * float(prior.median_length)
    return _clip_personal(point, prior, config)


def _clip_personal(value: float, prior: PopulationPrior, config: ForecastConfig) -> float:
    radius = config.personal_clip_radius
    if radius is None:
        return value
    center = float(prior.median_length)
    return min(max(value, center - radius), center + radius)


def _blend_last(personal: float, lengths: NDArray[np.float64], config: ForecastConfig) -> float:
    if config.blend_last <= 0.0:
        return personal
    last = float(lengths[-1])
    return (1.0 - config.blend_last) * personal + config.blend_last * last


class ShrinkageMedianForecaster(BaselineForecaster):
    """Personal median shrunk toward the population prior. Empirical Bayes, not a neural net."""

    model_id = "v0.shrinkage.median"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        n = int(lengths.size)
        personal = _blend_last(float(np.median(lengths)), lengths, config)
        personal = _clip_personal(personal, prior, config)
        point = shrink_toward_prior(personal, n, prior, config)
        return LengthPoint(point=point, used_prior=True, n_lengths=n)


class ShrinkageMeanForecaster(BaselineForecaster):
    model_id = "v0.shrinkage.mean"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        n = int(lengths.size)
        personal = _blend_last(float(np.mean(lengths)), lengths, config)
        personal = _clip_personal(personal, prior, config)
        point = shrink_toward_prior(personal, n, prior, config)
        return LengthPoint(point=point, used_prior=True, n_lengths=n)


class ShrinkageLastForecaster(BaselineForecaster):
    """Last cycle damped toward the population prior. Weight uses n=1 so k is the prior strength."""

    model_id = "v0.shrinkage.last"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        personal = _clip_personal(float(lengths[-1]), prior, config)
        point = shrink_toward_prior(personal, 1, prior, config)
        return LengthPoint(point=point, used_prior=True, n_lengths=int(lengths.size))


class ShrinkageRecencyMedianForecaster(BaselineForecaster):
    model_id = "v0.shrinkage.recency_median"

    def _estimate(
        self,
        lengths: NDArray[np.float64],
        prior: PopulationPrior,
        config: ForecastConfig,
    ) -> LengthPoint:
        n = int(lengths.size)
        weights = recency_weights(n, config.recency_lambda)
        personal = _blend_last(weighted_median(lengths, weights), lengths, config)
        personal = _clip_personal(personal, prior, config)
        point = shrink_toward_prior(personal, n, prior, config)
        return LengthPoint(point=point, used_prior=True, n_lengths=n)


def mixed_scale(
    lengths: Sequence[float] | NDArray[np.floating],
    point: float,
    prior: PopulationPrior,
    *,
    shrinkage_k: float,
    min_scale: float,
) -> float:
    array = np.asarray(list(lengths), dtype=np.float64)
    n = int(array.size)
    personal = estimate_scale(array, point, prior, min_scale)
    weight = n / (n + float(shrinkage_k)) if n + shrinkage_k else 0.0
    mixed = weight * personal + (1.0 - weight) * max(float(prior.mad_length), min_scale)
    return max(mixed, min_scale)
