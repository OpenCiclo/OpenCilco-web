# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Walk-forward selection on mcPHASES. Restricted CSV stays local; only aggregates are published."""

from __future__ import annotations

import argparse
import math
import re
from collections.abc import Sequence
from datetime import UTC, datetime
from pathlib import Path
from typing import TypedDict

import numpy as np
import pandas as pd

from openciclo.artifacts.release import ReleasedModel, write_released_model
from openciclo.constants import ENGINE_VERSION, MAX_CYCLE_LENGTH, MCPHASES_DATA_NOTICE, MIN_CYCLE_LENGTH
from openciclo.data.mcphases import (
    McphasesSeries,
    default_mcphases_csv,
    load_mcphases_series,
    split_by_person,
)
from openciclo.evaluation.metrics import summarize_metrics
from openciclo.evaluation.walkforward import (
    PersonHoldoutSeries,
    assert_no_future_dates,
    walk_forward_cohort,
)
from openciclo.forecasting.distribution import fit_empirical_pmf, fit_lognormal_sigma
from openciclo.models.baselines import MANDATORY_BASELINE_ALIASES
from openciclo.models.population import fit_population_prior
from openciclo.schemas.config import ForecastConfig, PopulationPrior

SHRINKAGE_K_GRID = (0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 8.0)
RECENCY_K_GRID = (1.0, 2.0, 3.0, 4.0)
BLEND_GRID = (0.25, 0.5)
CLIP_GRID = (8.0, 12.0)
BLEND_K_GRID = (2.0, 3.0, 4.0)
MAE_IMPROVEMENT = 0.05
COVERAGE_SLACK = 0.05
DATASET_LABEL = "mcPHASES 1.0.0 hormones_and_selfreport"
MEDIAN_MODEL_ID = "v0.baseline.median"
SHRINKAGE_ID = re.compile(
    r"^v0\.shrinkage\.(median|mean|last|recency_median)"
    r"\.k([0-9]+(?:\.[0-9]+)?)"
    r"(?:\.blend([0-9]+(?:\.[0-9]+)?))?"
    r"(?:\.clip([0-9]+(?:\.[0-9]+)?))?"
    r"\.(.+)$"
)

Candidate = tuple[str, str, ForecastConfig]


class CandidateSpec(TypedDict):
    model_id: str
    point_estimator: str
    length_family: str
    shrinkage_k: float
    blend_last: float
    personal_clip_radius: float | None
    laplace_asymmetry: float


class Winner(CandidateSpec):
    mae: float
    coverage_80: float
    n: int
    reason: str


def _k_tag(value: float) -> str:
    return f"{value:g}"


def timing_candidates(*, length_family: str = "laplace") -> list[Candidate]:
    """Point-estimator grid for model selection. Other length families are a second pass."""

    base = ForecastConfig(length_family=length_family)
    candidates: list[Candidate] = []
    for alias in MANDATORY_BASELINE_ALIASES:
        native = {
            "last_cycle": "v0.baseline.last_cycle",
            "mean": "v0.baseline.mean",
            "median": "v0.baseline.median",
            "rolling_mean": "v0.baseline.rolling_mean",
            "rolling_median": "v0.baseline.rolling_median",
            "recency_weighted_mean": "v0.baseline.recency_weighted_mean",
            "recency_weighted_median": "v0.baseline.recency_weighted_median",
            "population_prior": "v0.baseline.population_prior",
        }[alias]
        candidates.append((alias, native, base))

    shrinkage_models = (
        ("shrinkage", "median", SHRINKAGE_K_GRID),
        ("shrinkage_mean", "mean", SHRINKAGE_K_GRID),
        ("shrinkage_last", "last", SHRINKAGE_K_GRID),
        ("shrinkage_recency", "recency_median", RECENCY_K_GRID),
    )
    for alias, stem, grid in shrinkage_models:
        for k in grid:
            cfg = base.model_copy(update={"shrinkage_k": k})
            tag = f"v0.shrinkage.{stem}.k{_k_tag(k)}.{length_family}"
            candidates.append((alias, tag, cfg))

    for k in BLEND_K_GRID:
        for blend in BLEND_GRID:
            cfg = base.model_copy(update={"shrinkage_k": k, "blend_last": blend})
            tag = f"v0.shrinkage.median.k{_k_tag(k)}.blend{_k_tag(blend)}.{length_family}"
            candidates.append(("shrinkage", tag, cfg))
    for k in BLEND_K_GRID:
        for radius in CLIP_GRID:
            cfg = base.model_copy(update={"shrinkage_k": k, "personal_clip_radius": radius})
            tag = f"v0.shrinkage.median.k{_k_tag(k)}.clip{_k_tag(radius)}.{length_family}"
            candidates.append(("shrinkage", tag, cfg))
    return candidates


