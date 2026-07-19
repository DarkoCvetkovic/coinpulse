import { seedCoins } from '../../support/constants/coins'
import { users } from '../../support/constants/users'
import {
  action_openMarkets,
  action_toggleWatchlist,
  check_watchlistStarOff,
  check_watchlistStarOn,
} from '../../support/keywords/markets.keywords'

describe('Markets watchlist', { tags: ['@markets'] }, () => {
  const watchlistedSymbol = seedCoins.btc.symbol

  beforeEach(() => {
    cy.resetAndLogin(users.standard)
    action_openMarkets()
  })

  it('shows a seeded coin as starred', () => {
    check_watchlistStarOn(watchlistedSymbol)
  })

  it('removes and re-adds a coin to the watchlist', () => {
    check_watchlistStarOn(watchlistedSymbol)
    action_toggleWatchlist(watchlistedSymbol)
    check_watchlistStarOff(watchlistedSymbol)
    action_toggleWatchlist(watchlistedSymbol)
    check_watchlistStarOn(watchlistedSymbol)
  })
})
