# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from pathlib import Path

import pytest

from openciclo.data.mcphases import load_mcphases_series, mcphases_csv_available
from openciclo.evaluation.mcphases import (
    build_released_model,
    run_mcphases_benchmark,
    select_winner,
)

FIXTURE = Path(__file__).resolve().parents[1] / "fixtures" / "mcphases_tiny.csv"


def test_mcphases_pipeline_on_fixture(tmp_path: Path) -> None:
    series = load_mcphases_series(FIXTURE)
    rows, summary, prior, train, test = run_mcphases_benchmark(series, test_fraction=0.5, seed=2026)
    assert not rows.empty
    assert prior.source.startswith("mcPHASES")
    train_people = {item.person_id for item in train}
    test_people = {item.person_id for item in test}
    assert train_people.isdisjoint(test_people)
    winner = select_winner(summary)
    released = build_released_model(series=series, winner=winner)
    assert released.n_users == 2
    assert released.population_median > 0
    out = tmp_path / "released_model.json"
    from openciclo.artifacts.release import write_released_model

    write_released_model(released, out)
    assert out.is_file()


@pytest.mark.skipif(
    not mcphases_csv_available(), reason="mcPHASES CSV not present (expected in CI)"
)
def test_real_mcphases_loader_person_split() -> None:
    series = load_mcphases_series()
    assert len(series) >= 1
    people = {item.person_id for item in series}
    assert len(people) >= 1
