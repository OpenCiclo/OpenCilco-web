# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

import numpy as np
from numpy.typing import NDArray


def recency_weights(n: int, lam: float) -> NDArray[np.float64]:
    """Weights λ^{age} with age 0 = most recent cycle (last in chronological order)."""

    if n < 0:
        raise ValueError("n must be non-negative")
    if not 0.0 < lam <= 1.0:
        raise ValueError("recency lambda must be in (0, 1]")
    if n == 0:
        return np.array([], dtype=np.float64)
    ages = np.arange(n - 1, -1, -1, dtype=np.float64)
    return np.power(lam, ages)


def weighted_mean(values: NDArray[np.floating], weights: NDArray[np.floating]) -> float:
    total = float(np.sum(weights))
    if total <= 0.0:
        raise ValueError("weights must sum to a positive value")
    return float(np.dot(values, weights) / total)


def weighted_median(values: NDArray[np.floating], weights: NDArray[np.floating]) -> float:
    if values.size == 0:
        raise ValueError("values must be non-empty")
    order = np.argsort(values, kind="mergesort")
    sorted_values = np.asarray(values, dtype=np.float64)[order]
    sorted_weights = np.asarray(weights, dtype=np.float64)[order]
    cumulative = np.cumsum(sorted_weights)
    cutoff = 0.5 * float(np.sum(sorted_weights))
    index = int(np.searchsorted(cumulative, cutoff, side="left"))
    index = min(max(index, 0), len(sorted_values) - 1)
    return float(sorted_values[index])
