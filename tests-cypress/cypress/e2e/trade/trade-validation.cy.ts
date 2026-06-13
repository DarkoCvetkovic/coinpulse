import { users } from '../../support/constants/users'
import {
  action_openTrade,
  action_submitEmptyTrade,
  check_tradeValidationErrors,
} from '../../support/keywords/trade.keywords'

describe('Trade validation', { tags: ['@trade'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
    action_openTrade()
  })

  it('shows required-field errors when submitting an empty form', () => {
    action_submitEmptyTrade()
    check_tradeValidationErrors()
  })
})
