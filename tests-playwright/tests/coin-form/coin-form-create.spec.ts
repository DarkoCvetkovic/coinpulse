import { authStates } from '../../src/constants/auth'
import { routes } from '../../src/constants/routes'
import { test } from '../../src/fixtures/fixtures'
import { action_openNewCoinForm, action_submitNewCoin } from '../../src/keywords/coin-form.keywords'
import { check_landedOn } from '../../src/keywords/login.keywords'
import { action_searchCoins, check_coinRowVisible } from '../../src/keywords/markets.keywords'
import { action_resetBackend } from '../../src/keywords/seed.keywords'
import { randomSymbol } from '../../src/utils/random'

test.use({ storageState: authStates.admin })

test.describe('Coin form create', { tag: '@coin-form' }, () => {
  test.beforeEach(async ({ api }) => {
    await action_resetBackend(api)
  })

  test('creates a coin and lists it in the markets table', async ({
    page,
    coinFormPage,
    marketsPage,
  }) => {
    const symbol = randomSymbol()
    const coinName = `Test Coin ${symbol}`

    await action_openNewCoinForm(coinFormPage)
    await action_submitNewCoin(coinFormPage, coinName, symbol)
    await check_landedOn(page, routes.markets)
    await action_searchCoins(marketsPage, symbol)
    await check_coinRowVisible(marketsPage, symbol)
  })
})
