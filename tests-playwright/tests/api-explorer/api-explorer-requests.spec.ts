import { test } from '../../src/fixtures/fixtures'
import {
  action_openApiExplorer,
  action_runApiRequest,
  check_apiResponseStatus,
} from '../../src/keywords/api-explorer.keywords'

test.describe('API Explorer requests', { tag: '@api-explorer' }, () => {
  test.beforeEach(async ({ apiExplorerPage }) => {
    await action_openApiExplorer(apiExplorerPage)
  })

  test('runs a successful GET and shows a 200 response', async ({ apiExplorerPage }) => {
    const request = 'list-coins'
    const expectedStatus = 200

    await action_runApiRequest(apiExplorerPage, request)
    await check_apiResponseStatus(apiExplorerPage, expectedStatus)
  })

  test('shows a simulated 500 server error', async ({ apiExplorerPage }) => {
    const request = 'error-500'
    const expectedStatus = 500

    await action_runApiRequest(apiExplorerPage, request)
    await check_apiResponseStatus(apiExplorerPage, expectedStatus)
  })

  test('shows a simulated 404 not found', async ({ apiExplorerPage }) => {
    const request = 'error-404'
    const expectedStatus = 404

    await action_runApiRequest(apiExplorerPage, request)
    await check_apiResponseStatus(apiExplorerPage, expectedStatus)
  })

  test('forbids creating a coin as a standard user', async ({ apiExplorerPage }) => {
    const request = 'create-coin'
    const expectedStatus = 403

    await action_runApiRequest(apiExplorerPage, request)
    await check_apiResponseStatus(apiExplorerPage, expectedStatus)
  })

  test('eventually resolves a slow request with 200', async ({ apiExplorerPage }) => {
    const request = 'slow'
    const expectedStatus = 200

    await action_runApiRequest(apiExplorerPage, request)
    await check_apiResponseStatus(apiExplorerPage, expectedStatus)
  })
})
