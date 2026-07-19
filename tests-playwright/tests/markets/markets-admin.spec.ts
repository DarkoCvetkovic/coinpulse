import { authStates } from '../../src/constants/auth'
import { seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_cancelDeleteCoin,
  action_openMarkets,
  check_adminControlsAbsent,
  check_adminControlsVisible,
  check_coinRowVisible,
} from '../../src/keywords/markets.keywords'

const coinSymbol = seedCoins.btc.symbol

test.describe('Markets admin controls, standard user', { tag: '@markets' }, () => {
  test('hides admin controls for a standard user', async ({ marketsPage }) => {
    await action_openMarkets(marketsPage)
    await check_adminControlsAbsent(marketsPage, coinSymbol)
  })
})

test.describe('Markets admin controls, admin user', { tag: '@markets' }, () => {
  test.use({ storageState: authStates.admin })

  test('shows admin controls for an admin user', async ({ marketsPage }) => {
    await action_openMarkets(marketsPage)
    await check_adminControlsVisible(marketsPage, coinSymbol)
  })

  test('opens and cancels the delete confirmation without removing the coin', async ({
    marketsPage,
  }) => {
    await action_openMarkets(marketsPage)
    await action_cancelDeleteCoin(marketsPage, coinSymbol)
    await check_coinRowVisible(marketsPage, coinSymbol)
  })
})
