import { test } from '../../src/fixtures/fixtures'
import { action_resetBackend } from '../../src/keywords/seed.keywords'
import {
  action_openTrade,
  action_recordTrade,
  check_tradeSuccess,
} from '../../src/keywords/trade.keywords'

test.describe('Trade execution', { tag: '@trade' }, () => {
  test.beforeEach(async ({ api, tradePage }) => {
    await action_resetBackend(api)
    await action_openTrade(tradePage)
  })

  test('records a buy trade and shows a success message', async ({ tradePage }) => {
    const tradeType = 'buy'
    const amount = '2'
    const expectedMessage = 'Bought'

    await action_recordTrade(tradePage, tradeType, amount)
    await check_tradeSuccess(tradePage, expectedMessage)
  })

  test('records a sell trade and shows a success message', async ({ tradePage }) => {
    const tradeType = 'sell'
    const amount = '1'
    const expectedMessage = 'Sold'

    await action_recordTrade(tradePage, tradeType, amount)
    await check_tradeSuccess(tradePage, expectedMessage)
  })
})
