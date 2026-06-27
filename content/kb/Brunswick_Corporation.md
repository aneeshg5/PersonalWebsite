# Brunswick Corporation — Machine Learning Engineer Intern

**Role:** Machine Learning Engineer Intern
**Company:** Brunswick Corporation (Mercury Marine division)
**Period:** January 2026 – Present
**Team:** PIE (Product Innovation & Engineering)

## Role Summary

Built an AI-assisted Mercury Marine propeller selection system from the ground up — physics-informed ML models, full data pipeline, and production deployment. Work resulted directly in Mercury hiring a dedicated data science intern for downstream business analytics.

## Propeller Selection Tool

ML system that recommends optimal propeller type and pitch for any boat configuration using historical hydrodynamic test data. Deployed to 400+ commercial users; reduced per-boat dealer testing costs by $25,000.

**Stack:** Python (scikit-learn, ONNX Runtime, FastAPI), Cloudflare Workers + Containers (Hono, D1), Docker, Okta JWT auth.

### Three-Model Architecture

**PropellerTypeClassifier** — `RandomForestClassifier(n_estimators=100, max_depth=25, class_weight="balanced")` trained on 11 features derived from boat specifications. Exported to ONNX for production inference. 92% accuracy across 12 propeller classes.

Feature vector (11 inputs):
```
[Boat_Length, Boat_Beam, Dry_Boat_Weight, V-Bottom, Round-Bottom,
 Single Hull, Multi Hull, HP_per_engine, Fuel_Capacity,
 Power_to_Weight (total HP / weight), Length_to_Beam]
```
Key distinction: `HP_per_engine` (position 7) vs `Power_to_Weight` using total HP (position 9) — both inputs required because one-engine and two-engine boats at the same per-engine HP have meaningfully different hydrodynamic loading.

**TopSpeedPredictor** — Physics-informed Ridge regression using Savitsky planing theory dimensionless groups. At planing speeds, speed follows a cube-root relationship with power-to-weight: `V ~ (P_shaft/W)^(1/3)`. The log-linear model form:

```
log(Fr_B) = α + β₁·log(C_P) + β₂·(P/D) + β₃·log(C_Δ)
```

| Symbol | Name | Formula |
|--------|------|---------|
| `Fr_B` | Beam Froude Number | `V / sqrt(g·B)` |
| `C_P`  | Power Coefficient  | `P_shaft / (ρ·n³·D⁵)` |
| `P/D`  | Pitch Ratio        | `P / D` |
| `C_Δ`  | Load Coefficient   | `m / (ρ·B³)` |

Physics consistency validation on trained coefficients ensures expected signs: positive for power and pitch (more power/advance → more speed), negative for load (heavier → slower).

**PropellerPitchEstimator** — Analytical pitch recommendation via Crouch's formula with slip estimation, then a weighted multi-objective optimization: `z = (α + efficiency_factor × β) / (α + β)` where α = top-speed weight, β = fuel-economy weight. The user's preference slider maps directly to the z-parameter, which selects the corresponding row in the sorted results.

### Data Pipeline

Raw parquet CAN bus telemetry from hydrodynamic test runs → `RawDataProcessor` → structured training CSVs. Processing steps include: boat-type encoding to binary hull-characteristic columns, sea-state string to numeric wave/wind vectors, multi-pitch column averaging, wide-to-long fuel economy reshape, and Butterworth lowpass filtering.

**Metadata fallback chain** (for parquet files lacking embedded metadata):
1. Proprietary metadata fields embedded in parquet
2. Hydro test results CSV matched by test name
3. Legacy test results CSV matched by test number
4. Boat specification database matched by make + model

**AI enrichment agent:** GPT-4o with web search resolved 3,000+ incomplete boat records with missing beam, weight, and length. Two-call pipeline: first call uses web search to find specs from manufacturer sites, marine guides, and boat review sites; second call extracts structured output via Pydantic model with physics-bounds validation (e.g., beam 4–35 ft, weight 400–120,000 lbs). Results cached to avoid re-querying the same make/model pair.

### Deployment Architecture

```
Browser / GUI
     │
     ▼
Cloudflare Worker (Hono, JWT auth)
     ├── /api/find-boat   → D1 SQLite (two-tier matching: exact → fallback)
     ├── /api/predictions → D1 (store alpha/beta/specs/predicted vs actual)
     └── /*               → Cloudflare Container (Docker, waits up to 30s for readiness)
                                └── FastAPI + ONNX Runtime
                                      ├── /api/predict-prop
                                      └── /api/find-boat (Python-side fallback)
```

