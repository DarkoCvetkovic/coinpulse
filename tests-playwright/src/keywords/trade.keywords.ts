import { test } from '../fixtures/fixtures'
import type { TradePage } from '../pages/trade/trade-page'

export async function action_openTrade(tradePage: TradePage): Promise<void> {
  await test.step('Open the trade page', async () => {
    await tradePage.open()
  })
}

export async function check_tradeShellReady(tradePage: TradePage): Promise<void> {
  await test.step('Verify the trade form renders', async () => {
    await tradePage.verifyShellReady()
  })
}
