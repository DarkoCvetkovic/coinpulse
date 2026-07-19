import { authStates } from '../../src/constants/auth'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openEditCoinForm,
  check_coinNamePrefilled,
} from '../../src/keywords/coin-form.keywords'
import { action_resetBackend, action_seedCoin } from '../../src/keywords/seed.keywords'
import { buildCoin } from '../../src/utils/coin-builders'

test.use({ storageState: authStates.admin })

test.describe('Coin form edit', { tag: '@coin-form' }, () => {
  test.beforeEach(async ({ api }) => {
    await action_resetBackend(api)
  })

  test('loads an existing coin into the edit form', async ({ api, coinFormPage }) => {
    const coin = await action_seedCoin(api, buildCoin())

    await action_openEditCoinForm(coinFormPage, coin.id)
    await check_coinNamePrefilled(coinFormPage, coin.name)
  })
})
