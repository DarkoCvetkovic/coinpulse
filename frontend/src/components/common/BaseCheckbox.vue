<script setup>
defineProps({
  label: { type: String, required: true },
  error: { type: String, default: '' },
  testId: { type: String, required: true },
})

const model = defineModel({ type: Boolean, default: false })
</script>

<template>
  <div class="base-checkbox">
    <label class="base-checkbox__row">
      <input v-model="model" type="checkbox" class="base-checkbox__input" :data-testid="testId" />
      <span>{{ label }}</span>
    </label>
    <span v-if="error" class="base-checkbox__error" :data-testid="`${testId}-error`">
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.base-checkbox {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.base-checkbox__row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--color-text-muted);
  cursor: pointer;
}

.base-checkbox__input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
}

.base-checkbox__error {
  font-size: 13px;
  color: var(--color-danger);
}
</style>
