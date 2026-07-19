/**
 * Smoke: markets page.
 *
 * Signs in as standard_user and verifies the markets table, search and
 * filters render.
 *
 * Estimated execution time: ~1s.
 */
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
