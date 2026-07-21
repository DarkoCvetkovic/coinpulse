# CoinPulse Tests - Selenium

Selenium 4 + Java 21 + JUnit 5 E2E suite with REST-assured for API seeding and Allure
reporting. Drives the local frontend (http://localhost:5173) and backend
(http://localhost:8080) - both must be running (see the repo root README).

## Stack

- Java 21, Maven (wrapper included - no global install needed)
- Selenium 4 with Selenium Manager (drivers resolve automatically, no WebDriverManager)
- JUnit 5 + AssertJ
- REST-assured for API seeding and backend reset
- Allure (allure-junit5) reporting with screenshots on failure

## Layout

- `src/test/java/com/coinpulse/selenium/core` - Config, DriverFactory, BaseTest, Session
- `.../pages` - page objects (data-testid locators, explicit waits only)
- `.../keywords` - action/check keywords wrapped in Allure steps; tests call only these
- `.../api` - REST-assured ApiClient (reset, login)
- `.../constants` - routes and seed users
- `.../smoke` - fast shell checks per page (sign-in via API + session injection)
- `.../regression` - the deeper functional set

## Running

```
# copy .env.example to .env and fill in the seed credentials first
.\mvnw.cmd test                          # all tests (headless Edge by default)
.\mvnw.cmd test "-Dtest=LoginSmokeTest"  # one class
.\mvnw.cmd test "-DCOINPULSE_HEADLESS=false"  # watch the browser
.\mvnw.cmd allure:serve                  # open the Allure report
```

Configuration precedence: JVM system property, then environment variable, then `.env`,
then built-in defaults. Supported browsers: edge (default), chrome, firefox.
