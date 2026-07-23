# CoinPulse - JMeter performance

Performance test suite for the CoinPulse backend API, written as Apache JMeter test
plans and driven by the `jmeter-maven-plugin` - Maven downloads and runs JMeter
itself, so there is nothing to install. One parameterized test plan covers three
load profiles (baseline, load, stress) selected by a single command-line switch.

The suite targets ONLY a locally running backend. Free-tier cloud numbers are
meaningless (cold starts, shared CPU), so the live Render deploy is never load
tested. State is deterministic: the seed is reset through `POST /api/test/reset`
before every run, the same contract the E2E suites use.

## What is measured

The request mix mirrors how the frontend actually talks to the backend. Each
virtual user signs in once (JWT extracted from the login response), then loops
through an authenticated mix:

| Request                     | Purpose                                  |
| --------------------------- | ---------------------------------------- |
| `POST /api/auth/login`      | Sign-in, once per virtual user (BCrypt)  |
| `GET /api/coins` (list)     | Paginated markets table load             |
| `GET /api/coins` (search)   | Search-as-you-type filter                |
| `GET /api/coins/1`          | Single coin detail                       |
| `POST /api/transactions`    | Recording a buy trade (write path)       |
| `GET /api/portfolio/export` | Heaviest read - builds the full export   |

## Scenarios

| Scenario   | Virtual users | Ramp-up | Loops | Read SLA | Write SLA |
| ---------- | ------------- | ------- | ----- | -------- | --------- |
| `baseline` | 3             | 3s      | 10    | 800ms    | 1200ms    |
| `load`     | 20            | 20s     | 50    | 1000ms   | 1500ms    |
| `stress`   | 60            | 60s     | 80    | 2000ms   | 3000ms    |

Each scenario is a properties file under `scenarios/` - thread count, ramp-up,
loops, SLA budgets and think time. The test plan itself never changes; only the
profile does.

## Pass/fail

Runs are green or red, not just charts:

- Every request carries a status-code assertion and a Duration assertion with the
  scenario's SLA budget - a slow response is a failed sample.
- The plugin's results check gates the build on a 0% error rate, so one breached
  SLA fails `mvnw verify`.

## Latest local results (Windows 11, JDK 21, H2 in-memory)

| Scenario   | Requests | Errors | Throughput      | Total p95 |
| ---------- | -------- | ------ | --------------- | --------- |
| `baseline` | 154      | 0      | ~12 req/s       | 24ms      |
| `load`     | 5,021    | 0      | ~42 req/s       | 8ms       |
| `stress`   | 24,061   | 0      | ~167 req/s avg, ~283 peak | 33ms |

Findings worth noting: the knee was not reached at 60 concurrent users - reads and
writes stay flat at 2-4ms p95. The first endpoint to drift under stress is the
portfolio export (22ms avg vs 6ms under load), which is exactly the kind of trend
a performance suite exists to catch early. Login sits at ~75ms by design (BCrypt
password hashing). Numbers describe the app on a single machine with an in-memory
database - they are about the application under test, not production infra.

## Architecture

- `src/test/jmeter/coinpulse-api.jmx` - the single parameterized plan: a setUp
  thread group resets the seed, a Once Only controller signs in per virtual user
  and a JSON extractor captures the JWT, and the authenticated mix carries its own
  `Authorization: Bearer` header manager (scoped so the login request never sends
  a broken header). Uniform random think time paces the loop.
- `scenarios/*.properties` - load profiles and SLA budgets, selected with
  `-Dscenario`.
- `user.properties` - demo credentials, gitignored; `user.properties.example` is
  committed. In CI the same keys come from repository secrets.
- All values reach the plan through `${__P(...)}` JMeter properties - no numbers
  are hardcoded in the XML.

## Prerequisites

- JDK 21 (no global Maven or JMeter needed - the wrapper and plugin handle both)
- CoinPulse backend running on `http://localhost:8080` (the frontend is not used)

## Setup

1. Copy `user.properties.example` to `user.properties` and fill in the demo
   credentials.

## Running locally

Commands are shown for Windows; on Linux/macOS use `./mvnw` instead of `.\mvnw.cmd`.
`clean` is required - JMeter refuses to write its HTML report into a non-empty
folder, so every run starts from a fresh `target/`.

| Command                                        | Description                    |
| ---------------------------------------------- | ------------------------------ |
| `.\mvnw.cmd clean verify`                      | Baseline scenario (default)    |
| `.\mvnw.cmd clean verify "-Dscenario=load"`    | Load scenario, 20 users        |
| `.\mvnw.cmd clean verify "-Dscenario=stress"`  | Stress scenario, 60 users      |
| `.\mvnw.cmd jmeter:configure jmeter:gui`       | Open the plan in the JMeter GUI (authoring only) |

## Reporting

Every run writes the raw results (`.csv`) to `target/jmeter/results/` and a full
JMeter HTML dashboard - throughput, percentiles, response-time charts per request -
to `target/jmeter/reports/coinpulse-api/index.html`.

## CI

The suite has no workflow yet. A scheduled short baseline run against a backend
booted on the runner, with the HTML dashboard published as an artifact, is the
next planned CI stage.
