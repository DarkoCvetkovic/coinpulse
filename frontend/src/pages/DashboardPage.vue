<script setup>
import { computed, onMounted } from 'vue'
import { coinsApi } from '../api/coinsApi'
import { transactionsApi } from '../api/transactionsApi'
import { useAsync } from '../composables/useAsync'
import { formatCurrency, formatPercent } from '../utils/formatters'
import BaseCard from '../components/common/BaseCard.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ErrorAlert from '../components/common/ErrorAlert.vue'
import StatCard from '../components/dashboard/StatCard.vue'
import PriceChart from '../components/dashboard/PriceChart.vue'
import TopMovers from '../components/dashboard/TopMovers.vue'

const {
  data: dashboard,
  loading,
  error,
  execute: loadDashboard,
} = useAsync(async () => {
  const [coinsPage, transactions] = await Promise.all([
    coinsApi.list({ size: 100, sort: 'rank,asc' }),
    transactionsApi.list(),
  ])
  return { coins: coinsPage.content, transactions }
})

onMounted(loadDashboard)

const coinsById = computed(() => {
  const map = new Map()
  for (const coin of dashboard.value?.coins ?? []) {
    map.set(coin.id, coin)
  }
  return map
})

/** Net holdings per coin: buys add, sells subtract. */
const holdings = computed(() => {
  const byCoin = new Map()
  for (const tx of dashboard.value?.transactions ?? []) {
    const current = byCoin.get(tx.coin.id) ?? 0
    const delta = tx.type === 'buy' ? Number(tx.amount) : -Number(tx.amount)
    byCoin.set(tx.coin.id, current + delta)
  }
  return byCoin
})

const portfolioValue = computed(() => {
  let total = 0
  for (const [coinId, amount] of holdings.value) {
    const coin = coinsById.value.get(coinId)
    if (coin && amount > 0) total += amount * Number(coin.price)
  }
  return total
})

/** Portfolio 24h change in dollars, derived from each held coin's change24h. */
const portfolioChange24h = computed(() => {
  let change = 0
  for (const [coinId, amount] of holdings.value) {
    const coin = coinsById.value.get(coinId)
    if (!coin || amount <= 0) continue
    const value = amount * Number(coin.price)
    const pct = Number(coin.change24h ?? 0) / 100
    change += value - value / (1 + pct)
  }
  return change
})

const portfolioChangePercent = computed(() => {
  const previous = portfolioValue.value - portfolioChange24h.value
  return previous > 0 ? (portfolioChange24h.value / previous) * 100 : 0
})

const activeCoins = computed(() =>
  (dashboard.value?.coins ?? []).filter((coin) => coin.status === 'active')
)

const topGainers = computed(() =>
  [...activeCoins.value].sort((a, b) => b.change24h - a.change24h).slice(0, 3)
)

const topLosers = computed(() =>
  [...activeCoins.value].sort((a, b) => a.change24h - b.change24h).slice(0, 3)
)

/** The chart shows the user's largest holding, falling back to the #1 ranked coin. */
const featuredCoin = computed(() => {
  let best = null
  let bestValue = 0
  for (const [coinId, amount] of holdings.value) {
    const coin = coinsById.value.get(coinId)
    if (!coin || amount <= 0) continue
    const value = amount * Number(coin.price)
    if (value > bestValue) {
      best = coin
      bestValue = value
    }
  }
  return best ?? activeCoins.value[0] ?? null
})
</script>

<template>
  <div class="container dashboard" data-testid="dashboard-page">
    <h1 class="dashboard__title">Dashboard</h1>

    <LoadingSpinner v-if="loading" label="Loading your portfolio..." />

    <ErrorAlert
      v-else-if="error"
      message="Could not load dashboard data. Please try again later."
      test-id="dashboard-error"
    />

    <template v-else-if="dashboard">
      <div class="dashboard__stats">
        <StatCard
          label="Portfolio value"
          :value="formatCurrency(portfolioValue)"
          :sub="`${formatCurrency(portfolioChange24h)} today`"
          :trend="portfolioChange24h >= 0 ? 'up' : 'down'"
          test-id="stat-portfolio-value"
        />
        <StatCard
          label="24h change"
          :value="formatPercent(portfolioChangePercent)"
          :trend="portfolioChangePercent >= 0 ? 'up' : 'down'"
          test-id="stat-24h-change"
        />
        <StatCard
          label="Transactions"
          :value="String(dashboard.transactions.length)"
          sub="all time"
          test-id="stat-transactions"
        />
      </div>

      <BaseCard v-if="featuredCoin" title="Price movement" test-id="dashboard-chart-card">
        <PriceChart :coin="featuredCoin" />
      </BaseCard>

      <div class="dashboard__movers">
        <BaseCard test-id="dashboard-gainers-card">
          <TopMovers title="Top gainers (24h)" :coins="topGainers" test-id="top-gainers" />
        </BaseCard>
        <BaseCard test-id="dashboard-losers-card">
          <TopMovers title="Top losers (24h)" :coins="topLosers" test-id="top-losers" />
        </BaseCard>
      </div>
    </template>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard__title {
  font-size: 24px;
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.dashboard__movers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}
</style>