The Cloudflare Container runs the FastAPI + ONNX inference server in Docker, sleeping after 5 minutes of inactivity (`max_instances: 1`). The Cloudflare Worker handles auth and D1 queries at the edge, proxying ML inference requests to the container only when needed.

**Boat matching** (both Worker-side D1 and Python-side): exact match (case-insensitive make + model + year + engines + HP) → fallback via lexicographic tuple comparison `(year_diff, hp_diff, engine_diff)`, prioritizing year match quality over HP match over engine count.

**Model export formats:** joblib (full scikit-learn model with label encoder, for local/GUI use) and ONNX + JSON label map (lightweight, framework-agnostic, for server deployment).

### Desktop GUI

5-page `customtkinter` application for interactive use: boat identification → preference sliders (fuel economy vs. top speed, 0–100%) → spec verification/override → prediction result with propeller imagery. User preference data logged for downstream analytics.

## Boat House Bulletin Data Assistant

A Progressive Web App (PWA) for marine engineers conducting on-water boat performance sea trials. Engineers record CAN bus data via a Vector logging device during trials, then use the app to upload the raw recording, run a 13-step performance analysis pipeline entirely in the browser, generate a branded PDF report, and sync everything to the cloud — with full offline support throughout.

**Stack:** TypeScript 6, React 19, TanStack Router/Query/Form, Hono v4 on Cloudflare Workers, PostgreSQL via Cloudflare Hyperdrive, Azure Blob Storage, IndexedDB, Workbox PWA, `pdf-lib` (in-browser PDF generation), pnpm monorepo with Vite+/Rolldown.

**Metrics:** Replaced a ~30-second desktop-tool CAN signal analysis workflow with sub-5-second in-browser analysis. 400+ commercial users.

### Architecture Overview

A pnpm monorepo deployed on Cloudflare Workers + Assets with three main packages: an HTTP API (Hono), a React SPA/PWA frontend, and a `can-blf-parser` library containing the browser-compatible binary parser, signal decoder, analysis pipeline, and PDF generator.

The entire BLF parsing, CAN decoding, and 13-step analysis pipeline runs client-side in the browser. This enables fully offline operation once the signal database is cached, eliminates server-side compute costs, and ensures raw field-test data never transits the application server.

### CAN Bus Parser — Vector BLF Format

The most technically complex component is a complete browser-compatible Vector BLF (Binary Logging Format) parser, written from scratch. The BLF format stores CAN frames in zlib-compressed `LOG_CONTAINER` LOBJ objects inside a fixed 144-byte file header.

Key implementation details:
- LOBJ objects are located by scanning for a 4-byte magic signature; each has a 32-byte header (16-byte base + 16-byte timestamp extension)
- Decompression uses `DecompressionStream("deflate")` — the Web Streams API, requiring no Node.js dependency
- Timestamps are stored as 64-bit values scaled by either 10µs or 1ns resolution depending on a flags field
- Objects can be split at container boundaries — a tail-carry mechanism handles reassembly across containers
- Extended CAN IDs (29-bit) are masked consistently between the BLF representation and the signal database format

Signal decoding uses a proprietary CAN signal database (`.dbc` format). A known bug in the open-source `candied` DBC parser was discovered: its Motorola big-endian signal extraction is incorrect. A custom `extractRaw()` function was written following Vector's DBC bit-numbering convention. Multiplexed signals (mux selector + sub-signals) are handled in a dedicated pass.

### 13-Step Analysis Pipeline

A TypeScript port of the reference Jupyter notebook previously used by engineers. Steps:

