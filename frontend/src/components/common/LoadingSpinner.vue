<script setup>
defineProps({
  label: { type: String, default: 'Loading...' },
})
</script>

<template>
  <div class="loading-spinner" data-testid="loading-spinner" role="status">
    <span class="loading-spinner__circle" aria-hidden="true" />
    <span class="loading-spinner__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 0;
  color: var(--color-text-muted);
}

.loading-spinner__circle {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spinner-spin 0.8s linear infinite;
}

@keyframes spinner-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
