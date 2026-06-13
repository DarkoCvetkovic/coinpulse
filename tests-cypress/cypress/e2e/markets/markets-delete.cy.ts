import { users } from '../../support/constants/users'
import {
  action_deleteCoin,
  action_openMarkets,
  action_searchCoins,
  check_coinRowAbsent,
  check_coinRowVisible,
} from '../../support/keywords/markets.keywords'
import { action_seedCoin } from '../../support/keywords/seed.be.keywords'
import { buildCoin } from '../../support/utils/resources/coin-builders'

describe('Markets admin delete', { tags: ['@markets'] }, () => {
  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.admin)
  })

  it('deletes an API-seeded coin through the markets table', () => {
    action_seedCoin(buildCoin()).then(coin => {
      action_openMarkets()
      action_searchCoins(coin.symbol)
      check_coinRowVisible(coin.symbol)
      action_deleteCoin(coin.symbol)
      check_coinRowAbsent(coin.symbol)
    })
  })
})
