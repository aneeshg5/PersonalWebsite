# Cryogenic Flow Classifier — ML / Aerospace Project

**Type:** Personal Project (developed during NASA Human Lander Challenge)
**Categories:** ML/AI, Aerospace
**Stack:** Python, NumPy, SciPy, scikit-learn, fcmeans, pandas, matplotlib, pytest
**GitHub:** https://github.com/aneeshg5/Cryogenic-Flow-Classifier
**Paper:** https://github.com/aneeshg5/Cryogenic-Flow-Classifier/blob/main/paper/HuLC_Tech_Paper.pdf
**Video:** https://www.youtube.com/watch?v=Gxhk1hIIWIo

## Overview

Implementation of a capacitance sensor pipeline from UIUC's NASA Human Lander Challenge (ECLIPSE team) submission. Identifies the flow regime inside a cryogenic propellant transfer line in real time using only a non-intrusive electrical signal. Work presented at Marshall Space Flight Center; reviewed by NASA's Cryogenic Fluid Management team.

## Problem

Transferring liquid oxygen and methane in microgravity creates unpredictable two-phase flow. The active flow regime — slug, intermittent, or annular — determines transfer efficiency, boil-off rate, and engine start safety for NASA Artemis missions. No reliable real-time classifier existed for microgravity two-phase cryogenic flow from a non-intrusive sensor.

## Signal Pipeline

```
Raw capacitance signal
        │
        ▼
  Void fraction  →  α = (C_L − C_M) / (C_L − C_G) × 100%
        │
        ▼
  Nonlinear correction  →  α_c = k·α² + (1 − 100k)·α
        │
        ▼
  Windowed features: [mean, variance, kurtosis] per 0.1 s window
        │
        ▼
  Fuzzy c-means → Slug / Intermittent / Annular
```

**Sensor:** Asymmetric parallel-plate capacitor around a 10-inch pipe, 25 V excitation, ≥200 Hz sampling. Non-intrusive — no physical contact with the flow.

**Void fraction:** Linear extraction from the raw capacitance reading using calibrated liquid (C_L) and gas (C_G) reference values, then a nonlinear correction (Equation 1 of the ECLIPSE paper) to account for the non-uniform electric field geometry of a parallel-plate sensor around a cylindrical pipe.

**Features:** Windowed mean, variance, and raw 4th central moment computed per 0.1-second window. The 4th moment is computed as `scipy.stats.moment(x, 4)` — the raw central moment, not Fisher-corrected kurtosis — to preserve the absolute scale information that distinguishes regimes.

## Flow Regimes

| Regime | Physical Description | Signal Signature |
|--------|---------------------|-----------------|
| **Slug** | Intermittent large vapor bubbles in liquid-dominated flow | High capacitance, high variance, spiky signal |
| **Intermittent** | Transitional between slug and annular | Moderate capacitance, moderate variance |
| **Annular** | Stable vapor core with thin liquid wall film | Low capacitance, smooth low-variance signal |

## Data Generation — ANSYS CFD Simulation

Training data generated via ANSYS Fluent CFD simulations (Eulerian multiphase model, SST k-ω turbulence). Mesh: 227,561 nodes, 971,603 elements (swept mesh, pressure-based transient solver). Simulated all three flow regimes; extracted cross-sectional void fraction and converted to time-resolved capacitance signals for the classifier feature extraction pipeline.

## Data Augmentation — Gaussian Process Regression

Microgravity CFD data is inherently scarce. GPR (RBF + WhiteKernel kernel) interpolates additional training samples between the simulated ANSYS data points, targeting the slug and intermittent classes where simulation coverage was thinnest. This resolved class imbalance and improved classifier robustness at regime boundaries — the hardest region to get right in a fuzzy classifier.

## Classifier — Fuzzy C-Means

`fcmeans.FCM(n_clusters=3)` in the 3D windowed-feature space (mean, variance, kurtosis). After fitting, clusters are relabeled by ascending mean capacitance to produce consistent Annular / Intermittent / Slug assignments regardless of random initialization order. The fuzzy membership values (rather than hard assignments) allow the classifier to express uncertainty at regime boundaries, which is physically meaningful since slug-to-intermittent transitions are gradual.

The demo runs without ANSYS data via `sensor_sim.py`, which generates realistic synthetic capacitance traces for all three regimes.

## Testing

13 pytest tests covering: physics invariants (void fraction bounds, nonlinear correction monotonicity), feature extraction correctness (moment computation vs reference values), and classifier relabeling consistency across random seeds.
