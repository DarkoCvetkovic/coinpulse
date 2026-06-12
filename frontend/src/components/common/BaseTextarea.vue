<script setup>
defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 3 },
  maxlength: { type: Number, default: null },
  error: { type: String, default: '' },
  testId: { type: String, required: true },
})

const model = defineModel({ type: String, default: '' })
</script>

<template>
  <label class="base-textarea">
    <span class="base-textarea__label">{{ label }}</span>
    <textarea
      v-model="model"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxlength"
      class="base-textarea__field"
      :class="{ 'base-textarea__field--error': error }"
      :data-testid="testId"
    />
    <span v-if="error" class="base-textarea__error" :data-testid="`${testId}-error`">
      {{ error }}
    </span>
  </label>
</template>

<style scoped>
.base-textarea {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.base-textarea__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.base-textarea__field {
  padding: 10px 14px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text);
  outline: none;
  resize: vertical;
  transition: border-color 0.15s ease;
}

.base-textarea__field:focus {
  border-color: var(--color-primary);
}

.base-textarea__field--error {
  border-color: var(--color-danger);
}

.base-textarea__error {
  font-size: 13px;
  color: var(--color-danger);
}
</style>
