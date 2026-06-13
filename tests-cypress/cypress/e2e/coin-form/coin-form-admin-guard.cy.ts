import { users } from '../../support/constants/users'
import { action_openNewCoinForm } from '../../support/keywords/coin-form.keywords'
import { check_landedOnDashboard } from '../../support/keywords/login.keywords'

describe('Coin form admin guard', { tags: ['@coin-form'] }, () => {
  it('redirects a standard user away from the new coin form', () => {
    cy.login(users.standard)
    action_openNewCoinForm()
    check_landedOnDashboard()
  })
})
