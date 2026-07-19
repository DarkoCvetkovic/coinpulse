import { routes } from '../../src/constants/routes'
import { test } from '../../src/fixtures/fixtures'
import { action_openNewCoinForm } from '../../src/keywords/coin-form.keywords'
import { check_landedOn } from '../../src/keywords/login.keywords'

test.describe('Coin form admin guard', { tag: '@coin-form' }, () => {
  test('redirects a standard user away from the new coin form', async ({ page, coinFormPage }) => {
    await action_openNewCoinForm(coinFormPage)
    await check_landedOn(page, routes.dashboard)
  })
})
