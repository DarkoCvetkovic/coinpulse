# CoinPulse

[![Backend CI](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/backend-ci.yml)
[![Frontend Deploy](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/frontend-deploy.yml/badge.svg)](https://github.com/DarkoCvetkovic/coinpulse/actions/workflows/frontend-deploy.yml)

Full-stack cryptocurrency tracking application (markets table, watchlist, portfolio with
transactions) built as a complete QA portfolio project. The app is a real product and, at the
same time, a stable target for demonstrating test automation across multiple frameworks.

> **Disclaimer:** CoinPulse is not a real trading service. All prices are deterministic seed
> data - there is no real money and no investment advice.

## Repository structure

| Folder | Description | Status |
|---|---|---|
| [backend](backend/) | Java 21 + Spring Boot 3 REST API (H2, JWT, Swagger) | In progress |
| [frontend](frontend/) | Vue 3 + Vite + Pinia single-page application | In progress |
| [tests-cypress](tests-cypress/) | Cypress + TypeScript - UI, API and hybrid tests | Planned |
| [tests-playwright](tests-playwright/) | Playwright + TypeScript - UI, API and hybrid tests | Planned |
| [tests-selenium](tests-selenium/) | Selenium 4 + Java + REST-assured - UI, API and hybrid tests | Planned |

## Tech stack

- **Backend:** Java 21, Spring Boot 3, Spring Data JPA, H2 in-memory database, JWT auth,
  springdoc-openapi (Swagger UI)
- **Frontend:** Vue 3 (Composition API), Vite, Vue Router, Pinia
- **Test automation:** Cypress (TypeScript), Playwright (TypeScript), Selenium (Java),
  REST-assured; Allure and Mochawesome reporting
- **CI/CD:** GitHub Actions, GitHub Pages (frontend + live test reports), Render (backend)

## Live demo

- **App:** https://darkocvetkovic.github.io/coinpulse/ (demo login: `standard_user` / `Test123!`)
- **Backend API:** https://coinpulse-backend-pba8.onrender.com (Swagger docs at
  [/swagger-ui.html](https://coinpulse-backend-pba8.onrender.com/swagger-ui.html))
- The backend runs on Render's free tier - the first request after a period of inactivity can
  take 30-60 seconds while the service wakes up.

## Running locally

```bash
# Backend (port 8080)
cd backend
./mvnw spring-boot:run
```

Swagger UI: `http://localhost:8080/swagger-ui.html`

Frontend and test suite instructions will be added as those parts land.
