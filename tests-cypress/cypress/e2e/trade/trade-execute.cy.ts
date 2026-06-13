import { users } from '../../support/constants/users'
import {
  action_openTrade,
  action_recordTrade,
  check_tradeSuccess,
} from '../../support/keywords/trade.keywords'

describe('Trade execution', { tags: ['@trade'] }, () => {
  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.standard)
    action_openTrade()
  })

  it('records a buy trade and shows a success message', () => {
    const tradeType = 'buy'
    const amount = '2'
    const expectedMessage = 'Bought'

    action_recordTrade(tradeType, amount)
    check_tradeSuccess(expectedMessage)
  })

  it('records a sell trade and shows a success message', () => {
    const tradeType = 'sell'
    const amount = '1'
    const expectedMessage = 'Sold'

    action_recordTrade(tradeType, amount)
    check_tradeSuccess(expectedMessage)
  })
})
