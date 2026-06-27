# Promo Pigeon — Founding Engineer

**Role:** Founding Engineer
**Company:** Promo Pigeon · iVenture Cohort 12
**Period:** February 2026 – Present

## Role Summary

Founding engineer at Promo Pigeon, an automated promotional product fulfillment platform. Built an agentic AI workflow that processes incoming orders via email, generates product mockups, and automates the full fulfillment pipeline — reducing turnaround from 2 days to minutes.

## Proofing & Fulfillment AI Agent

**Stack:** Python, Gemini, FastAPI, React, PostgreSQL, Docker, AWS ECR, spaCy, PyMuPDF.

## Agentic Workflow

Launched agentic workflow to generate promotional product mockups from emails and eliminate manual back-and-forth.

- **IMAP IDLE ingestor** with exponential backoff and PostgreSQL state machine processes 2,500+ orders reliably
- **spaCy NLP** parses order details from unstructured email text
- **Gemini agent** generates branded product mockups from parsed specs
- Turnaround reduced from **2 days to minutes**

## PDF Composition Engine

Node-based PDF engine as a Dockerized plugin deployed via AWS ECR for composing layered artwork for AI agents.

- Composites product artwork layers (logo, text, design elements) into print-ready PDFs
- Runs as isolated Docker container on AWS ECR — callable by the AI agent as a tool
- Supports arbitrary layer ordering and blending for promo product templates
- PyMuPDF handles PDF parsing; custom node graph handles layer composition

## Infrastructure

- Backend: FastAPI on Docker
- Frontend: React
- Database: PostgreSQL
- AI: Gemini for mockup generation
- NLP: spaCy for order parsing
- PDF: PyMuPDF + custom node-based layer compositor
- Deployment: Docker + AWS ECR
