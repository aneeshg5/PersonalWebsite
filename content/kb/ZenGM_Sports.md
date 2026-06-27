# ZenGM Sports — Open Source Contribution

**Type:** Open Source Contribution
**Categories:** Full-Stack, Simulation
**Stack:** TypeScript, React, IndexedDB, Shared Workers, Web Workers, Bootstrap, Zod, Vitest, Playwright, pnpm, Node.js
**GitHub:** https://github.com/zengm-games/zengm
**Live:** https://play.basketball-gm.com

## Overview

Contributed to ZenGM Sports — a browser-based franchise manager simulation across 4 sports (Basketball GM, Football GM, ZenGM Baseball, ZenGM Hockey) with a 50,000+ user community. The entire game runs client-side in the browser with no server — persistent state lives in IndexedDB and all heavy simulation runs in a Web Worker.

## Platform

- **4 sports:** Basketball GM, Football GM, ZenGM Baseball, ZenGM Hockey
- **50,000+ active users** across all sports
- Fully client-side — no backend, no server required
- Franchise history and game state stored in **IndexedDB** (browser-native persistent storage)
- CPU-intensive simulation offloaded to **Shared Workers** to keep UI responsive

## Franchise Simulation

Deep franchise management across a full career arc:

- Full salary cap management, draft, trades, and free agency
- 70+ achievements, challenges, and custom game controls
- All-time records, award races, and career statistics tracking
- God Mode and difficulty tuning for casual and hardcore players
- Play-by-play simulation with full box scores
- SPORT environment variable at build time switches the entire codebase between basketball, football, baseball, and hockey — one codebase, four products

## Technical Architecture

### Process Model: Shared Worker + UI split

The game is a single-page app split across two processes:

```
Browser Tab (UI process)          Shared Worker (game engine)
src/ui/                    ←→     src/worker/
React + Bootstrap UI               Simulation logic, database access
toWorker(fn, args)         →      runs fn, returns result
                           ←      toUI(fn, args) for push updates
```

The core game engine runs inside a **Shared Worker** — one worker instance shared across all open browser tabs. Tabs run only UI code and communicate with the worker through the `toUI` and `toWorker` message-passing functions. In browsers that don't support Shared Workers, a regular Web Worker is used as fallback.

A practical consequence: when debugging, `console.log` inside the worker is not visible in the normal browser console. In Chrome it appears under `chrome://inspect/#workers`. Reloading one tab does not reload the worker — all tabs must be closed and reopened for worker changes to take effect.

### IndexedDB + Cache Layer

Data ultimately lives in IndexedDB, but a cache (`src/worker/db/Cache.ts`) sits on top containing all commonly accessed data. For simulating games and viewing current data, only the in-memory cache is accessed — IndexedDB is only hit for uncommon operations like loading historical season stats.

The cache has two important constraints: values returned are mutable references, so callers must not accidentally mutate them; and when a value is intentionally mutated (updating player stats after a game), it must be explicitly written back via `idb.cache.*.put`. The cache doesn't auto-detect mutations.

### Build and Tooling

- **Language:** TypeScript with ESLint for code quality
- **Package manager:** pnpm v11
- **Runtime:** Node.js 24
- **Tests:** Vitest (unit/integration, spread through `*.test.ts` files) + Playwright (E2E)
- **Not open source:** ZenGM uses a custom license — source is available and contributions are accepted via a CLA (contributor license agreement), but it is not MIT/Apache licensed

### Global Debug Handle

Both the worker and UI processes expose `self.bbgm` as a global variable in the browser, giving direct access to internal game functions from the DevTools console — useful for inspecting simulation state, testing player generation, or manually triggering sim steps during development.
