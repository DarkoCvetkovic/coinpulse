<script setup>
defineProps({
  message: { type: String, required: true },
  testId: { type: String, default: 'success-alert' },
})
</script>

<template>
  <div class="success-alert" :data-testid="testId" role="status">
    {{ message }}
  </div>
</template>

<style scoped>
.success-alert {
  padding: 12px 16px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid var(--color-success);
  border-radius: var(--radius);
  color: #86efac;
  font-size: 14px;
}
</style>
