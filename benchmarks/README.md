# Benchmarks

Run the synthetic V0 suite (non-production data):

```bash
python -m openciclo.evaluation
```

or:

```bash
python scripts/run_benchmarks.py
```

Reports are written to `benchmarks/results/` and are generated from actual
walk-forward experiments. That directory is gitignored; reproduce locally
instead of copying numbers by hand.

**SYNTHETIC / NON-PRODUCTION:** default data are simulated. They are for
pipeline correctness, not clinical or product accuracy claims.
