<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  sub: { type: String, default: '' },
  trend: {
    type: String,
    default: 'neutral',
    validator: (value) => ['up', 'down', 'neutral'].includes(value),
  },
  testId: { type: String, required: true },
})
</script>

<template>
  <div class="stat-card" :data-testid="testId">
    <span class="stat-card__label">{{ label }}</span>
    <span class="stat-card__value" :data-testid="`${testId}-value`">{{ value }}</span>
    <span
      v-if="sub"
      class="stat-card__sub"
      :class="{
        'text-success': trend === 'up',
        'text-danger': trend === 'down',
        'text-muted': trend === 'neutral',
      }"
      :data-testid="`${testId}-sub`"
    >
      {{ sub }}
    </span>
  </div>
</template>

<style scoped>
.stat-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
}

.stat-card__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-card__value {
  font-size: 26px;
  font-weight: 700;
}

.stat-card__sub {
  font-size: 14px;
  font-weight: 600;
}
</style>
