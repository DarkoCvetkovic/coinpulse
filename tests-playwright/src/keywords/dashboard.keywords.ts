import { test } from '../fixtures/fixtures'
import type { DashboardPage } from '../pages/dashboard/dashboard-page'

export async function action_openDashboard(dashboardPage: DashboardPage): Promise<void> {
  await test.step('Open the dashboard page', async () => {
    await dashboardPage.open()
  })
}

export async function check_dashboardShellReady(dashboardPage: DashboardPage): Promise<void> {
  await test.step('Verify the dashboard stat cards, price chart and top movers render', async () => {
    await dashboardPage.verifyShellReady()
  })
}

export async function check_portfolioStats(
  dashboardPage: DashboardPage,
  transactionCount: number,
  watchlistCount: number,
): Promise<void> {
  await test.step(`Verify portfolio stats - transactions: ${transactionCount}, watchlist: ${watchlistCount}`, async () => {
    await dashboardPage.verifyTransactionsCount(transactionCount)
    await dashboardPage.verifyWatchlistCount(watchlistCount)
  })
}
