# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from openciclo.schemas.cycle import QualityIssue
from openciclo.schemas.enums import FeatureImportance, UncertaintyLevel


class ForecastDriver(BaseModel):
    model_config = ConfigDict(extra="forbid")

    feature: str
    importance: FeatureImportance
    note: str | None = None


class DailyProbability(BaseModel):
    model_config = ConfigDict(extra="forbid")

    date: date
    probability: float = Field(ge=0.0, le=1.0)


class LengthDistribution(BaseModel):
    """Discrete distribution over cycle length in whole days."""

    model_config = ConfigDict(extra="forbid")

    support_days: list[int]
    probabilities: list[float]
    point_estimate: float
    scale: float
    assumption: str = "v0_discrete_laplace"


class Forecast(BaseModel):
    model_config = ConfigDict(extra="forbid")

    most_likely_date: date
    most_likely_cycle_length: int
    daily_probabilities: list[DailyProbability]
    probability_within_next_n_days: dict[int, float]
    probability_within_n_days_of_point: dict[int, float]
    uncertainty: UncertaintyLevel
    cycle_length_distribution: LengthDistribution
    drivers: list[ForecastDriver]
    model_id: str
    model_version: str
    reference_date: date
    last_period_start: date
    notes: list[str] = Field(default_factory=list)
    quality_issues: list[QualityIssue] = Field(default_factory=list)
    observations_used: bool = False