def family_candidates(
    point: Candidate,
    *,
    train_lengths: list[int],
    asymmetries: tuple[float, ...] = (1.3, 1.6),
) -> list[Candidate]:
    alias, tag, cfg = point
    parsed = _parse_candidate_id(tag)
    extras: dict[str, object] = {
        "shrinkage_k": parsed["shrinkage_k"],
        "blend_last": parsed["blend_last"],
        "personal_clip_radius": parsed["personal_clip_radius"],
    }
    sigma = fit_lognormal_sigma(train_lengths)
    empirical = tuple(
        fit_empirical_pmf(
            train_lengths,
            min_length=MIN_CYCLE_LENGTH,
            max_length=MAX_CYCLE_LENGTH,
        )
    )
    out: list[Candidate] = [point]
    log_cfg = cfg.model_copy(
        update={**extras, "length_family": "lognormal", "lognormal_sigma": sigma}
    )
    out.append((alias, _retarget_family(tag, "lognormal"), log_cfg))
    emp_cfg = cfg.model_copy(
        update={**extras, "length_family": "empirical", "empirical_probabilities": empirical}
    )
    out.append((alias, _retarget_family(tag, "empirical"), emp_cfg))
    for skew in asymmetries:
        a_cfg = cfg.model_copy(
            update={**extras, "length_family": "asymmetric_laplace", "laplace_asymmetry": skew}
        )
        a_tag = _retarget_family(tag, "asymmetric_laplace") + f".a{_k_tag(skew)}"
        out.append((alias, a_tag, a_cfg))
    return out


def _retarget_family(tag: str, family: str) -> str:
    parsed = _parse_candidate_id(tag)
    stem = _shrinkage_stem(parsed["point_estimator"])
    if stem is None:
        return tag.rsplit(".", 1)[0] + f".{family}" if "." in tag else f"{tag}.{family}"
    parts = [f"v0.shrinkage.{stem}.k{_k_tag(parsed['shrinkage_k'])}"]
    if parsed["blend_last"]:
        parts.append(f"blend{_k_tag(parsed['blend_last'])}")
    if parsed["personal_clip_radius"]:
        parts.append(f"clip{_k_tag(parsed['personal_clip_radius'])}")
    parts.append(family)
    return ".".join(parts)


def _shrinkage_stem(point_estimator: str) -> str | None:
    mapping = {
        "shrinkage": "median",
        "shrinkage_median": "median",
        "shrinkage_mean": "mean",
        "shrinkage_last": "last",
        "shrinkage_recency": "recency_median",
        "shrinkage_recency_median": "recency_median",
    }
    return mapping.get(point_estimator)


