import { seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openMarkets,
  action_sortBy,
  check_firstCoinRow,
  check_sortIndicator,
} from '../../src/keywords/markets.keywords'

test.describe('Markets sorting', { tag: '@markets' }, () => {
  test.beforeEach(async ({ marketsPage }) => {
    await action_openMarkets(marketsPage)
  })

  test('lists coins by rank ascending by default with BTC first', async ({ marketsPage }) => {
    const topRankedSymbol = seedCoins.btc.symbol

    await check_firstCoinRow(marketsPage, topRankedSymbol)
  })

  test('toggles the sort direction when the same column is clicked twice', async ({
    marketsPage,
  }) => {
    const column = 'name'

    await action_sortBy(marketsPage, column)
    await check_sortIndicator(marketsPage, column, 'asc')
    await action_sortBy(marketsPage, column)
    await check_sortIndicator(marketsPage, column, 'desc')
  })
})
