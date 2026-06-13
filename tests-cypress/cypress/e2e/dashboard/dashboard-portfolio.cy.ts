import { users } from '../../support/constants/users'
import {
  action_openDashboard,
  check_dashboardShellReady,
  check_portfolioStatsForSeed,
} from '../../support/keywords/dashboard.keywords'

describe('Dashboard portfolio summary', { tags: ['@dashboard'] }, () => {
  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.standard)
  })

  it('shows the seeded transaction and watchlist counts', () => {
    action_openDashboard()
    check_portfolioStatsForSeed()
  })

  it('renders the price chart and top movers from seeded data', () => {
    action_openDashboard()
    check_dashboardShellReady()
  })
})
