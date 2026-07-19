/**
 * Smoke: markets page.
 *
 * Opens the markets page as standard_user and verifies the coins table,
 * search and filters render.
 *
 * Estimated execution time: ~2s per browser.
 */
import { test } from '../../src/fixtures/fixtures'
import { action_openMarkets, check_marketsShellReady } from '../../src/keywords/markets.keywords'

test.describe('Smoke: markets', { tag: '@smoke' }, () => {
  test('renders the markets table, search and filters', async ({ marketsPage }) => {
    await action_openMarkets(marketsPage)
    await check_marketsShellReady(marketsPage)
  })
})
