import { users } from '../../support/constants/users'
import {
  action_openMarkets,
  action_searchCoins,
  check_coinRowAbsent,
  check_coinRowVisible,
  check_marketsEmptyState,
} from '../../support/keywords/markets.keywords'

describe('Markets search', { tags: ['@markets'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
    action_openMarkets()
  })

  it('filters the table to a coin matched by symbol', () => {
    action_searchCoins('ETH')
    check_coinRowVisible('ETH')
    check_coinRowAbsent('BTC')
  })

  it('shows the empty state when no coin matches', () => {
    action_searchCoins('zzznotacoin')
    check_marketsEmptyState()
  })
})
