/**
 * Smoke: API explorer page.
 *
 * Signs in as standard_user and verifies the request groups and the empty
 * response state render.
 *
 * Estimated execution time: ~1s.
 */
import { users } from '../../support/constants/users'
import {
  action_openApiExplorer,
  check_apiExplorerShellReady,
} from '../../support/keywords/api-explorer.keywords'

describe('Smoke: API Explorer', { tags: ['@smoke'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
  })

  it('renders the request groups and empty response state', () => {
    action_openApiExplorer()
    check_apiExplorerShellReady()
  })
})
