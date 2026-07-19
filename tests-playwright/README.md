# CoinPulse - Playwright E2E

Standalone end-to-end test suite for the CoinPulse web app, written in TypeScript
with Playwright. It mirrors the Cypress suite one to one - same pages, same
scenarios, same deterministic seed data - while using Playwright-native patterns:
fixtures, storage-state authentication, web-first assertions and multi-browser
projects (chromium, firefox, webkit).

The suite is built to run headless in CI on every change and on a schedule, but every
run is equally reproducible on a local machine - same commands, same seed, same
HTML report.

## Coverage

76 tests per browser across every page of the app: smoke (one shell spec per page),
auth (validation, server errors, route guard, logout), dashboard, markets (search,
filtering, sorting, pagination, watchlist, admin controls, delete), trade, compare
(drag and drop, context menu, limit modal, tabs, tooltips, FAQ), coin form (create,
edit, validation, role guard), API explorer, files (upload, download) and dynamic
elements (ticker, delayed button, iframe, shadow DOM, lazy list).

## Architecture

Specs never touch locators directly - each layer has one job:

- `tests/<area>/*.spec.ts` - specs; call only keyword functions
- `src/keywords/` - `action_` / `check_` steps wrapped in `test.step`, so the HTML
  report reads as a scenario
- `src/pages/` - page object classes: `getByTestId` locators plus interaction and
  web-first verify methods
- `src/fixtures/fixtures.ts` - typed test extension injecting every page object and
  the API client; specs import `test` from here, never from `@playwright/test`
- `src/api/` - API client over `APIRequestContext` (backend reset, login, seeding)
- `src/constants/` - routes, users (from `.env`) and seeded coin facts, so no spec
  hardcodes data
- `tests/auth.setup.ts` - signs in once per account via the API and saves the
  session as a storage state; browser projects preload it, so tests start signed in

Backend state is deterministic: seeded data plus an open `POST /api/test/reset`
endpoint. Specs that mutate data or assert seed facts reset the backend in
`beforeEach`. Workers are pinned to 1 because all specs share one stateful backend.

## Prerequisites

- Node.js 20 or newer
- Browsers: `npx playwright install chromium firefox webkit`
- CoinPulse backend running on `http://localhost:8080`
- CoinPulse frontend running on `http://localhost:5173`

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in the demo credentials. `.env` is
   gitignored and never committed; in CI the same values are provided as
   environment variables.

## Running locally

| Command                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| `npm test`              | All specs on all configured browsers        |
| `npm run test:chromium` | All specs on Chromium only                  |
| `npm run test:webkit`   | All specs on WebKit only                    |
| `npm run test:firefox`  | All specs on Firefox only                   |
| `npm run test:smoke`    | Only the `@smoke` specs (fast health check) |
| `npm run report`        | Open the HTML report from the last run      |
| `npm run validate`      | Format check, lint and typecheck            |

Every run writes an HTML report to `playwright-report/` with per-step traces on
retry.

## CI

The validate job runs on every push or pull request that touches
`tests-playwright/`. The scheduled full E2E run - backend and frontend booted on
the runner, smoke suite as a fast gate, all three browsers, report published as an
artifact - is the next planned CI stage.
