# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import UTC, datetime
from pathlib import Path

import pandas as pd

from openciclo.constants import ENGINE_VERSION, RECENCY_LAMBDA_GRID, SYNTHETIC_DATA_NOTICE
from openciclo.data.synthetic import generate_synthetic_cohort, split_users
from openciclo.evaluation.metrics import reliability_bins, summarize_metrics
from openciclo.evaluation.walkforward import train_lengths, walk_forward_cohort
from openciclo.models.baselines import MANDATORY_BASELINE_ALIASES
from openciclo.models.population import fit_population_prior
from openciclo.schemas.config import ForecastConfig


def run_synthetic_benchmark(
    *,
    n_per_subgroup: int = 20,
    seed: int = 2026,
    test_fraction: float = 0.3,
    include_lambda_grid: bool = True,
) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """Run V0 baselines on synthetic data. Results are not production accuracy."""

    cohort = generate_synthetic_cohort(n_per_subgroup=n_per_subgroup, seed=seed)
    train, test = split_users(cohort.users, test_fraction=test_fraction, seed=seed)
    prior = fit_population_prior(train_lengths(train), source="synthetic_train")
    config = ForecastConfig()
    models: list[str] = list(MANDATORY_BASELINE_ALIASES)
    steps = [walk_forward_cohort(test, models=models, prior=prior, config=config)]

    if include_lambda_grid:
        recency_models = ("recency_weighted_mean", "recency_weighted_median")
        for lam in RECENCY_LAMBDA_GRID:
            if abs(lam - config.recency_lambda) < 1e-12:
                continue
            cfg = config.model_copy(update={"recency_lambda": lam})
            frame = walk_forward_cohort(test, models=recency_models, prior=prior, config=cfg)
            if not frame.empty:
                suffix = f"l{int(round(lam * 100)):03d}"
                frame = frame.copy()
                frame["model_id"] = frame["model_id"] + f".{suffix}"
                steps.append(frame)

    rows = pd.concat(steps, ignore_index=True)
    summary = summarize_metrics(rows)
    reliability = reliability_bins(
        rows["p_within_2"].tolist(),
        rows["within_2_hit"].tolist(),
    )
    reliability.insert(0, "notice", SYNTHETIC_DATA_NOTICE)
    summary.insert(0, "notice", SYNTHETIC_DATA_NOTICE)
    rows.insert(0, "notice", SYNTHETIC_DATA_NOTICE)
    rows.insert(1, "engine_version", ENGINE_VERSION)
    rows.insert(2, "prior_source_fit", prior.source)
    rows.insert(3, "prior_median", prior.median_length)
    return rows, summary, reliability


def write_reports(
    summary: pd.DataFrame,
    rows: pd.DataFrame,
    reliability: pd.DataFrame,
    output_dir: Path,
) -> tuple[Path, Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    csv_path = output_dir / "v0_synthetic_summary.csv"
    detail_path = output_dir / "v0_synthetic_steps.csv"
    md_path = output_dir / "v0_synthetic_report.md"
    reliability_path = output_dir / "v0_synthetic_reliability.csv"
    summary.to_csv(csv_path, index=False)
    rows.to_csv(detail_path, index=False)
    reliability.to_csv(reliability_path, index=False)
    md_path.write_text(_render_markdown(summary), encoding="utf-8")
    return md_path, csv_path, detail_path


def _render_markdown(summary: pd.DataFrame) -> str:
    generated = datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    overall = summary[summary["subgroup"] == "all"].copy()
    lines = [
        "# OpenCiclo V0 baseline benchmark",
        "",
        f"**Data:** {SYNTHETIC_DATA_NOTICE}",
        f"**Engine:** {ENGINE_VERSION}",
        f"**Generated:** {generated}",
        "",
        "These numbers are produced by walk-forward evaluation on **simulated**",
        "cycles. They are not clinical accuracy and must not be quoted as product",
        "performance.",
        "",
        "## Overall (held-out synthetic users)",
        "",
        _markdown_table(overall),
        "",
        "## By subgroup",
        "",
        _markdown_table(summary[summary["subgroup"] != "all"]),
        "",
        "Ciclo provides cycle forecasts. Forecasts can be wrong. Ciclo is not a",
        "medical device, diagnosis system, or contraceptive method.",
        "",
        "Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez. Apache-2.0.",
        "",
    ]
    return "\n".join(lines)


def _markdown_table(frame: pd.DataFrame) -> str:
    if frame.empty:
        return "_No rows._"
    display = frame.copy()
    numeric = [
        "mae",
        "medae",
        "exact",
        "within_1",
        "within_2",
        "within_3",
        "within_5",
        "nll",
        "brier_within_2",
        "coverage_80",
        "width_80",
        "ae_p90",
    ]
    for column in numeric:
        if column in display.columns:
            display[column] = display[column].map(lambda value: f"{value:.3f}")
    keep = [
        column
        for column in [
            "model_id",
            "subgroup",
            "n",
            "mae",
            "medae",
            "exact",
            "within_1",
            "within_2",
            "within_3",
            "within_5",
            "nll",
            "brier_within_2",
            "coverage_80",
            "width_80",
        ]
        if column in display.columns
    ]
    header = "| " + " | ".join(keep) + " |"
    divider = "| " + " | ".join("---" for _ in keep) + " |"
    body = [
        "| " + " | ".join(str(row[column]) for column in keep) + " |"
        for _, row in display.iterrows()
    ]
    return "\n".join([header, divider, *body])


def main() -> int:
    rows, summary, reliability = run_synthetic_benchmark()
    output_dir = Path.cwd() / "benchmarks" / "results"
    md_path, csv_path, detail_path = write_reports(summary, rows, reliability, output_dir)
    print(f"Wrote {md_path}")
    print(f"Wrote {csv_path}")
    print(f"Wrote {detail_path}")
    return 0
