# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from openciclo.data.cycles import cycle_lengths, cycles_from_starts
from openciclo.schemas.cycle import PeriodHistory, PeriodStart


def test_cycle_lengths_are_day_differences() -> None:
    starts = [date(2026, 5, 2), date(2026, 6, 1), date(2026, 6, 29)]
    assert cycle_lengths(starts) == [30, 28]


def test_unsorted_starts_are_ordered() -> None:
    starts = [date(2026, 6, 29), date(2026, 5, 2), date(2026, 6, 1)]
    assert cycle_lengths(starts) == [30, 28]


def test_last_cycle_is_open() -> None:
    cycles = cycles_from_starts([date(2026, 5, 2), date(2026, 6, 1)])
    assert cycles[0].length_days == 30
    assert cycles[1].length_days is None
    assert cycles[0].cycle_id == "cycle-0001"


def test_period_history_helper() -> None:
    history = PeriodHistory(starts=[PeriodStart(date=date(2026, 7, 1))])
    assert history.ordered_dates() == [date(2026, 7, 1)]
