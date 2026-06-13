import { users } from '../../support/constants/users'
import {
  action_openApiExplorer,
  action_runApiRequest,
  check_apiResponseStatus,
} from '../../support/keywords/api-explorer.keywords'

describe('API Explorer requests', { tags: ['@api-explorer'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
    action_openApiExplorer()
  })

  it('runs a successful GET and shows a 200 response', () => {
    const request = 'list-coins'
    const expectedStatus = 200

    action_runApiRequest(request)
    check_apiResponseStatus(expectedStatus)
  })

  it('shows a simulated 500 server error', () => {
    const request = 'error-500'
    const expectedStatus = 500

    action_runApiRequest(request)
    check_apiResponseStatus(expectedStatus)
  })

  it('shows a simulated 404 not found', () => {
    const request = 'error-404'
    const expectedStatus = 404

    action_runApiRequest(request)
    check_apiResponseStatus(expectedStatus)
  })

  it('forbids creating a coin as a standard user', () => {
    const request = 'create-coin'
    const expectedStatus = 403

    action_runApiRequest(request)
    check_apiResponseStatus(expectedStatus)
  })

  it('eventually resolves a slow request with 200', () => {
    const request = 'slow'
    const expectedStatus = 200

    action_runApiRequest(request)
    check_apiResponseStatus(expectedStatus)
  })
})
