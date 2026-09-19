# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

import math
from collections.abc import Sequence

import numpy as np
from numpy.typing import NDArray

from openciclo.constants import PMF_FLOOR
from openciclo.schemas.config import ForecastConfig, PopulationPrior
from openciclo.schemas.enums import UncertaintyLevel
from openciclo.schemas.forecast import LengthDistribution


def _logsumexp(values: NDArray[np.float64]) -> float:
    maximum = float(np.max(values))
    return maximum + float(np.log(np.sum(np.exp(values - maximum))))


def estimate_scale(
    lengths: NDArray[np.floating],
    point: float,
    prior: PopulationPrior,
    min_scale: float,
) -> float:
    if lengths.size < 2:
        return max(float(prior.mad_length), min_scale)
    mad = float(np.median(np.abs(lengths - point)))
    if mad < 1e-9:
        return min_scale
    return max(mad / math.log(2.0), min_scale)


def discrete_laplace_pmf(
    center: float,
    scale: float,
    support: NDArray[np.integer],
) -> NDArray[np.float64]:
    """Normalized discrete Laplace on an integer support. V0 assumption, not a biological law."""

    safe_scale = max(float(scale), 1e-6)
    log_mass = -np.abs(support.astype(np.float64) - float(center)) / safe_scale
    log_mass = log_mass - _logsumexp(log_mass)
    pmf = np.exp(log_mass)
    pmf = np.clip(pmf, 0.0, 1.0)
    total = float(pmf.sum())
    if total <= 0.0:
        pmf = np.full(support.shape, 1.0 / support.size, dtype=np.float64)
    else:
        pmf = pmf / total
    return pmf.astype(np.float64)


def discrete_asymmetric_laplace_pmf(
    center: float,
    scale: float,
    asymmetry: float,
    support: NDArray[np.integer],
) -> NDArray[np.float64]:
    """Laplace with different left/right scales. asymmetry = b_right / b_left."""

    safe_scale = max(float(scale), 1e-6)
    ratio = max(float(asymmetry), 1e-6)
    left = safe_scale / math.sqrt(ratio)
    right = safe_scale * math.sqrt(ratio)
    delta = support.astype(np.float64) - float(center)
    log_mass = np.where(delta < 0.0, delta / left, -delta / right)
    log_mass = log_mass - _logsumexp(log_mass)
    pmf = np.exp(log_mass)
    total = float(pmf.sum())
    if total <= 0.0:
        return np.full(support.shape, 1.0 / support.size, dtype=np.float64)
    return (pmf / total).astype(np.float64)


def discrete_lognormal_pmf(
    median: float,
    sigma: float,
    support: NDArray[np.integer],
) -> NDArray[np.float64]:
    """Discrete log-normal with the given median. V0.1 candidate, not a biological law."""

    safe_sigma = max(float(sigma), 1e-6)
    safe_median = max(float(median), 1.0)
    values = np.maximum(support.astype(np.float64), 1.0)
    log_resid = np.log(values) - math.log(safe_median)
    log_mass = -np.log(values) - 0.5 * (log_resid / safe_sigma) ** 2
    log_mass = log_mass - _logsumexp(log_mass)
    pmf = np.exp(log_mass)
    total = float(pmf.sum())
    if total <= 0.0:
        return np.full(support.shape, 1.0 / support.size, dtype=np.float64)
    return (pmf / total).astype(np.float64)


def fit_empirical_pmf(
    lengths: Sequence[float] | NDArray[np.floating],
    *,
    min_length: int,
    max_length: int,
    alpha: float = 0.5,
) -> list[float]:
    """Laplace-smoothed histogram on the integer support. Train lengths only."""

    support_n = max_length - min_length + 1
    hist = np.full(support_n, float(alpha), dtype=np.float64)
    for raw in np.asarray(lengths, dtype=np.float64).tolist():
        length = int(round(float(raw)))
        if min_length <= length <= max_length:
            hist[length - min_length] += 1.0
    total = float(hist.sum())
    if total <= 0.0:
        return [1.0 / support_n for _ in range(support_n)]
    hist = hist / total
    return [float(x) for x in hist.tolist()]


def fit_lognormal_sigma(lengths: Sequence[float] | NDArray[np.floating]) -> float:
    values = np.asarray(lengths, dtype=np.float64)
    values = values[values > 0]
    if values.size < 2:
        return 0.18
    logs = np.log(values)
    mad = float(np.median(np.abs(logs - np.median(logs))))
    if mad < 1e-9:
        return 0.18
    return max(mad / 0.6745, 0.05)


