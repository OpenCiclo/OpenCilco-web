# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

import pytest

from openciclo.data.synthetic import generate_synthetic_cohort
from openciclo.schemas.config import literature_placeholder_prior


@pytest.fixture
def three_starts() -> list[date]:
    return [date(2026, 5, 2), date(2026, 6, 1), date(2026, 6, 29)]


@pytest.fixture
def placeholder_prior():
    return literature_placeholder_prior()


@pytest.fixture
def tiny_cohort():
    return generate_synthetic_cohort(n_per_subgroup=2, seed=2026)
