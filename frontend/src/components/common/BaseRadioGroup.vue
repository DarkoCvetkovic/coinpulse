<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true }, // [{ value, label }]
  error: { type: String, default: '' },
  testId: { type: String, required: true },
})

const model = defineModel({ type: String, default: '' })
</script>

<template>
  <fieldset class="base-radio-group" :data-testid="testId">
    <legend class="base-radio-group__label">{{ label }}</legend>
    <div class="base-radio-group__options">
      <label
        v-for="option in options"
        :key="option.value"
        class="base-radio-group__option"
        :class="{ 'base-radio-group__option--checked': model === option.value }"
      >
        <input
          v-model="model"
          type="radio"
          :value="option.value"
          class="base-radio-group__input"
          :data-testid="`${testId}-${option.value}`"
        />
        {{ option.label }}
      </label>
    </div>
    <span v-if="error" class="base-radio-group__error" :data-testid="`${testId}-error`">
      {{ error }}
    </span>
  </fieldset>
</template>

<style scoped>
.base-radio-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: none;
}

.base-radio-group__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.base-radio-group__options {
  display: flex;
  gap: 10px;
}

.base-radio-group__option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 600;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.base-radio-group__option--checked {
  border-color: var(--color-primary);
  background: rgba(99, 102, 241, 0.12);
}

.base-radio-group__input {
  accent-color: var(--color-primary);
}

.base-radio-group__error {
  font-size: 13px;
  color: var(--color-danger);
}
</style>
