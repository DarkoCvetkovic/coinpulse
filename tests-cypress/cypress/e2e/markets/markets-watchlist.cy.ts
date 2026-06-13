import { users } from '../../support/constants/users'
import {
  action_openMarkets,
  action_toggleWatchlist,
  check_watchlistStarOff,
  check_watchlistStarOn,
} from '../../support/keywords/markets.keywords'

describe('Markets watchlist', { tags: ['@markets'] }, () => {
  const watchlistedSymbol = 'BTC'

  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.standard)
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
