import { test } from '../fixtures/fixtures'
import type { CoinFormPage } from '../pages/coin-form/coin-form-page'

export async function action_openNewCoinForm(coinFormPage: CoinFormPage): Promise<void> {
  await test.step('Open the new coin form', async () => {
    await coinFormPage.openNew()
  })
}

export async function action_openEditCoinForm(
  coinFormPage: CoinFormPage,
  id: number,
): Promise<void> {
  await test.step(`Open the edit form for coin id: ${id}`, async () => {
    await coinFormPage.openEdit(id)
  })
}

export async function action_submitNewCoin(
  coinFormPage: CoinFormPage,
  name: string,
  symbol: string,
): Promise<void> {
  await test.step(`Fill and submit a new coin: ${name} (${symbol})`, async () => {
    await coinFormPage.fillValid(name, symbol)
    await coinFormPage.submit()
  })
}

export async function action_submitEmptyCoinForm(coinFormPage: CoinFormPage): Promise<void> {
  await test.step('Submit the coin form empty to trigger validation', async () => {
    await coinFormPage.submit()
  })
}

export async function check_coinFormShellReady(coinFormPage: CoinFormPage): Promise<void> {
  await test.step('Verify the coin form fields and submit button render', async () => {
    await coinFormPage.verifyShellReady()
  })
}

export async function check_coinFormRequiredErrors(coinFormPage: CoinFormPage): Promise<void> {
  await test.step('Verify required-field validation on the coin form', async () => {
    await coinFormPage.verifyRequiredErrors()
  })
}

export async function check_coinNamePrefilled(
  coinFormPage: CoinFormPage,
  name: string,
): Promise<void> {
  await test.step(`Verify the coin form is prefilled with name: ${name}`, async () => {
    await coinFormPage.verifyNameValue(name)
  })
}
