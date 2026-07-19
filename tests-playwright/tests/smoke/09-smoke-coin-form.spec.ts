/**
 * Smoke: coin form page.
 *
 * Opens the new-coin form as admin and verifies the form fields and submit
 * button render.
 *
 * Estimated execution time: ~2s per browser.
 */
import { authStates } from '../../src/constants/auth'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openNewCoinForm,
  check_coinFormShellReady,
} from '../../src/keywords/coin-form.keywords'

test.use({ storageState: authStates.admin })

test.describe('Smoke: coin form', { tag: '@smoke' }, () => {
  test('renders the new coin form shell', async ({ coinFormPage }) => {
    await action_openNewCoinForm(coinFormPage)
    await check_coinFormShellReady(coinFormPage)
  })
})
