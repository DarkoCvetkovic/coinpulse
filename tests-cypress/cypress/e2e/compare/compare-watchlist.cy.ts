import { users } from '../../support/constants/users'
import {
  action_addCoinByDoubleClick,
  action_openCompare,
  action_removeCoinFromWatchlist,
  action_reorderWatchlist,
  check_coinNotCompared,
  check_watchlistOrder,
  check_watchlistShowsCoins,
} from '../../support/keywords/compare.keywords'

describe('Compare watchlist', { tags: ['@compare'] }, () => {
  const seededWatchlist = ['BTC', 'ETH', 'SOL', 'LINK']

  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.standard)
    action_openCompare()
  })

  it('lists the seeded watchlist coins in order', () => {
    check_watchlistShowsCoins(seededWatchlist)
    check_watchlistOrder(seededWatchlist)
  })

  it('reorders the watchlist by dragging a coin onto another', () => {
    const reordered = ['SOL', 'BTC', 'ETH', 'LINK']

    action_reorderWatchlist('SOL', 'BTC')

    check_watchlistOrder(reordered)
  })

  it('removes a coin from the watchlist and the comparison via the context menu', () => {
    const removed = 'ETH'
    const remaining = ['BTC', 'SOL', 'LINK']

    action_addCoinByDoubleClick(removed)
    action_removeCoinFromWatchlist(removed)

    check_watchlistShowsCoins(remaining)
    check_coinNotCompared(removed)
  })
})
