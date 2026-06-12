<script setup>
defineProps({
  text: { type: String, required: true },
  testId: { type: String, required: true },
})
</script>

<template>
  <span class="tooltip" :data-testid="testId">
    <slot>
      <span class="tooltip__icon" aria-hidden="true">?</span>
    </slot>
    <span class="tooltip__bubble" role="tooltip" :data-testid="`${testId}-bubble`">
      {{ text }}
    </span>
  </span>
</template>

<style scoped>
.tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.tooltip__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--color-text-muted);
  color: var(--color-text-muted);
  font-size: 11px;
  font-weight: 700;
  cursor: help;
}

.tooltip__bubble {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: 240px;
  padding: 8px 12px;
  background: #060912;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease;
  z-index: 50;
  pointer-events: none;
}

.tooltip:hover .tooltip__bubble {
  opacity: 1;
  visibility: visible;
}
</style>
