import { seedCoins, seedWatchlistSymbols } from '../../support/constants/coins'
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
  const seededWatchlist = seedWatchlistSymbols

  beforeEach(() => {
    cy.resetAndLogin(users.standard)
    action_openCompare()
  })

  it('lists the seeded watchlist coins in order', () => {
    check_watchlistShowsCoins(seededWatchlist)
    check_watchlistOrder(seededWatchlist)
  })

  it('reorders the watchlist by dragging a coin onto another', () => {
    const reordered = [
      seedCoins.sol.symbol,
      seedCoins.btc.symbol,
      seedCoins.eth.symbol,
      seedCoins.link.symbol,
    ]

    action_reorderWatchlist(seedCoins.sol.symbol, seedCoins.btc.symbol)
    check_watchlistOrder(reordered)
  })

  it('removes a coin from the watchlist and the comparison via the context menu', () => {
    const removed = seedCoins.eth.symbol
    const remaining = [seedCoins.btc.symbol, seedCoins.sol.symbol, seedCoins.link.symbol]

    action_addCoinByDoubleClick(removed)
    action_removeCoinFromWatchlist(removed)
    check_watchlistShowsCoins(remaining)
    check_coinNotCompared(removed)
  })
})
