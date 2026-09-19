# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

from enum import StrEnum


class ObservationStatus(StrEnum):
    """Whether an event was positively observed.

    UNKNOWN is not the same as “did not happen”.
    """

    OBSERVED = "observed"
    UNKNOWN = "unknown"


class IssueSeverity(StrEnum):
    ERROR = "error"
    WARNING = "warning"
    NOTE = "note"


class UncertaintyLevel(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class FeatureImportance(StrEnum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class FlowLevel(StrEnum):
    SPOTTING = "spotting"
    LIGHT = "light"
    MEDIUM = "medium"
    HEAVY = "heavy"


class LHResult(StrEnum):
    NEGATIVE = "negative"
    POSITIVE = "positive"
    INDETERMINATE = "indeterminate"


class CervicalMucus(StrEnum):
    DRY = "dry"
    STICKY = "sticky"
    CREAMY = "creamy"
    WATERY = "watery"
    EGGWHITE = "eggwhite"


class SymptomIntensity(StrEnum):
    NONE = "none"
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"


class EvidenceStrength(StrEnum):
    """Starting evidentiary priors for optional signals. Not V0 model weights."""

    VERY_HIGH = "very_high"
    HIGH = "high"
    MEDIUM = "medium"
    LOW_MEDIUM = "low_medium"
    LOW = "low"
