# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from openciclo.schemas.enums import CervicalMucus, FlowLevel, LHResult, SymptomIntensity


class DailyObservation(BaseModel):
    """Optional daily log. V0 baselines do not use these fields for prediction."""

    model_config = ConfigDict(extra="forbid")

    date: date
    cycle_day: int | None = None
    flow: FlowLevel | None = None
    cramps: SymptomIntensity | None = None
    breast_tenderness: SymptomIntensity | None = None
    headache: SymptomIntensity | None = None
    mood: str | None = None
    other_symptoms: list[str] = Field(default_factory=list)
    bbt_celsius: float | None = None
    lh_test: LHResult | None = None
    ovulation_observed: bool | None = None
    cervical_mucus: CervicalMucus | None = None
    sleep_quality: SymptomIntensity | None = None
    stress: SymptomIntensity | None = None
    exercise: str | None = None
    contraception: str | None = None
    sexual_activity: bool | None = None
