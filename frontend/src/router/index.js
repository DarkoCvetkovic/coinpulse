import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import MarketsPage from '../pages/MarketsPage.vue'
import TradePage from '../pages/TradePage.vue'
import ComparePage from '../pages/ComparePage.vue'
import ApiExplorerPage from '../pages/ApiExplorerPage.vue'
import CoinFormPage from '../pages/CoinFormPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'dashboard' } },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { hideChrome: true, guestOnly: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/markets',
      name: 'markets',
      component: MarketsPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/trade',
      name: 'trade',
      component: TradePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/compare',
      name: 'compare',
      component: ComparePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/api-explorer',
      name: 'api-explorer',
      component: ApiExplorerPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/coins/new',
      name: 'coin-new',
      component: CoinFormPage,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/coins/:id/edit',
      name: 'coin-edit',
      component: CoinFormPage,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: 'dashboard' }
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
