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

export function check_portfolioStatsForSeed() {
  cy.log('Verify the seeded transaction and watchlist counts for standard_user')

  dashboardPage.verifyTransactionsCount(10)
  dashboardPage.verifyWatchlistCount(4)
}
