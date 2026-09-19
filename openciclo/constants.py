# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""Project-wide constants. Thresholds here are documented assumptions, not medical facts."""

from datetime import date

ENGINE_VERSION = "0.2.1"
ENGINE_NAME = "openciclo"

# Discrete support for V0 cycle-length PMFs (calendar days from last start to next start).
MIN_CYCLE_LENGTH = 1
MAX_CYCLE_LENGTH = 90

# Unusual-but-valid bands. Values outside these are kept unless mathematically impossible.
UNUSUAL_SHORT_DAYS = 21
UNUSUAL_LONG_DAYS = 45
SUSPICIOUS_SHORT_DAYS = 10
SUSPICIOUS_LONG_DAYS = 60
INCOMPLETE_HISTORY_DAYS = 40

DEFAULT_ROLLING_WINDOW = 6
DEFAULT_RECENCY_LAMBDA = 0.90
RECENCY_LAMBDA_GRID = (0.70, 0.80, 0.90, 0.95, 1.00)

# Laplace scale floor so identical histories do not imply certainty.
MIN_LAPLACE_SCALE = 0.75

# Literature placeholder prior (see docs/modeling.md). Not an OpenCiclo-fitted estimate.
PLACEHOLDER_PRIOR_MEDIAN = 29.0
PLACEHOLDER_PRIOR_MAD = 4.0
PLACEHOLDER_PRIOR_MEAN = 29.0

SYNTHETIC_DATA_NOTICE = "SYNTHETIC / NON-PRODUCTION"
MCPHASES_DATA_NOTICE = "mcPHASES restricted / do not redistribute"
MCPHASES_CSV_ENV = "OPENCICLO_MCPHASES_CSV"

DEFAULT_SHRINKAGE_K = 2.0
DEFAULT_LENGTH_FAMILY = "laplace"
DEFAULT_LOGNORMAL_SIGMA = 0.18

CREIGHTON_DATA_NOTICE = "Creighton/Utah cycle lengths / do not redistribute"
CREIGHTON_CSV_ENV = "OPENCICLO_CREIGHTON_CSV"
KAGGLE_FACTORS_DATA_NOTICE = "Kaggle synthetic cycle factors / non-production"
KAGGLE_FACTORS_CSV_ENV = "OPENCICLO_KAGGLE_FACTORS_CSV"
MCPHASES_EPOCH = date(1970, 1, 1)
MENSTRUAL_PHASE = "Menstrual"

PROBABILITY_WINDOWS = (1, 2, 3, 5)
DEFAULT_INTERVAL_COVERAGE = 0.80
PMF_FLOOR = 1e-12
