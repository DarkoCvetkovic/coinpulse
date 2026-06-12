<template>
  <div class="container not-found" data-testid="not-found-page">
    <h1>404</h1>
    <p class="text-muted">This page does not exist.</p>
    <RouterLink :to="{ name: 'dashboard' }" data-testid="not-found-home-link">
      Back to dashboard
    </RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 80px 0;
}

.not-found h1 {
  font-size: 56px;
}
</style>
