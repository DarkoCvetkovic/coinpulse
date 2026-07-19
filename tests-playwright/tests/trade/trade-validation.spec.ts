import { test } from '../../src/fixtures/fixtures'
import {
  action_openTrade,
  action_submitEmptyTrade,
  check_tradeValidationErrors,
} from '../../src/keywords/trade.keywords'

test.describe('Trade validation', { tag: '@trade' }, () => {
  test.beforeEach(async ({ tradePage }) => {
    await action_openTrade(tradePage)
  })

  test('shows required-field errors when submitting an empty form', async ({ tradePage }) => {
    await action_submitEmptyTrade(tradePage)
    await check_tradeValidationErrors(tradePage)
  })
})
