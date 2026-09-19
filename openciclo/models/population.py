# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from collections.abc import Sequence

import numpy as np

from openciclo.schemas.config import PopulationPrior, literature_placeholder_prior


def fit_population_prior(
    length_lists: Sequence[Sequence[int]],
    *,
    source: str = "synthetic_train",
) -> PopulationPrior:
    """Fit a prior from *training* users only. Never pass held-out users."""

    values = np.array([length for row in length_lists for length in row], dtype=np.float64)
    if values.size == 0:
        return literature_placeholder_prior()
    median = float(np.median(values))
    mad = float(np.median(np.abs(values - median)))
    if mad < 1e-9:
        mad = 1.0
    return PopulationPrior(
        median_length=median,
        mad_length=mad,
        mean_length=float(np.mean(values)),
        n_users=len(length_lists),
        n_cycles=int(values.size),
        source=source,
    )
