# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date
from pathlib import Path

import pytest

from openciclo.data.kaggle_factors import (
    kaggle_factors_csv_available,
    load_kaggle_factors_series,
)

FIXTURE = Path(__file__).resolve().parents[1] / "fixtures" / "kaggle_factors_tiny.csv"


def test_fixture_includes_last_next_start() -> None:
    series = load_kaggle_factors_series(FIXTURE)
    by_id = {item.person_id: item for item in series}
    assert set(by_id) == {"99001", "99002"}
    assert by_id["99001"].period_starts == [
        date(2024, 1, 1),
        date(2024, 1, 29),
        date(2024, 2, 26),
    ]
    assert by_id["99001"].cycle_lengths == [28, 28]
    assert by_id["99002"].cycle_lengths == [30]


@pytest.mark.skipif(
    not kaggle_factors_csv_available(),
    reason="Kaggle factors CSV not present (expected in CI)",
)
def test_real_kaggle_loader_is_synthetic_sized() -> None:
    series = load_kaggle_factors_series()
    assert len(series) >= 2
    lengths = [length for item in series for length in item.cycle_lengths]
    assert min(lengths) >= 1
    assert max(lengths) <= 90