def fit_mcphases_prior(
    series: Sequence[PersonHoldoutSeries],
    *,
    location: str = "pooled",
    source: str = DATASET_LABEL,
) -> PopulationPrior:
    if location == "person_median":
        by_person: dict[str, list[int]] = {}
        for item in series:
            by_person.setdefault(item.person_id, []).extend(item.cycle_lengths)
        medians = [float(np.median(values)) for values in by_person.values() if values]
        pooled = [length for values in by_person.values() for length in values]
        if not medians or not pooled:
            return fit_population_prior([], source=source)
        median = float(np.median(np.asarray(medians, dtype=np.float64)))
        values = np.asarray(pooled, dtype=np.float64)
        mad = float(np.median(np.abs(values - median)))
        if mad < 1e-9:
            mad = 1.0
        return PopulationPrior(
            median_length=median,
            mad_length=mad,
            mean_length=float(np.mean(values)),
            n_users=len(medians),
            n_cycles=int(values.size),
            source=source,
        )
    prior = fit_population_prior(
        [item.cycle_lengths for item in series],
        source=source,
    )
    n_people = len({item.person_id for item in series})
    n_cycles = sum(len(item.cycle_lengths) for item in series)
    return prior.model_copy(update={"n_users": n_people, "n_cycles": n_cycles})


def _run_candidates(
    test: Sequence[PersonHoldoutSeries],
    prior: PopulationPrior,
    candidates: list[Candidate],
) -> list[pd.DataFrame]:
    frames: list[pd.DataFrame] = []
    for alias, tag, cfg in candidates:
        frame = walk_forward_cohort(test, models=[alias], prior=prior, config=cfg)
        if frame.empty:
            continue
        tagged = frame.copy()
        tagged["model_id"] = tag
        frames.append(tagged)
    return frames


