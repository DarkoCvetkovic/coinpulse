import { seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_goToNextMarketsPage,
  action_openMarkets,
  action_setPageSize,
  check_coinRowAbsent,
  check_coinRowVisible,
  check_paginationVisible,
} from '../../src/keywords/markets.keywords'

test.describe('Markets pagination', { tag: '@markets' }, () => {
  test.beforeEach(async ({ marketsPage }) => {
    await action_openMarkets(marketsPage)
  })

  test('moves to the next page of coins', async ({ marketsPage }) => {
    const pageSize = '5'
    const firstPageSymbol = seedCoins.btc.symbol

    await action_setPageSize(marketsPage, pageSize)
    await check_paginationVisible(marketsPage)
    await check_coinRowVisible(marketsPage, firstPageSymbol)
    await action_goToNextMarketsPage(marketsPage)
    await check_coinRowAbsent(marketsPage, firstPageSymbol)
  })
})
