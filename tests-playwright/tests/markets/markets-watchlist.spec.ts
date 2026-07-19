import { seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openMarkets,
  action_toggleWatchlist,
  check_watchlistStarOff,
  check_watchlistStarOn,
} from '../../src/keywords/markets.keywords'
import { action_resetBackend } from '../../src/keywords/seed.keywords'

test.describe('Markets watchlist', { tag: '@markets' }, () => {
  const watchlistedSymbol = seedCoins.btc.symbol

  test.beforeEach(async ({ api, marketsPage }) => {
    await action_resetBackend(api)
    await action_openMarkets(marketsPage)
  })

  test('shows a seeded coin as starred', async ({ marketsPage }) => {
    await check_watchlistStarOn(marketsPage, watchlistedSymbol)
  })

  test('removes and re-adds a coin to the watchlist', async ({ marketsPage }) => {
    await check_watchlistStarOn(marketsPage, watchlistedSymbol)
    await action_toggleWatchlist(marketsPage, watchlistedSymbol)
    await check_watchlistStarOff(marketsPage, watchlistedSymbol)
    await action_toggleWatchlist(marketsPage, watchlistedSymbol)
    await check_watchlistStarOn(marketsPage, watchlistedSymbol)
  })
})
