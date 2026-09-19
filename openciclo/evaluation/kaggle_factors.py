# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Walk-forward on the Kaggle synthetic factors CSV. Does not overwrite the release."""

from __future__ import annotations

import argparse
from pathlib import Path

from openciclo.artifacts.release import load_released_model
from openciclo.constants import ENGINE_VERSION, KAGGLE_FACTORS_DATA_NOTICE, MCPHASES_DATA_NOTICE
from openciclo.data.kaggle_factors import (
    kaggle_factors_csv_available,
    load_kaggle_factors_series,
)
from openciclo.data.mcphases import load_mcphases_series, mcphases_csv_available
from openciclo.evaluation.creighton import _print_overall_row
from openciclo.evaluation.cross_dataset import HEADLINE_MODEL, transfer_candidates
from openciclo.evaluation.mcphases import (
    fit_mcphases_prior,
    run_loo_benchmark,
    score_with_fixed_prior,
)
from openciclo.evaluation.metrics import summarize_metrics
from openciclo.evaluation.walkforward import assert_no_future_dates, walk_forward_cohort

DATASET_LABEL = "Kaggle synthetic menstrual_cycle_dataset_with_factors"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Evaluate OpenCiclo on the local Kaggle synthetic cycle CSV (non-production)."
    )
    parser.add_argument("--csv", type=Path, default=None)
    parser.add_argument(
        "--prior-location",
        choices=("pooled", "person_median"),
        default="person_median",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path.cwd() / "benchmarks" / "results",
    )
    args = parser.parse_args(argv)

    if not kaggle_factors_csv_available(args.csv):
        print("Skipping Kaggle factors evaluation: CSV not found.")
        return 0

    series = load_kaggle_factors_series(args.csv)
    prior = fit_mcphases_prior(series, location=args.prior_location, source=DATASET_LABEL)
    n_people = len({item.person_id for item in series})
    print(
        f"SYNTHETIC Loaded {n_people} people, {len(series)} series, "
        f"{prior.n_cycles} completed lengths, "
        f"prior median {prior.median_length:.1f} MAD {prior.mad_length:.1f}"
    )
    rows, summary = run_loo_benchmark(
        series,
        candidates=transfer_candidates(),
        prior_location=args.prior_location,
        notice=KAGGLE_FACTORS_DATA_NOTICE,
        prior_source=DATASET_LABEL,
    )
    args.output_dir.mkdir(parents=True, exist_ok=True)
    summary_path = args.output_dir / "kaggle_factors_loo_summary.csv"
    steps_path = args.output_dir / "kaggle_factors_loo_steps.csv"
    summary.to_csv(summary_path, index=False)
    rows.to_csv(steps_path, index=False)
    print(f"Wrote {summary_path}")
    print(f"Wrote {steps_path}")
    print(f"Engine {ENGINE_VERSION} SYNTHETIC / NON-PRODUCTION")
    _print_overall_row("Kaggle LOO shrinkage k=2", summary[summary["model_id"] == HEADLINE_MODEL])
    _print_overall_row(
        "Kaggle LOO personal median",
        summary[summary["model_id"] == "v0.baseline.median"],
    )
    _print_overall_row(
        "Kaggle LOO population prior only",
        summary[summary["model_id"] == "v0.baseline.population_prior"],
    )

    released = load_released_model()
    frozen = walk_forward_cohort(
        series,
        models=[released.point_estimator_alias],
        prior=released.to_population_prior(),
        config=released.to_forecast_config(),
    )
    if not frozen.empty:
        assert_no_future_dates(frozen)
        frozen.insert(0, "notice", KAGGLE_FACTORS_DATA_NOTICE)
        frozen["model_id"] = f"released.{released.model_id}"
    frozen_summary = summarize_metrics(frozen)
    frozen_path = args.output_dir / "kaggle_factors_frozen_release_summary.csv"
    frozen_summary.to_csv(frozen_path, index=False)
    print(f"Wrote {frozen_path}")
    _print_overall_row("Kaggle + frozen mcPHASES released model", frozen_summary)

    if mcphases_csv_available():
        canada = load_mcphases_series()
        _canada_rows, canada_summary = score_with_fixed_prior(
            canada,
            prior,
            transfer_candidates(),
            notice=MCPHASES_DATA_NOTICE,
        )
        canada_path = args.output_dir / "kaggle_factors_prior_on_mcphases_summary.csv"
        canada_summary.to_csv(canada_path, index=False)
        print(f"Wrote {canada_path}")
        _print_overall_row(
            "Train Kaggle synthetic, test Canada k=2",
            canada_summary[canada_summary["model_id"] == HEADLINE_MODEL],
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
