# NASA Human Lander Challenge — Software & Simulations Lead

**Role:** Software & Simulations Lead (Instrumentation Team Lead)
**Organization:** UIUC ECLIPSE Team — NASA Human Lander Challenge 2026
**Period:** August 2024 – July 2025
**Project:** ECLIPSE — Efficient Cryogenic Low Invasive Propellant Supply Exchange

## Role Summary

Led the software and simulations team on a 19-member UIUC team competing in NASA's Human Lander Challenge. The team designed ECLIPSE — a cryogenic propellant transfer architecture for NASA's Artemis missions. Won **Best Presentation** and **$1,200** among 30+ universities at Marshall Space Flight Center.

## Project Overview

ECLIPSE addresses cryogenic propellant boil-off during in-space tank-to-tank transfer for long-duration Artemis missions. Three-stage approach:
1. **Line Chilldown:** Pulse flow + microfilm coating to minimize propellant boil-off
2. **Tank Chilldown:** Charge-Hold-Vent (CHV) and No-Vent-Fill (NVF) operations
3. **Transfer Monitoring:** Capacitance-based two-phase flow sensor for flow regime identification

Designed to be spacecraft-agnostic — compatible with all HLS variants requiring cryogenic transfer.

## GFSSP Fluid Simulations

Built nodal models in NASA's Generalized Fluid System Simulation Program (GFSSP) to simulate:
- **Pulse flow chilldown:** Compared continuous vs. pulse flow; validated ~20% propellant mass savings from pulse flow
- **Hydraulic shock:** Modeled pressure transients from rapid valve closure; optimized valve close time to ≤2 seconds to stay within 2× nominal pressure
- **Microfilm coating:** Added solid node layer representing FEP microfilm coating; demonstrated faster chilldown

## ANSYS Two-Phase Flow Simulation

Ran ANSYS CFD simulations (Eulerian multiphase model, SST k-omega turbulence) to generate two-phase flow data for slug, annular, and intermittent flow regimes.

- Mesh: 227,561 nodes, 971,603 elements (swept mesh, pressure-based solver, transient)
- Converted cross-sectional void fraction outputs → time-resolved capacitance signals
- Generated 3D flow regime map from simulated capacitance data

## ML Flow Regime Classification

Applied machine learning to classify cryogenic flow regimes in real time from capacitance sensor data.

- Extracted 3 statistical parameters from capacitance time-series: mean, variance, kurtosis
- Applied **Fuzzy c-means clustering** (scikit-learn) to classify slug, annular, and intermittent flow regimes in 3D parameter space
- ML-based time-series augmentation addressed class imbalance (microgravity data is scarce): doubled slug and intermittent data points
- Result: distinct clusters for all 3 flow regimes — visualized as a 3D flow regime map

## CHV-NVF Temperature Transition Calculator

Python program implementing energy balance equation (Clark & Hartwig, 2021) to calculate optimal CHV→NVF transition temperature.

- Computed 141 K (LOX) and 162 K (LCH4) as ideal transition temperatures for 2,770,000L transfer at 95% fill
- Added 0.75% K-type thermocouple error margin
- Determines optimal thermocouple placement in highest thermal mass structural areas

## Technical Stack

| Tool | Purpose |
|------|---------|
| NASA GFSSP | Fluid system simulation |
| ANSYS Fluent | CFD two-phase flow simulation |
| Python | CHV-NVF calculator, data processing, ML pipeline |
| scikit-learn | Fuzzy c-means flow regime clustering |

## Key Metrics

- **Best Presentation** + **$1,200** prize at Marshall Space Flight Center
- **30+ universities** competed
- **84% cryogen transfer efficiency improvement** over conventional 8.5% baseline (combined pulse flow + microfilm coating)
- Design reviewed by NASA's Cryogenic Fluid Management team for Artemis applicability
