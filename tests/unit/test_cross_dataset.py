# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from pathlib import Path

from openciclo.constants import MCPHASES_DATA_NOTICE
from openciclo.data.creighton import load_creighton_series
from openciclo.data.mcphases import load_mcphases_series
from openciclo.evaluation.cross_dataset import HEADLINE_MODEL, transfer_candidates
from openciclo.evaluation.mcphases import fit_mcphases_prior, score_with_fixed_prior

CREIGHTON_FIXTURE = Path(__file__).resolve().parents[1] / "fixtures" / "creighton_tiny.csv"
MCPHASES_FIXTURE = Path(__file__).resolve().parents[1] / "fixtures" / "mcphases_tiny.csv"


def test_utah_prior_scores_mcphases_fixture() -> None:
    utah = load_creighton_series(CREIGHTON_FIXTURE)
    canada = load_mcphases_series(MCPHASES_FIXTURE)
    prior = fit_mcphases_prior(utah, location="person_median", source="fixture-utah")
    _rows, summary = score_with_fixed_prior(
        canada,
        prior,
        transfer_candidates(),
        notice=MCPHASES_DATA_NOTICE,
    )
    overall = summary[(summary["subgroup"] == "all") & (summary["model_id"] == HEADLINE_MODEL)]
    assert not overall.empty
    assert int(overall.iloc[0]["n"]) >= 1
    assert float(overall.iloc[0]["mae"]) >= 0.0
