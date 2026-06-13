import { users } from '../../support/constants/users'
import {
  action_openNewCoinForm,
  action_submitEmptyCoinForm,
  check_coinFormRequiredErrors,
} from '../../support/keywords/coin-form.keywords'

describe('Coin form validation', { tags: ['@coin-form'] }, () => {
  beforeEach(() => {
    cy.login(users.admin)
    action_openNewCoinForm()
  })

  it('shows required-field errors when submitting an empty form', () => {
    action_submitEmptyCoinForm()
    check_coinFormRequiredErrors()
  })
})
