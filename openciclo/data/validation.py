# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from openciclo.schemas.config import ForecastConfig
from openciclo.schemas.cycle import Cycle, PeriodHistory, PeriodStart, QualityIssue
from openciclo.schemas.enums import IssueSeverity, ObservationStatus
from openciclo.schemas.observations import DailyObservation


def validate_history(
    history: PeriodHistory | list[PeriodStart],
    *,
    reference_date: date | None = None,
    period_ends: dict[date, date] | None = None,
    config: ForecastConfig | None = None,
) -> list[QualityIssue]:
    """Return quality issues. Unusual biology is a warning/note, not silent deletion."""

    cfg = config or ForecastConfig()
    starts = list(history.starts) if isinstance(history, PeriodHistory) else list(history)
    issues: list[QualityIssue] = []
    if not starts:
        issues.append(
            QualityIssue(
                code="empty_history",
                severity=IssueSeverity.ERROR,
                message="At least one period start date is required.",
            )
        )
        return issues

    dates = [item.date for item in starts]
    seen: dict[date, int] = {}
    for item in starts:
        seen[item.date] = seen.get(item.date, 0) + 1
    for day, count in seen.items():
        if count > 1:
            issues.append(
                QualityIssue(
                    code="duplicate_period_start",
                    severity=IssueSeverity.ERROR,
                    message=f"Duplicate period start on {day.isoformat()} ({count} entries).",
                )
            )

    ordered = sorted(set(dates))
    for earlier, later in zip(ordered, ordered[1:], strict=False):
        length = (later - earlier).days
        if length <= 0:
            issues.append(
                QualityIssue(
                    code="non_positive_cycle_length",
                    severity=IssueSeverity.ERROR,
                    message=f"Non-positive interval between {earlier} and {later}.",
                )
            )
            continue
        if length < cfg.suspicious_short_days:
            issues.append(
                QualityIssue(
                    code="suspiciously_short_cycle",
                    severity=IssueSeverity.WARNING,
                    message=(
                        f"Cycle of {length} days is suspiciously short; kept as valid-but-unusual."
                    ),
                )
            )
        elif length < cfg.unusual_short_days:
            issues.append(
                QualityIssue(
                    code="unusual_short_cycle",
                    severity=IssueSeverity.NOTE,
                    message=f"Cycle of {length} days is shorter than the usual band; kept.",
                )
            )
        if length > cfg.suspicious_long_days:
            issues.append(
                QualityIssue(
                    code="suspiciously_long_cycle",
                    severity=IssueSeverity.WARNING,
                    message=(
                        f"Cycle of {length} days is suspiciously long; it may be a missed log. "
                        "The observation is kept."
                    ),
                )
            )
        elif length > cfg.unusual_long_days:
            issues.append(
                QualityIssue(
                    code="unusual_long_cycle",
                    severity=IssueSeverity.NOTE,
                    message=f"Cycle of {length} days is longer than the usual band; kept.",
                )
            )

    if reference_date is not None:
        for day in ordered:
            if day > reference_date:
                issues.append(
                    QualityIssue(
                        code="future_period_start",
                        severity=IssueSeverity.WARNING,
                        message=(
                            f"Period start {day.isoformat()} is after reference date "
                            f"{reference_date.isoformat()}."
                        ),
                    )
                )
        last = ordered[-1]
        elapsed = (reference_date - last).days
        if elapsed >= cfg.incomplete_history_days:
            issues.append(
                QualityIssue(
                    code="possibly_incomplete_history",
                    severity=IssueSeverity.NOTE,
                    message=(
                        f"It has been {elapsed} days since the last recorded period "
                        f"({last.isoformat()}). Missing logs are treated as unknown, not as "
                        "proof that a period did not occur."
                    ),
                )
            )

    ends = period_ends or {}
    for start, end in ends.items():
        if end < start:
            issues.append(
                QualityIssue(
                    code="period_end_before_start",
                    severity=IssueSeverity.ERROR,
                    message=f"Period end {end} is before start {start}.",
                )
            )

    ordered_starts = sorted(set(dates))
    for start, next_start in zip(ordered_starts, ordered_starts[1:], strict=False):
        bleeding_end = ends.get(start)
        if bleeding_end is not None and bleeding_end >= next_start:
            issues.append(
                QualityIssue(
                    code="overlapping_periods",
                    severity=IssueSeverity.ERROR,
                    message=(
                        f"Bleeding interval {start}–{bleeding_end} overlaps "
                        f"the next start {next_start}."
                    ),
                )
            )

    unknown = [item for item in starts if item.status is ObservationStatus.UNKNOWN]
    if unknown:
        issues.append(
            QualityIssue(
                code="unknown_status_preserved",
                severity=IssueSeverity.NOTE,
                message=(
                    "One or more starts are marked UNKNOWN. Unknown is not converted into "
                    "a negative (no-period) observation."
                ),
            )
        )

    return issues


def validate_cycles(
    cycles: list[Cycle], *, config: ForecastConfig | None = None
) -> list[QualityIssue]:
    history = PeriodHistory(
        starts=[
            PeriodStart(date=cycle.period_start, status=cycle.status, source=cycle.source)
            for cycle in cycles
        ]
    )
    ends = {
        cycle.period_start: cycle.period_end for cycle in cycles if cycle.period_end is not None
    }
    return validate_history(history, period_ends=ends, config=config)


def validate_observations(
    observations: list[DailyObservation],
    *,
    reference_date: date | None = None,
) -> list[QualityIssue]:
    issues: list[QualityIssue] = []
    seen: dict[date, int] = {}
    for obs in observations:
        seen[obs.date] = seen.get(obs.date, 0) + 1
        if reference_date is not None and obs.date > reference_date:
            issues.append(
                QualityIssue(
                    code="future_observation",
                    severity=IssueSeverity.WARNING,
                    message=f"Observation on {obs.date.isoformat()} is after the reference date.",
                )
            )
        if obs.bbt_celsius is not None and not (30.0 <= obs.bbt_celsius <= 45.0):
            issues.append(
                QualityIssue(
                    code="implausible_bbt",
                    severity=IssueSeverity.WARNING,
                    message=f"BBT {obs.bbt_celsius} °C is outside the plausible range; kept.",
                )
            )
    for day, count in seen.items():
        if count > 1:
            issues.append(
                QualityIssue(
                    code="duplicate_observation_date",
                    severity=IssueSeverity.WARNING,
                    message=f"Multiple daily observations on {day.isoformat()}.",
                )
            )
    return issues
