# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from openciclo.schemas.enums import IssueSeverity, ObservationStatus


class QualityIssue(BaseModel):
    model_config = ConfigDict(extra="forbid")

    code: str
    severity: IssueSeverity
    message: str
    cycle_id: str | None = None


class PeriodStart(BaseModel):
    model_config = ConfigDict(extra="forbid")

    date: date
    status: ObservationStatus = ObservationStatus.OBSERVED
    source: str = "user"


class Cycle(BaseModel):
    """One cycle anchored at a period start.

    ``length_days`` is the gap to the *next* known start, or None for the
    still-open cycle after the last start.
    """

    model_config = ConfigDict(extra="forbid")

    cycle_id: str
    period_start: date
    period_end: date | None = None
    status: ObservationStatus = ObservationStatus.OBSERVED
    source: str = "user"
    length_days: int | None = None
    quality_flags: list[str] = Field(default_factory=list)


class PeriodHistory(BaseModel):
    model_config = ConfigDict(extra="forbid")

    starts: list[PeriodStart] = Field(min_length=1)

    def ordered_dates(self) -> list[date]:
        return sorted(item.date for item in self.starts)
