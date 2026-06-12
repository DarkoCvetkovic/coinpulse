<script setup>
defineProps({
  title: { type: String, default: '' },
  testId: { type: String, required: true },
})
</script>

<template>
  <section class="base-card" :data-testid="testId">
    <header v-if="title || $slots.actions" class="base-card__header">
      <h2 v-if="title" class="base-card__title">{{ title }}</h2>
      <div v-if="$slots.actions" class="base-card__actions">
        <slot name="actions" />
      </div>
    </header>
    <slot />
  </section>
</template>

<style scoped>
.base-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
}

.base-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.base-card__title {
  font-size: 16px;
}
</style>
