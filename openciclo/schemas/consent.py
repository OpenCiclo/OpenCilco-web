# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from pydantic import BaseModel, ConfigDict, Field


class Consent(BaseModel):
    """Independent consent flags. Never implied by using the engine."""

    model_config = ConfigDict(extra="forbid")

    sync_consent: bool = False
    research_consent: bool = False
    telemetry_consent: bool = False
    notes: str | None = Field(
        default=None,
        description="Free-text audit note; must not contain health observations.",
    )
