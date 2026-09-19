# What Ciclo is (and is not)

Ciclo is the web app for OpenCiclo. You log period starts and daily notes. The app forecasts **when the next period is likely to start**, and it keeps the diary encrypted on your device before anything is stored.

It is a logging and forecasting tool. Forecasts can be wrong.

## What it does

- Records period starts, flow, mucus, symptoms, and short day notes.
- Encrypts that diary in the browser, then stores the encrypted blob.
- Forecasts the next period start as a probability over upcoming days, not a single certain date.
- Optionally labels the current cycle phase (menstrual, follicular, ovulation, luteal) as an educational calendar guess.

## What it does not do

- It is **not** a medical device and not a diagnosis.
- It is **not** contraception and not a fertility or ovulation test.
- It does **not** predict pregnancy.
- It does **not** read your diary on the server. The host stores ciphertext.

If a screen in Ciclo sounds clinical, treat it as context for your own records. For pain, very heavy bleeding, or sudden cycle changes, talk with a clinician. The in-app **Learn** tab is general health information; this Help section is about the software.

## Two layers

**OpenCiclo** is the Python forecasting library. It can run on a laptop with no account.

**Ciclo** is the optional hosted UI. Same forecast math, running in the browser, with an encrypted diary behind email + password or a 12-word phrase.

You can use the library without the app. You cannot use the hosted app as a way for us to see your dates.
