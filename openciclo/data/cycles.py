# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from openciclo.schemas.cycle import Cycle, PeriodHistory, PeriodStart
from openciclo.schemas.enums import ObservationStatus


def cycle_lengths(starts: list[date]) -> list[int]:
    """Return gaps in days between consecutive period-start dates."""

    ordered = sorted(starts)
    return [(later - earlier).days for earlier, later in zip(ordered, ordered[1:], strict=False)]


def cycles_from_starts(
    history: PeriodHistory | list[PeriodStart] | list[date],
    *,
    period_ends: dict[date, date] | None = None,
) -> list[Cycle]:
    """Build normalized Cycle rows. The last cycle has length_days=None (open)."""

    starts = _as_period_starts(history)
    starts_sorted = sorted(starts, key=lambda item: item.date)
    ends = period_ends or {}
    cycles: list[Cycle] = []
    for index, start in enumerate(starts_sorted):
        next_start = starts_sorted[index + 1].date if index + 1 < len(starts_sorted) else None
        length = (next_start - start.date).days if next_start is not None else None
        flags: list[str] = []
        if length is not None and length <= 0:
            flags.append("non_positive_length")
        cycles.append(
            Cycle(
                cycle_id=f"cycle-{index + 1:04d}",
                period_start=start.date,
                period_end=ends.get(start.date),
                status=start.status,
                source=start.source,
                length_days=length,
                quality_flags=flags,
            )
        )
    return cycles


def _as_period_starts(
    history: PeriodHistory | list[PeriodStart] | list[date],
) -> list[PeriodStart]:
    if isinstance(history, PeriodHistory):
        return list(history.starts)
    if not history:
        return []
    first = history[0]
    if isinstance(first, PeriodStart):
        return [item for item in history if isinstance(item, PeriodStart)]
    return [
        PeriodStart(date=item, status=ObservationStatus.OBSERVED, source="user")
        for item in history
        if isinstance(item, date)
    ]
