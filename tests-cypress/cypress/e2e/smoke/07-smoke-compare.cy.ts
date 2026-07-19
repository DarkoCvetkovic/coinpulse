/**
 * Smoke: compare page.
 *
 * Signs in as standard_user and verifies the compare page shell renders:
 * the watchlist card, the compare zone card and the drop area.
 *
 * Estimated execution time: ~2s.
 */
import { users } from '../../support/constants/users'
import {
  action_openCompare,
  check_compareShellReady,
} from '../../support/keywords/compare.keywords'

describe('Smoke: compare', { tags: ['@smoke'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
  })

  it('renders the compare builder shell', () => {
    action_openCompare()
    check_compareShellReady()
  })
})
