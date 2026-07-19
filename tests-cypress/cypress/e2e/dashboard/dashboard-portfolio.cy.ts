import { users } from '../../support/constants/users'
import {
  action_openDashboard,
  check_dashboardShellReady,
  check_portfolioStats,
} from '../../support/keywords/dashboard.keywords'

describe('Dashboard portfolio summary', { tags: ['@dashboard'] }, () => {
  beforeEach(() => {
    cy.resetAndLogin(users.standard)
  })

  it('shows the seeded transaction and watchlist counts', () => {
    const seededTransactionCount = 10
    const seededWatchlistCount = 4

    action_openDashboard()
    check_portfolioStats(seededTransactionCount, seededWatchlistCount)
  })

  it('renders the price chart and top movers from seeded data', () => {
    action_openDashboard()
    check_dashboardShellReady()
  })
})
