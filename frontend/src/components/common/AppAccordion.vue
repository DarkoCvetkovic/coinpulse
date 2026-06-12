<script setup>
import { ref } from 'vue'

defineProps({
  items: { type: Array, required: true }, // [{ key, title, content }]
  testId: { type: String, required: true },
})

const openKey = ref(null)

function toggle(key) {
  openKey.value = openKey.value === key ? null : key
}
</script>

<template>
  <div class="accordion" :data-testid="testId">
    <div
      v-for="item in items"
      :key="item.key"
      class="accordion__item"
      :data-testid="`${testId}-item-${item.key}`"
    >
      <button
        class="accordion__header"
        type="button"
        :aria-expanded="openKey === item.key"
        :data-testid="`${testId}-toggle-${item.key}`"
        @click="toggle(item.key)"
      >
        {{ item.title }}
        <span class="accordion__icon">{{ openKey === item.key ? '−' : '+' }}</span>
      </button>
      <div
        v-if="openKey === item.key"
        class="accordion__content"
        :data-testid="`${testId}-content-${item.key}`"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  margin-bottom: 8px;
  overflow: hidden;
}

.accordion__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: var(--color-surface);
  border: none;
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.accordion__header:hover {
  background: var(--color-surface-hover);
}

.accordion__icon {
  font-size: 18px;
  color: var(--color-text-muted);
}

.accordion__content {
  padding: 14px 16px;
  font-size: 14px;
  color: var(--color-text-muted);
  border-top: 1px solid var(--color-border);
}
</style>
