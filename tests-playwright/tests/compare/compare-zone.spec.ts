import { seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
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
} from '../../src/keywords/compare.keywords'
import { action_resetBackend } from '../../src/keywords/seed.keywords'

test.describe('Compare zone builder', { tag: '@compare' }, () => {
  const btc = seedCoins.btc.symbol
  const eth = seedCoins.eth.symbol
  const sol = seedCoins.sol.symbol
  const link = seedCoins.link.symbol

  test.beforeEach(async ({ api, comparePage }) => {
    await action_resetBackend(api)
    await action_openCompare(comparePage)
  })

  test('starts with an empty compare zone', async ({ comparePage }) => {
    await check_compareZoneEmpty(comparePage)
  })

  test('adds a coin by double-clicking it in the watchlist', async ({ comparePage }) => {
    await action_addCoinByDoubleClick(comparePage, btc)
    await check_comparedCoins(comparePage, [btc])
  })

  test('adds a coin by dragging it into the compare zone', async ({ comparePage }) => {
    await action_addCoinByDragAndDrop(comparePage, eth)
    await check_comparedCoins(comparePage, [eth])
  })

  test('adds a coin through the right-click context menu', async ({ comparePage }) => {
    await action_addCoinByContextMenu(comparePage, sol)
    await check_comparedCoins(comparePage, [sol])
  })

  test('ignores adding the same coin twice', async ({ comparePage }) => {
    await action_addCoinByDoubleClick(comparePage, btc)
    await action_addCoinByDoubleClick(comparePage, btc)
    await check_comparedCoins(comparePage, [btc])
  })

  test('blocks a fourth coin with the limit modal', async ({ comparePage }) => {
    await action_addCoinByDoubleClick(comparePage, btc)
    await action_addCoinByDoubleClick(comparePage, eth)
    await action_addCoinByDoubleClick(comparePage, sol)
    await action_addCoinByDoubleClick(comparePage, link)
    await check_limitModalShown(comparePage)
    await action_dismissLimitModal(comparePage)
    await check_comparedCoins(comparePage, [btc, eth, sol])
    await check_coinNotCompared(comparePage, link)
  })

  test('removes a coin from the compare zone via its chip', async ({ comparePage }) => {
    await action_addCoinByDoubleClick(comparePage, btc)
    await action_addCoinByDoubleClick(comparePage, eth)
    await action_removeComparedCoin(comparePage, btc)
    await check_comparedCoins(comparePage, [eth])
  })

  test('keeps the comparison when clearing is cancelled', async ({ comparePage }) => {
    await action_addCoinByDoubleClick(comparePage, btc)
    await action_addCoinByDoubleClick(comparePage, eth)
    await action_cancelClearComparison(comparePage)
    await check_comparedCoins(comparePage, [btc, eth])
  })

  test('empties the compare zone when clearing is confirmed', async ({ comparePage }) => {
    await action_addCoinByDoubleClick(comparePage, btc)
    await action_addCoinByDoubleClick(comparePage, eth)
    await action_clearComparison(comparePage)
    await check_compareZoneEmpty(comparePage)
  })
})
