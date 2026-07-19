/**
 * Smoke: dynamic elements page.
 *
 * Opens the dynamic elements page as standard_user and verifies the live
 * ticker card, the delayed button and the lazy list render.
 *
 * Estimated execution time: ~2s per browser.
 */
import { test } from '../../src/fixtures/fixtures'
import { action_openDynamic, check_dynamicShellReady } from '../../src/keywords/dynamic.keywords'

test.describe('Smoke: dynamic', { tag: '@smoke' }, () => {
  test('renders the dynamic elements shell', async ({ dynamicPage }) => {
    await action_openDynamic(dynamicPage)
    await check_dynamicShellReady(dynamicPage)
  })
})
