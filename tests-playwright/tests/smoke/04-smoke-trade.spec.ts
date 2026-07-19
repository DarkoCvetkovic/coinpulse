/**
 * Smoke: trade page.
 *
 * Opens the trade page as standard_user and verifies the transaction form
 * renders.
 *
 * Estimated execution time: ~2s per browser.
 */
import { test } from '../../src/fixtures/fixtures'
import { action_openTrade, check_tradeShellReady } from '../../src/keywords/trade.keywords'

test.describe('Smoke: trade', { tag: '@smoke' }, () => {
  test('renders the trade form', async ({ tradePage }) => {
    await action_openTrade(tradePage)
    await check_tradeShellReady(tradePage)
  })
})
