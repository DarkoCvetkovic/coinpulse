/**
 * Smoke: coin form page.
 *
 * Signs in as admin and verifies the new-coin form shell renders with its
 * fields and submit button.
 *
 * Estimated execution time: ~2s.
 */
import { users } from '../../support/constants/users'
import {
  action_openNewCoinForm,
  check_coinFormShellReady,
} from '../../support/keywords/coin-form.keywords'

describe('Smoke: coin form', { tags: ['@smoke'] }, () => {
  beforeEach(() => {
    cy.login(users.admin)
  })

  it('renders the new coin form shell', () => {
    action_openNewCoinForm()
    check_coinFormShellReady()
  })
})