1. **Signal extraction** — pull engine RPM, fuel flow (summed across up to 4 engines on a union-timestamp grid), GPS speed, heading, altitude, and trim position from decoded frames
2. **Reindexing** — GPS (~1 Hz) and fuel signals reindexed onto ~5 Hz engine RPM timestamps via nearest-neighbor matching with per-signal tolerances and forward-fill, mirroring pandas `reindex(method='nearest').ffill()`
3. **Stability flags (LearnCond)** — rolling-window stability detection for speed, fuel flow, and trim position (ported from the original vSignalyzer script)
4. **Gear detection** — forward gear identification from CAN gear-state signal; graceful fallback if signal absent
5. **SteadyState state machine** — three states (reset / dwell / record); state-2 requires all three LearnCond flags simultaneously true for longer than a configurable dwell period
6. **Direction A lock-in** — first state-2 sample above a minimum RPM threshold auto-detects the outbound course heading; direction B = (dirA + 180) % 360
7. **Direction classification** — assigns each state-2 sample to direction A, B, or null using `angularDiff = min(|a-b| % 360, 360 - |a-b| % 360)`
8. **Top speed** — max GPS speed in each direction averaged; uses raw (not smoothed) heading
9. **Acceleration runs** — detects 0→30 mph (or 0→20 mph for low-speed boats); valid runs between 2–120 seconds; up to 6 per direction, averaged
10. **Fuel economy table** — best sample per RPM bin per direction (highest speed or lowest fuel rate); A/B averaged; mpg and range computed
11. **RPM grid** — engine-type-specific breakpoints from idle to rated RPM (4800–7000 depending on type)
12. **Parameter exposure** — eight previously hardcoded constants surfaced as `PipelineConfig` (COG tolerance, steady-state dwell, stability thresholds, RPM bin width, etc.) and accessible in-UI so engineers can retune and regenerate without re-uploading the data file
13. **PDF generation** — in-browser via `pdf-lib` + `fontkit`, embedding custom fonts, engine-specific imagery, and a grouped bar chart rendered on `OffscreenCanvas`

### Offline-First Architecture

**IndexedDB schema:** Two object stores — `reports` (full report data + raw BLF bytes as ArrayBuffer + sync status) and `configs` (reusable boat/engine/propeller configurations). Both indexed on `createdAt` and `synced` (0=pending, 1=synced).

**Sync service:** Two independent functions triggered on app mount and on `window.online`:
- Reports: upload BLF bytes to Azure via short-lived SAS token (generated server-side via HMAC-SHA256 on `crypto.subtle`), then POST metadata to Postgres. `ON CONFLICT DO NOTHING` makes it idempotent across retries.
- Configs: 10-second debounce prevents racing with the immediate online save path; optimistic `setQueryData` update makes the UI feel instantaneous regardless of network latency.

**SAS token upload pattern:** The API Worker generates a 10-minute Azure SAS token; the browser uploads the BLF file directly to Azure Blob Storage, bypassing the Worker entirely. This keeps the Worker stateless and sidesteps Cloudflare's 100MB Worker request body limit.

**TanStack Query persistence:** Five queries (user identity, signal database, geolocation, weather, configs) are persisted to `localStorage` with a 12-hour max age. Offline users with cached data pass the auth guard and can generate reports without any network access.

### Signal Database Access Control

The proprietary CAN signal database is never shipped as a static asset. It is served exclusively via an authenticated API endpoint requiring a valid RS256 JWT verified against the OIDC provider's remote JWKS. After first fetch: stored in TanStack Query with `staleTime: Infinity`, persisted to `localStorage`, available offline for up to 12 hours. Cache key includes a hash of the user's email for per-user isolation. The file is explicitly excluded from Workbox precaching.

### Non-Destructive BLF Metadata Embedding

Rather than modifying the BLF file header (which would alter the forensic binary artifact), form metadata is appended as a custom LOBJ object after the last LOG_CONTAINER, using an unregistered object type code. Vector tools skip unknown types. The original byte sequence is byte-for-byte identical, and the parser transparently ignores the custom object during analysis. Engineers who download the BLF from Azure get the complete test metadata (boat specs, engine configuration, test conditions, pipeline parameters) co-located with the recording.

### `"reports-updated"` Custom Event Bus

Rather than polling IndexedDB or lifting report state globally, the sync service dispatches a `window` custom event after each successful sync. The history page re-reads IndexedDB on this event. Minimal, decoupled notification without shared React state or a global store.

## Automotive CAN Bus Security Research

Protocol reverse engineering and AI-assisted decoding research on a proprietary embedded CAN bus system. The work operates at the intersection of embedded systems, statistical signal analysis, cryptanalysis, and machine learning.

**Stack:** Python (stdlib only — `socket`, `struct`, `collections`, `statistics`), Linux SocketCAN, OpenCode AI agent framework.

