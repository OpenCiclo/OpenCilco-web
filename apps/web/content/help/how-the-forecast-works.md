# How the forecast works

Ciclo does not pick one “certain” date. It builds a **probability distribution** over upcoming days: how likely the next period is to start on each of them. Then it summarises that into a most-likely day, a few window probabilities, and an uncertainty label (low / medium / high).

The same path exists in Python (`openciclo.predict`) and in the browser. The web app does **not** send your dates to a forecast API.

## What is predicted

V1 predicts:

1. Next period start
2. Cycle length

It does **not** predict ovulation, a fertile window for contraception, or pregnancy.

## Where the “typical length” comes from

With little history, the model leans on a published **population prior**: aggregate numbers fitted on the mcPHASES study (42 people in Canada, timing only). That is a convenience typical length, not a worldwide accuracy claim.

As you log more completed cycles, the forecast mixes **your** median length with that prior. The jargon for this mix is **shrinkage**. With few cycles, the prior still weighs a lot. With many, your own history dominates.

Utah / Creighton cycle charts are an external check. They are **not** mixed into the file the app ships (`released_model.json`).

## Uncertainty

Uncertainty stays **high** when you have fewer than about three completed cycles, or when the spread is wide. **Low** needs more history and a tighter spread. The label is a summary, not a second scientific claim.

A day with no log is **unknown**, not proof that the period did not happen.

## Phases vs the forecast

The engine’s job is the **next start**. The words Follicular / Ovulation / Luteal on the home card are a separate calendar heuristic. See [Calendar phases and “estimated”](/help/calendar-phases-estimated).

## Turning forecasts off

Settings can hide forecasts. Your logs and completed-cycle statistics stay. Observed bleeding does not depend on the model.

## Limits worth repeating

- Forecasts can be wrong, especially with irregular cycles or sparse logs.
- Do not use Ciclo as birth control.
- Optional symptoms, temperature, and lab-style signals may be stored in the diary. This release does **not** feed them into the forecast.
