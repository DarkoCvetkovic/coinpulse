import { test } from '../../src/fixtures/fixtures'
import {
  action_openDashboard,
  check_dashboardShellReady,
  check_portfolioStats,
} from '../../src/keywords/dashboard.keywords'
import { action_resetBackend } from '../../src/keywords/seed.keywords'

test.describe('Dashboard portfolio summary', { tag: '@dashboard' }, () => {
  test.beforeEach(async ({ api }) => {
    await action_resetBackend(api)
  })

  test('shows the seeded transaction and watchlist counts', async ({ dashboardPage }) => {
    const seededTransactionCount = 10
    const seededWatchlistCount = 4

    await action_openDashboard(dashboardPage)
    await check_portfolioStats(dashboardPage, seededTransactionCount, seededWatchlistCount)
  })

  test('renders the price chart and top movers from seeded data', async ({ dashboardPage }) => {
    await action_openDashboard(dashboardPage)
    await check_dashboardShellReady(dashboardPage)
  })
})
