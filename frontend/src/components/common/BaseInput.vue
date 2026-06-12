<script setup>
defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  error: { type: String, default: '' },
  testId: { type: String, required: true },
})

const model = defineModel({ type: String, default: '' })
</script>

<template>
  <label class="base-input">
    <span class="base-input__label">{{ label }}</span>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="base-input__field"
      :class="{ 'base-input__field--error': error }"
      :data-testid="testId"
    />
    <span v-if="error" class="base-input__error" :data-testid="`${testId}-error`">
      {{ error }}
    </span>
  </label>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.base-input__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.base-input__field {
  padding: 10px 14px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.15s ease;
}

.base-input__field:focus {
  border-color: var(--color-primary);
}

.base-input__field--error {
  border-color: var(--color-danger);
}

.base-input__error {
  font-size: 13px;
  color: var(--color-danger);
}
</style>
