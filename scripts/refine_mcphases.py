# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Second-pass mcPHASES search: families, person-median prior, repeated holdout."""

from __future__ import annotations

from pathlib import Path

import pandas as pd

from openciclo.data.mcphases import load_mcphases_series
from openciclo.evaluation.mcphases import (
    family_candidates,
    run_loo_benchmark,
    run_mcphases_benchmark,
    select_winner,
    timing_candidates,
)
from openciclo.schemas.config import ForecastConfig

OUTPUT = Path("benchmarks") / "results"


def _overall(summary: pd.DataFrame) -> pd.DataFrame:
    return summary[summary["subgroup"] == "all"].sort_values("mae")


def main() -> int:
    series = load_mcphases_series()
    summary = pd.read_csv(OUTPUT / "mcphases_loo_summary.csv")
    winner = select_winner(summary)
    print("LOO winner after simplicity rule:")
    print(winner)

    candidates = timing_candidates()
    point = next((item for item in candidates if item[1] == winner["model_id"]), None)
    if point is None:
        alias = "shrinkage"
        tag = winner["model_id"]
        cfg = ForecastConfig(
            shrinkage_k=winner["shrinkage_k"],
            blend_last=winner["blend_last"],
            personal_clip_radius=winner["personal_clip_radius"],
        )
        point = (alias, tag, cfg)

    all_lengths = [length for item in series for length in item.cycle_lengths]
    fam = family_candidates(point, train_lengths=all_lengths)
    print(f"Family pass: {len(fam)} candidates around {point[1]}")
    fam_rows, fam_summary = run_loo_benchmark(series, candidates=fam)
    fam_summary.to_csv(OUTPUT / "mcphases_loo_family_summary.csv", index=False)
    fam_overall = _overall(fam_summary)
    print(fam_overall[["model_id", "mae", "nll", "coverage_80", "width_80"]].to_string(index=False))
    fam_winner = select_winner(
        pd.concat(
            [
                summary[summary["model_id"] == "v0.baseline.median"],
                fam_summary,
            ],
            ignore_index=True,
        )
    )
    print("Family-pass winner:", fam_winner)

    print("\nPerson-median prior LOO on the point-estimator grid (top comparison)...")
    core = [
        item
        for item in candidates
        if item[1] in {winner["model_id"], "v0.baseline.median", "v0.baseline.population_prior"}
    ]
    core.append(point)
    pm_rows, pm_summary = run_loo_benchmark(series, candidates=core, prior_location="person_median")
    pm_summary.to_csv(OUTPUT / "mcphases_loo_person_median_prior.csv", index=False)
    print(_overall(pm_summary)[["model_id", "mae", "coverage_80"]].to_string(index=False))

    print("\nRepeated 30% person holdout, 8 seeds...")
    holdout_frames = []
    for seed in (7, 13, 21, 42, 99, 2024, 2026, 3141):
        _rows, hold_summary, _prior, _train, _test = run_mcphases_benchmark(
            series, test_fraction=0.3, seed=seed, candidates=core
        )
        piece = _overall(hold_summary).copy()
        piece["seed"] = seed
        holdout_frames.append(piece)
        print(f"  seed {seed}:")
        print(piece[["model_id", "mae", "coverage_80", "n"]].to_string(index=False))
    holdout = pd.concat(holdout_frames, ignore_index=True)
    holdout.to_csv(OUTPUT / "mcphases_repeated_holdout.csv", index=False)
    agg = (
        holdout.groupby("model_id", as_index=False)[["mae", "coverage_80"]]
        .mean()
        .sort_values("mae")
    )
    print("\nMean over seeds:")
    print(agg.to_string(index=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
