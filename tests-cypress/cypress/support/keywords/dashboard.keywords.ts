import { dashboardPage } from '../pages/dashboard/dashboard-page'

export function action_openDashboard() {
  cy.log('Open the dashboard')

  dashboardPage.visit()
}

export function check_dashboardShellReady() {
  cy.log('Verify the dashboard stat cards, price chart and top movers render')

  dashboardPage.verifyStatsVisible()
  dashboardPage.verifyChartVisible()
  dashboardPage.verifyTopMoversVisible()
}

export function check_portfolioStats(transactionCount: number, watchlistCount: number) {
  cy.log(`Verify portfolio stats - transactions: ${transactionCount}, watchlist: ${watchlistCount}`)

  dashboardPage.verifyTransactionsCount(transactionCount)
  dashboardPage.verifyWatchlistCount(watchlistCount)
}
