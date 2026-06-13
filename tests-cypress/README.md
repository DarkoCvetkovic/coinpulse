# CoinPulse - Cypress E2E

Standalone end-to-end test suite for the CoinPulse web app, written in TypeScript
with Cypress. It drives the running frontend over HTTP and talks to the backend API
directly for fast, deterministic setup. It has its own dependencies and shares
nothing with the frontend project.

## Layout

- `cypress/e2e/` - specs grouped by area, with a `smoke/` folder for fast shell checks
- `cypress/support/pages/` - page objects (grouped selector maps plus interactions)
- `cypress/support/keywords/` - reusable `action_` / `check_` steps used by specs
- `cypress/support/commands/` - custom commands (API login, backend reset)
- `cypress/support/models/` - shared TypeScript types
- `cypress/support/constants/` - routes and seeded users
- `cypress/support/utils/` - small helpers (selectors, session, backend URL)

## Prerequisites

- Node.js 20 or newer
- CoinPulse backend running on `http://localhost:8080`
- CoinPulse frontend running on `http://localhost:5173`

## Setup

1. `npm install`
2. Copy `cypress.env.example.json` to `cypress.env.json` and fill in the demo
   credentials. `cypress.env.json` is gitignored and never committed; in CI the
   same values are provided as environment variables.

## Running

| Command                  | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `npm run cy:open`        | Interactive runner                                             |
| `npm run cy:run`         | All specs, headless (Mochawesome report in `cypress/reports/`) |
| `npm run test:smoke`     | Only `@smoke` specs                                            |
| `npm run test:dashboard` | Only `@dashboard` specs                                        |
| `npm run test:markets`   | Only `@markets` specs                                          |
| `npm run validate`       | format check, lint and typecheck                               |
