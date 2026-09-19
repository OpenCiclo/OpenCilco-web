# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Load mcPHASES self-report rows into OpenCiclo period-start sequences.

Restricted microdata stay on disk. This module never writes them into git.
"""

from __future__ import annotations

import os
from datetime import date, timedelta
from pathlib import Path

import pandas as pd
from pydantic import BaseModel, ConfigDict, Field

from openciclo.constants import MCPHASES_CSV_ENV, MCPHASES_EPOCH, MENSTRUAL_PHASE
from openciclo.data.cycles import cycle_lengths

DEFAULT_MCPHASES_CSV = (
    Path(__file__).resolve().parents[2]
    / "training"
    / "dataset-do-not-commit"
    / "hormones_and_selfreport.csv"
)
# Continue a Menstrual run across a single missing study day (gap of 2 in the index).
MAX_MENSTRUAL_GAP_DAYS = 2


class McphasesSeries(BaseModel):
    """One (person, study interval) sequence of period starts."""

    model_config = ConfigDict(extra="forbid")

    person_id: str
    study_interval: int
    user_id: str
    subgroup: str
    period_starts: list[date]
    study_start_days: list[int] = Field(default_factory=list)

    @property
    def cycle_lengths(self) -> list[int]:
        return cycle_lengths(list(self.period_starts))


def default_mcphases_csv() -> Path:
    env = os.environ.get(MCPHASES_CSV_ENV)
    if env:
        return Path(env)
    return DEFAULT_MCPHASES_CSV


def mcphases_csv_available(path: Path | None = None) -> bool:
    return (path or default_mcphases_csv()).is_file()


def study_day_to_date(day_in_study: int, *, epoch: date = MCPHASES_EPOCH) -> date:
    """Map a study-relative day index to a calendar date. Not the participant's real calendar."""

    return epoch + timedelta(days=int(day_in_study))


def menstrual_onset_days(
    days: list[int],
    phases: list[str],
    *,
    max_gap: int = MAX_MENSTRUAL_GAP_DAYS,
) -> list[int]:
    """First day of each Menstrual run. A 1-day hole in the index does not split a run."""

    onsets: list[int] = []
    last_menstrual_day: int | None = None
    prev_phase: str | None = None
    for day, phase in zip(days, phases, strict=False):
        if phase != MENSTRUAL_PHASE:
            prev_phase = phase
            continue
        if last_menstrual_day is None:
            onsets.append(day)
        else:
            gap = day - last_menstrual_day
            saw_other = prev_phase is not None and prev_phase != MENSTRUAL_PHASE
            if saw_other or gap > max_gap:
                onsets.append(day)
        last_menstrual_day = day
        prev_phase = phase
    return onsets


def load_mcphases_series(path: Path | None = None) -> list[McphasesSeries]:
    csv_path = path or default_mcphases_csv()
    if not csv_path.is_file():
        raise FileNotFoundError(
            f"mcPHASES CSV not found at {csv_path}. Place the DUA-restricted file locally "
            f"or set {MCPHASES_CSV_ENV}."
        )
    frame = pd.read_csv(csv_path)
    required = {"id", "study_interval", "day_in_study", "phase"}
    missing = required - set(frame.columns)
    if missing:
        raise ValueError(f"mcPHASES CSV missing columns: {sorted(missing)}")

    series: list[McphasesSeries] = []
    grouped = frame.groupby(["id", "study_interval"], sort=True)
    for (person_id, interval), group in grouped:
        ordered = group.sort_values("day_in_study")
        days = [int(value) for value in ordered["day_in_study"].tolist()]
        phases = [str(value) if pd.notna(value) else "" for value in ordered["phase"].tolist()]
        onsets = menstrual_onset_days(days, phases)
        if not onsets:
            continue
        interval_int = int(str(interval))
        person = str(person_id)
        series.append(
            McphasesSeries(
                person_id=person,
                study_interval=interval_int,
                user_id=f"{person}-{interval_int}",
                subgroup=f"interval_{interval_int}",
                period_starts=[study_day_to_date(day) for day in onsets],
                study_start_days=onsets,
            )
        )
    return series


def split_by_person(
    series: list[McphasesSeries],
    *,
    test_fraction: float = 0.3,
    seed: int = 2026,
) -> tuple[list[McphasesSeries], list[McphasesSeries]]:
    """Hold out whole people. Both intervals of a test person stay in test."""

    import numpy as np

    people = sorted({item.person_id for item in series})
    rng = np.random.default_rng(seed)
    order = rng.permutation(len(people))
    n_test = max(1, int(round(len(people) * test_fraction)))
    test_ids = {people[int(i)] for i in order[:n_test]}
    train = [item for item in series if item.person_id not in test_ids]
    test = [item for item in series if item.person_id in test_ids]
    return train, test
