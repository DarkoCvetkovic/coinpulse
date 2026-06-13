import { users } from '../../support/constants/users'
import {
  action_openMarkets,
  check_marketsShellReady,
} from '../../support/keywords/markets.keywords'

describe('Smoke: markets', { tags: ['@smoke'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
  })

  it('renders the markets table, search and filters', () => {
    action_openMarkets()
    check_marketsShellReady()
  })
})
