/**
 * Smoke: dashboard page.
 *
 * Opens the dashboard as standard_user and verifies the stat cards, price
 * chart and top movers render.
 *
 * Estimated execution time: ~2s per browser.
 */
import { test } from '../../src/fixtures/fixtures'
import {
  action_openDashboard,
  check_dashboardShellReady,
} from '../../src/keywords/dashboard.keywords'

test.describe('Smoke: dashboard', { tag: '@smoke' }, () => {
  test('renders the portfolio dashboard shell', async ({ dashboardPage }) => {
    await action_openDashboard(dashboardPage)
    await check_dashboardShellReady(dashboardPage)
  })
})
