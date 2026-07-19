import { test } from '../fixtures/fixtures'
import type { TradePage } from '../pages/trade/trade-page'

export async function action_openTrade(tradePage: TradePage): Promise<void> {
  await test.step('Open the trade page', async () => {
    await tradePage.open()
  })
}

export async function action_recordTrade(
  tradePage: TradePage,
  type: 'buy' | 'sell',
  amount: string,
): Promise<void> {
  await test.step(`Record a ${type} trade for amount: ${amount}`, async () => {
    await tradePage.selectFirstCoin()
    await tradePage.selectType(type)
    await tradePage.enterAmount(amount)
    await tradePage.confirmTrade()
    await tradePage.submit()
  })
}

export async function action_submitEmptyTrade(tradePage: TradePage): Promise<void> {
  await test.step('Submit the trade form with no input to trigger validation', async () => {
    await tradePage.submit()
  })
}

export async function check_tradeShellReady(tradePage: TradePage): Promise<void> {
  await test.step('Verify the trade form renders', async () => {
    await tradePage.verifyShellReady()
  })
}

export async function check_tradeValidationErrors(tradePage: TradePage): Promise<void> {
  await test.step('Verify required-field validation messages on the trade form', async () => {
    await tradePage.verifyRequiredErrors()
  })
}

export async function check_tradeSuccess(tradePage: TradePage, text: string): Promise<void> {
  await test.step(`Verify the trade success message contains: ${text}`, async () => {
    await tradePage.verifySuccess(text)
  })
}
