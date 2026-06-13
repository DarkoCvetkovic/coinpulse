import { users } from '../../support/constants/users'
import {
  action_openDashboard,
  check_dashboardShellReady,
} from '../../support/keywords/dashboard.keywords'

describe('Smoke: dashboard', { tags: ['@smoke'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
  })

  it('renders the portfolio dashboard shell', () => {
    action_openDashboard()
    check_dashboardShellReady()
  })
})
