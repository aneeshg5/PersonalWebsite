# Surge Shift — First Place at the C3 AI C3 Code Hackathon

**Type:** Hackathon Project (1st Place)
**Categories:** Full-Stack, Optimization, Simulation
**Stack:** C3 Code (C3 AI Platform), TypeScript, React, Vite, Tailwind CSS, Leaflet, OpenStreetMap
**Period:** October 2026
**GitHub:** https://github.com/prahity/c3busapp

## Overview

Surge Shift is a proof-of-concept application built on the C3 Code platform from C3 AI that plans supplemental bus service around campus events. Large events at the University of Illinois, such as games, concerts and conferences, create short and sharp demand spikes that scheduled MTD service does not fully cover. The app ingests the campus event calendar, estimates event-driven transit demand, and optimizes a set of additional buses and supplemental routes to serve that demand. The team won first place at C3 AI's C3 Code Hackathon with this project.

## Campus Events and Demand Resolution

The Campus Events page collects upcoming campus events from the public campus iCalendar feed, or lets a user add them manually. Each event is stored as a CampusEvent record with venue, time and expected attendance, and the page summarizes total riders, venues in play and the peak event. An event resolver then de-duplicates and merges these records into canonical demand that the route planner can consume.

## Route Planning

A RoutePlanner groups the merged demand into corridors, assigns a fleet of additional buses, and schedules back-to-back runs. It reports riders served versus unserved and location coverage. The Transit routes tab draws the proposed routes as an animated Leaflet and OpenStreetMap map through real stop coordinates, with buses moving along each color-coded route. Optional CUMTD developer credentials let the app overlay the existing MTD system and snap routes to street centerlines using GTFS shapes and OSRM.

## Surge Planner Simulation

The Surge Planner runs a plan through a scenario-scoped simulator to sweep how many extra buses to add and compare the resulting cost and wait curve. This stage currently runs on synthetic scenario data, seeded with one real scenario and five simulated scenarios for testing, while the model is validated against live service data. The results view shows mean time to service before and after, riders served against demand, service coverage and route length, and an optimization opportunities panel highlights the corridors and time windows where extra buses recover the most rider waiting time.

## Technical Stack

The backend is built on C3 Code, C3 AI's development platform, using entity types and JavaScript server methods. The frontend is React with TypeScript, built with Vite and styled with Tailwind CSS and shadcn-style components. Maps use Leaflet and react-leaflet over OpenStreetMap tiles.
