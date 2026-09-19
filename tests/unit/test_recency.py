# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

import numpy as np
import pytest

from openciclo.features.recency import recency_weights, weighted_mean, weighted_median


def test_newest_cycle_has_weight_one() -> None:
    weights = recency_weights(4, 0.9)
    assert weights[-1] == 1.0
    assert weights[0] == pytest.approx(0.9**3)


def test_weighted_median_prefers_recent_when_lambda_small() -> None:
    values = np.array([10.0, 10.0, 40.0])
    weights = recency_weights(3, 0.5)
    assert weighted_median(values, weights) == 40.0
    assert weighted_mean(values, weights) > 20.0
