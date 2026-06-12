<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { coinsApi } from '../api/coinsApi'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import BaseInput from '../components/common/BaseInput.vue'
import BaseRadioGroup from '../components/common/BaseRadioGroup.vue'
import BaseSelect from '../components/common/BaseSelect.vue'
import BaseTextarea from '../components/common/BaseTextarea.vue'
import ErrorAlert from '../components/common/ErrorAlert.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const CATEGORIES = ['L1', 'L2', 'DeFi', 'meme', 'stablecoin', 'payments', 'oracle', 'exchange']
const SYMBOL_PATTERN = /^[A-Z0-9]{2,10}$/

const route = useRoute()
const router = useRouter()

const coinId = computed(() => route.params.id ?? null)
const isEdit = computed(() => coinId.value !== null)

const form = reactive({
  name: '',
  symbol: '',
  price: '',
  marketCap: '',
  change24h: '',
  rank: '',
  category: '',
  launchDate: '',
  status: 'active',
  description: '',
  logoUrl: '',
})
const errors = reactive({})
const serverError = ref('')
const loading = ref(false)
const submitting = ref(false)

onMounted(async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const coin = await coinsApi.getById(coinId.value)
    Object.assign(form, {
      name: coin.name,
      symbol: coin.symbol,
      price: String(coin.price),
      marketCap: coin.marketCap === null ? '' : String(coin.marketCap),
      change24h: coin.change24h === null ? '' : String(coin.change24h),
      rank: coin.rank === null ? '' : String(coin.rank),
      category: coin.category,
      launchDate: coin.launchDate ?? '',
      status: coin.status,
      description: coin.description ?? '',
      logoUrl: coin.logoUrl ?? '',
    })
  } catch {
    serverError.value = 'Could not load the coin.'
  } finally {
    loading.value = false
  }
})

function validate() {
  errors.name = form.name.trim() ? '' : 'Name is required'
  errors.symbol = SYMBOL_PATTERN.test(form.symbol)
    ? ''
    : 'Symbol must be 2-10 uppercase letters or digits'

  const price = Number(form.price)
  if (form.price === '') errors.price = 'Price is required'
  else if (Number.isNaN(price) || price < 0) errors.price = 'Price must be zero or positive'
  else errors.price = ''

  const marketCap = Number(form.marketCap)
  errors.marketCap =
    form.marketCap === '' || (!Number.isNaN(marketCap) && marketCap >= 0)
      ? ''
      : 'Market cap must be zero or positive'

  const rank = Number(form.rank)
  errors.rank =
    form.rank === '' || (Number.isInteger(rank) && rank > 0) ? '' : 'Rank must be a positive number'

  errors.category = form.category ? '' : 'Category is required'
  errors.status = ['active', 'delisted'].includes(form.status) ? '' : 'Status is required'
  errors.description =
    form.description.length <= 1000 ? '' : 'Description must be at most 1000 characters'

  return Object.values(errors).every((message) => !message)
}

function buildPayload() {
  return {
    name: form.name.trim(),
    symbol: form.symbol.trim(),
    price: Number(form.price),
    marketCap: form.marketCap === '' ? null : Number(form.marketCap),
    change24h: form.change24h === '' ? null : Number(form.change24h),
    rank: form.rank === '' ? null : Number(form.rank),
    category: form.category,
    launchDate: form.launchDate || null,
    status: form.status,
    description: form.description.trim() || null,
    logoUrl: form.logoUrl.trim() || null,
  }
}

async function handleSubmit() {
  serverError.value = ''
  if (!validate()) return

  submitting.value = true
  try {
    if (isEdit.value) {
      await coinsApi.update(coinId.value, buildPayload())
    } else {
      await coinsApi.create(buildPayload())
    }
    router.push({ name: 'markets' })
  } catch (err) {
    const fieldErrors = err.response?.data?.errors
    if (err.response?.status === 422 && fieldErrors) {
      Object.assign(errors, fieldErrors)
      serverError.value = 'Please fix the highlighted fields.'
    } else {
      serverError.value = 'Could not save the coin. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="container coin-form" data-testid="coin-form-page">
    <h1 class="coin-form__title">{{ isEdit ? 'Edit coin' : 'Add coin' }}</h1>

    <BaseCard test-id="coin-form-card">
      <LoadingSpinner v-if="loading" label="Loading coin..." />

      <form
        v-else
        class="coin-form__form"
        novalidate
        data-testid="coin-form"
        @submit.prevent="handleSubmit"
      >
        <ErrorAlert v-if="serverError" :message="serverError" test-id="coin-form-error" />

        <div class="coin-form__row">
          <BaseInput
            v-model="form.name"
            label="Name"
            placeholder="Bitcoin"
            :error="errors.name"
            test-id="coin-name"
          />
          <BaseInput
            v-model="form.symbol"
            label="Symbol"
            placeholder="BTC"
            :error="errors.symbol"
            test-id="coin-symbol"
          />
        </div>

        <div class="coin-form__row">
          <BaseInput
            v-model="form.price"
            label="Price (USD)"
            type="number"
            placeholder="0.00"
            :error="errors.price"
            test-id="coin-price"
          />
          <BaseInput
            v-model="form.marketCap"
            label="Market cap (USD)"
            type="number"
            placeholder="0"
            :error="errors.marketCap"
            test-id="coin-market-cap"
          />
        </div>

        <div class="coin-form__row">
          <BaseInput
            v-model="form.change24h"
            label="24h change (%)"
            type="number"
            placeholder="0.00"
            :error="errors.change24h"
            test-id="coin-change24h"
          />
          <BaseInput
            v-model="form.rank"
            label="Rank"
            type="number"
            placeholder="1"
            :error="errors.rank"
            test-id="coin-rank"
          />
        </div>

        <div class="coin-form__row">
          <BaseSelect
            v-model="form.category"
            label="Category"
            :options="CATEGORIES.map((c) => ({ value: c, label: c }))"
            placeholder="Select a category..."
            test-id="coin-category"
          />
          <BaseInput
            v-model="form.launchDate"
            label="Launch date"
            type="date"
            :error="errors.launchDate"
            test-id="coin-launch-date"
          />
        </div>
        <span v-if="errors.category" class="coin-form__field-error" data-testid="coin-category-error">
          {{ errors.category }}
        </span>

        <BaseRadioGroup
          v-model="form.status"
          label="Status"
          :options="[
            { value: 'active', label: 'Active' },
            { value: 'delisted', label: 'Delisted' },
          ]"
          :error="errors.status"
          test-id="coin-status"
        />

        <BaseTextarea
          v-model="form.description"
          label="Description (optional)"
          placeholder="Short description of the coin..."
          :maxlength="1000"
          :error="errors.description"
          test-id="coin-description"
        />

        <BaseInput
          v-model="form.logoUrl"
          label="Logo URL (optional)"
          placeholder="/logos/btc.png"
          :error="errors.logoUrl"
          test-id="coin-logo-url"
        />

        <div class="coin-form__actions">
          <BaseButton
            variant="secondary"
            test-id="coin-form-cancel"
            @click="router.push({ name: 'markets' })"
          >
            Cancel
          </BaseButton>
          <BaseButton type="submit" :loading="submitting" test-id="coin-form-submit">
            {{ isEdit ? 'Save changes' : 'Add coin' }}
          </BaseButton>
        </div>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped>
.coin-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 640px;
}

.coin-form__title {
  font-size: 24px;
}

.coin-form__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.coin-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.coin-form__field-error {
  font-size: 13px;
  color: var(--color-danger);
  margin-top: -12px;
}

.coin-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
