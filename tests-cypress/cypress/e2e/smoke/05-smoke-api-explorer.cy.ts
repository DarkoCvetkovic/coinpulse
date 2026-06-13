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
