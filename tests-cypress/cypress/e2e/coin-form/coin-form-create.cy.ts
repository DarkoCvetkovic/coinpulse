import { users } from '../../support/constants/users'
import {
  action_openNewCoinForm,
  action_submitNewCoin,
} from '../../support/keywords/coin-form.keywords'
import {
  action_searchCoins,
  check_coinRowVisible,
  check_landedOnMarkets,
} from '../../support/keywords/markets.keywords'
import { randomSymbol } from '../../support/utils/core/random'

describe('Coin form create', { tags: ['@coin-form'] }, () => {
  beforeEach(() => {
    cy.resetAndLogin(users.admin)
  })

  it('creates a coin and lists it in the markets table', () => {
    const symbol = randomSymbol()
    const coinName = `Test Coin ${symbol}`

    action_openNewCoinForm()
    action_submitNewCoin(coinName, symbol)
    check_landedOnMarkets()
    action_searchCoins(symbol)
    check_coinRowVisible(symbol)
  })
})
