<script setup>
import { reactive, ref } from 'vue'
import http from '../api/http'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const REQUESTS = [
  {
    key: 'list-coins',
    method: 'GET',
    path: '/api/coins?page=0&size=5',
    group: 'Coins API',
    description: 'First page of coins',
  },
  {
    key: 'get-coin',
    method: 'GET',
    path: '/api/coins/1',
    group: 'Coins API',
    description: 'Single coin by id',
  },
  {
    key: 'create-coin',
    method: 'POST',
    path: '/api/coins',
    group: 'Coins API',
    description: 'Create a coin (admin only - returns 403 for regular users)',
    body: {
      name: 'Test Coin',
      symbol: 'TEST',
      price: 1.23,
      category: 'DeFi',
      status: 'active',
    },
  },
  {
    key: 'delete-coin',
    method: 'DELETE',
    path: '/api/coins/999',
    group: 'Coins API',
    description: 'Delete a coin that does not exist (404 demo)',
  },
  {
    key: 'slow',
    method: 'GET',
    path: '/api/test/slow?ms=3000',
    group: 'Simulations',
    description: 'Server responds after 3 seconds - watch the spinner',
  },
  {
    key: 'error-500',
    method: 'GET',
    path: '/api/test/error?code=500',
    group: 'Simulations',
    description: 'Simulated server error',
  },
  {
    key: 'error-404',
    method: 'GET',
    path: '/api/test/error?code=404',
    group: 'Simulations',
    description: 'Simulated not found',
  },
]

const GROUPS = [...new Set(REQUESTS.map((request) => request.group))]

const loading = ref(false)
const activeKey = ref(null)
const result = reactive({
  request: null,
  status: null,
  durationMs: null,
  body: null,
})

async function execute(request) {
  loading.value = true
  activeKey.value = request.key
  result.request = `${request.method} ${request.path}`
  result.status = null
  result.body = null

  const startedAt = performance.now()
  try {
    const response = await http.request({
      method: request.method,
      url: request.path,
      data: request.body,
    })
    result.status = response.status
    result.body = response.data
  } catch (err) {
    result.status = err.response?.status ?? 'network error'
    result.body = err.response?.data ?? { message: err.message }
  } finally {
    result.durationMs = Math.round(performance.now() - startedAt)
    loading.value = false
  }
}

function statusClass(status) {
  if (typeof status !== 'number') return 'api-explorer__status--error'
  if (status < 300) return 'api-explorer__status--ok'
  if (status < 500) return 'api-explorer__status--warn'
  return 'api-explorer__status--error'
}
</script>

<template>
  <div class="container api-explorer" data-testid="api-explorer-page">
    <h1 class="api-explorer__title">API Explorer</h1>
    <p class="text-muted">
      Every button below fires a real HTTP request against the CoinPulse backend with your
      current session token. The raw response is shown on the right.
    </p>

    <div class="api-explorer__layout">
      <div class="api-explorer__requests">
        <BaseCard
          v-for="group in GROUPS"
          :key="group"
          :title="group"
          :test-id="`api-group-${group === 'Coins API' ? 'coins' : 'simulations'}`"
        >
          <div class="api-explorer__buttons">
            <div
              v-for="request in REQUESTS.filter((r) => r.group === group)"
              :key="request.key"
              class="api-explorer__row"
            >
              <BaseButton
                variant="secondary"
                :loading="loading && activeKey === request.key"
                :disabled="loading && activeKey !== request.key"
                :test-id="`api-run-${request.key}`"
                @click="execute(request)"
              >
                <span class="api-explorer__method" :data-method="request.method">
                  {{ request.method }}
                </span>
                {{ request.path }}
              </BaseButton>
              <span class="api-explorer__description text-muted">{{ request.description }}</span>
            </div>
          </div>
        </BaseCard>
      </div>

      <BaseCard title="Response" test-id="api-response-card">
        <LoadingSpinner v-if="loading" label="Waiting for response..." />

        <template v-else-if="result.status !== null">
          <div class="api-explorer__meta">
            <code data-testid="api-response-request">{{ result.request }}</code>
            <span
              class="api-explorer__status"
              :class="statusClass(result.status)"
              data-testid="api-response-status"
            >
              {{ result.status }}
            </span>
            <span class="text-muted" data-testid="api-response-time">{{ result.durationMs }} ms</span>
          </div>
          <pre class="api-explorer__body" data-testid="api-response-body">{{
            JSON.stringify(result.body, null, 2)
          }}</pre>
        </template>

        <p v-else class="text-muted" data-testid="api-response-empty">
          Run a request to see its response here.
        </p>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
.api-explorer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.api-explorer__title {
  font-size: 24px;
}

.api-explorer__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.api-explorer__requests {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.api-explorer__buttons {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.api-explorer__row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.api-explorer__method {
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--color-border);
}

.api-explorer__method[data-method='GET'] {
  color: var(--color-success);
}

.api-explorer__method[data-method='POST'] {
  color: var(--color-warning);
}

.api-explorer__method[data-method='DELETE'] {
  color: var(--color-danger);
}

.api-explorer__description {
  font-size: 12.5px;
}

.api-explorer__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.api-explorer__status {
  padding: 2px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 13px;
}

.api-explorer__status--ok {
  background: rgba(34, 197, 94, 0.15);
  color: var(--color-success);
}

.api-explorer__status--warn {
  background: rgba(245, 158, 11, 0.15);
  color: var(--color-warning);
}

.api-explorer__status--error {
  background: rgba(239, 68, 68, 0.15);
  color: var(--color-danger);
}

.api-explorer__body {
  max-height: 420px;
  overflow: auto;
  padding: 14px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 860px) {
  .api-explorer__layout {
    grid-template-columns: 1fr;
  }
}
</style>
