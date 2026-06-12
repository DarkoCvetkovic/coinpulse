<script setup>
defineProps({
  tabs: { type: Array, required: true }, // [{ key, label }]
  testId: { type: String, required: true },
})

const model = defineModel({ type: String, required: true })
</script>

<template>
  <div :data-testid="testId">
    <div class="app-tabs__bar" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="app-tabs__tab"
        :class="{ 'app-tabs__tab--active': model === tab.key }"
        type="button"
        role="tab"
        :aria-selected="model === tab.key"
        :data-testid="`${testId}-${tab.key}`"
        @click="model = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="app-tabs__panel" role="tabpanel" :data-testid="`${testId}-panel`">
      <slot :name="model" />
    </div>
  </div>
</template>

<style scoped>
.app-tabs__bar {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 16px;
}

.app-tabs__tab {
  padding: 10px 18px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.app-tabs__tab:hover {
  color: var(--color-text);
}

.app-tabs__tab--active {
  color: var(--color-text);
  border-bottom-color: var(--color-primary);
}
</style>
