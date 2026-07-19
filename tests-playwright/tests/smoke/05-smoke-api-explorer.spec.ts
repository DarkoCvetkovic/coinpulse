/**
 * Smoke: API explorer page.
 *
 * Opens the API explorer as standard_user and verifies the request groups
 * and the empty response state render.
 *
 * Estimated execution time: ~2s per browser.
 */
import { test } from '../../src/fixtures/fixtures'
import {
  action_openApiExplorer,
  check_apiExplorerShellReady,
} from '../../src/keywords/api-explorer.keywords'

test.describe('Smoke: API Explorer', { tag: '@smoke' }, () => {
  test('renders the request groups and empty response state', async ({ apiExplorerPage }) => {
    await action_openApiExplorer(apiExplorerPage)
    await check_apiExplorerShellReady(apiExplorerPage)
  })
})