**Research goals in escalating order:**
1. **Decode** — map raw binary CAN payloads to physical signals (speed, angle, throttle, gear state) with no access to proprietary `.dbc` definition files.
2. **Control** — identify and inject the correct CAN frames to command the system from software without touching physical controls.
3. **Characterize encryption** — evaluate AI-assisted analysis against newer firmware that encrypts command messages, using known-plaintext cryptanalytic techniques.

### Reverse Engineering Methodology

Applied a full five-phase methodology documented in academic literature, implemented as custom Python tooling:

**Phase 1 — Passive discovery.** Capture all bus traffic at idle. Classify every byte in every frame as static, toggle, enum, counter, or variable. Identify multi-frame reassembly sequences. Establish the complete vocabulary of the bus.

**Phase 2 — Stimulus-response differential capture.** Perform one physical control action at a time while comparing bus traffic against the idle baseline. Statistically score each byte for mean shift, range expansion, new unique values, and standard deviation increase. This phase successfully isolated command signals from status readback signals by their timing relationship — a readback signal consistently lags its corresponding command by hundreds of milliseconds across every state transition.

**Phase 3 — Pearson sub-frame correlation.** For multi-frame messages where different sub-frames carry different signals, compute Pearson r between each byte and a known reference signal timeline. Discovered a key subtlety: near-perfect correlation (r = 1.000) can indicate an echo/mirror signal rather than a command — verified by selective replay, which confirmed the correlated bytes were display echoes that the actuator did not listen to.

**Phase 4 — Selective replay isolation.** Record full bus traffic during a physical action, then replay each CAN ID individually onto the live bus and monitor a hardware readback. Only the true command frame produces a behavioral response. This is the definitive test that distinguishes command frames from display frames sharing identical byte patterns.

**Phase 5 — Scene-by-scene log analysis.** Analyzed captures across multiple operational sequences (idle, power-on/off, gear engagement, throttle ramp, combined maneuvers). Confirmed power-on signature, gear engagement ramp timing, and command-to-readback lag consistently across all scenes.

### Custom Multi-Frame Protocol

The target system uses a proprietary multi-frame fragmentation scheme layered on top of standard CAN 2.0B — not ISO-TP or any other documented standard. A sequence counter byte in position 0 of each frame governs assembly order; bytes 1–7 carry payload. Reassembled payloads reach 49–98 bytes across 8–15 sub-frames. The project implemented full automatic reassembly and decoding.

### Python Toolkit

All tools use only the Python 3 standard library (no pip dependencies) for portability across any Linux machine with SocketCAN:

- **Live terminal dashboard** — real-time ANSI-colored display with multi-frame reassembly, decoded signal bars, and replay pacing
- **Differential signal isolator** — multi-phase capture with weighted statistical scoring; guides through physical stimulus phases interactively
- **Pearson correlation analyzer** — pinpoints which sub-frame byte carries a specific control signal; manual implementation with binary-search timestamp interpolation
- **Selective replay tool** — records, replays individual IDs, measures behavioral response spans, runs elimination algorithm when no single ID responds alone
- **Automated network discovery** — passive capture with byte classification, multi-frame detection, and JSON export
- **Synthetic log generator** — generates `candump`-format logs with accurate timing for the full power-on → gear-engagement → throttle-ramp sequence, playable on real hardware

### Encryption Analysis

Newer firmware encrypts command-vocabulary CAN messages — a trend documented in automotive security research as OEMs responded to increasingly effective reverse engineering tools. The research leverages a known-plaintext advantage: simultaneous physical control inputs provide ground-truth values (e.g., exact steering angle, throttle percentage) at the moment encrypted bytes appear on the bus.

The analysis approach: entropy profiling per byte to map encrypted vs. plaintext regions; block structure analysis; determinism testing (same physical state → same ciphertext?); and known-plaintext correlation. Encrypted bytes exhibit near-uniform high entropy at all timescales, which clearly distinguishes them from physically-correlated plaintext signals.

### AI Sandbox Testing Environment

Built an isolated sandbox that launches a fresh AI agent with no access to existing findings or decoded signal mappings — only raw log files and a configurable context level (zero context, domain knowledge only, or partial signal map). Purpose: measure how much context improves AI decoding accuracy, whether the AI independently rediscovers confirmed signals, and how it characterizes encrypted byte regions compared to statistical tools. Each sandbox run is reproducible and non-destructive, enabling systematic comparison across context levels and log selections.
