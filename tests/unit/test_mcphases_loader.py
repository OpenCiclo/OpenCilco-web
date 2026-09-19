# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date
from pathlib import Path

from openciclo.constants import MCPHASES_EPOCH
from openciclo.data.mcphases import (
    load_mcphases_series,
    menstrual_onset_days,
    split_by_person,
    study_day_to_date,
)

FIXTURE = Path(__file__).resolve().parents[1] / "fixtures" / "mcphases_tiny.csv"


def test_study_day_epoch() -> None:
    assert study_day_to_date(0) == MCPHASES_EPOCH
    assert study_day_to_date(1) == date(1970, 1, 2)


def test_gap_of_one_missing_day_does_not_split_run() -> None:
    days = [1, 2, 4, 5]
    phases = ["Menstrual", "Menstrual", "Menstrual", "Menstrual"]
    assert menstrual_onset_days(days, phases) == [1]


def test_larger_gap_starts_new_run() -> None:
    days = [1, 2, 6, 7]
    phases = ["Menstrual", "Menstrual", "Menstrual", "Menstrual"]
    assert menstrual_onset_days(days, phases) == [1, 6]


def test_other_phase_splits_run() -> None:
    days = [1, 2, 10, 20, 21]
    phases = ["Menstrual", "Menstrual", "Follicular", "Menstrual", "Menstrual"]
    assert menstrual_onset_days(days, phases) == [1, 20]


def test_fixture_groups_by_interval_and_skips_empty() -> None:
    series = load_mcphases_series(FIXTURE)
    ids = {item.user_id for item in series}
    assert ids == {"99001-2022", "99001-2024", "99002-2022"}
    by_id = {item.user_id: item for item in series}
    assert by_id["99001-2022"].cycle_lengths == [28, 28]
    assert by_id["99001-2024"].cycle_lengths == [28]
    assert by_id["99002-2022"].cycle_lengths == [30]
    people = {item.person_id for item in series}
    assert people == {"99001", "99002"}


def test_split_holds_out_whole_people() -> None:
    series = load_mcphases_series(FIXTURE)
    train, test = split_by_person(series, test_fraction=0.5, seed=2026)
    train_people = {item.person_id for item in train}
    test_people = {item.person_id for item in test}
    assert train_people.isdisjoint(test_people)
    if "99001" in test_people:
        test_intervals = {item.study_interval for item in test if item.person_id == "99001"}
        assert test_intervals == {2022, 2024}
