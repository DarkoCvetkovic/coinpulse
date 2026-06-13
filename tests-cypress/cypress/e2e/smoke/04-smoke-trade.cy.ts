import { users } from '../../support/constants/users'
import { action_openTrade, check_tradeShellReady } from '../../support/keywords/trade.keywords'

describe('Smoke: trade', { tags: ['@smoke'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
  })

  it('renders the trade form', () => {
    action_openTrade()
    check_tradeShellReady()
  })
})