def score_with_fixed_prior(
    test: Sequence[PersonHoldoutSeries],
    prior: PopulationPrior,
    candidates: list[Candidate],
    *,
    notice: str,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Walk-forward on `test` with a prior that must not be fitted on those people."""

    frames = _run_candidates(test, prior, candidates)
    rows = pd.concat(frames, ignore_index=True) if frames else pd.DataFrame()
    if not rows.empty:
        assert_no_future_dates(rows)
        rows.insert(0, "notice", notice)
        rows.insert(1, "engine_version", ENGINE_VERSION)
    summary = summarize_metrics(rows)
    if not summary.empty:
        summary.insert(0, "notice", notice)
    return rows, summary


def run_mcphases_benchmark(
    series: list[McphasesSeries],
    *,
    test_fraction: float = 0.3,
    seed: int = 2026,
    candidates: list[Candidate] | None = None,
    prior_location: str = "pooled",
) -> tuple[pd.DataFrame, pd.DataFrame, PopulationPrior, list[McphasesSeries], list[McphasesSeries]]:
    train, test = split_by_person(series, test_fraction=test_fraction, seed=seed)
    prior = fit_mcphases_prior(train, location=prior_location)
    chosen = candidates or timing_candidates()
    frames = _run_candidates(test, prior, chosen)
    rows = pd.concat(frames, ignore_index=True) if frames else pd.DataFrame()
    if not rows.empty:
        assert_no_future_dates(rows)
    summary = summarize_metrics(rows)
    if not rows.empty:
        rows.insert(0, "notice", MCPHASES_DATA_NOTICE)
        rows.insert(1, "engine_version", ENGINE_VERSION)
    if not summary.empty:
        summary.insert(0, "notice", MCPHASES_DATA_NOTICE)
    return rows, summary, prior, train, test


def run_loo_benchmark(
    series: Sequence[PersonHoldoutSeries],
    *,
    candidates: list[Candidate] | None = None,
    prior_location: str = "pooled",
    notice: str = MCPHASES_DATA_NOTICE,
    prior_source: str = DATASET_LABEL,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Leave one person out. Prior never includes the scored person's cycles."""

    people = sorted({item.person_id for item in series})
    chosen = candidates or timing_candidates()
    frames: list[pd.DataFrame] = []
    for person in people:
        train = [item for item in series if item.person_id != person]
        test = [item for item in series if item.person_id == person]
        if all(len(item.period_starts) < 2 for item in test):
            continue
        prior = fit_mcphases_prior(train, location=prior_location, source=prior_source)
        frames.extend(_run_candidates(test, prior, chosen))
    rows = pd.concat(frames, ignore_index=True) if frames else pd.DataFrame()
    if not rows.empty:
        assert_no_future_dates(rows)
        rows.insert(0, "notice", notice)
        rows.insert(1, "engine_version", ENGINE_VERSION)
    summary = summarize_metrics(rows)
    if not summary.empty:
        summary.insert(0, "notice", notice)
    return rows, summary


def select_winner(summary: pd.DataFrame) -> Winner:
    overall = summary[summary["subgroup"] == "all"].copy()
    if overall.empty:
        raise ValueError("mcPHASES summary has no overall rows")
    median_hits = overall[overall["model_id"] == MEDIAN_MODEL_ID]
    if median_hits.empty:
        raise ValueError("mcPHASES summary is missing the median baseline")
    median_row = median_hits.iloc[0]
    median_mae = float(median_row["mae"])
    median_cov = float(median_row["coverage_80"])
    eligible: list[pd.Series] = []
    for _, row in overall.iterrows():
        mae = float(row["mae"])
        cov = float(row["coverage_80"])
        if mae <= median_mae - MAE_IMPROVEMENT and cov >= median_cov - COVERAGE_SLACK:
            eligible.append(row)
    if not eligible:
        parsed = _parse_candidate_id(MEDIAN_MODEL_ID)
        return {
            **parsed,
            "mae": median_mae,
            "coverage_80": median_cov,
            "n": int(median_row["n"]),
            "reason": (
                "no candidate beat median MAE by "
                f"{MAE_IMPROVEMENT} days without harming 80% coverage"
            ),
        }
    best_mae = min(float(row["mae"]) for row in eligible)
    near = [row for row in eligible if float(row["mae"]) <= best_mae + MAE_IMPROVEMENT]
    best = min(near, key=lambda row: (_complexity(str(row["model_id"])), float(row["mae"])))
    parsed = _parse_candidate_id(str(best["model_id"]))
    return {
        **parsed,
        "mae": float(best["mae"]),
        "coverage_80": float(best["coverage_80"]),
        "n": int(best["n"]),
        "reason": (
            f"lowest eligible MAE vs median {median_mae:.3f} "
            f"(coverage {float(best['coverage_80']):.3f} vs {median_cov:.3f})"
        ),
    }


def build_released_model(
    *,
    series: list[McphasesSeries],
    winner: Winner,
    prior_location: str = "pooled",
) -> ReleasedModel:
    prior = fit_mcphases_prior(series, location=prior_location)
    all_lengths = [length for item in series for length in item.cycle_lengths]
    family = winner["length_family"]
    sigma = fit_lognormal_sigma(all_lengths)
    empirical = None
    if family == "empirical":
        empirical = tuple(
            fit_empirical_pmf(
                all_lengths,
                min_length=MIN_CYCLE_LENGTH,
                max_length=MAX_CYCLE_LENGTH,
            )
        )
    point_estimator = winner["point_estimator"]
    model_id = _released_model_id(winner)
    return ReleasedModel(
        model_id=model_id,
        engine_version=ENGINE_VERSION,
        dataset=DATASET_LABEL,
        n_users=prior.n_users,
        n_cycles=prior.n_cycles,
        n_series=len(series),
        population_median=prior.median_length,
        population_mad=prior.mad_length,
        population_mean=prior.mean_length,
        shrinkage_k=winner["shrinkage_k"],
        blend_last=winner["blend_last"],
        personal_clip_radius=winner["personal_clip_radius"],
        length_family=family,
        lognormal_mu=math.log(max(prior.median_length, 1.0)),
        lognormal_sigma=sigma,
        laplace_asymmetry=winner["laplace_asymmetry"],
        prior_location=prior_location,
        empirical_probabilities=empirical,
        point_estimator=point_estimator,
        selection_mae=winner["mae"],
        selection_coverage_80=winner["coverage_80"],
        selection_n=winner["n"],
        selection_reason=winner["reason"],
    )


def write_mcphases_reports(
    summary: pd.DataFrame,
    rows: pd.DataFrame,
    winner: Winner,
    output_dir: Path,
    *,
    protocol: str = "holdout",
) -> tuple[Path, Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    prefix = "mcphases_loo" if protocol == "loo" else "mcphases"
    csv_path = output_dir / f"{prefix}_summary.csv"
    detail_path = output_dir / f"{prefix}_steps.csv"
    md_path = output_dir / f"{prefix}_report.md"
    summary.to_csv(csv_path, index=False)
    rows.to_csv(detail_path, index=False)
    md_path.write_text(_render_markdown(summary, winner, protocol=protocol), encoding="utf-8")
    return md_path, csv_path, detail_path


def _released_model_id(winner: Winner) -> str:
    family = winner["length_family"]
    stem = _shrinkage_stem(winner["point_estimator"])
    if stem is None:
        if family != "laplace":
            return f"v0.baseline.{winner['point_estimator']}.{family}"
        if winner["point_estimator"] == "median":
            return MEDIAN_MODEL_ID
        return f"v0.baseline.{winner['point_estimator']}"
    parts = [f"v0.shrinkage.{stem}"]
    if winner["blend_last"]:
        parts.append(f"blend{_k_tag(winner['blend_last'])}")
    if winner["personal_clip_radius"]:
        parts.append(f"clip{_k_tag(winner['personal_clip_radius'])}")
    parts.append(family)
    return ".".join(parts)


def _parse_candidate_id(model_id: str) -> CandidateSpec:
    match = SHRINKAGE_ID.match(model_id)
    if match:
        stem, k_text, blend_text, clip_text, family = match.groups()
        family_name = family
        asymmetry = 1.0
        if family_name.startswith("asymmetric_laplace"):
            family_name, _, maybe_a = family_name.partition(".a")
            if maybe_a:
                asymmetry = float(maybe_a)
            family_name = "asymmetric_laplace"
        estimator = {
            "median": "shrinkage",
            "mean": "shrinkage_mean",
            "last": "shrinkage_last",
            "recency_median": "shrinkage_recency",
        }[stem]
        return {
            "model_id": model_id,
            "point_estimator": estimator,
            "length_family": family_name,
            "shrinkage_k": float(k_text),
            "blend_last": float(blend_text) if blend_text else 0.0,
            "personal_clip_radius": float(clip_text) if clip_text else None,
            "laplace_asymmetry": asymmetry,
        }
    aliases = {
        "v0.baseline.last_cycle": "last_cycle",
        "v0.baseline.mean": "mean",
        "v0.baseline.median": "median",
        "v0.baseline.rolling_mean": "rolling_mean",
        "v0.baseline.rolling_median": "rolling_median",
        "v0.baseline.recency_weighted_mean": "recency_weighted_mean",
        "v0.baseline.recency_weighted_median": "recency_weighted_median",
        "v0.baseline.population_prior": "population_prior",
    }
    return {
        "model_id": model_id,
        "point_estimator": aliases.get(model_id, "median"),
        "length_family": "laplace",
        "shrinkage_k": 2.0,
        "blend_last": 0.0,
        "personal_clip_radius": None,
        "laplace_asymmetry": 1.0,
    }


def _complexity(model_id: str) -> tuple[int, ...]:
    parsed = _parse_candidate_id(model_id)
    estimator = parsed["point_estimator"]
    estimator_rank = {
        "median": 0,
        "mean": 1,
        "last_cycle": 2,
        "rolling_median": 3,
        "rolling_mean": 4,
        "recency_weighted_median": 5,
        "recency_weighted_mean": 6,
        "population_prior": 7,
        "shrinkage": 8,
        "shrinkage_mean": 9,
        "shrinkage_last": 10,
        "shrinkage_recency": 11,
    }.get(estimator, 12)
    extras = 0
    if parsed["blend_last"] > 0.0:
        extras += 1
    if parsed["personal_clip_radius"]:
        extras += 1
    family_rank = {
        "laplace": 0,
        "asymmetric_laplace": 1,
        "lognormal": 2,
        "empirical": 3,
    }.get(parsed["length_family"], 9)
    return (estimator_rank, extras, family_rank)


def _render_markdown(summary: pd.DataFrame, winner: Winner, *, protocol: str) -> str:
    generated = datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    overall = summary[summary["subgroup"] == "all"].copy()
    protocol_label = (
        "Leave-one-person-out walk-forward. Prior fitted on the other people only."
        if protocol == "loo"
        else "Person-level holdout walk-forward. Prior fitted on train people only."
    )
    lines = [
        "# OpenCiclo mcPHASES timing benchmark",
        "",
        f"**Data:** {MCPHASES_DATA_NOTICE}",
        f"**Dataset:** {DATASET_LABEL}",
        f"**Engine:** {ENGINE_VERSION}",
        f"**Protocol:** {protocol}",
        f"**Generated:** {generated}",
        "",
        protocol_label,
        "These aggregate metrics are the model-selection criterion. They are not",
        "worldwide clinical accuracy. Do not redistribute the underlying CSV.",
        "",
        "## Selected model",
        "",
        f"- candidate id: `{winner['model_id']}`",
        f"- point estimator: `{winner['point_estimator']}`",
        f"- length family: `{winner['length_family']}`",
        f"- shrinkage k: {winner['shrinkage_k']}",
        f"- blend last: {winner['blend_last']}",
        f"- clip radius: {winner['personal_clip_radius']}",
        f"- holdout MAE: {winner['mae']:.3f}",
        f"- holdout 80% coverage: {winner['coverage_80']:.3f}",
        f"- holdout n: {winner['n']}",
        f"- reason: {winner['reason']}",
        "",
        "## Overall",
        "",
        _markdown_table(overall),
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


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Evaluate OpenCiclo timing models on local mcPHASES data."
    )
    parser.add_argument(
        "--csv", type=Path, default=None, help="Path to hormones_and_selfreport.csv"
    )
    parser.add_argument(
        "--fit-release",
        action="store_true",
        help="Write openciclo/artifacts/released_model.json",
    )
    parser.add_argument(
        "--protocol",
        choices=("loo", "holdout"),
        default="loo",
        help="loo = leave one person out (default); holdout = 30%% people",
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
        help="Directory for local reports (gitignored)",
    )
    parser.add_argument("--artifact-path", type=Path, default=None)
    parser.add_argument("--seed", type=int, default=2026)
    parser.add_argument("--test-fraction", type=float, default=0.3)
    args = parser.parse_args(argv)

    csv_path = args.csv or default_mcphases_csv()
    if not csv_path.is_file():
        print(f"Skipping mcPHASES evaluation: CSV not found at {csv_path}")
        if args.fit_release:
            return 1
        return 0

    series = load_mcphases_series(csv_path)
    candidates = timing_candidates()
    if args.protocol == "loo":
        rows, summary = run_loo_benchmark(
            series, candidates=candidates, prior_location=args.prior_location
        )
    else:
        rows, summary, _prior, _train, _test = run_mcphases_benchmark(
            series,
            test_fraction=args.test_fraction,
            seed=args.seed,
            candidates=candidates,
            prior_location=args.prior_location,
        )
    winner = select_winner(summary)
    md_path, csv_out, detail_path = write_mcphases_reports(
        summary, rows, winner, args.output_dir, protocol=args.protocol
    )
    print(f"Wrote {md_path}")
    print(f"Wrote {csv_out}")
    print(f"Wrote {detail_path}")
    print(f"Winner: {winner['model_id']} ({winner['reason']})")
    if args.fit_release:
        released = build_released_model(
            series=series, winner=winner, prior_location=args.prior_location
        )
        artifact = write_released_model(released, args.artifact_path)
        print(f"Wrote {artifact}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
