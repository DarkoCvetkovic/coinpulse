<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: { type: Number, required: true }, // zero-based
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['change'])

const pages = computed(() => Array.from({ length: props.totalPages }, (_, i) => i))
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" data-testid="pagination">
    <button
      class="pagination__button"
      type="button"
      :disabled="page === 0"
      data-testid="pagination-prev"
      @click="emit('change', page - 1)"
    >
      Prev
    </button>
    <button
      v-for="p in pages"
      :key="p"
      class="pagination__button"
      :class="{ 'pagination__button--active': p === page }"
      type="button"
      :data-testid="`pagination-page-${p + 1}`"
      @click="emit('change', p)"
    >
      {{ p + 1 }}
    </button>
    <button
      class="pagination__button"
      type="button"
      :disabled="page >= totalPages - 1"
      data-testid="pagination-next"
      @click="emit('change', page + 1)"
    >
      Next
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.pagination__button {
  min-width: 36px;
  padding: 7px 12px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
}

.pagination__button:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

.pagination__button--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.pagination__button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
