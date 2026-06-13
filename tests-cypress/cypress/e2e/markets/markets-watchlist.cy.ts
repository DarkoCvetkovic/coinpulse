import { users } from '../../support/constants/users'
import {
  action_openMarkets,
  action_toggleWatchlist,
  check_watchlistStarOff,
  check_watchlistStarOn,
} from '../../support/keywords/markets.keywords'

describe('Markets watchlist', { tags: ['@markets'] }, () => {
  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.standard)
    action_openMarkets()
  })

  it('shows a seeded coin as starred', () => {
    check_watchlistStarOn('BTC')
  })

  it('removes and re-adds a coin to the watchlist', () => {
    check_watchlistStarOn('BTC')
    action_toggleWatchlist('BTC')
    check_watchlistStarOff('BTC')
    action_toggleWatchlist('BTC')
    check_watchlistStarOn('BTC')
  })
})
