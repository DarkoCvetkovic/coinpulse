import { seedCoins } from '../../support/constants/coins'
import { users } from '../../support/constants/users'
import {
  action_addCoinByContextMenu,
  action_addCoinByDoubleClick,
  action_addCoinByDragAndDrop,
  action_cancelClearComparison,
  action_clearComparison,
  action_dismissLimitModal,
  action_openCompare,
  action_removeComparedCoin,
  check_coinNotCompared,
  check_comparedCoins,
  check_compareZoneEmpty,
  check_limitModalShown,
} from '../../support/keywords/compare.keywords'

describe('Compare zone builder', { tags: ['@compare'] }, () => {
  const btc = seedCoins.btc.symbol
  const eth = seedCoins.eth.symbol
  const sol = seedCoins.sol.symbol
  const link = seedCoins.link.symbol

  beforeEach(() => {
    cy.resetAndLogin(users.standard)
    action_openCompare()
  })

  it('starts with an empty compare zone', () => {
    check_compareZoneEmpty()
  })

  it('adds a coin by double-clicking it in the watchlist', () => {
    action_addCoinByDoubleClick(btc)

    check_comparedCoins([btc])
  })

  it('adds a coin by dragging it into the compare zone', () => {
    action_addCoinByDragAndDrop(eth)

    check_comparedCoins([eth])
  })

  it('adds a coin through the right-click context menu', () => {
    action_addCoinByContextMenu(sol)

    check_comparedCoins([sol])
  })

  it('ignores adding the same coin twice', () => {
    action_addCoinByDoubleClick(btc)
    action_addCoinByDoubleClick(btc)

    check_comparedCoins([btc])
  })

  it('blocks a fourth coin with the limit modal', () => {
    action_addCoinByDoubleClick(btc)
    action_addCoinByDoubleClick(eth)
    action_addCoinByDoubleClick(sol)
    action_addCoinByDoubleClick(link)

    check_limitModalShown()
    action_dismissLimitModal()
    check_comparedCoins([btc, eth, sol])
    check_coinNotCompared(link)
  })

  it('removes a coin from the compare zone via its chip', () => {
    action_addCoinByDoubleClick(btc)
    action_addCoinByDoubleClick(eth)

    action_removeComparedCoin(btc)

    check_comparedCoins([eth])
  })

  it('keeps the comparison when clearing is cancelled', () => {
    action_addCoinByDoubleClick(btc)
    action_addCoinByDoubleClick(eth)

    action_cancelClearComparison()

    check_comparedCoins([btc, eth])
  })

  it('empties the compare zone when clearing is confirmed', () => {
    action_addCoinByDoubleClick(btc)
    action_addCoinByDoubleClick(eth)

    action_clearComparison()

    check_compareZoneEmpty()
  })
})
