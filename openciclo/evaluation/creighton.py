# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Walk-forward evaluation on Creighton/Utah cycle starts. CSV stays local."""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd

from openciclo.artifacts.release import load_released_model
from openciclo.constants import CREIGHTON_DATA_NOTICE, ENGINE_VERSION
from openciclo.data.creighton import (
    creighton_csv_available,
    default_creighton_csv,
    load_creighton_series,
)
from openciclo.evaluation.mcphases import (
    Candidate,
    fit_mcphases_prior,
    run_loo_benchmark,
    select_winner,
    timing_candidates,
)
from openciclo.evaluation.metrics import summarize_metrics
from openciclo.evaluation.walkforward import assert_no_future_dates, walk_forward_cohort

DATASET_LABEL = "Creighton/Utah CrMcyclelength_share"


def selected_candidates(grid: str) -> list[Candidate]:
    """`core` is baselines + median-shrinkage k; `full` matches the mcPHASES selection grid."""

    full = timing_candidates()
    if grid == "full":
        return full
    if grid != "core":
        raise ValueError(f"Unknown candidate grid: {grid}")
    kept: list[Candidate] = []
    for item in full:
        tag = item[1]
        if tag.startswith("v0.baseline."):
            kept.append(item)
            continue
        if tag.startswith("v0.shrinkage.median.k") and ".blend" not in tag and ".clip" not in tag:
            kept.append(item)
    return kept


def _print_overall_row(label: str, summary: pd.DataFrame) -> None:
    overall = summary[summary["subgroup"] == "all"]
    if overall.empty:
        print(f"{label}: (empty)")
        return
    row = overall.iloc[0]
    print(
        f"{label}: MAE={float(row['mae']):.3f} "
        f"coverage_80={float(row['coverage_80']):.3f} n={int(row['n'])}"
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Evaluate OpenCiclo timing models on local Creighton/Utah cycle data."
    )
    parser.add_argument("--csv", type=Path, default=None)
    parser.add_argument(
        "--prior-location",
        choices=("pooled", "person_median"),
        default="person_median",
    )
    parser.add_argument(
        "--grid",
        choices=("core", "full"),
        default="full",
        help="core = baselines + median shrinkage k; full = mcPHASES selection grid",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path.cwd() / "benchmarks" / "results",
    )
    args = parser.parse_args(argv)

    csv_path = args.csv or default_creighton_csv()
    if not creighton_csv_available(csv_path):
        print(f"Skipping Creighton evaluation: CSV not found at {csv_path}")
        return 0

    series = load_creighton_series(csv_path)
    prior = fit_mcphases_prior(series, location=args.prior_location, source=DATASET_LABEL)
    n_people = len({item.person_id for item in series})
    print(
        f"Loaded {n_people} people, {len(series)} contiguous series, "
        f"{prior.n_cycles} completed lengths, "
        f"prior median {prior.median_length:.1f} MAD {prior.mad_length:.1f} "
        f"({args.prior_location})"
    )
    rows, summary = run_loo_benchmark(
        series,
        candidates=selected_candidates(args.grid),
        prior_location=args.prior_location,
        notice=CREIGHTON_DATA_NOTICE,
        prior_source=DATASET_LABEL,
    )
    winner = select_winner(summary)
    args.output_dir.mkdir(parents=True, exist_ok=True)
    summary_path = args.output_dir / "creighton_loo_summary.csv"
    steps_path = args.output_dir / "creighton_loo_steps.csv"
    summary.to_csv(summary_path, index=False)
    rows.to_csv(steps_path, index=False)
    print(f"Wrote {summary_path}")
    print(f"Wrote {steps_path}")
    print(f"Engine {ENGINE_VERSION} grid={args.grid}")
    print(f"Winner: {winner['model_id']} ({winner['reason']})")
    print(f"MAE={winner['mae']:.3f} coverage_80={winner['coverage_80']:.3f} n={winner['n']}")

    released = load_released_model()
    frozen = walk_forward_cohort(
        series,
        models=[released.point_estimator_alias],
        prior=released.to_population_prior(),
        config=released.to_forecast_config(),
    )
    if not frozen.empty:
        assert_no_future_dates(frozen)
        frozen.insert(0, "notice", CREIGHTON_DATA_NOTICE)
        frozen.insert(1, "engine_version", ENGINE_VERSION)
        frozen["model_id"] = f"released.{released.model_id}"
    frozen_summary = summarize_metrics(frozen)
    if not frozen_summary.empty:
        frozen_summary.insert(0, "notice", CREIGHTON_DATA_NOTICE)
    frozen_path = args.output_dir / "creighton_frozen_release_summary.csv"
    frozen_summary.to_csv(frozen_path, index=False)
    print(f"Wrote {frozen_path}")
    _print_overall_row("Utah LOO winner", summary[summary["model_id"] == winner["model_id"]])
    median_summary = summary[summary["model_id"] == "v0.baseline.median"]
    _print_overall_row("Utah LOO personal median", median_summary)
    shrinkage = summary[summary["model_id"] == "v0.shrinkage.median.k2.laplace"]
    _print_overall_row("Utah LOO shrinkage k=2 Laplace", shrinkage)
    _print_overall_row("Utah + frozen mcPHASES released model", frozen_summary)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
