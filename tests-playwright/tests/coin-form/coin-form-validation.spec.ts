import { authStates } from '../../src/constants/auth'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openNewCoinForm,
  action_submitEmptyCoinForm,
  check_coinFormRequiredErrors,
} from '../../src/keywords/coin-form.keywords'

test.use({ storageState: authStates.admin })

test.describe('Coin form validation', { tag: '@coin-form' }, () => {
  test.beforeEach(async ({ coinFormPage }) => {
    await action_openNewCoinForm(coinFormPage)
  })

  test('shows required-field errors when submitting an empty form', async ({ coinFormPage }) => {
    await action_submitEmptyCoinForm(coinFormPage)
    await check_coinFormRequiredErrors(coinFormPage)
  })
})
