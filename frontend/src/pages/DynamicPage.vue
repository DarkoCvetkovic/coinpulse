<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { coinsApi } from '../api/coinsApi'
import { formatCurrency } from '../utils/formatters'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import SuccessAlert from '../components/common/SuccessAlert.vue'

const TICKER_INTERVAL_MS = 2000
const ENABLE_AFTER_SECONDS = 5
const LAZY_BATCH = 5

// --- Simulated price ticker ---
const baseCoin = ref(null)
const tick = ref(0)
let tickerTimer = null

const tickerPrice = computed(() => {
  if (!baseCoin.value) return null
  // Deterministic wobble: same tick always produces the same price
  const wobble = 1 + 0.002 * Math.sin(tick.value * 1.3)
  return Number(baseCoin.value.price) * wobble
})

// --- Disabled -> enabled button ---
const secondsLeft = ref(ENABLE_AFTER_SECONDS)
const delayedClicked = ref(false)
let countdownTimer = null

// --- Lazy-load list ---
const allCoins = ref([])
const visibleCount = ref(LAZY_BATCH)
const lazyLoading = ref(false)
const sentinel = ref(null)
let observer = null

const visibleCoins = computed(() => allCoins.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < allCoins.value.length)

// --- Shadow DOM widget ---
const shadowHost = ref(null)

onMounted(async () => {
  const data = await coinsApi.list({ size: 100, sort: 'rank,asc' })
  allCoins.value = data.content
  baseCoin.value = data.content[0] ?? null

  tickerTimer = setInterval(() => {
    tick.value += 1
  }, TICKER_INTERVAL_MS)

  countdownTimer = setInterval(() => {
    if (secondsLeft.value > 0) secondsLeft.value -= 1
    if (secondsLeft.value === 0) clearInterval(countdownTimer)
  }, 1000)

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore.value && !lazyLoading.value) {
      lazyLoading.value = true
      // Small artificial delay so the loading state is observable in tests
      setTimeout(() => {
        visibleCount.value += LAZY_BATCH
        lazyLoading.value = false
      }, 600)
    }
  })
  if (sentinel.value) observer.observe(sentinel.value)

  // The "Fear & Greed" widget lives in a shadow root - tests must pierce it
  const shadow = shadowHost.value.attachShadow({ mode: 'open' })
  shadow.innerHTML = `
    <style>
      .widget { font-family: inherit; border: 1px solid #232b3e; border-radius: 10px;
        padding: 16px; display: flex; flex-direction: column; gap: 6px; }
      .label { color: #8b93a7; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; }
      .value { color: #f59e0b; font-size: 28px; font-weight: 700; }
      .scale { color: #8b93a7; font-size: 13px; }
    </style>
    <div class="widget" data-testid="shadow-widget">
      <span class="label">Fear &amp; Greed index</span>
      <span class="value" data-testid="shadow-widget-value">61</span>
      <span class="scale">Greed - simulated, always 61 for stable tests</span>
    </div>
  `
})

onBeforeUnmount(() => {
  clearInterval(tickerTimer)
  clearInterval(countdownTimer)
  if (observer) observer.disconnect()
})

const IFRAME_DOC = `
<!doctype html>
<html>
  <head>
    <style>
      body { margin: 0; background: #0b0e14; color: #e6e9f0;
        font-family: -apple-system, 'Segoe UI', sans-serif; padding: 16px; }
      h2 { font-size: 14px; margin: 0 0 10px; color: #8b93a7; text-transform: uppercase; }
    </style>
  </head>
  <body>
    <h2 data-testid="iframe-title">Embedded BTC chart</h2>
    <svg viewBox="0 0 300 80" width="100%" height="80" aria-label="Embedded chart">
      <polyline points="0,60 30,55 60,62 90,45 120,50 150,38 180,42 210,30 240,34 270,22 300,26"
        fill="none" stroke="#22c55e" stroke-width="2"/>
    </svg>
  </body>
</html>
`
</script>

