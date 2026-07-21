# CoinPulse - Cypress E2E

Standalone end-to-end test suite for the CoinPulse web app, written in TypeScript
with Cypress. It drives the running frontend over HTTP and talks to the backend API
directly for fast, deterministic state setup. It has its own dependencies and shares
nothing with the frontend project.

The suite is built to run headless in CI on every change and on a schedule, but every
run is equally reproducible on a local machine - same commands, same deterministic
seed data, same reports.

## Coverage

27 specs / 76 tests across every page of the app:

| Area            | Specs | What is covered                                                                                                 |
| --------------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| `smoke/`        | 9     | Every page shell renders for a signed-in user (one spec per page, JSDoc header with estimated execution time)   |
| `auth/`         | 3     | Field validation, wrong password, unknown user, locked account (423), route guard, redirect after login, logout |
| `dashboard/`    | 1     | Portfolio stats, chart and top movers against seeded data                                                       |
| `markets/`      | 7     | Search, filtering, sorting, pagination, watchlist toggle, admin edit and delete                                 |
| `trade/`        | 2     | Buy/sell execution against the API and form validation                                                          |
| `compare/`      | 3     | Drag and drop, right-click menu, three-coin limit, tabs, tooltips, FAQ accordion, watchlist reorder             |
| `coin-form/`    | 4     | Admin create/edit, validation, role guard                                                                       |
| `api-explorer/` | 1     | Request groups and live response panel                                                                          |
| `files/`        | 2     | Logo upload and portfolio download                                                                              |
| `dynamic/`      | 1     | Live ticker, delayed button, iframe, shadow DOM, lazy-loaded list                                               |

## Architecture

Specs never touch selectors directly - each layer has one job:

- `cypress/e2e/` - specs; call only keyword functions and custom commands
- `cypress/support/keywords/` - reusable `action_` / `check_` steps with `cy.log`
- `cypress/support/pages/` - page objects: a selector map (all `data-testid` based)
  plus interaction methods
- `cypress/support/commands/api/` - API commands (`login` with cached sessions,
  `resetBackend`, `resetAndLogin`, `createCoin`)
- `cypress/support/commands/ui/` - shared UI action commands (`uiClick`, `uiType`,
  `uiTrigger`, ...) used by every page object
- `cypress/support/constants/` - routes, seeded users and seeded coin facts, so no
  spec hardcodes data
- `cypress/support/models/` - shared TypeScript types mirroring the API DTOs
- `cypress/support/utils/` - helpers, including a scroll-driven IntersectionObserver
  shim that makes lazy-loading testable in headless runs

Backend state is deterministic: seeded data plus an open `POST /api/test/reset`
endpoint. Specs that mutate data or assert seed facts reset the backend in
`beforeEach`, so any spec can run alone or in any order.

## Prerequisites

- Node.js 20 or newer
- CoinPulse backend running on `http://localhost:8080`
- CoinPulse frontend running on `http://localhost:5173`

## Setup

1. `npm install`
2. Copy `cypress.env.example.json` to `cypress.env.json` and fill in the demo
   credentials. `cypress.env.json` is gitignored and never committed; in CI the
   same values are provided as environment variables.

## Running locally

| Command               | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| `npm run cy:open`     | Interactive runner                                             |
| `npm run cy:run`      | All specs, headless (Mochawesome report in `cypress/reports/`) |
| `npm run test:smoke`  | Only the smoke specs (fast health check)                       |
| `npm run test:<area>` | One area, e.g. `test:markets`, `test:auth`, `test:compare`     |
| `npm run validate`    | Format check, lint and typecheck                               |

Every headless run writes a self-contained Mochawesome HTML report (embedded
screenshots on failure) to `cypress/reports/`.

## CI

GitHub Actions (`.github/workflows/cypress-ci.yml`) runs the validate job (format,
lint, typecheck) on every push or pull request that touches `tests-cypress/`. The
scheduled full E2E run - backend and frontend booted on the runner, smoke suite as a
fast gate, full suite with the report published as an artifact - is the next planned
CI stage.
