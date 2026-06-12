<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { coinsApi } from '../api/coinsApi'
import { useAuthStore } from '../stores/auth'
import { useWatchlistStore } from '../stores/watchlist'
import { formatCurrency, formatPercent } from '../utils/formatters'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import BaseModal from '../components/common/BaseModal.vue'
import BaseSelect from '../components/common/BaseSelect.vue'
import ErrorAlert from '../components/common/ErrorAlert.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import AppPagination from '../components/common/AppPagination.vue'

const auth = useAuthStore()
const watchlist = useWatchlistStore()

const CATEGORIES = ['L1', 'L2', 'DeFi', 'meme', 'stablecoin', 'payments', 'oracle', 'exchange']
const STATUSES = ['active', 'delisted']

const SORTABLE_COLUMNS = [
  { key: 'rank', label: '#' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'change24h', label: '24h %' },
  { key: 'marketCap', label: 'Market cap' },
]

const filters = reactive({ category: '', status: '', search: '' })
const sortKey = ref('rank')
const sortDirection = ref('asc')
const page = ref(0)
const pageSize = ref('10')

const coins = ref([])
const totalElements = ref(0)
const totalPages = ref(0)
const loading = ref(false)
const error = ref(null)

const coinPendingDelete = ref(null)
const deleting = ref(false)

let searchDebounce = null

async function loadCoins() {
  loading.value = true
  error.value = null
  try {
    const params = {
      page: page.value,
      size: pageSize.value,
      sort: `${sortKey.value},${sortDirection.value}`,
    }
    if (filters.category) params.category = filters.category
    if (filters.status) params.status = filters.status
    if (filters.search.trim()) params.search = filters.search.trim()

    const data = await coinsApi.list(params)
    coins.value = data.content
    totalElements.value = data.page.totalElements
    totalPages.value = data.page.totalPages
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadCoins(), watchlist.loaded ? Promise.resolve() : watchlist.load()])
})

watch([() => filters.category, () => filters.status, pageSize], () => {
  page.value = 0
  loadCoins()
})

watch(
  () => filters.search,
  () => {
    clearTimeout(searchDebounce)
    searchDebounce = setTimeout(() => {
      page.value = 0
      loadCoins()
    }, 300)
  }
)

function changeSort(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
  page.value = 0
  loadCoins()
}

function changePage(nextPage) {
  page.value = nextPage
  loadCoins()
}

async function toggleWatchlist(coin) {
  try {
    await watchlist.toggle(coin.id)
  } catch {
    // A failed toggle (e.g. race with another tab) resolves on the next load
    await watchlist.load()
  }
}

async function confirmDelete() {
  deleting.value = true
  try {
    await coinsApi.remove(coinPendingDelete.value.id)
    coinPendingDelete.value = null
    await loadCoins()
  } catch (err) {
    error.value = err
  } finally {
    deleting.value = false
  }
}

const categoryOptions = computed(() => CATEGORIES.map((c) => ({ value: c, label: c })))
const statusOptions = computed(() => STATUSES.map((s) => ({ value: s, label: s })))
</script>