<template>
  <div class="container dynamic" data-testid="dynamic-page">
    <h1 class="dynamic__title">Live elements</h1>
    <p class="text-muted">
      A playground of dynamic UI behaviors that are usually the hardest to automate: timers,
      lazy loading, iframes and shadow DOM.
    </p>

    <div class="dynamic__grid">
      <BaseCard title="Live ticker" test-id="ticker-card">
        <template v-if="baseCoin">
          <p class="dynamic__ticker-coin">{{ baseCoin.name }} ({{ baseCoin.symbol }})</p>
          <p class="dynamic__ticker-price" data-testid="ticker-price">
            {{ formatCurrency(tickerPrice) }}
          </p>
          <p class="text-muted">
            Refreshes every 2 seconds - update #<span data-testid="ticker-count">{{ tick }}</span>
          </p>
        </template>
      </BaseCard>

      <BaseCard title="Disabled until ready" test-id="delayed-card">
        <p class="text-muted dynamic__delayed-hint">
          This button enables itself {{ ENABLE_AFTER_SECONDS }} seconds after the page loads.
        </p>
        <BaseButton
          :disabled="secondsLeft > 0"
          test-id="delayed-button"
          @click="delayedClicked = true"
        >
          {{ secondsLeft > 0 ? `Ready in ${secondsLeft}s...` : 'Click me' }}
        </BaseButton>
        <SuccessAlert
          v-if="delayedClicked"
          message="You clicked the delayed button."
          test-id="delayed-success"
        />
      </BaseCard>

      <BaseCard title="Embedded chart (iframe)" test-id="iframe-card">
        <iframe
          :srcdoc="IFRAME_DOC"
          title="Embedded BTC chart"
          class="dynamic__iframe"
          data-testid="chart-iframe"
        />
      </BaseCard>

      <BaseCard title="Shadow DOM widget" test-id="shadow-card">
        <div ref="shadowHost" data-testid="shadow-host" />
      </BaseCard>
    </div>

    <BaseCard title="Lazy-loaded list" test-id="lazy-card">
      <p class="text-muted">More coins load automatically as you scroll to the bottom.</p>
      <ul class="dynamic__lazy-list" data-testid="lazy-list">
        <li
          v-for="coin in visibleCoins"
          :key="coin.id"
          class="dynamic__lazy-item"
          :data-testid="`lazy-item-${coin.symbol}`"
        >
          <span class="dynamic__lazy-rank text-muted">#{{ coin.rank }}</span>
          <span class="dynamic__lazy-name">{{ coin.name }}</span>
          <span class="text-muted">{{ coin.symbol }}</span>
          <span class="dynamic__lazy-price">{{ formatCurrency(coin.price) }}</span>
        </li>
      </ul>
      <div ref="sentinel" class="dynamic__sentinel" data-testid="lazy-sentinel">
        <span v-if="lazyLoading" class="text-muted" data-testid="lazy-loading">Loading more...</span>
        <span v-else-if="!hasMore" class="text-muted" data-testid="lazy-done">
          All {{ allCoins.length }} coins loaded.
        </span>
      </div>
    </BaseCard>

    <BaseCard title="External link" test-id="external-card">
      <p class="text-muted dynamic__external-hint">
        Opens the official Bitcoin site in a new browser tab.
      </p>
      <a
        href="https://bitcoin.org"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="external-link"
      >
        bitcoin.org - opens in a new tab
      </a>
    </BaseCard>
  </div>
</template>

<style scoped>
.dynamic {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dynamic__title {
  font-size: 24px;
}

.dynamic__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.dynamic__ticker-coin {
  font-weight: 600;
  margin-bottom: 4px;
}

.dynamic__ticker-price {
  font-size: 30px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  margin-bottom: 6px;
}

.dynamic__delayed-hint {
  margin-bottom: 12px;
}

.dynamic__iframe {
  width: 100%;
  height: 140px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.dynamic__lazy-list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.dynamic__lazy-item {
  display: grid;
  grid-template-columns: 48px 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 10px 4px;
  border-bottom: 1px solid var(--color-border);
}

.dynamic__lazy-name {
  font-weight: 600;
}

.dynamic__lazy-price {
  font-variant-numeric: tabular-nums;
}

.dynamic__sentinel {
  display: flex;
  justify-content: center;
  padding: 14px 0 4px;
  min-height: 24px;
}

.dynamic__external-hint {
  margin-bottom: 8px;
}
</style>
