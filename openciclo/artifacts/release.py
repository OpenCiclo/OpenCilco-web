# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Aggregate released-model parameters. No microdata."""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path

from pydantic import BaseModel, ConfigDict

from openciclo.constants import (
    DEFAULT_LENGTH_FAMILY,
    DEFAULT_LOGNORMAL_SIGMA,
    DEFAULT_SHRINKAGE_K,
    ENGINE_VERSION,
)
from openciclo.schemas.config import ForecastConfig, PopulationPrior, literature_placeholder_prior

DEFAULT_RELEASE_PATH = Path(__file__).resolve().parent / "released_model.json"
FALLBACK_POINT_ESTIMATOR = "median"


class ReleasedModel(BaseModel):
    """Population parameters published with the engine. Not a personal history."""

    model_config = ConfigDict(extra="forbid")

    model_id: str
    engine_version: str = ENGINE_VERSION
    dataset: str
    n_users: int
    n_cycles: int
    n_series: int = 0
    population_median: float
    population_mad: float
    population_mean: float
    shrinkage_k: float = DEFAULT_SHRINKAGE_K
    blend_last: float = 0.0
    personal_clip_radius: float | None = None
    length_family: str = DEFAULT_LENGTH_FAMILY
    lognormal_mu: float | None = None
    lognormal_sigma: float = DEFAULT_LOGNORMAL_SIGMA
    laplace_asymmetry: float = 1.0
    prior_location: str = "pooled"
    empirical_probabilities: tuple[float, ...] | None = None
    point_estimator: str = FALLBACK_POINT_ESTIMATOR
    selection_mae: float | None = None
    selection_coverage_80: float | None = None
    selection_n: int | None = None
    selection_reason: str = ""

    @property
    def point_estimator_alias(self) -> str:
        if self.point_estimator in {"shrinkage", "shrinkage_median", "v0.shrinkage.median"}:
            return "shrinkage"
        if self.point_estimator in {"shrinkage_mean", "v0.shrinkage.mean"}:
            return "shrinkage_mean"
        if self.point_estimator in {"shrinkage_last", "v0.shrinkage.last"}:
            return "shrinkage_last"
        if self.point_estimator in {
            "shrinkage_recency",
            "shrinkage_recency_median",
            "v0.shrinkage.recency_median",
        }:
            return "shrinkage_recency"
        if self.point_estimator in {"median", "v0.baseline.median"}:
            return "median"
        return self.point_estimator

    def to_population_prior(self) -> PopulationPrior:
        return PopulationPrior(
            median_length=self.population_median,
            mad_length=self.population_mad,
            mean_length=self.population_mean,
            n_users=self.n_users,
            n_cycles=self.n_cycles,
            source=self.dataset,
        )

    def to_forecast_config(self) -> ForecastConfig:
        empirical = self.empirical_probabilities if self.length_family == "empirical" else None
        return ForecastConfig(
            shrinkage_k=self.shrinkage_k,
            blend_last=self.blend_last,
            personal_clip_radius=self.personal_clip_radius,
            length_family=self.length_family,
            lognormal_sigma=self.lognormal_sigma,
            laplace_asymmetry=self.laplace_asymmetry,
            empirical_probabilities=empirical,
        )


def load_released_model(path: Path | None = None) -> ReleasedModel:
    target = path or DEFAULT_RELEASE_PATH
    if path is None:
        return _load_default_released_model()
    return _read_released_model(target)


@lru_cache(maxsize=1)
def _load_default_released_model() -> ReleasedModel:
    return _read_released_model(DEFAULT_RELEASE_PATH)


def _read_released_model(path: Path) -> ReleasedModel:
    if not path.is_file():
        return _placeholder_release()
    payload = json.loads(path.read_text(encoding="utf-8"))
    return ReleasedModel.model_validate(payload)


def write_released_model(model: ReleasedModel, path: Path | None = None) -> Path:
    target = path or DEFAULT_RELEASE_PATH
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(model.model_dump_json(indent=2) + "\n", encoding="utf-8")
    _load_default_released_model.cache_clear()
    return target


def _placeholder_release() -> ReleasedModel:
    prior = literature_placeholder_prior()
    return ReleasedModel(
        model_id="v0.baseline.median",
        dataset=prior.source,
        n_users=0,
        n_cycles=0,
        population_median=prior.median_length,
        population_mad=prior.mad_length,
        population_mean=prior.mean_length,
        point_estimator="median",
        selection_reason="released_model.json missing; using literature placeholder",
    )


def clear_released_model_cache() -> None:
    _load_default_released_model.cache_clear()
