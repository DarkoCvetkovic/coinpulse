<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true }, // [{ value, label }]
  placeholder: { type: String, default: 'All' },
  testId: { type: String, required: true },
})

const model = defineModel({ type: String, default: '' })
</script>

<template>
  <label class="base-select">
    <span class="base-select__label">{{ label }}</span>
    <select v-model="model" class="base-select__field" :data-testid="testId">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.base-select__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.base-select__field {
  padding: 9px 12px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text);
  outline: none;
  cursor: pointer;
}

.base-select__field:focus {
  border-color: var(--color-primary);
}
</style>
