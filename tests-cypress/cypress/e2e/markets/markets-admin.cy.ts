import { seedCoins } from '../../support/constants/coins'
import { users } from '../../support/constants/users'
import {
  action_cancelDeleteCoin,
  action_openMarkets,
  check_adminControlsAbsent,
  check_adminControlsVisible,
  check_coinRowVisible,
} from '../../support/keywords/markets.keywords'

describe('Markets admin controls', { tags: ['@markets'] }, () => {
  const coinSymbol = seedCoins.btc.symbol

  it('hides admin controls for a standard user', () => {
    cy.login(users.standard)
    action_openMarkets()
    check_adminControlsAbsent(coinSymbol)
  })

  it('shows admin controls for an admin user', () => {
    cy.login(users.admin)
    action_openMarkets()
    check_adminControlsVisible(coinSymbol)
  })

  it('opens and cancels the delete confirmation without removing the coin', () => {
    cy.login(users.admin)
    action_openMarkets()
    action_cancelDeleteCoin(coinSymbol)
    check_coinRowVisible(coinSymbol)
  })
})
