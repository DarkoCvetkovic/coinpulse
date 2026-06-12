<script setup>
import { computed } from 'vue'
import { formatCurrency, formatPercent } from '../../utils/formatters'

const props = defineProps({
  coin: { type: Object, required: true },
})

const WIDTH = 640
const HEIGHT = 180
const POINTS = 24

/**
 * The backend serves deterministic seed prices, so the 24h series is
 * synthesized from the price and change24h: it starts at the implied
 * yesterday-price and ends at the current price, with a deterministic
 * wobble derived from the coin id (stable across reloads - test friendly).
 */
const series = computed(() => {
  const price = Number(props.coin.price)
  const changePct = Number(props.coin.change24h ?? 0) / 100
  const start = price / (1 + changePct)
  const seed = Number(props.coin.id ?? 1)

  return Array.from({ length: POINTS }, (_, i) => {
    const progress = i / (POINTS - 1)
    const base = start + (price - start) * progress
    const wobble = Math.sin(i * 1.7 + seed) * Math.abs(price - start) * 0.18
    // Endpoints stay exact so the chart matches the displayed numbers
    return i === 0 || i === POINTS - 1 ? base : base + wobble
  })
})

const chartPoints = computed(() => {
  const values = series.value
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const stepX = WIDTH / (POINTS - 1)
  return values
    .map((value, i) => {
      const x = (i * stepX).toFixed(1)
      const y = (HEIGHT - 16 - ((value - min) / range) * (HEIGHT - 32)).toFixed(1)
      return `${x},${y}`
    })
    .join(' ')
})

const isUp = computed(() => Number(props.coin.change24h ?? 0) >= 0)
</script>

<template>
  <div class="price-chart" data-testid="price-chart">
    <div class="price-chart__meta">
      <span class="price-chart__coin" data-testid="price-chart-coin">
        {{ coin.name }} ({{ coin.symbol }})
      </span>
      <span class="price-chart__price" data-testid="price-chart-price">
        {{ formatCurrency(coin.price) }}
      </span>
      <span
        :class="isUp ? 'text-success' : 'text-danger'"
        data-testid="price-chart-change"
      >
        {{ formatPercent(coin.change24h) }} (24h)
      </span>
    </div>
    <svg
      :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
      class="price-chart__svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        :points="chartPoints"
        fill="none"
        :stroke="isUp ? 'var(--color-success)' : 'var(--color-danger)'"
        stroke-width="2.5"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.price-chart__meta {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.price-chart__coin {
  font-weight: 600;
}

.price-chart__price {
  font-size: 20px;
  font-weight: 700;
}

.price-chart__svg {
  width: 100%;
  height: 180px;
  display: block;
}
</style>
