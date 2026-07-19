import { test } from '../fixtures/fixtures'
import type { CoinFormPage } from '../pages/coin-form/coin-form-page'

export async function action_openNewCoinForm(coinFormPage: CoinFormPage): Promise<void> {
  await test.step('Open the new coin form', async () => {
    await coinFormPage.openNew()
  })
}

export async function check_coinFormShellReady(coinFormPage: CoinFormPage): Promise<void> {
  await test.step('Verify the coin form fields and submit button render', async () => {
    await coinFormPage.verifyShellReady()
  })
}
