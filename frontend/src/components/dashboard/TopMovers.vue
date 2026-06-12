<script setup>
import { formatCurrency, formatPercent } from '../../utils/formatters'

defineProps({
  title: { type: String, required: true },
  coins: { type: Array, required: true },
  testId: { type: String, required: true },
})
</script>

<template>
  <div class="top-movers" :data-testid="testId">
    <h3 class="top-movers__title">{{ title }}</h3>
    <ul class="top-movers__list">
      <li
        v-for="coin in coins"
        :key="coin.id"
        class="top-movers__row"
        :data-testid="`${testId}-row-${coin.symbol}`"
      >
        <span class="top-movers__symbol">{{ coin.symbol }}</span>
        <span class="top-movers__name text-muted">{{ coin.name }}</span>
        <span class="top-movers__price">{{ formatCurrency(coin.price) }}</span>
        <span
          class="top-movers__change"
          :class="Number(coin.change24h) >= 0 ? 'text-success' : 'text-danger'"
        >
          {{ formatPercent(coin.change24h) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.top-movers__title {
  font-size: 14px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 10px;
}

.top-movers__list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.top-movers__row {
  display: grid;
  grid-template-columns: 64px 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-border);
}

.top-movers__row:last-child {
  border-bottom: none;
}

.top-movers__symbol {
  font-weight: 700;
}

.top-movers__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.top-movers__price,
.top-movers__change {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
</style>
