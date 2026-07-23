# CoinPulse

[![Backend CI](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/backend-ci.yml)
[![Frontend Deploy](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/frontend-deploy.yml/badge.svg)](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/frontend-deploy.yml)
[![Cypress CI](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/cypress-ci.yml/badge.svg)](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/cypress-ci.yml)
[![Daily tests](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/daily-tests.yml/badge.svg)](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/daily-tests.yml)

Full-stack cryptocurrency tracking application (markets table, watchlist, portfolio with
transactions) built as a complete QA portfolio project. The app is a real product and, at the
same time, a stable target for demonstrating test automation across multiple frameworks -
the same scenarios implemented in Cypress, Playwright and Selenium, plus API-level seeding,
hybrid API/UI integration tests and JMeter performance scenarios.

> **Disclaimer:** CoinPulse is not a real trading service. All prices are deterministic seed
> data - there is no real money and no investment advice.

## Live demo

- **App:** https://darkocvetkovic.github.io/coinpulse/ (demo login: `standard_user` / `Test123!`)
- **Backend API:** https://coinpulse-backend-pba8.onrender.com (Swagger docs at
  [/swagger-ui.html](https://coinpulse-backend-pba8.onrender.com/swagger-ui.html))
- The backend runs on Render's free tier - the first request after a period of inactivity can
  take 30-60 seconds while the service wakes up.

## Repository structure

| Folder | Description | Highlights |
|---|---|---|
| [backend](backend/) | Java 21 + Spring Boot 3 REST API (H2, JWT, Swagger) | 56 unit/API tests, ~93% line coverage (JaCoCo) |
| [frontend](frontend/) | Vue 3 + Vite + Pinia single-page application | 96 Vitest unit tests; every element carries a `data-testid` |
| [tests-cypress](tests-cypress/) | Cypress + TypeScript E2E suite | 27 specs / 76 tests, layered POM + keywords, API seeding, Mochawesome |
| [tests-playwright](tests-playwright/) | Playwright + TypeScript E2E suite | 76 tests per browser on chromium, firefox and webkit; fixtures + storage state |
| [tests-selenium](tests-selenium/) | Selenium 4 + Java + REST-assured E2E suite | 49 tests (10 smoke, 33 regression, 6 hybrid API/UI), Allure steps |
| [tests-jmeter](tests-jmeter/) | Apache JMeter performance suite | Baseline/load/stress scenarios with SLA gates and an HTML dashboard |

Each test folder is a standalone project with its own dependencies and README covering
coverage, architecture and how to run it.

## Test strategy in one paragraph

The backend exposes deterministic seed data and an open `POST /api/test/reset` endpoint, so
every test starts from a known state. UI suites share the same three-layer architecture
(specs call keywords, keywords call page objects, locators are `data-testid` only) and the
same scenarios, which makes the frameworks directly comparable. Preconditions are created
through the API, not by clicking, and hybrid tests verify the API and the UI against each
other in both directions. JMeter reuses the same seed and reset contract for performance
runs against a locally booted backend.

## CI/CD

| Workflow | Trigger | What it does |
|---|---|---|
| [Backend CI](.github/workflows/backend-ci.yml) | Push/PR on `backend/**` | `mvnw verify` (unit + API tests) |
| [Frontend Deploy](.github/workflows/frontend-deploy.yml) | Push on `frontend/**` | Lint + Vitest unit tests, then build and deploy to GitHub Pages |
| [Cypress CI](.github/workflows/cypress-ci.yml) | Push/PR on `tests-cypress/**` | Fast validate: format check, lint, typecheck |
| [Daily tests](.github/workflows/daily-tests.yml) | Weekdays 06:00 UTC + manual | Six parallel jobs: backend unit, frontend unit, Cypress, Playwright, Selenium, JMeter baseline - each E2E job boots the app on the runner, runs the smoke set as a fast gate, then the full suite; reports upload as artifacts and a pass/fail summary is emailed |

Deploys: the backend auto-deploys to Render (Docker) on `backend/**` changes; the frontend
deploys to GitHub Pages on `frontend/**` changes.

## Tech stack

- **Backend:** Java 21, Spring Boot 3, Spring Data JPA, H2 in-memory database, JWT auth,
  springdoc-openapi (Swagger UI)
- **Frontend:** Vue 3 (Composition API), Vite, Vue Router, Pinia, Vitest
- **Test automation:** Cypress (TypeScript), Playwright (TypeScript), Selenium 4 (Java,
  JUnit 5), REST-assured, Apache JMeter; Mochawesome, Playwright HTML and Allure reporting
- **CI/CD:** GitHub Actions, GitHub Pages (frontend), Render (backend)

## Running locally

Prerequisites: JDK 21 and Node.js 20+ (no global Maven, Cypress or JMeter needed - wrappers
and package managers handle everything).

```bash
# Backend (port 8080)
cd backend
./mvnw spring-boot:run
```

```bash
# Frontend (port 5173)
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173` - Swagger UI: `http://localhost:8080/swagger-ui.html`

With both servers up, any suite runs against them - see the README in each test folder for
setup (demo credentials go into a gitignored env file) and the full command reference:
[Cypress](tests-cypress/README.md), [Playwright](tests-playwright/README.md),
[Selenium](tests-selenium/README.md), [JMeter](tests-jmeter/README.md).
