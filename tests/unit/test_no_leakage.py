# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from openciclo.data.synthetic import SyntheticUser, generate_synthetic_cohort, split_users
from openciclo.evaluation.walkforward import (
    assert_no_future_dates,
    train_lengths,
    walk_forward_cohort,
    walk_forward_user,
)
from openciclo.models.population import fit_population_prior
from openciclo.schemas.config import literature_placeholder_prior


def test_walk_forward_never_includes_target_start() -> None:
    user = SyntheticUser(
        user_id="handcrafted",
        subgroup="regular",
        period_starts=[
            date(2026, 1, 1),
            date(2026, 1, 29),
            date(2026, 2, 26),
            date(2026, 3, 26),
        ],
        biological_cycle_lengths=[28, 28, 28],
        observed_cycle_lengths=[28, 28, 28],
    )
    rows = walk_forward_user(user, model="median", prior=literature_placeholder_prior())
    assert len(rows) == 3
    for row in rows:
        assert date.fromisoformat(str(row["max_history_start"])) < date.fromisoformat(
            str(row["actual_next_start"])
        )
        assert int(row["n_starts_visible"]) <= 3
        assert int(row["n_lengths_visible"]) == int(row["n_starts_visible"]) - 1


def test_population_prior_excludes_held_out_users() -> None:
    train = [
        SyntheticUser(
            user_id="train-0",
            subgroup="regular",
            period_starts=[date(2026, 1, 1), date(2026, 1, 29), date(2026, 2, 26)],
            biological_cycle_lengths=[28, 28],
            observed_cycle_lengths=[28, 28],
        )
    ]
    test = [
        SyntheticUser(
            user_id="test-0",
            subgroup="irregular",
            period_starts=[date(2026, 1, 1), date(2026, 2, 10), date(2026, 3, 22)],
            biological_cycle_lengths=[40, 40],
            observed_cycle_lengths=[40, 40],
        )
    ]
    prior = fit_population_prior(train_lengths(train), source="synthetic_train")
    assert abs(prior.median_length - 28.0) < 1e-9
    assert prior.n_users == 1
    # Held-out 40-day cycles must not move the prior.
    assert abs(prior.median_length - 40.0) > 5.0

    frame = walk_forward_cohort(test, models=["median"], prior=prior)
    assert_no_future_dates(frame)
    assert (frame["prior_source"] == "synthetic_train").all()


def test_synthetic_split_is_by_user_not_cycle() -> None:
    cohort = generate_synthetic_cohort(n_per_subgroup=4, seed=7)
    train, test = split_users(cohort.users, test_fraction=0.25, seed=7)
    train_ids = {user.user_id for user in train}
    test_ids = {user.user_id for user in test}
    assert train_ids.isdisjoint(test_ids)
    assert train_ids | test_ids == {user.user_id for user in cohort.users}
