import { seedCoins, seedWatchlistSymbols } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_addCoinByDoubleClick,
  action_openCompare,
  action_removeCoinFromWatchlist,
  action_reorderWatchlist,
  check_coinNotCompared,
  check_watchlistOrder,
  check_watchlistShowsCoins,
} from '../../src/keywords/compare.keywords'
import { action_resetBackend } from '../../src/keywords/seed.keywords'

test.describe('Compare watchlist', { tag: '@compare' }, () => {
  const seededWatchlist = seedWatchlistSymbols

  test.beforeEach(async ({ api, comparePage }) => {
    await action_resetBackend(api)
    await action_openCompare(comparePage)
  })

  test('lists the seeded watchlist coins in order', async ({ comparePage }) => {
    await check_watchlistShowsCoins(comparePage, seededWatchlist)
    await check_watchlistOrder(comparePage, seededWatchlist)
  })

  test('reorders the watchlist by dragging a coin onto another', async ({ comparePage }) => {
    const reordered = [
      seedCoins.sol.symbol,
      seedCoins.btc.symbol,
      seedCoins.eth.symbol,
      seedCoins.link.symbol,
    ]

    await action_reorderWatchlist(comparePage, seedCoins.sol.symbol, seedCoins.btc.symbol)
    await check_watchlistOrder(comparePage, reordered)
  })

  test('removes a coin from the watchlist and the comparison via the context menu', async ({
    comparePage,
  }) => {
    const removed = seedCoins.eth.symbol
    const remaining = [seedCoins.btc.symbol, seedCoins.sol.symbol, seedCoins.link.symbol]

    await action_addCoinByDoubleClick(comparePage, removed)
    await action_removeCoinFromWatchlist(comparePage, removed)
    await check_watchlistShowsCoins(comparePage, remaining)
    await check_coinNotCompared(comparePage, removed)
  })
})
