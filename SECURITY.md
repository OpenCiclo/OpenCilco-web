# Security

OpenCiclo handles menstrual-health data. Treat it as sensitive.

## Reporting a vulnerability

If the project has a public GitHub (or similar) repository, use **private vulnerability advisories**.

Do not open a public issue that includes:

- personal health data
- exploit details that would put users at immediate risk
- private keys or recovery material

If advisories are not available yet, contact the copyright holders listed in [NOTICE](NOTICE) through a private channel.

## What this project will not do

- Custom cryptographic protocols
- Mandatory telemetry or third-party analytics
- Logging of period dates, symptoms, or other health observations
- Bundling “sync” with “give us your data for research”

## Local data

Until a reference app exists, the library keeps data in the caller’s process. Future local storage (SQLite, browser storage) must encrypt at rest where the platform makes that meaningful, and must never put health fields in URLs or crash reports.

See [docs/threat-model.md](docs/threat-model.md) and [PRIVACY.md](PRIVACY.md).
