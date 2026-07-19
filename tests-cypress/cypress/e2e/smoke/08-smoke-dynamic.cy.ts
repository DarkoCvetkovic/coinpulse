/**
 * Smoke: dynamic elements page.
 *
 * Signs in as standard_user and verifies the dynamic elements page shell
 * renders: the live ticker card, the delayed button and the lazy list.
 *
 * Estimated execution time: ~2s.
 */
import { users } from '../../support/constants/users'
import {
  action_openDynamic,
  check_dynamicShellReady,
} from '../../support/keywords/dynamic.keywords'

describe('Smoke: dynamic', { tags: ['@smoke'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
  })

  it('renders the dynamic elements shell', () => {
    action_openDynamic()
    check_dynamicShellReady()
  })
})
