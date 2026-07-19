import { test } from '../fixtures/fixtures'
import type { MarketsPage } from '../pages/markets/markets-page'

export async function action_openMarkets(marketsPage: MarketsPage): Promise<void> {
  await test.step('Open the markets page', async () => {
    await marketsPage.open()
  })
}

export async function check_marketsShellReady(marketsPage: MarketsPage): Promise<void> {
  await test.step('Verify the markets table, search and filters render', async () => {
    await marketsPage.verifyShellReady()
  })
}