<template>
  <div class="container markets" data-testid="markets-page">
    <div class="markets__heading">
      <h1>Markets</h1>
      <span class="text-muted" data-testid="markets-total">{{ totalElements }} coins</span>
    </div>

    <BaseCard test-id="markets-filters-card">
      <div class="markets__filters">
        <label class="markets__search">
          <span class="markets__search-label">Search</span>
          <input
            v-model="filters.search"
            type="search"
            placeholder="Name or symbol..."
            class="markets__search-field"
            data-testid="markets-search"
          />
        </label>
        <BaseSelect
          v-model="filters.category"
          label="Category"
          :options="categoryOptions"
          placeholder="All categories"
          test-id="markets-filter-category"
        />
        <BaseSelect
          v-model="filters.status"
          label="Status"
          :options="statusOptions"
          placeholder="All statuses"
          test-id="markets-filter-status"
        />
        <BaseSelect
          v-model="pageSize"
          label="Per page"
          :options="[
            { value: '5', label: '5' },
            { value: '10', label: '10' },
            { value: '20', label: '20' },
          ]"
          placeholder=""
          test-id="markets-page-size"
        />
      </div>
    </BaseCard>

    <ErrorAlert
      v-if="error"
      message="Could not load coins. Please try again later."
      test-id="markets-error"
    />

    <BaseCard test-id="markets-table-card">
      <LoadingSpinner v-if="loading" label="Loading coins..." />

      <template v-else>
        <table class="markets__table" data-testid="markets-table">
          <thead>
            <tr>
              <th
                v-for="column in SORTABLE_COLUMNS"
                :key="column.key"
                class="markets__th"
                :data-testid="`markets-sort-${column.key}`"
                @click="changeSort(column.key)"
              >
                {{ column.label }}
                <span v-if="sortKey === column.key" class="markets__sort-arrow">
                  {{ sortDirection === 'asc' ? '▲' : '▼' }}
                </span>
              </th>
              <th class="markets__th markets__th--static">Category</th>
              <th class="markets__th markets__th--static">Status</th>
              <th class="markets__th markets__th--static markets__th--actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="coin in coins"
              :key="coin.id"
              class="markets__row"
              :data-testid="`markets-row-${coin.symbol}`"
            >
              <td class="text-muted">{{ coin.rank }}</td>
              <td>
                <span class="markets__name">{{ coin.name }}</span>
                <span class="markets__symbol text-muted">{{ coin.symbol }}</span>
              </td>
              <td class="markets__num">{{ formatCurrency(coin.price) }}</td>
              <td
                class="markets__num"
                :class="Number(coin.change24h) >= 0 ? 'text-success' : 'text-danger'"
              >
                {{ formatPercent(coin.change24h) }}
              </td>
              <td class="markets__num">{{ formatCurrency(coin.marketCap) }}</td>
              <td>
                <span class="markets__badge">{{ coin.category }}</span>
              </td>
              <td>
                <span
                  class="markets__badge"
                  :class="coin.status === 'active' ? 'markets__badge--active' : 'markets__badge--delisted'"
                >
                  {{ coin.status }}
                </span>
              </td>
              <td class="markets__actions">
                <button
                  class="markets__star"
                  :class="{ 'markets__star--on': watchlist.contains(coin.id) }"
                  type="button"
                  :title="watchlist.contains(coin.id) ? 'Remove from watchlist' : 'Add to watchlist'"
                  :data-testid="`watchlist-toggle-${coin.symbol}`"
                  @click="toggleWatchlist(coin)"
                >
                  {{ watchlist.contains(coin.id) ? '★' : '☆' }}
                </button>
                <BaseButton
                  v-if="auth.isAdmin"
                  variant="danger"
                  :test-id="`coin-delete-${coin.symbol}`"
                  @click="coinPendingDelete = coin"
                >
                  Delete
                </BaseButton>
              </td>
            </tr>
            <tr v-if="coins.length === 0">
              <td colspan="8" class="markets__empty text-muted" data-testid="markets-empty">
                No coins match your filters.
              </td>
            </tr>
          </tbody>
        </table>

        <AppPagination :page="page" :total-pages="totalPages" @change="changePage" />
      </template>
    </BaseCard>

    <BaseModal
      v-if="coinPendingDelete"
      :title="`Delete ${coinPendingDelete.name}?`"
      test-id="coin-delete-modal"
      @close="coinPendingDelete = null"
    >
      <p>
        This permanently removes <strong>{{ coinPendingDelete.name }}</strong>
        ({{ coinPendingDelete.symbol }}) from the markets list.
      </p>
      <template #footer>
        <BaseButton
          variant="secondary"
          test-id="coin-delete-cancel"
          @click="coinPendingDelete = null"
        >
          Cancel
        </BaseButton>
        <BaseButton
          variant="danger"
          :loading="deleting"
          test-id="coin-delete-confirm"
          @click="confirmDelete"
        >
          Delete
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.markets {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.markets__heading {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.markets__heading h1 {
  font-size: 24px;
}

.markets__filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.7fr;
  gap: 16px;
  align-items: end;
}

.markets__search {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.markets__search-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.markets__search-field {
  padding: 9px 12px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text);
  outline: none;
}

.markets__search-field:focus {
  border-color: var(--color-primary);
}

.markets__table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.markets__th {
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.markets__th--static {
  cursor: default;
}

.markets__th--actions {
  text-align: right;
}

.markets__sort-arrow {
  font-size: 10px;
}

.markets__row td {
  padding: 12px;
  border-bottom: 1px solid var(--color-border);
}

.markets__row:hover td {
  background: var(--color-surface-hover);
}

.markets__name {
  font-weight: 600;
  margin-right: 8px;
}

.markets__num {
  font-variant-numeric: tabular-nums;
}

.markets__badge {
  display: inline-block;
  padding: 3px 10px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.markets__badge--active {
  color: var(--color-success);
  border-color: var(--color-success);
}

.markets__badge--delisted {
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.markets__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.markets__star {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--color-text-muted);
  cursor: pointer;
  line-height: 1;
}

.markets__star--on {
  color: var(--color-warning);
}

.markets__empty {
  text-align: center;
  padding: 32px 0;
}
</style>
