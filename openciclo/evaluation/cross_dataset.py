# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Train the timing prior on one local cohort and walk-forward on the other.

Does not overwrite released_model.json.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd

from openciclo.constants import CREIGHTON_DATA_NOTICE, ENGINE_VERSION, MCPHASES_DATA_NOTICE
from openciclo.data.creighton import creighton_csv_available, load_creighton_series
from openciclo.data.mcphases import load_mcphases_series, mcphases_csv_available
from openciclo.evaluation.mcphases import (
    DATASET_LABEL,
    Candidate,
    fit_mcphases_prior,
    run_loo_benchmark,
    score_with_fixed_prior,
)
from openciclo.schemas.config import ForecastConfig

UTAH_LABEL = "Creighton/Utah CrMcyclelength_share"
HEADLINE_MODEL = "v0.shrinkage.median.k2.laplace"


def transfer_candidates() -> list[Candidate]:
    """Same architecture as the released model, plus the Utah LOO k and two baselines."""

    base = ForecastConfig(length_family="laplace")
    return [
        ("median", "v0.baseline.median", base),
        ("population_prior", "v0.baseline.population_prior", base),
        (
            "shrinkage",
            "v0.shrinkage.median.k1.5.laplace",
            base.model_copy(update={"shrinkage_k": 1.5}),
        ),
        (
            "shrinkage",
            "v0.shrinkage.median.k2.laplace",
            base.model_copy(update={"shrinkage_k": 2.0}),
        ),
    ]


def _overall(summary: pd.DataFrame, model_id: str) -> pd.Series | None:
    hits = summary[(summary["subgroup"] == "all") & (summary["model_id"] == model_id)]
    if hits.empty:
        return None
    return hits.iloc[0]


def _print_row(label: str, row: pd.Series | None) -> None:
    if row is None:
        print(f"{label}: (missing)")
        return
    print(
        f"{label}: MAE={float(row['mae']):.3f} "
        f"within_2={float(row['within_2']):.3f} "
        f"coverage_80={float(row['coverage_80']):.3f} n={int(row['n'])}"
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Fit the OpenCiclo population prior on Utah and score walk-forward on mcPHASES "
            "(and the reverse). Does not write released_model.json."
        )
    )
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

    if not creighton_csv_available() or not mcphases_csv_available():
        print("Skipping cross-dataset evaluation: Utah and/or mcPHASES CSV not found.")
        return 0

    utah = load_creighton_series()
    canada = load_mcphases_series()
    candidates = transfer_candidates()
    utah_prior = fit_mcphases_prior(utah, location=args.prior_location, source=UTAH_LABEL)
    canada_prior = fit_mcphases_prior(canada, location=args.prior_location, source=DATASET_LABEL)

    print(
        f"Utah train prior: {utah_prior.n_users} people, {utah_prior.n_cycles} lengths, "
        f"median {utah_prior.median_length:.1f} MAD {utah_prior.mad_length:.1f}"
    )
    print(
        f"mcPHASES train prior (all people, not used for same-set scoring): "
        f"{canada_prior.n_users} people, {canada_prior.n_cycles} lengths, "
        f"median {canada_prior.median_length:.1f} MAD {canada_prior.mad_length:.1f}"
    )

    utah_on_canada_rows, utah_on_canada = score_with_fixed_prior(
        canada,
        utah_prior,
        candidates,
        notice=MCPHASES_DATA_NOTICE,
    )
    canada_loo_rows, canada_loo = run_loo_benchmark(
        canada,
        candidates=candidates,
        prior_location=args.prior_location,
        notice=MCPHASES_DATA_NOTICE,
        prior_source=DATASET_LABEL,
    )
    canada_on_utah_rows, canada_on_utah = score_with_fixed_prior(
        utah,
        canada_prior,
        candidates,
        notice=CREIGHTON_DATA_NOTICE,
    )
    utah_loo_rows, utah_loo = run_loo_benchmark(
        utah,
        candidates=candidates,
        prior_location=args.prior_location,
        notice=CREIGHTON_DATA_NOTICE,
        prior_source=UTAH_LABEL,
    )

    args.output_dir.mkdir(parents=True, exist_ok=True)
    writes = {
        "cross_utah_prior_on_mcphases_summary.csv": utah_on_canada,
        "cross_utah_prior_on_mcphases_steps.csv": utah_on_canada_rows,
        "cross_mcphases_loo_summary.csv": canada_loo,
        "cross_mcphases_loo_steps.csv": canada_loo_rows,
        "cross_mcphases_prior_on_utah_summary.csv": canada_on_utah,
        "cross_mcphases_prior_on_utah_steps.csv": canada_on_utah_rows,
        "cross_utah_loo_summary.csv": utah_loo,
        "cross_utah_loo_steps.csv": utah_loo_rows,
    }
    for name, frame in writes.items():
        path = args.output_dir / name
        frame.to_csv(path, index=False)
        print(f"Wrote {path}")

    print(f"Engine {ENGINE_VERSION}")
    print("--- Test set: mcPHASES (Canadian), shrinkage k=2 Laplace ---")
    _print_row("Train Utah, test Canada", _overall(utah_on_canada, HEADLINE_MODEL))
    _print_row("Train Canada LOO, test Canada", _overall(canada_loo, HEADLINE_MODEL))
    print("--- Test set: Utah, shrinkage k=2 Laplace ---")
    _print_row("Train Canada, test Utah", _overall(canada_on_utah, HEADLINE_MODEL))
    _print_row("Train Utah LOO, test Utah", _overall(utah_loo, HEADLINE_MODEL))
    print("--- Same models, k=1.5 (Utah LOO winner) on Canada ---")
    k15 = "v0.shrinkage.median.k1.5.laplace"
    _print_row("Train Utah, test Canada", _overall(utah_on_canada, k15))
    _print_row("Train Canada LOO, test Canada", _overall(canada_loo, k15))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
