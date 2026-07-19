import { seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openMarkets,
  action_searchCoins,
  check_coinRowAbsent,
  check_coinRowVisible,
  check_marketsEmptyState,
} from '../../src/keywords/markets.keywords'

test.describe('Markets search', { tag: '@markets' }, () => {
  test.beforeEach(async ({ marketsPage }) => {
    await action_openMarkets(marketsPage)
  })

  test('filters the table to a coin matched by symbol', async ({ marketsPage }) => {
    const searchSymbol = seedCoins.eth.symbol
    const otherSymbol = seedCoins.btc.symbol

    await action_searchCoins(marketsPage, searchSymbol)
    await check_coinRowVisible(marketsPage, searchSymbol)
    await check_coinRowAbsent(marketsPage, otherSymbol)
  })

  test('shows the empty state when no coin matches', async ({ marketsPage }) => {
    const missingTerm = 'zzznotacoin'

    await action_searchCoins(marketsPage, missingTerm)
    await check_marketsEmptyState(marketsPage)
  })
})
