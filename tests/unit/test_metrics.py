# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

import pandas as pd

from openciclo.evaluation.metrics import abs_error_days, summarize_metrics, within_k


def test_window_metrics() -> None:
    assert abs_error_days(28, 30) == 2
    assert within_k(28, 30, 2) is True
    assert within_k(28, 31, 2) is False


def test_summarize_metrics_from_real_rows() -> None:
    rows = pd.DataFrame(
        [
            {
                "model_id": "v0.baseline.median",
                "subgroup": "regular",
                "abs_error": 1,
                "nll": 0.5,
                "brier_within_2": 0.1,
                "in_interval_80": 1,
                "interval_width": 6,
            },
            {
                "model_id": "v0.baseline.median",
                "subgroup": "regular",
                "abs_error": 3,
                "nll": 1.5,
                "brier_within_2": 0.3,
                "in_interval_80": 0,
                "interval_width": 8,
            },
        ]
    )
    summary = summarize_metrics(rows)
    overall = summary[summary["subgroup"] == "all"].iloc[0]
    assert overall["n"] == 2
    assert abs(float(overall["mae"]) - 2.0) < 1e-9
    assert abs(float(overall["within_2"]) - 0.5) < 1e-9
