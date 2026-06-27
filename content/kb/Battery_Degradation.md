# Battery Degradation Prediction — ML Researcher @ UCSB

**Role:** Machine Learning Researcher
**Institution:** University of California, Santa Barbara
**Period:** June 2023 – August 2023
**Project:** State of Health and Remaining Useful Life prediction for lithium-ion batteries
**Stack:** Python, PyTorch, LightGBM, scikit-learn, MLflow, Optuna, FastAPI, Plotly Dash

## Role Summary

Summer research program at UCSB working with AI researchers from UCSB and MIT. Built a deep neural network to predict State of Health (SOH) and Remaining Useful Life (RUL) of lithium-ion batteries from charging cycle data. Results published as SRA 2023. Presented findings at a capstone seminar. Later fully re-implemented and extended the pipeline in PyTorch — benchmarking the original DNN against LSTM, Transformer-based attention, and LightGBM — and found all six models beat every published baseline, with the paper-replica DNN still outperforming more sophisticated architectures.

## Problem and Motivation

Remaining Useful Life (RUL) is how much usable life a battery has left before it needs replacing. Accurate State of Health (SOH) estimates are critical wherever cells cannot be swapped out casually — battery management systems, fleet telemetry, satellite and launch vehicle power systems, and EV powertrains. The core challenge: a generalizable model trained on one battery's data that accurately predicts SOH for different batteries of the same chemistry, removing the need for per-battery retraining.

## Dataset

NASA Open Data Portal "Randomized Battery Usage" dataset — four lithium-ion cells (RW9–RW12) run through random charging and discharging cycles at varying current loads and temperatures. Data ships as MATLAB structs (.mat), not flat CSVs. Each record contains absolute and relative sample time, voltage (V), current (A), temperature (°C), and charging state. The preprocessing pipeline classifies each step as charge, discharge, or rest, then computes SOH via:

```
SOH = (V_i - V_f) / (V_0 - V_f)     where V_f = SOH_THRESHOLD × V_0
```

Engineered features added per row: `voltage_rolling_mean_10`, `voltage_rolling_std_10`, `dv_dt`, `cycle_count`. All features are min-max scaled to [0, 1] with the scaler fit on RW9 only and applied to RW10–RW12, so test batteries never leak into the fit. Unscaled `voltage_raw`, `absolute_time_raw`, and `cycle_count_raw` are preserved alongside scaled columns for dashboard plotting where physical units matter.

## Model Architectures

Five model families share a unified evaluation framework:

**Paper DNN** — Exact replica of the SRA 2023 architecture: `Linear(5,15) → ReLU → Linear(15,10) → Sigmoid → Linear(10,1)`. Takes a single timestep's features (`input_mode="tabular"`). No batch norm, dropout, or attention.

**Upgraded DNN** — Configurable `Linear → BatchNorm1d → activation → Dropout` stack with optional residual connections, also tabular. Added to test whether regularization and depth help over the paper architecture.

**LSTM** — 2-layer `BatteryLSTM` with a linear head, consuming the full windowed sequence (`WINDOW_SIZE, n_features`) in `input_mode="sequence"`.

**Attention** — Small `nn.TransformerEncoder`: input projection, learned positional embedding, 1–2 encoder layers, head on the final timestep. Built to learn temporal structure directly rather than relying on hand-engineered rolling windows.

**LightGBM** — Gradient-boosted trees on flat per-row `FEATURE_COLUMNS` (no windowing — rolling/derivative features already encode short-term history). Separate `tree_trainer.py` outside the PyTorch training loop; logged to MLflow via `mlflow.lightgbm.log_model`.

## Results

Two evaluation approaches for every model. Approach 1: train/test split within a single battery (RW9 80/20). Approach 2 (the practically significant one): train on all of RW9, test on RW10/RW11/RW12 — cross-battery generalization. Average RMSE across the three held-out batteries:

**This project (Approach 2):**

| Model        | Avg RMSE |
|--------------|----------|
| Paper DNN    | **0.66%** |
| LightGBM     | 0.68%    |
| Attention    | 0.80%    |
| LSTM         | 0.81%    |
| Upgraded DNN | 1.26%    |

**Published baselines (SRA 2023 paper):**

| Model      | Avg RMSE |
|------------|----------|
| Paper DNN  | 1.49%    |
| BLS-RVM    | 1.55%    |
| RNN + LSTM | 1.61%    |

All six re-implemented models beat every published baseline. The central finding: the exact paper-replica DNN with 2 hidden layers and no regularization beats every more sophisticated architecture, including a Transformer encoder. LightGBM comes a close second using the same per-row engineered features. This suggests the hand-engineered features (rolling mean/std, dv/dt) already carry the temporal predictive signal — the bottleneck is the data/feature relationship, not model capacity. Adding sequence modeling (LSTM, attention) or tree ensembles does not improve over a well-engineered tabular DNN on this dataset.

## Training Infrastructure

**Trainer (`training/trainer.py`):** Unified epoch loop with RMSE loss (`sqrt(MSELoss)` matching the paper metric), early stopping on validation RMSE, and per-epoch metric logging to MLflow. Both PyTorch models share this trainer.

**Hyperparameter tuning (`training/tuning.py`):** Optuna study minimizing validation RMSE after 10 epochs on RW9. Search space: `n_layers`, per-layer width, learning rate, dropout, batch size. Best params saved to `data/processed/best_params.json`.

**Safety metrics (`evaluation/metrics.py`):** Beyond plain RMSE, `overestimation_rmse` and `underestimation_rmse` split error by direction. `safety_ratio` tracks what fraction of predictions underestimate SOH. Underestimating (prematurely flagging a healthy battery) is the safer failure mode for a BMS than overestimating (missing a battery that needs replacement) — so the safety_ratio is reported alongside accuracy.

## FastAPI Inference Service

`inference/predictor.py`'s `Predictor` loads the trained model and scaler once at process startup via FastAPI's `lifespan` context (not per-request). The `predict(voltage_history, current, temperature, step_type)` method mirrors the shape of a real BMS read — a rolling voltage buffer plus the latest current/temperature/step-type sample. `dv_dt` is recomputed from consecutive `voltage_history` samples using `SAMPLE_INTERVAL_SECONDS`, since a live caller has no per-sample timestamps.

`POST /predict` returns both the raw `soh` float and a `rul_estimate` string (`"Replace soon"` below `RUL_REPLACE_SOH`, `"Healthy"` above `RUL_HEALTHY_SOH`) so a downstream BMS dashboard can act without re-deriving thresholds. `GET /health` and `GET /model-info` expose liveness and the deployed model version/training RMSE for ops visibility.

## Plotly Dash Dashboard

Interactive dashboard for exploring results: battery selector, model selector, approach toggle. Panels: live voltage trace, SOH gauge, SOH-over-time, training curves, and full cross-model comparison table. Prediction parquet files are precomputed ahead of time (`scripts/precompute_predictions.py → data/processed/predictions/*.parquet`) so the dashboard reads static files rather than running inference on every interaction.
