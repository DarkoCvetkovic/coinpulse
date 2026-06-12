<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { coinsApi } from '../api/coinsApi'
import { transactionsApi } from '../api/transactionsApi'
import { formatCurrency } from '../utils/formatters'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import BaseCheckbox from '../components/common/BaseCheckbox.vue'
import BaseInput from '../components/common/BaseInput.vue'
import BaseRadioGroup from '../components/common/BaseRadioGroup.vue'
import BaseSelect from '../components/common/BaseSelect.vue'
import BaseTextarea from '../components/common/BaseTextarea.vue'
import ErrorAlert from '../components/common/ErrorAlert.vue'
import SuccessAlert from '../components/common/SuccessAlert.vue'

const MAX_AMOUNT = 1_000_000_000

const coins = ref([])
const form = reactive({
  coinId: '',
  type: 'buy',
  amount: '',
  price: '',
  date: new Date().toISOString().slice(0, 10),
  note: '',
  confirmed: false,
})
const errors = reactive({})
const serverError = ref('')
const successMessage = ref('')
const submitting = ref(false)

onMounted(async () => {
  const data = await coinsApi.list({ size: 100, sort: 'rank,asc', status: 'active' })
  coins.value = data.content
})

const coinOptions = computed(() =>
  coins.value.map((coin) => ({ value: String(coin.id), label: `${coin.name} (${coin.symbol})` }))
)

const selectedCoin = computed(() =>
  coins.value.find((coin) => String(coin.id) === form.coinId)
)

// Picking a coin pre-fills the current market price; the user can still override it
watch(selectedCoin, (coin) => {
  if (coin) form.price = String(coin.price)
})

function validate() {
  errors.coinId = form.coinId ? '' : 'Coin is required'
  errors.type = ['buy', 'sell'].includes(form.type) ? '' : 'Type is required'

  const amount = Number(form.amount)
  if (!form.amount) errors.amount = 'Amount is required'
  else if (Number.isNaN(amount) || amount <= 0) errors.amount = 'Amount must be positive'
  else if (amount > MAX_AMOUNT) errors.amount = `Amount must be at most ${MAX_AMOUNT.toLocaleString('en-US')}`
  else errors.amount = ''

  const price = Number(form.price)
  if (!form.price) errors.price = 'Price is required'
  else if (Number.isNaN(price) || price <= 0) errors.price = 'Price must be positive'
  else errors.price = ''

  if (!form.date) errors.date = 'Date is required'
  else if (form.date > new Date().toISOString().slice(0, 10)) errors.date = 'Date cannot be in the future'
  else errors.date = ''

  errors.note = form.note.length <= 255 ? '' : 'Note must be at most 255 characters'
  errors.confirmed = form.confirmed ? '' : 'Please confirm the simulated trade'

  return Object.values(errors).every((message) => !message)
}

async function handleSubmit() {
  serverError.value = ''
  successMessage.value = ''
  if (!validate()) return

  submitting.value = true
  try {
    const transaction = await transactionsApi.create({
      coinId: Number(form.coinId),
      type: form.type,
      amount: Number(form.amount),
      price: Number(form.price),
      date: form.date,
      note: form.note.trim() || null,
    })
    const coin = transaction.coin
    successMessage.value = `${form.type === 'buy' ? 'Bought' : 'Sold'} ${form.amount} ${coin.symbol} at ${formatCurrency(transaction.price)}.`
    form.amount = ''
    form.note = ''
    form.confirmed = false
  } catch (err) {
    const fieldErrors = err.response?.data?.errors
    if (err.response?.status === 422 && fieldErrors) {
      Object.assign(errors, fieldErrors)
      serverError.value = 'Please fix the highlighted fields.'
    } else {
      serverError.value = 'Could not save the transaction. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="container trade" data-testid="trade-page">
    <h1 class="trade__title">Trade</h1>

    <BaseCard test-id="trade-form-card">
      <form class="trade__form" novalidate data-testid="trade-form" @submit.prevent="handleSubmit">
        <SuccessAlert v-if="successMessage" :message="successMessage" test-id="trade-success" />
        <ErrorAlert v-if="serverError" :message="serverError" test-id="trade-error" />

        <BaseSelect
          v-model="form.coinId"
          label="Coin"
          :options="coinOptions"
          placeholder="Select a coin..."
          test-id="trade-coin"
        />
        <span v-if="errors.coinId" class="trade__field-error" data-testid="trade-coin-error">
          {{ errors.coinId }}
        </span>

        <BaseRadioGroup
          v-model="form.type"
          label="Type"
          :options="[
            { value: 'buy', label: 'Buy' },
            { value: 'sell', label: 'Sell' },
          ]"
          :error="errors.type"
          test-id="trade-type"
        />

        <div class="trade__row">
          <BaseInput
            v-model="form.amount"
            label="Amount"
            type="number"
            placeholder="0.00"
            :error="errors.amount"
            test-id="trade-amount"
          />
          <BaseInput
            v-model="form.price"
            label="Price (USD)"
            type="number"
            placeholder="0.00"
            :error="errors.price"
            test-id="trade-price"
          />
        </div>

        <p v-if="selectedCoin" class="trade__hint text-muted" data-testid="trade-market-price">
          Current market price: {{ formatCurrency(selectedCoin.price) }}
        </p>

        <BaseInput
          v-model="form.date"
          label="Date"
          type="date"
          :error="errors.date"
          test-id="trade-date"
        />

        <BaseTextarea
          v-model="form.note"
          label="Note (optional)"
          placeholder="Why are you making this trade?"
          :maxlength="255"
          :error="errors.note"
          test-id="trade-note"
        />

        <BaseCheckbox
          v-model="form.confirmed"
          label="I understand this is a simulated trade with no real money."
          :error="errors.confirmed"
          test-id="trade-confirm"
        />

        <BaseButton type="submit" :loading="submitting" test-id="trade-submit">
          {{ form.type === 'buy' ? 'Buy' : 'Sell' }}
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped>
.trade {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 560px;
}

.trade__title {
  font-size: 24px;
}

.trade__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.trade__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.trade__hint {
  font-size: 13px;
  margin-top: -10px;
}

.trade__field-error {
  font-size: 13px;
  color: var(--color-danger);
  margin-top: -12px;
}
</style>
