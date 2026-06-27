# Josephson Junction Optimization — Undergraduate Researcher @ UIUC

**Role:** Undergraduate Researcher
**Institution:** University of Illinois Urbana-Champaign
**Period:** October 2024 – December 2025
**Project:** Josephson Junction array parameter fitting and optimization

## Role Summary

Undergraduate research at UIUC optimizing superconducting Josephson Junction array geometries to fit experimental critical current (Ic) vs. magnetic field (B-field) data. Built a C++ gradient descent engine and applied Q-learning to navigate the high-dimensional junction configuration space.

## Project Overview

Josephson Junctions are superconducting devices critical to quantum computing qubits and next-generation quantum hardware. The research task: given experimental Ic vs. B-field curves measured at UIUC, find the junction array geometry (widths and positions) that best reproduces the observed behavior.

## C++ Gradient Descent Engine

Built a custom gradient descent engine in C++ with momentum to fit junction geometries to experimental data.

- Numerical gradient estimation via finite difference perturbations (central difference)
- Momentum term for faster convergence and escape from shallow minima
- Stochastic perturbation (noise injection every 5 iterations) to escape local minima
- Cost function: sum of squared differences between model Ic and experimental Ic at each B-field point
- Parallel processing via Python ProcessPoolExecutor across all initial condition configurations

## Q-Learning Configuration Search

Applied Q-learning to navigate the junction configuration space intelligently — selecting which junction topologies and initial conditions to explore next based on learned cost improvement signals.

- **State:** current parameter space explored (junction counts, positions, initial conditions)
- **Action:** which topology and initial conditions to probe next
- **Reward:** reduction in fit cost (improvement in match quality)
- Replaced brute-force exhaustive search with guided exploration
- Explored **5–10 junction** arrays across **1,000+** initial conditions per topology

## Key Results

- **~4x cost reduction** per junction added (fit quality improves exponentially with junction count)
- Optimized superconducting parameters for next-generation qubit designs
- Cost map CSVs and gradient descent trajectories generated for multiple junction configurations

## Technical Stack

| Component | Technology |
|-----------|-----------|
| Optimization engine | C++ (custom gradient descent with momentum) |
| Orchestration | Python (parallel processing, initial condition sampling) |
| Libraries | NumPy, SciPy (curve fitting), Matplotlib, pandas |
| Parallelism | Python ProcessPoolExecutor |
| Data | CSV (experimental Ic vs. B-field, initial conditions, trajectories) |
