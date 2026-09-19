# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Load the Kaggle synthetic cycle-start CSV. Timing only; lifestyle columns unused."""

from __future__ import annotations

import os
from datetime import date
from pathlib import Path

import pandas as pd
from pydantic import BaseModel, ConfigDict

from openciclo.constants import KAGGLE_FACTORS_CSV_ENV
from openciclo.data.creighton import age_band
from openciclo.data.cycles import cycle_lengths

DEFAULT_KAGGLE_FACTORS_CSV = (
    Path(__file__).resolve().parents[2]
    / "training"
    / "dataset-do-not-commit"
    / "menstrual_cycle_dataset_with_factors.csv"
)


class KaggleFactorsSeries(BaseModel):
    """One synthetic user's period starts. Not a human cohort."""

    model_config = ConfigDict(extra="forbid")

    person_id: str
    user_id: str
    subgroup: str
    period_starts: list[date]
    age: int | None = None

    @property
    def cycle_lengths(self) -> list[int]:
        return cycle_lengths(list(self.period_starts))


def default_kaggle_factors_csv() -> Path:
    env = os.environ.get(KAGGLE_FACTORS_CSV_ENV)
    if env:
        return Path(env)
    return DEFAULT_KAGGLE_FACTORS_CSV


def kaggle_factors_csv_available(path: Path | None = None) -> bool:
    return (path or default_kaggle_factors_csv()).is_file()


def _to_day(raw: object) -> date:
    return pd.to_datetime(raw).date()


def load_kaggle_factors_series(path: Path | None = None) -> list[KaggleFactorsSeries]:
    csv_path = path or default_kaggle_factors_csv()
    if not csv_path.is_file():
        raise FileNotFoundError(
            f"Kaggle factors CSV not found at {csv_path}. Place "
            f"menstrual_cycle_dataset_with_factors.csv locally or set {KAGGLE_FACTORS_CSV_ENV}."
        )
    frame = pd.read_csv(csv_path)
    required = {"User ID", "Cycle Start Date"}
    missing = required - set(frame.columns)
    if missing:
        raise ValueError(f"Kaggle factors CSV missing columns: {sorted(missing)}")
    frame = frame.dropna(subset=["User ID", "Cycle Start Date"])

    series: list[KaggleFactorsSeries] = []
    for person_id, group in frame.groupby("User ID", sort=True):
        ordered = group.sort_values("Cycle Start Date")
        starts = [_to_day(raw) for raw in ordered["Cycle Start Date"].tolist()]
        if "Next Cycle Start Date" in ordered.columns:
            last_next = ordered["Next Cycle Start Date"].dropna()
            if not last_next.empty:
                extra = _to_day(last_next.iloc[-1])
                if extra not in starts:
                    starts.append(extra)
        starts = sorted(set(starts))
        if len(starts) < 2:
            continue
        age_value: int | None = None
        if "Age" in ordered.columns:
            ages = [int(v) for v in ordered["Age"].tolist() if pd.notna(v)]
            if ages:
                age_value = int(round(float(sum(ages) / len(ages))))
        person = str(int(person_id)) if pd.notna(person_id) else str(person_id)
        series.append(
            KaggleFactorsSeries(
                person_id=person,
                user_id=person,
                subgroup=age_band(age_value) if age_value is not None else "age_unknown",
                period_starts=starts,
                age=age_value,
            )
        )
    return series
