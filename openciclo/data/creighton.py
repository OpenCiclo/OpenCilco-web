# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Load Creighton Model / Utah cycle-start rows into OpenCiclo period-start sequences.

Microdata stay on disk. This module never writes them into git.
"""

from __future__ import annotations

import os
from datetime import date, datetime
from pathlib import Path

import pandas as pd
from pydantic import BaseModel, ConfigDict

from openciclo.constants import CREIGHTON_CSV_ENV
from openciclo.data.cycles import cycle_lengths

DEFAULT_CREIGHTON_CSV = (
    Path(__file__).resolve().parents[2]
    / "training"
    / "dataset-do-not-commit"
    / "CrMcyclelength_share.csv"
)
DATE_FORMAT = "%m/%d/%y"


class CreightonSeries(BaseModel):
    """One person's observed period starts from Creighton charts."""

    model_config = ConfigDict(extra="forbid")

    person_id: str
    user_id: str
    subgroup: str
    period_starts: list[date]
    age: int | None = None

    @property
    def cycle_lengths(self) -> list[int]:
        return cycle_lengths(list(self.period_starts))


def default_creighton_csv() -> Path:
    env = os.environ.get(CREIGHTON_CSV_ENV)
    if env:
        return Path(env)
    return DEFAULT_CREIGHTON_CSV


def creighton_csv_available(path: Path | None = None) -> bool:
    return (path or default_creighton_csv()).is_file()


def parse_creighton_date(raw: str) -> date:
    """Parse M/D/YY chart dates. 90–99 → 1990–1999; 00–12 → 2000–2012 in this cohort."""

    return datetime.strptime(str(raw).strip(), DATE_FORMAT).date()


def age_band(age: int) -> str:
    if age < 25:
        return "age_18_24"
    if age < 30:
        return "age_25_29"
    if age < 35:
        return "age_30_34"
    return "age_35_40"


def _contiguous_start_runs(ordered: pd.DataFrame) -> list[list[date]]:
    """Split when cycle_number is not consecutive. Do not chain across missing charts."""

    runs: list[list[date]] = []
    current: list[date] = []
    prev_number: int | None = None
    seen: set[date] = set()
    for number, raw in zip(
        ordered["cycle_number"].tolist(),
        ordered["cycle_start_date"].tolist(),
        strict=True,
    ):
        cycle_no = int(number)
        day = parse_creighton_date(str(raw))
        if prev_number is not None and cycle_no == prev_number:
            continue
        if prev_number is not None and cycle_no != prev_number + 1:
            if len(current) >= 2:
                runs.append(current)
            current = []
            seen = set()
        if day in seen or (current and day <= current[-1]):
            prev_number = cycle_no
            continue
        seen.add(day)
        current.append(day)
        prev_number = cycle_no
    if len(current) >= 2:
        runs.append(current)
    return runs


def load_creighton_series(path: Path | None = None) -> list[CreightonSeries]:
    csv_path = path or default_creighton_csv()
    if not csv_path.is_file():
        raise FileNotFoundError(
            f"Creighton/Utah CSV not found at {csv_path}. Place CrMcyclelength_share.csv "
            f"locally or set {CREIGHTON_CSV_ENV}."
        )
    frame = pd.read_csv(csv_path)
    required = {"new_id", "cycle_number", "cycle_start_date"}
    missing = required - set(frame.columns)
    if missing:
        raise ValueError(f"Creighton CSV missing columns: {sorted(missing)}")

    series: list[CreightonSeries] = []
    grouped = frame.groupby("new_id", sort=True)
    for person_id, group in grouped:
        ordered = group.sort_values(["cycle_number", "cycle_start_date"])
        age_value: int | None = None
        if "age" in ordered.columns:
            ages = [int(v) for v in ordered["age"].tolist() if pd.notna(v)]
            if ages:
                age_value = int(round(float(sum(ages) / len(ages))))
        person = str(person_id)
        subgroup = age_band(age_value) if age_value is not None else "age_unknown"
        for index, starts in enumerate(_contiguous_start_runs(ordered)):
            series.append(
                CreightonSeries(
                    person_id=person,
                    user_id=f"{person}:seg{index}",
                    subgroup=subgroup,
                    period_starts=starts,
                    age=age_value,
                )
            )
    return series
