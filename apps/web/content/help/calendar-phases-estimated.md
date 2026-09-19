# Calendar phases and “estimated”

On the Calendar home card, Ciclo may show something like **Cycle day 7** and **Follicular · estimated**. The phase name is the claim. The word **estimated** (Spanish UI: **estimada**) is a confidence label, not a second phase.

This page is about **what the app is doing**. For general biology of the cycle, use the **Learn** tab.

## What “estimated” means

**Estimated** means: this phase is inferred from calendar timing and your logged period history. It is **not** confirmed by a measurement that day.

| Source | When it appears | Meaning |
| --- | --- | --- |
| Observed | Flow is logged on that day | Phase is **Menstrual**, from the diary |
| Estimated | No flow that day, forecasting is on, and Ciclo can place the day inside a cycle | Phase is a timing guess |

**Follicular · estimated** does not mean “we scored how follicular you are.” It means: “we think you are in the follicular part of the cycle, and that guess is estimated.”

## The four labels

| Phase | Inner season (if enabled) | Rough idea in the UI |
| --- | --- | --- |
| Menstrual | Winter | Bleeding / early cycle |
| Follicular | Spring | After bleeding, before the estimated ovulation window |
| Ovulation | Summer | Timing window before the next expected period start |
| Luteal | Fall | After that window, until the next period |

These labels are educational context. They are not a diagnosis, a fertility test, or contraception.

## How Ciclo picks a phase

1. Find the cycle that contains today: last period start on or before today, and the next start (logged, or the forecast most-likely date).
2. If today’s diary has **flow** → **Menstrual**, source **observed**.
3. Otherwise, if estimated phases are allowed:
   - Days from cycle start through the expected bleeding length → **Menstrual**, still **estimated** if you did not log flow.
   - A window about **16–10 days before** the next period start → **Ovulation**, estimated.
   - Before that window → **Follicular**, estimated.
   - After that window → **Luteal**, estimated.

If you turn forecasting off, Ciclo only shows a phase when flow is observed.

## Not the same as the period forecast

The forecast engine predicts the **next period start**. Phase labels reuse those dates as a calendar story. They are not a clinical ovulation model.

OpenCiclo does not claim to confirm ovulation. Do not use Ciclo as birth control.

## When it can look wrong

- Cycles vary a lot in length.
- Starts or flow were logged late or incompletely.
- There is little history, so the next start leans on a population typical length.
- Real ovulation is not sitting in that fixed pre-period window.

That is why **estimated** stays on the card.