def shift_empirical_pmf(
    base: NDArray[np.float64],
    support: NDArray[np.integer],
    *,
    target_median: float,
) -> NDArray[np.float64]:
    """Roll a population histogram so its discrete median matches the point forecast."""

    if base.size != support.size:
        raise ValueError("empirical PMF length must match the support")
    current = _discrete_median(support, base)
    shift = int(round(float(target_median) - current))
    rolled = np.zeros_like(base)
    for i, mass in enumerate(base):
        j = i + shift
        if 0 <= j < base.size:
            rolled[j] += mass
        elif j < 0:
            rolled[0] += mass
        else:
            rolled[-1] += mass
    total = float(rolled.sum())
    if total <= 0.0:
        return np.full(base.shape, 1.0 / base.size, dtype=np.float64)
    return (rolled / total).astype(np.float64)


def _discrete_median(support: NDArray[np.integer], pmf: NDArray[np.float64]) -> float:
    cdf = np.cumsum(pmf)
    index = int(np.searchsorted(cdf, 0.5, side="left"))
    index = min(max(index, 0), support.size - 1)
    return float(support[index])


def length_distribution(
    point: float,
    scale: float,
    config: ForecastConfig,
) -> LengthDistribution:
    support = np.arange(config.min_cycle_length, config.max_cycle_length + 1, dtype=int)
    family = config.length_family
    if family == "lognormal":
        pmf = discrete_lognormal_pmf(point, config.lognormal_sigma, support)
        assumption = "v0_discrete_lognormal"
    elif family == "asymmetric_laplace":
        pmf = discrete_asymmetric_laplace_pmf(point, scale, config.laplace_asymmetry, support)
        assumption = "v0_asymmetric_laplace"
    elif family == "empirical":
        if not config.empirical_probabilities:
            pmf = discrete_laplace_pmf(point, scale, support)
            assumption = "v0_discrete_laplace"
        else:
            pmf = shift_empirical_pmf(
                np.asarray(config.empirical_probabilities, dtype=np.float64),
                support,
                target_median=point,
            )
            assumption = "v0_empirical_shifted"
    else:
        pmf = discrete_laplace_pmf(point, scale, support)
        assumption = "v0_discrete_laplace"
    return LengthDistribution(
        support_days=[int(x) for x in support.tolist()],
        probabilities=[float(x) for x in pmf.tolist()],
        point_estimate=float(point),
        scale=float(scale),
        assumption=assumption,
    )


def pmf_lookup(distribution: LengthDistribution, length_days: int) -> float:
    mapping = dict(zip(distribution.support_days, distribution.probabilities, strict=True))
    return float(mapping.get(length_days, PMF_FLOOR))


def most_likely_length(distribution: LengthDistribution) -> int:
    probs = np.asarray(distribution.probabilities, dtype=np.float64)
    index = int(np.argmax(probs))
    return int(distribution.support_days[index])


def central_interval(
    distribution: LengthDistribution,
    coverage: float,
) -> tuple[int, int]:
    support = np.asarray(distribution.support_days, dtype=int)
    pmf = np.asarray(distribution.probabilities, dtype=np.float64)
    tail = (1.0 - coverage) / 2.0
    cdf = np.cumsum(pmf)
    lower_i = int(np.searchsorted(cdf, tail, side="left"))
    upper_i = int(np.searchsorted(cdf, 1.0 - tail, side="left"))
    last = len(support) - 1
    lower_i = min(max(lower_i, 0), last)
    upper_i = min(max(upper_i, 0), last)
    if upper_i < lower_i:
        upper_i = lower_i
    return int(support[lower_i]), int(support[upper_i])


def probability_within_window(distribution: LengthDistribution, center: int, radius: int) -> float:
    total = 0.0
    for length, prob in zip(distribution.support_days, distribution.probabilities, strict=True):
        if abs(length - center) <= radius:
            total += prob
    return float(min(max(total, 0.0), 1.0))


def uncertainty_label(
    n_lengths: int,
    scale: float,
    used_prior: bool,
    config: ForecastConfig,
) -> UncertaintyLevel:
    if used_prior and n_lengths < 2:
        return UncertaintyLevel.HIGH
    if (
        n_lengths <= config.high_uncertainty_max_cycles
        or scale >= config.high_uncertainty_min_scale
    ):
        return UncertaintyLevel.HIGH
    if n_lengths >= config.low_uncertainty_min_cycles and scale <= config.low_uncertainty_max_scale:
        return UncertaintyLevel.LOW
    return UncertaintyLevel.MEDIUM
