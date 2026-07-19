import { authStates } from '../../src/constants/auth'
import { test } from '../../src/fixtures/fixtures'
import {
  action_deleteCoin,
  action_openMarkets,
  action_searchCoins,
  check_coinRowAbsent,
  check_coinRowVisible,
} from '../../src/keywords/markets.keywords'
import { action_resetBackend, action_seedCoin } from '../../src/keywords/seed.keywords'
import { buildCoin } from '../../src/utils/coin-builders'

test.use({ storageState: authStates.admin })

test.describe('Markets admin delete', { tag: '@markets' }, () => {
  test.beforeEach(async ({ api }) => {
    await action_resetBackend(api)
  })

  test('deletes an API-seeded coin through the markets table', async ({ api, marketsPage }) => {
    const coin = await action_seedCoin(api, buildCoin())

    await action_openMarkets(marketsPage)
    await action_searchCoins(marketsPage, coin.symbol)
    await check_coinRowVisible(marketsPage, coin.symbol)
    await action_deleteCoin(marketsPage, coin.symbol)
    await check_coinRowAbsent(marketsPage, coin.symbol)
  })
})
