# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from openciclo.constants import SYNTHETIC_DATA_NOTICE
from openciclo.evaluation.report import run_synthetic_benchmark
from openciclo.evaluation.walkforward import assert_no_future_dates
from openciclo.models.baselines import MANDATORY_BASELINE_ALIASES


def test_tiny_synthetic_benchmark_runs() -> None:
    rows, summary, reliability = run_synthetic_benchmark(
        n_per_subgroup=2,
        seed=2026,
        include_lambda_grid=False,
    )
    assert_no_future_dates(rows)
    assert (rows["notice"] == SYNTHETIC_DATA_NOTICE).all()
    present = set(summary[summary["subgroup"] == "all"]["model_id"])
    expected = {f"v0.baseline.{alias}" for alias in MANDATORY_BASELINE_ALIASES}
    assert expected == present
    assert "mae" in summary.columns
    assert "nll" in summary.columns
    assert "coverage_80" in summary.columns
    assert "p_mean" in reliability.columns
