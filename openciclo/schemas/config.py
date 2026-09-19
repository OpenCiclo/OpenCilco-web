# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from pydantic import BaseModel, ConfigDict, Field, field_validator

from openciclo.constants import (
    DEFAULT_INTERVAL_COVERAGE,
    DEFAULT_LENGTH_FAMILY,
    DEFAULT_LOGNORMAL_SIGMA,
    DEFAULT_RECENCY_LAMBDA,
    DEFAULT_ROLLING_WINDOW,
    DEFAULT_SHRINKAGE_K,
    INCOMPLETE_HISTORY_DAYS,
    MAX_CYCLE_LENGTH,
    MIN_CYCLE_LENGTH,
    MIN_LAPLACE_SCALE,
    PLACEHOLDER_PRIOR_MAD,
    PLACEHOLDER_PRIOR_MEAN,
    PLACEHOLDER_PRIOR_MEDIAN,
    PROBABILITY_WINDOWS,
    SUSPICIOUS_LONG_DAYS,
    SUSPICIOUS_SHORT_DAYS,
    UNUSUAL_LONG_DAYS,
    UNUSUAL_SHORT_DAYS,
)


class ForecastConfig(BaseModel):
    """Runtime knobs. Changing them changes the model configuration identity."""

    model_config = ConfigDict(extra="forbid")

    min_cycle_length: int = MIN_CYCLE_LENGTH
    max_cycle_length: int = MAX_CYCLE_LENGTH
    unusual_short_days: int = UNUSUAL_SHORT_DAYS
    unusual_long_days: int = UNUSUAL_LONG_DAYS
    suspicious_short_days: int = SUSPICIOUS_SHORT_DAYS
    suspicious_long_days: int = SUSPICIOUS_LONG_DAYS
    incomplete_history_days: int = INCOMPLETE_HISTORY_DAYS
    rolling_window: int = DEFAULT_ROLLING_WINDOW
    recency_lambda: float = Field(default=DEFAULT_RECENCY_LAMBDA, gt=0.0, le=1.0)
    min_laplace_scale: float = Field(default=MIN_LAPLACE_SCALE, gt=0.0)
    probability_windows: tuple[int, ...] = PROBABILITY_WINDOWS
    interval_coverage: float = Field(default=DEFAULT_INTERVAL_COVERAGE, gt=0.0, lt=1.0)
    low_uncertainty_max_scale: float = 2.0
    low_uncertainty_min_cycles: int = 6
    high_uncertainty_min_scale: float = 5.0
    high_uncertainty_max_cycles: int = 2
    shrinkage_k: float = Field(default=DEFAULT_SHRINKAGE_K, gt=0.0)
    blend_last: float = Field(default=0.0, ge=0.0, le=1.0)
    personal_clip_radius: float | None = Field(default=None, gt=0.0)
    length_family: str = DEFAULT_LENGTH_FAMILY
    lognormal_sigma: float = Field(default=DEFAULT_LOGNORMAL_SIGMA, gt=0.0)
    laplace_asymmetry: float = Field(default=1.0, gt=0.0)
    empirical_probabilities: tuple[float, ...] | None = None

    @field_validator("length_family")
    @classmethod
    def _known_length_family(cls, value: str) -> str:
        allowed = {"laplace", "lognormal", "empirical", "asymmetric_laplace"}
        if value not in allowed:
            raise ValueError(f"length_family must be one of {sorted(allowed)}")
        return value


class PopulationPrior(BaseModel):
    model_config = ConfigDict(extra="forbid")

    median_length: float
    mad_length: float
    mean_length: float
    n_users: int = 0
    n_cycles: int = 0
    source: str = "literature_placeholder"


def literature_placeholder_prior() -> PopulationPrior:
    """Documented convenience prior. Not fitted on OpenCiclo users or this repo's data."""

    return PopulationPrior(
        median_length=PLACEHOLDER_PRIOR_MEDIAN,
        mad_length=PLACEHOLDER_PRIOR_MAD,
        mean_length=PLACEHOLDER_PRIOR_MEAN,
        n_users=0,
        n_cycles=0,
        source="literature_placeholder",
    )
