# CoinPulse Frontend

Vue 3 single-page application for the CoinPulse crypto tracker.

## Tech stack

- **Vue 3** (Composition API, `<script setup>`) + **Vite**
- **Vue Router** with an auth guard (unauthenticated users are redirected to login)
- **Pinia** for auth state (JWT token, remember-me persistence)
- **axios** with interceptors (token header, global 401 handling)

## Structure

```
src/
├── api/          # backend communication, one module per resource
├── assets/       # global styles (CSS variables, dark theme)
├── components/
│   ├── common/   # reusable UI: BaseButton, BaseInput, BaseCard, spinner, alert
│   ├── layout/   # AppHeader, AppFooter
│   └── dashboard/# StatCard, PriceChart, TopMovers
├── composables/  # useAsync - shared loading/error state handling
├── pages/        # one component per route
├── router/       # routes + navigation guards
├── stores/       # Pinia stores
└── utils/        # formatters (currency, percent, amounts)
```

Every interactive element carries a `data-testid` attribute - the app doubles as a stable
target for UI test automation (see the repository root README).

## Development

```bash
npm install
npm run dev      # expects the backend on http://localhost:8080
npm run build    # production build (base path /coinpulse/)
npm run lint
```

`VITE_API_BASE_URL` is set per environment in `.env.development` / `.env.production`.
