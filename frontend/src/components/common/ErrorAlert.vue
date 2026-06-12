<script setup>
defineProps({
  message: { type: String, required: true },
  testId: { type: String, default: 'error-alert' },
})
</script>

<template>
  <div class="error-alert" :data-testid="testId" role="alert">
    {{ message }}
  </div>
</template>

<style scoped>
.error-alert {
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius);
  color: #fca5a5;
  font-size: 14px;
}
</style>
