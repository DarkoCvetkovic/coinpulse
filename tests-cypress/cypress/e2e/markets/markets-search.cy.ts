import { seedCoins } from '../../support/constants/coins'
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
    const searchSymbol = seedCoins.eth.symbol
    const otherSymbol = seedCoins.btc.symbol

    action_searchCoins(searchSymbol)
    check_coinRowVisible(searchSymbol)
    check_coinRowAbsent(otherSymbol)
  })

  it('shows the empty state when no coin matches', () => {
    const missingTerm = 'zzznotacoin'

    action_searchCoins(missingTerm)
    check_marketsEmptyState()
  })
})
