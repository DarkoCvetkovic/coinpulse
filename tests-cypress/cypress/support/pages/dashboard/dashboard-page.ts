import { routes } from '../../constants/routes'
import { testId } from '../../utils/core/selectors'

export const dashboardObj = {
  page: testId('dashboard-page'),
  error: testId('dashboard-error'),
  stats: {
    portfolioValue: testId('stat-portfolio-value'),
    change24h: testId('stat-24h-change'),
    watchlist: testId('stat-watchlist'),
    watchlistValue: testId('stat-watchlist-value'),
    transactions: testId('stat-transactions'),
    transactionsValue: testId('stat-transactions-value'),
  },
  chartCard: testId('dashboard-chart-card'),
  gainers: testId('top-gainers'),
  losers: testId('top-losers'),
}

export const dashboardPage = {
  visit: () => {
    cy.visit(routes.dashboard)
    cy.get(dashboardObj.page).should('be.visible')
  },

  verifyStatsVisible: () => {
    cy.get(dashboardObj.stats.portfolioValue).should('be.visible')
    cy.get(dashboardObj.stats.change24h).should('be.visible')
    cy.get(dashboardObj.stats.watchlist).should('be.visible')
    cy.get(dashboardObj.stats.transactions).should('be.visible')
  },

  verifyChartVisible: () => {
    cy.get(dashboardObj.chartCard).should('be.visible')
  },

  verifyTopMoversVisible: () => {
    cy.get(dashboardObj.gainers).should('be.visible')
    cy.get(dashboardObj.losers).should('be.visible')
  },

  verifyTransactionsCount: (count: number) => {
    cy.get(dashboardObj.stats.transactionsValue).should('have.text', String(count))
  },

  verifyWatchlistCount: (count: number) => {
    cy.get(dashboardObj.stats.watchlistValue).should('have.text', String(count))
  },
}
