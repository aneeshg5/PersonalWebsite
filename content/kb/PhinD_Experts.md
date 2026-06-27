# PhinD Experts — Data Engineer

**Role:** Data Engineer
**Company:** PhinD Experts (iVenture Cohort 10)
**Period:** May 2025 – August 2025

## Role Summary

Data Engineer at PhinD Experts, an early-stage startup building a PhD recruiter-candidate matching platform. Automated CI/CD infrastructure and revamped the ETL pipeline to scale the platform and dramatically reduce matching processing time. The platform connects recruiters with PhD candidates sourced from LinkedIn and Google Scholar.

## CI/CD Automation

Automated deployment pipeline using GitHub Actions + Docker + AWS.

- Containerized the full platform with Docker
- CI/CD pipeline handles build, test, and deploy on every commit
- Platform serves **4,000+ PhD candidate profiles**

## ETL Pipeline Revamp

Redesigned the ETL pipeline for profile normalization and candidate matching.

**Stack:** Python, SQLAlchemy, Apache Airflow.

- **Old pipeline:** Sequential processing, ~1 minute per matching run
- **New pipeline:** Parallelized with SQLAlchemy + Apache Airflow DAGs → **25 seconds** (60% reduction)
- Pipeline stages: LinkedIn data ingestion → Google Scholar enrichment → profile normalization → matching computation

## Platform Overview

PhinD Experts matches recruiters (companies, labs) seeking specialized PhD expertise with qualified candidates. Matching algorithm aligns recruiter job descriptions and domain niches with candidate signals from publications, h-index, and research areas scraped from LinkedIn and Google Scholar.

**Metrics:** 4,000+ PhD profiles on platform, matching time reduced from 1 minute to 25 seconds.
