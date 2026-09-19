# Library API

OpenCiclo
Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
Apache License 2.0

The public Python entry point is `openciclo.predict`. You pass period start dates. You get back a forecast object with a most-likely date, a probability distribution, and an uncertainty label.

You do not need an account, a database, or the web app. One remembered start date is enough to produce a forecast; uncertainty will be high until you have more cycles.

## `openciclo.predict`

```python
from datetime import date
from openciclo import predict

forecast = predict(
    history=[date(2026, 6, 1), date(2026, 6, 29)],
    observations=None,
    reference_date=date(2026, 7, 20),
)
```

### Arguments

| Name | Meaning |
| --- | --- |
| `history` | Period starts: `list[date]`, `list[PeriodStart]`, or `PeriodHistory` |
| `observations` | Optional daily observations. **Ignored by V0 predictors.** |
| `reference_date` | “Today” for the forecast. Defaults to the last start date. |
| `model` | Optional alias (`median`, `shrinkage`, `mean`, …). Default is the released point estimator. |
| `population_prior` | Optional `PopulationPrior`. Default is the aggregate prior in `released_model.json`. |
| `config` | Optional `ForecastConfig` (includes `shrinkage_k` and `length_family`). |

No minimum number of cycles. One date produces a prior-based forecast with high uncertainty.

### Result (`Forecast`)

- `most_likely_date` / `most_likely_cycle_length`
- `daily_probabilities` — calendar dates and P(start that day)
- `probability_within_next_n_days` — from `reference_date` forward
- `probability_within_n_days_of_point` — window around the point date
- `uncertainty` — `low` \| `medium` \| `high`
- `cycle_length_distribution` — discrete PMF, point, scale, assumption string
- `drivers` — features that **contributed to the prediction** (not “caused a period”)
- `model_id` / `model_version`
- `quality_issues` / `notes`

Serialize with Pydantic: `forecast.model_dump(mode="json")`.

## Other entry points

| Function | Module | Use |
| --- | --- | --- |
| `cycles_from_starts` | `openciclo.data.cycles` | Build `Cycle` rows and lengths |
| `validate_history` | `openciclo.data.validation` | Errors vs unusual-but-valid flags |
| `generate_synthetic_cohort` | `openciclo.data.synthetic` | Non-production cohort |
| `fit_population_prior` | `openciclo.models.population` | Train-split prior |
| `walk_forward_cohort` | `openciclo.evaluation.walkforward` | Leak-safe backtest |
| `summarize_metrics` | `openciclo.evaluation.metrics` | Aggregate scores |
| `load_mcphases_series` | `openciclo.data.mcphases` | Restricted local CSV → period starts |
| `load_released_model` | `openciclo.artifacts` | Aggregate published parameters |

## Medical copy

User-facing products must keep the disclaimer: forecasts can be wrong; Ciclo is not a medical device, diagnosis system, or contraceptive method.
