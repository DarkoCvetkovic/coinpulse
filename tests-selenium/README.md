# CoinPulse - Selenium E2E

Standalone end-to-end test suite for the CoinPulse web app, written in Java 21 with
Selenium 4 and JUnit 5. It mirrors the key scenarios of the Cypress suite - same
pages, same assertions, same deterministic seed data - while using Java-native
patterns: page object classes with explicit waits, keyword methods wrapped in Allure
steps and REST-assured for direct API access.

On top of the UI coverage this suite adds hybrid API/UI integration tests: the API
seeds or verifies backend state around UI steps in the same test, in both directions.

Drivers resolve automatically through Selenium Manager - no WebDriverManager, no
manual downloads. The suite is built to run headless in CI on every change and on a
schedule, but every run is equally reproducible on a local machine - same commands,
same seed, same report.

## Coverage

49 tests (~2 minutes headless) across every page of the app:

| Package                  | Classes | What is covered                                                                                                |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------- |
| `smoke/`                 | 9       | Every page shell renders for a signed-in user (one class per page, JavaDoc header with estimated execution time) |
| `regression/` auth       | 3       | Field validation, wrong password, unknown user, locked account, route guard, redirect after login, logout       |
| `regression/` markets    | 5       | Search, status filtering, sorting, watchlist toggle, admin controls, delete confirmation                        |
| `regression/` trade      | 2       | Buy/sell execution and form validation                                                                          |
| `regression/` coin form  | 4       | Admin create/edit, validation, role guard                                                                       |
| `regression/` compare    | 1       | Double-click compare, overview metrics, per-coin charts, news headlines, FAQ accordion                          |
| `regression/` dashboard  | 1       | Portfolio stats, chart and top movers against seeded data                                                       |
| `hybrid/`                | 3       | API/UI integration in both directions (see below)                                                              |

## Hybrid API/UI tests

Each hybrid test crosses the API/UI boundary inside a single scenario:

- **API to UI:** a coin created over `POST /api/coins` appears in the markets table;
  a coin deleted over the API disappears from it; an API-seeded transaction raises
  the dashboard transaction count.
- **UI to API:** a buy trade recorded through the trade form lands in
  `GET /api/transactions` with the right coin, type and amount; removing a watchlist
  star in the markets table is persisted by `GET /api/watchlist`; deleting a coin
  through the UI modal is confirmed gone by the coins API.

## Architecture

Tests never touch locators directly - each layer has one job:

- `smoke/`, `regression/`, `hybrid/` - JUnit test classes; call only keywords
- `keywords/` - `actionXxx` / `checkXxx` methods wrapped in `Allure.step`, so the
  report reads as a scenario; `ApiKeywords` wraps the API steps of hybrid tests
- `pages/` - page objects: `data-testid` locators plus interaction and verify
  methods built on explicit waits (`WebDriverWait`), never `Thread.sleep`
- `api/` - REST-assured `ApiClient` (backend reset, login, coin CRUD, transactions,
  watchlist) plus payload records and builders
- `constants/` - routes, seed users and seeded coin facts, so no test hardcodes data
- `core/` - `Config`, `DriverFactory` (headless Edge by default), `BaseTest`
  (backend reset + fresh browser per test + Allure screenshot on failure) and
  `Session` (API login planted into sessionStorage, the storage-state analog)

Backend state is deterministic: seeded data plus an open `POST /api/test/reset`
endpoint. `BaseTest` resets the backend before every test, so any test can run alone
or in any order.

## Prerequisites

- JDK 21 (no global Maven needed - the wrapper is included)
- Microsoft Edge (default browser; chrome and firefox are supported via config)
- CoinPulse backend running on `http://localhost:8080`
- CoinPulse frontend running on `http://localhost:5173`

## Setup

1. Copy `.env.example` to `.env` and fill in the demo credentials. `.env` is
   gitignored and never committed; in CI the same values are provided as
   environment variables.

## Running locally

Commands are shown for Windows; on Linux/macOS use `./mvnw` instead of `.\mvnw.cmd`.

| Command                                      | Description                             |
| -------------------------------------------- | --------------------------------------- |
| `.\mvnw.cmd test`                            | All tests, headless Edge                |
| `.\mvnw.cmd test "-Dtest=*SmokeTest"`        | Only the smoke set (fast health check)  |
| `.\mvnw.cmd test "-Dtest=LoginErrorsTest"`   | One class                               |
| `.\mvnw.cmd test "-DCOINPULSE_HEADLESS=false"` | Watch the browser                     |
| `.\mvnw.cmd test "-DCOINPULSE_BROWSER=chrome"` | Another browser (chrome, firefox)     |
| `.\mvnw.cmd allure:serve`                    | Build and open the Allure report        |

Configuration precedence: JVM system property, then environment variable, then
`.env`, then built-in defaults.

## Reporting

Every run writes Allure results to `target/allure-results`. The report groups each
test into named steps (the keyword layer) and attaches a full-page screenshot for
every failure. `.\mvnw.cmd allure:serve` builds and opens it locally.

## CI

The suite has no workflow yet. The scheduled full E2E run - backend and frontend
booted on the runner, smoke set as a fast gate, full suite with the Allure report
published as an artifact - is the next planned CI stage.
