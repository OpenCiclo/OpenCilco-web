# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date, timedelta
from typing import Literal

import numpy as np
from pydantic import BaseModel, ConfigDict

from openciclo.constants import SYNTHETIC_DATA_NOTICE

Subgroup = Literal["regular", "irregular", "sparse", "regime_change", "skipped_logs"]
SUBGROUPS: tuple[Subgroup, ...] = (
    "regular",
    "irregular",
    "sparse",
    "regime_change",
    "skipped_logs",
)


class SyntheticUser(BaseModel):
    model_config = ConfigDict(extra="forbid")

    user_id: str
    subgroup: Subgroup
    period_starts: list[date]
    biological_cycle_lengths: list[int]
    observed_cycle_lengths: list[int]
    notice: str = SYNTHETIC_DATA_NOTICE


class SyntheticCohort(BaseModel):
    model_config = ConfigDict(extra="forbid")

    users: list[SyntheticUser]
    seed: int
    notice: str = SYNTHETIC_DATA_NOTICE
    n_per_subgroup: int


def generate_synthetic_cohort(
    *,
    n_per_subgroup: int = 20,
    seed: int = 2026,
    origin: date = date(2022, 1, 1),
) -> SyntheticCohort:
    """Simulate period-start histories. Output is SYNTHETIC / NON-PRODUCTION."""

    rng = np.random.default_rng(seed)
    users: list[SyntheticUser] = []
    for subgroup in SUBGROUPS:
        for index in range(n_per_subgroup):
            users.append(
                _simulate_user(
                    rng,
                    subgroup=subgroup,
                    index=index,
                    origin=origin,
                )
            )
    return SyntheticCohort(
        users=users,
        seed=seed,
        n_per_subgroup=n_per_subgroup,
        notice=SYNTHETIC_DATA_NOTICE,
    )


def _simulate_user(
    rng: np.random.Generator,
    *,
    subgroup: Subgroup,
    index: int,
    origin: date,
) -> SyntheticUser:
    offset = int(rng.integers(0, 400))
    start = origin + timedelta(days=offset)
    if subgroup == "regular":
        bio = _draw_lengths(rng, n=int(rng.integers(8, 14)), mean=28.0, sd=1.2, lo=24, hi=33)
    elif subgroup == "irregular":
        bio = _draw_lengths(rng, n=int(rng.integers(8, 14)), mean=32.0, sd=6.0, lo=18, hi=55)
    elif subgroup == "sparse":
        bio = _draw_lengths(rng, n=int(rng.integers(2, 5)), mean=28.0, sd=1.5, lo=24, hi=34)
    elif subgroup == "regime_change":
        early = _draw_lengths(rng, n=6, mean=28.0, sd=1.2, lo=25, hi=32)
        late = _draw_lengths(rng, n=4, mean=35.0, sd=1.5, lo=32, hi=40)
        bio = early + late
    else:
        bio = _draw_lengths(rng, n=int(rng.integers(8, 13)), mean=28.0, sd=1.3, lo=24, hi=34)

    bio_starts = _starts_from_lengths(start, bio)
    observed_starts = _apply_skips(rng, bio_starts) if subgroup == "skipped_logs" else bio_starts
    observed_lengths = [
        (later - earlier).days
        for earlier, later in zip(observed_starts, observed_starts[1:], strict=False)
    ]
    return SyntheticUser(
        user_id=f"synth-{subgroup}-{index:03d}",
        subgroup=subgroup,
        period_starts=observed_starts,
        biological_cycle_lengths=bio,
        observed_cycle_lengths=observed_lengths,
        notice=SYNTHETIC_DATA_NOTICE,
    )


def _draw_lengths(
    rng: np.random.Generator,
    *,
    n: int,
    mean: float,
    sd: float,
    lo: int,
    hi: int,
) -> list[int]:
    draws = np.clip(np.rint(rng.normal(mean, sd, size=n)), lo, hi).astype(int)
    return [int(value) for value in draws]


def _starts_from_lengths(first: date, lengths: list[int]) -> list[date]:
    starts = [first]
    current = first
    for length in lengths:
        current = current + timedelta(days=int(length))
        starts.append(current)
    return starts


def _apply_skips(rng: np.random.Generator, starts: list[date]) -> list[date]:
    if len(starts) < 3:
        return list(starts)
    kept = [starts[0]]
    for middle in starts[1:-1]:
        if float(rng.random()) > 0.20:
            kept.append(middle)
    kept.append(starts[-1])
    return kept


def split_users(
    users: list[SyntheticUser],
    *,
    test_fraction: float = 0.3,
    seed: int = 2026,
) -> tuple[list[SyntheticUser], list[SyntheticUser]]:
    """Stratified user split. Never splits a single person's cycles at random."""

    rng = np.random.default_rng(seed)
    train: list[SyntheticUser] = []
    test: list[SyntheticUser] = []
    by_group: dict[str, list[SyntheticUser]] = {}
    for user in users:
        by_group.setdefault(user.subgroup, []).append(user)
    for group_users in by_group.values():
        order = rng.permutation(len(group_users))
        n_test = max(1, int(round(len(group_users) * test_fraction)))
        test_idx = set(int(i) for i in order[:n_test])
        for i, user in enumerate(group_users):
            if i in test_idx:
                test.append(user)
            else:
                train.append(user)
    return train, test
