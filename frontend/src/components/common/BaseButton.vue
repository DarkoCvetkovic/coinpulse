<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
  },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  testId: { type: String, required: true },
})
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="`base-button--${variant}`"
    :disabled="disabled || loading"
    :data-testid="testId"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button--primary {
  background: var(--color-primary);
  color: #fff;
}

.base-button--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.base-button--secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.base-button--secondary:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

.base-button--danger {
  background: var(--color-danger);
  color: #fff;
}

.base-button__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: button-spin 0.7s linear infinite;
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
