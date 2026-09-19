# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from openciclo.data.cycles import cycle_lengths


def test_leap_year_february() -> None:
    # 2024 is a leap year: 28 Feb → 28 Mar is 29 days.
    assert cycle_lengths([date(2024, 2, 28), date(2024, 3, 28)]) == [29]
    assert cycle_lengths([date(2023, 2, 28), date(2023, 3, 28)]) == [28]


def test_month_and_year_boundaries() -> None:
    assert cycle_lengths([date(2025, 12, 20), date(2026, 1, 17)]) == [28]
    assert cycle_lengths([date(2026, 1, 31), date(2026, 3, 2)]) == [30]


def test_single_date_has_no_length() -> None:
    assert cycle_lengths([date(2026, 7, 30)]) == []
