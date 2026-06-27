# Tekweld Manufacturing — Software Engineer Intern

**Role:** Software Engineer Intern
**Company:** Tekweld Manufacturing
**Period:** May 2025 – February 2026

## Role Summary

Built the TekWeld MassMailer platform from the ground up — a full-stack direct mail campaign management system automating the entire pipeline from business lead discovery to personalized physical mail delivery. The platform scrapes leads, processes logos with AI, generates branded labels and flyers, runs automated quality control, and dispatches real printed mailers to each target business.

## Personalized Outreach Tool

End-to-end lead-to-physical-mail pipeline.

**Stack:** Python, FastAPI, PostgreSQL (AWS RDS), React, TypeScript, AWS Lightsail (Docker), Playwright, BeautifulSoup4, Google Places API, Auth0 JWT, Resend.

**How it works:**
- Scraper discovers business leads by zip code, radius, and SIC code via Playwright + Google Places API
- Per-business personalized label and flyer generation with logo, brand colors, QR code, and address
- Physical sample submitted to PrintFrog print vendor API — real mailer shipped to each business

**Metrics:** 700+ businesses reached with personalized physical outreach, 14% conversion rate on delivered samples, 90,000+ client leads stored in PostgreSQL.

## LLM Product Design Platform

AI-driven imposition generation engine automating design turnaround from 1 week to 15 minutes.

**Stack:** Gemini (artwork generation), OpenAI GPT-4 Vision (QA), AWS Lambda (Real-ESRGAN ONNX image upscaling), FastAPI, React, PostgreSQL, Docker.

**Pipeline per business:**
1. Download logo — diskcache check (50 MB HTTP disk cache shared across all workers)
2. AWS Lambda Real-ESRGAN x4 FP16 ONNX upscaling
3. Background removal
4. Render label + flyer PDFs via the artwork generation engine with injected logo, name, address, QR code
5. OpenAI GPT-4 Vision QA (OCR readability, contrast, design quality — pass/fail)
6. Upload to blob storage — concatenate into print-ready imposition PDF
7. Submit to PrintFrog for physical printing

**Job state machine:** CREATE_QUEUED → IN_PROGRESS → CREATED/FAILED → SUBMITTED

**Parallelized:** Gemini background theme generation, OpenAI QA, and AWS Lambda logo upscaling across 6 concurrent workers.

## Artwork Generation Engine

The most architecturally interesting component is a node-based image processing pipeline built for scalable, template-driven artwork creation. Templates are stored as JSON in the database and executed by the engine at runtime.

### Core Architecture

```
ArtworkTemplate (JSON config) → ArtworkGeneratorEngine → Node 1 → Node 2 → ... → Node N → Output
                                                               ↓         ↓              ↓
                                                            BytesIO   BytesIO       BytesIO
                                                                  (in-place modification)
```

The engine processes a shared `BytesIO` buffer through a sequence of nodes. Each node reads the current image state, applies a transformation, and writes the result back — `seek(0)`, `truncate()`, `save()`, `seek(0)`. Final output is saved as `default_output.png` in a per-business temporary directory that auto-cleans on context exit.

**Key components:**
- `ArtworkGeneratorEngine` — context manager that orchestrates node execution and manages temporary directories per engine instance
- `ArtworkTemplate` — Pydantic model (JSON-serializable) defining the list of nodes; stored in a database JSONB column
- `ExecutionContext` — carries the business record, logo BytesIO, results directory, and checkpoint directory through the pipeline
- `NodeDefinition` — dataclass of `(name, default_config, execute_func)` where `execute_func(config, image_data, context) → None`

### Runtime Variables and Checkpoints

**Runtime variables** enable dynamic value injection at execution time. Syntax: `"@runtime:variable_name"`. Before each node executes, all config values are scanned and `@runtime:*` strings are replaced from the caller-supplied dict. Throws `ValueError` if a variable is missing. Common variables: `theme_url` (AI-generated background), `primary_image` (enhanced logo path), `qr_data`, `text_content`.

**Checkpoints** enable workflow branching and reuse of intermediate results. Syntax: `"@checkpoint:filename.ext"`. Two types:
- Temporary (`checkpoints_dir`) — auto-cleaned when the engine context exits; used for internal workflow state
- Persistent (`results_dir`) — survives the workflow; used for final outputs and cross-workflow file references

The engine searches for checkpoints in `results_dir` first, then `checkpoints_dir`. This allows a label PDF generated in step 6 to be reloaded in step 8 for cropping without re-running the full label pipeline.

### Node Library (11 nodes)

| Node | Purpose |
|------|---------|
| `load_image` | Load from URL, file path, or `@checkpoint:`; optionally resize to match a template's dimensions |
| `overlay_template` | Composite a template PNG/PDF over the current image; auto-inverts colors when background is dark (configurable brightness threshold) |
| `overlay_image` | Place a logo, label, or other image at pixel coordinates; supports rotation, opacity, center-based positioning |
| `qr_code_overlay` | Generate and overlay a QR code at center-based coordinates; size in inches at 300 DPI |
| `text_overlay` | Render text with auto-sizing to fit within max width/height bounds, or fixed font size; adaptive black/white color based on background brightness |
| `convert_to_pdf` | Convert current PNG to PDF using PyMuPDF; dimensions auto-calculated from image DPI if not specified |
| `save_checkpoint` | Save current buffer state to results dir (always) and optionally to checkpoint dir; pass-through (does not modify buffer) |
| `shape_crop` | Crop to rectangle, circle, or rounded rectangle; supports pixel or percentage border radius; applies alpha mask |
| `resize_image` | Resize to exact pixel dimensions or match a template; no aspect ratio preservation |
| `crop_to_aspect_ratio` | Center-crop current image to match a template's aspect ratio before resizing to avoid distortion |
| `flatten_to_rgb` | Composite RGBA over a solid background (white, black, or hex) and convert to RGB for final output |

### Label and Flyer Workflow

**Label workflow:** load background/theme → overlay product template PNG → overlay business logo → add QR code → add contact text → convert to PDF → save checkpoint → reload checkpoint → shape_crop to final label dimensions.

**Flyer workflow:** load flyer base → overlay generated label (via `@checkpoint:`) → add tracking QR code → add instructional text overlays → convert to PDF.

The checkpoint system is the key that connects the two workflows: the label pipeline saves its output, then the flyer pipeline loads it as an overlay, meaning the full label generation only runs once regardless of how many flyer variants are produced.
