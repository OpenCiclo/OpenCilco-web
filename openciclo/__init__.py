# Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
# SPDX-License-Identifier: Apache-2.0

"""OpenCiclo: privacy-first menstrual-cycle forecasting engine."""

from openciclo.constants import ENGINE_VERSION
from openciclo.forecasting.engine import predict
from openciclo.schemas.forecast import Forecast

__version__ = ENGINE_VERSION
__all__ = ["Forecast", "__version__", "predict"]
