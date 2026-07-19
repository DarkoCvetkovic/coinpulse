import { seedCoins } from '../../support/constants/coins'
import { users } from '../../support/constants/users'
import {
  action_openMarkets,
  action_sortBy,
  check_firstCoinRow,
  check_sortIndicator,
} from '../../support/keywords/markets.keywords'

describe('Markets sorting', { tags: ['@markets'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
    action_openMarkets()
  })

  it('lists coins by rank ascending by default with BTC first', () => {
    const topRankedSymbol = seedCoins.btc.symbol

    check_firstCoinRow(topRankedSymbol)
  })

  it('toggles the sort direction when the same column is clicked twice', () => {
    const column = 'name'

    action_sortBy(column)
    check_sortIndicator(column, 'asc')
    action_sortBy(column)
    check_sortIndicator(column, 'desc')
  })
})
