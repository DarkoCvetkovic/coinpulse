/**
 * Smoke: compare page.
 *
 * Opens the compare page as standard_user and verifies the watchlist card,
 * the compare zone card and the drop area render.
 *
 * Estimated execution time: ~2s per browser.
 */
import { test } from '../../src/fixtures/fixtures'
import { action_openCompare, check_compareShellReady } from '../../src/keywords/compare.keywords'

test.describe('Smoke: compare', { tag: '@smoke' }, () => {
  test('renders the compare builder shell', async ({ comparePage }) => {
    await action_openCompare(comparePage)
    await check_compareShellReady(comparePage)
  })
})
