<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useWatchlistStore } from '../stores/watchlist'
import { formatCurrency, formatPercent } from '../utils/formatters'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import BaseModal from '../components/common/BaseModal.vue'
import ErrorAlert from '../components/common/ErrorAlert.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import AppAccordion from '../components/common/AppAccordion.vue'
import AppTabs from '../components/common/AppTabs.vue'
import AppTooltip from '../components/common/AppTooltip.vue'
import PriceChart from '../components/dashboard/PriceChart.vue'

const MAX_COMPARE = 3

const watchlist = useWatchlistStore()

const loading = ref(true)
const error = ref(null)
// Local display order of the watchlist - reorderable by drag & drop
const orderedCoins = ref([])
const compareCoins = ref([])
const activeTab = ref('overview')

const showLimitAlert = ref(false)
const showClearConfirm = ref(false)
const contextMenu = reactive({ visible: false, coin: null, x: 0, y: 0 })

const dragState = reactive({ coinId: null, source: null })

onMounted(async () => {
  try {
    if (!watchlist.loaded) await watchlist.load()
    orderedCoins.value = watchlist.items.map((item) => item.coin)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
  document.addEventListener('click', closeContextMenu)
})

onBeforeUnmount(() => document.removeEventListener('click', closeContextMenu))

const compareIds = computed(() => new Set(compareCoins.value.map((coin) => coin.id)))

const OVERVIEW_METRICS = [
  { key: 'price', label: 'Price', tooltip: 'Current market price in USD (seed data).', format: (c) => formatCurrency(c.price) },
  { key: 'change24h', label: '24h change', tooltip: 'Price change over the last 24 hours.', format: (c) => formatPercent(c.change24h) },
  { key: 'marketCap', label: 'Market cap', tooltip: 'Total value of all coins in circulation.', format: (c) => formatCurrency(c.marketCap) },
  { key: 'rank', label: 'Rank', tooltip: 'Position by market capitalization.', format: (c) => `#${c.rank}` },
  { key: 'category', label: 'Category', tooltip: 'Ecosystem category of the coin.', format: (c) => c.category },
  { key: 'launchDate', label: 'Launch date', tooltip: 'Date the network or token launched.', format: (c) => c.launchDate ?? '-' },
]

const FAQ_ITEMS = [
  {
    key: 'data',
    title: 'Where does the data come from?',
    content:
      'All prices are deterministic seed data served by the CoinPulse backend. Nothing here is live market data - that makes the app a stable target for automated tests.',
  },
  {
    key: 'compare',
    title: 'How do I compare coins?',
    content:
      'Drag a coin from your watchlist into the compare zone, or double-click it. You can compare up to three coins side by side across the overview, chart and news tabs.',
  },
  {
    key: 'reorder',
    title: 'Can I reorder my watchlist?',
    content:
      'Yes - drag a coin onto another coin in the list to move it to that position. The order is visual only and resets when you reload the page.',
  },
  {
    key: 'real',
    title: 'Is this a real trading platform?',
    content:
      'No. CoinPulse is a QA portfolio demo. There is no real money, no real orders and no investment advice.',
  },
]

/** Deterministic fake headlines - same coin always gets the same "news". */
function newsFor(coin) {
  return [
    { id: `${coin.id}-1`, title: `${coin.name} ${Number(coin.change24h) >= 0 ? 'climbs' : 'slips'} ${Math.abs(Number(coin.change24h)).toFixed(2)}% in 24 hours`, source: 'CoinPulse Wire' },
    { id: `${coin.id}-2`, title: `What ${coin.symbol} holders should know about the ${coin.category} sector`, source: 'Pulse Research' },
    { id: `${coin.id}-3`, title: `${coin.name} keeps rank #${coin.rank} by market cap`, source: 'Market Watchers' },
  ]
}

function addToCompare(coin) {
  if (compareIds.value.has(coin.id)) return
  if (compareCoins.value.length >= MAX_COMPARE) {
    showLimitAlert.value = true
    return
  }
  compareCoins.value.push(coin)
}

function removeFromCompare(coinId) {
  compareCoins.value = compareCoins.value.filter((coin) => coin.id !== coinId)
}

function clearCompare() {
  compareCoins.value = []
  showClearConfirm.value = false
}

// --- Drag & drop ---

function onDragStart(coin, source) {
  dragState.coinId = coin.id
  dragState.source = source
}

function onDropToCompare() {
  const coin = orderedCoins.value.find((c) => c.id === dragState.coinId)
  if (coin) addToCompare(coin)
  dragState.coinId = null
}

function onDropToReorder(targetCoin) {
  if (dragState.source !== 'watchlist' || dragState.coinId === targetCoin.id) return
  const list = [...orderedCoins.value]
  const fromIndex = list.findIndex((c) => c.id === dragState.coinId)
  const toIndex = list.findIndex((c) => c.id === targetCoin.id)
  if (fromIndex === -1 || toIndex === -1) return
  const [moved] = list.splice(fromIndex, 1)
  list.splice(toIndex, 0, moved)
  orderedCoins.value = list
  dragState.coinId = null
}

// --- Context menu (right click) ---

function openContextMenu(event, coin) {
  contextMenu.visible = true
  contextMenu.coin = coin
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
}

function closeContextMenu() {
  contextMenu.visible = false
}

async function removeFromWatchlist(coin) {
  closeContextMenu()
  await watchlist.toggle(coin.id)
  orderedCoins.value = orderedCoins.value.filter((c) => c.id !== coin.id)
  removeFromCompare(coin.id)
}
</script>

<template>
  <div class="container compare" data-testid="compare-page">
    <h1 class="compare__title">Compare</h1>

    <LoadingSpinner v-if="loading" label="Loading your watchlist..." />
    <ErrorAlert
      v-else-if="error"
      message="Could not load the watchlist. Please try again later."
      test-id="compare-error"
    />

    <template v-else>
      <div class="compare__builder">
        <BaseCard title="Your watchlist" test-id="compare-watchlist-card">
          <p class="compare__hint text-muted">
            Drag onto the compare zone (or double-click) to compare. Drag onto another coin to
            reorder. Right-click for more options.
          </p>
          <ul class="compare__list" data-testid="compare-watchlist">
            <li
              v-for="coin in orderedCoins"
              :key="coin.id"
              class="compare__coin"
              draggable="true"
              :data-testid="`compare-watchlist-item-${coin.symbol}`"
              @dragstart="onDragStart(coin, 'watchlist')"
              @dragover.prevent
              @drop.prevent="onDropToReorder(coin)"
              @dblclick="addToCompare(coin)"
              @contextmenu.prevent="openContextMenu($event, coin)"
            >
              <span class="compare__drag-handle" aria-hidden="true">⋮⋮</span>
              <span class="compare__coin-name">{{ coin.name }}</span>
              <span class="text-muted">{{ coin.symbol }}</span>
              <span
                class="compare__coin-change"
                :class="Number(coin.change24h) >= 0 ? 'text-success' : 'text-danger'"
              >
                {{ formatPercent(coin.change24h) }}
              </span>
            </li>
            <li v-if="orderedCoins.length === 0" class="compare__empty text-muted" data-testid="compare-watchlist-empty">
              Your watchlist is empty - star some coins on the Markets page first.
            </li>
          </ul>
        </BaseCard>

        <BaseCard title="Compare zone" test-id="compare-zone-card">
          <template #actions>
            <BaseButton
              v-if="compareCoins.length"
              variant="secondary"
              test-id="compare-clear"
              @click="showClearConfirm = true"
            >
              Clear all
            </BaseButton>
          </template>
          <div
            class="compare__zone"
            :class="{ 'compare__zone--empty': compareCoins.length === 0 }"
            data-testid="compare-zone"
            @dragover.prevent
            @drop.prevent="onDropToCompare"
          >
            <p v-if="compareCoins.length === 0" class="text-muted" data-testid="compare-zone-hint">
              Drop coins here ({{ MAX_COMPARE }} max)
            </p>
            <div
              v-for="coin in compareCoins"
              :key="coin.id"
              class="compare__chip"
              :data-testid="`compare-chip-${coin.symbol}`"
            >
              {{ coin.name }} ({{ coin.symbol }})
              <button
                class="compare__chip-remove"
                type="button"
                :aria-label="`Remove ${coin.name}`"
                :data-testid="`compare-chip-remove-${coin.symbol}`"
                @click="removeFromCompare(coin.id)"
              >
                &times;
              </button>
            </div>
          </div>
        </BaseCard>
      </div>

      <BaseCard v-if="compareCoins.length" test-id="compare-results-card">
        <AppTabs
          v-model="activeTab"
          :tabs="[
            { key: 'overview', label: 'Overview' },
            { key: 'chart', label: 'Chart' },
            { key: 'news', label: 'News' },
          ]"
          test-id="compare-tabs"
        >
          <template #overview>
            <table class="compare__table" data-testid="compare-overview-table">
              <thead>
                <tr>
                  <th class="compare__metric-header">Metric</th>
                  <th v-for="coin in compareCoins" :key="coin.id" :data-testid="`compare-col-${coin.symbol}`">
                    {{ coin.name }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="metric in OVERVIEW_METRICS" :key="metric.key">
                  <td class="compare__metric">
                    {{ metric.label }}
                    <AppTooltip :text="metric.tooltip" :test-id="`compare-tooltip-${metric.key}`" />
                  </td>
                  <td
                    v-for="coin in compareCoins"
                    :key="coin.id"
                    :class="metric.key === 'change24h' ? (Number(coin.change24h) >= 0 ? 'text-success' : 'text-danger') : ''"
                    :data-testid="`compare-value-${metric.key}-${coin.symbol}`"
                  >
                    {{ metric.format(coin) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template #chart>
            <div class="compare__charts" data-testid="compare-charts">
              <PriceChart v-for="coin in compareCoins" :key="coin.id" :coin="coin" />
            </div>
          </template>

          <template #news>
            <div class="compare__news" data-testid="compare-news">
              <div v-for="coin in compareCoins" :key="coin.id" class="compare__news-group">
                <h3 class="compare__news-coin">{{ coin.name }}</h3>
                <article
                  v-for="article in newsFor(coin)"
                  :key="article.id"
                  class="compare__news-item"
                  :data-testid="`compare-news-${article.id}`"
                >
                  <span class="compare__news-title">{{ article.title }}</span>
                  <span class="text-muted">{{ article.source }}</span>
                </article>
              </div>
            </div>
          </template>
        </AppTabs>
      </BaseCard>

      <BaseCard title="FAQ" test-id="compare-faq-card">
        <AppAccordion :items="FAQ_ITEMS" test-id="compare-faq" />
      </BaseCard>
    </template>

    <!-- Right-click context menu -->
    <div
      v-if="contextMenu.visible"
      class="compare__context-menu"
      :style="{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }"
      data-testid="compare-context-menu"
    >
      <button
        class="compare__context-item"
        type="button"
        data-testid="context-add-compare"
        @click="addToCompare(contextMenu.coin); closeContextMenu()"
      >
        Add to compare
      </button>
      <button
        class="compare__context-item compare__context-item--danger"
        type="button"
        data-testid="context-remove-watchlist"
        @click="removeFromWatchlist(contextMenu.coin)"
      >
        Remove from watchlist
      </button>
    </div>

    <BaseModal
      v-if="showLimitAlert"
      title="Compare zone is full"
      test-id="compare-limit-modal"
      @close="showLimitAlert = false"
    >
      <p>You can compare up to {{ MAX_COMPARE }} coins at a time. Remove one to add another.</p>
      <template #footer>
        <BaseButton test-id="compare-limit-ok" @click="showLimitAlert = false">OK</BaseButton>
      </template>
    </BaseModal>

    <BaseModal
      v-if="showClearConfirm"
      title="Clear compare zone?"
      test-id="compare-clear-modal"
      @close="showClearConfirm = false"
    >
      <p>This removes all {{ compareCoins.length }} coins from the comparison.</p>
      <template #footer>
        <BaseButton variant="secondary" test-id="compare-clear-cancel" @click="showClearConfirm = false">
          Cancel
        </BaseButton>
        <BaseButton variant="danger" test-id="compare-clear-confirm" @click="clearCompare">
          Clear
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.compare {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.compare__title {
  font-size: 24px;
}

.compare__builder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.compare__hint {
  font-size: 13px;
  margin-bottom: 12px;
}

.compare__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.compare__coin {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: grab;
  user-select: none;
}

.compare__coin:hover {
  border-color: var(--color-primary);
}

.compare__drag-handle {
  color: var(--color-text-muted);
  letter-spacing: -2px;
}

.compare__coin-name {
  font-weight: 600;
}

.compare__coin-change {
  margin-left: auto;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.compare__empty {
  padding: 16px 0;
}

.compare__zone {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  min-height: 140px;
  padding: 14px;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
}

.compare__zone--empty {
  align-items: center;
  justify-content: center;
}

.compare__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: fit-content;
  padding: 8px 12px;
  background: rgba(99, 102, 241, 0.14);
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
}

.compare__chip-remove {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}

.compare__chip-remove:hover {
  color: var(--color-danger);
}

.compare__table {
  width: 100%;
  border-collapse: collapse;
}

.compare__table th,
.compare__table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border);
}

.compare__metric-header,
.compare__metric {
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.compare__metric {
  display: flex;
  align-items: center;
  gap: 8px;
}

.compare__charts {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.compare__news-group {
  margin-bottom: 18px;
}

.compare__news-coin {
  font-size: 14px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}

.compare__news-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
}

.compare__news-title {
  font-weight: 500;
}

.compare__context-menu {
  position: fixed;
  z-index: 200;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.compare__context-item {
  padding: 11px 14px;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.compare__context-item:hover {
  background: var(--color-surface-hover);
}

.compare__context-item--danger {
  color: var(--color-danger);
}

@media (max-width: 760px) {
  .compare__builder {
    grid-template-columns: 1fr;
  }
}
</style>
