# CoinPulse Backend

REST API of **CoinPulse** - a crypto tracker web app built as a stable, fully controlled target for
UI/API test automation (Cypress, Playwright, Selenium). Prices are deterministic seed data, not a
live market feed. This is not a real trading service and provides no investment advice.

## Stack

- Java 21, Spring Boot 3.5, Maven (wrapper included — no global Maven needed)
- H2 in-memory database, seeded from `data.sql` on startup
- JWT authentication (stateless), Spring Security
- OpenAPI/Swagger UI via springdoc

## Run locally

```bash
./mvnw spring-boot:run        # Windows: .\mvnw.cmd spring-boot:run
```

The API starts on `http://localhost:8080`:

- Swagger UI: http://localhost:8080/swagger-ui.html
- H2 console: http://localhost:8080/h2-console (JDBC URL `jdbc:h2:mem:coinpulse`, user `sa`, empty password)

## Test accounts (seed data)

| Username | Password | Role |
|---|---|---|
| `standard_user` | `Test123!` | USER |
| `locked_user` | `Test123!` | USER (locked — login returns 423) |
| `admin` | `Admin123!` | ADMIN |

## API overview

| Endpoint | Description |
|---|---|
| `POST /api/auth/login`, `POST /api/auth/logout` | JWT authentication |
| `GET/POST/PUT/DELETE /api/coins` | Coin catalog: pagination, sorting, category/status filters, search; writes are admin-only |
| `GET/POST/PUT/DELETE /api/transactions` | Buy/sell transactions of the authenticated user |
| `POST /api/test/reset` | Reset the database to its seed state (for independent test runs) |
| `GET /api/test/slow?ms=3000` | Artificially slow response (max 30000 ms) |
| `GET /api/test/error?code=500` | Simulated 4xx/5xx error response |

## Tests

```bash
./mvnw test
```

JUnit 5 + MockMvc integration tests covering auth (success, wrong password, locked account,
validation), coin CRUD with role checks, transaction ownership rules and the reset endpoint.
