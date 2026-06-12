<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { systemApi } from '../api/systemApi'
import BaseButton from '../components/common/BaseButton.vue'
import BaseInput from '../components/common/BaseInput.vue'
import ErrorAlert from '../components/common/ErrorAlert.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({ username: '', password: '', rememberMe: false })
const fieldErrors = reactive({ username: '', password: '' })
const serverError = ref('')
const submitting = ref(false)
const showSlowHint = ref(false)
let slowHintTimer = null

// The free-tier backend sleeps after inactivity; waking it while the user
// types means the actual login call is usually instant.
onMounted(() => {
  systemApi.ping().catch(() => {})
})

onBeforeUnmount(() => clearTimeout(slowHintTimer))

function validate() {
  fieldErrors.username = form.username.trim() ? '' : 'Username is required'
  fieldErrors.password = form.password ? '' : 'Password is required'
  return !fieldErrors.username && !fieldErrors.password
}

function messageForStatus(status) {
  if (status === 401) return 'Invalid username or password.'
  if (status === 423) return 'This account is locked. Contact an administrator.'
  return 'Something went wrong. Please try again.'
}

async function handleSubmit() {
  serverError.value = ''
  if (!validate()) return

  submitting.value = true
  slowHintTimer = setTimeout(() => {
    showSlowHint.value = true
  }, 5000)
  try {
    await auth.login(form)
    router.push(route.query.redirect ?? { name: 'dashboard' })
  } catch (err) {
    serverError.value = messageForStatus(err.response?.status)
  } finally {
    submitting.value = false
    clearTimeout(slowHintTimer)
    showSlowHint.value = false
  }
}
</script>

<template>
  <div class="login-page" data-testid="login-page">
    <form class="login-page__card" novalidate data-testid="login-form" @submit.prevent="handleSubmit">
      <div class="login-page__brand">
        <svg viewBox="0 0 32 32" class="login-page__logo" aria-hidden="true">
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
        <h1>CoinPulse</h1>
      </div>
      <p class="login-page__subtitle text-muted">Sign in to track your portfolio</p>

      <ErrorAlert v-if="serverError" :message="serverError" test-id="login-error" />

      <BaseInput
        v-model="form.username"
        label="Username"
        autocomplete="username"
        placeholder="standard_user"
        :error="fieldErrors.username"
        test-id="login-username"
      />

      <BaseInput
        v-model="form.password"
        label="Password"
        type="password"
        autocomplete="current-password"
        placeholder="Your password"
        :error="fieldErrors.password"
        test-id="login-password"
      />

      <label class="login-page__remember">
        <input v-model="form.rememberMe" type="checkbox" data-testid="login-remember-me" />
        Remember me
      </label>

      <BaseButton type="submit" :loading="submitting" test-id="login-submit">
        Sign in
      </BaseButton>

      <p v-if="showSlowHint" class="login-page__slow-hint" data-testid="login-slow-hint">
        The demo backend runs on free hosting and is waking up - this first request can take
        up to a minute. Hang tight!
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  padding: 24px;
}

.login-page__card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 380px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 32px;
}

.login-page__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.login-page__brand h1 {
  font-size: 24px;
}

.login-page__logo {
  width: 36px;
  height: 36px;
}

.login-page__subtitle {
  margin-top: -10px;
}

.login-page__remember {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-muted);
  cursor: pointer;
}

.login-page__slow-hint {
  font-size: 13px;
  color: var(--color-warning);
  text-align: center;
}
</style>
