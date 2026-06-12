<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useWatchlistStore } from '../../stores/watchlist'
import BaseButton from '../common/BaseButton.vue'

const auth = useAuthStore()
const watchlist = useWatchlistStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout()
  watchlist.reset()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="app-header" data-testid="app-header">
    <div class="container app-header__inner">
      <RouterLink :to="{ name: 'dashboard' }" class="app-header__brand" data-testid="nav-brand">
        <svg viewBox="0 0 32 32" class="app-header__logo" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#10141f" />
          <polyline
            points="4,20 10,20 13,10 18,24 21,16 28,16"
            fill="none"
            stroke="#22c55e"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        CoinPulse
      </RouterLink>

      <nav class="app-header__nav" data-testid="main-nav">
        <RouterLink :to="{ name: 'dashboard' }" class="app-header__link" data-testid="nav-dashboard">
          Dashboard
        </RouterLink>
        <RouterLink :to="{ name: 'markets' }" class="app-header__link" data-testid="nav-markets">
          Markets
        </RouterLink>
        <RouterLink :to="{ name: 'trade' }" class="app-header__link" data-testid="nav-trade">
          Trade
        </RouterLink>
        <RouterLink :to="{ name: 'compare' }" class="app-header__link" data-testid="nav-compare">
          Compare
        </RouterLink>
      </nav>

      <div v-if="auth.isAuthenticated" class="app-header__user">
        <span class="app-header__username" data-testid="header-username">{{ auth.username }}</span>
        <BaseButton variant="secondary" test-id="logout-button" @click="handleLogout">
          Logout
        </BaseButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.app-header__inner {
  display: flex;
  align-items: center;
  gap: 32px;
  height: 64px;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
}

.app-header__brand:hover {
  text-decoration: none;
}

.app-header__logo {
  width: 28px;
  height: 28px;
}

.app-header__nav {
  display: flex;
  gap: 20px;
  flex: 1;
}

.app-header__link {
  color: var(--color-text-muted);
  font-weight: 500;
}

.app-header__link.router-link-active {
  color: var(--color-text);
}

.app-header__user {
  display: flex;
  align-items: center;
  gap: 14px;
}

.app-header__username {
  color: var(--color-text-muted);
  font-weight: 500;
}
</style>
