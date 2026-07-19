/**
 * Smoke: login page.
 *
 * Verifies the login form renders interactive and that valid credentials
 * sign in and land on the dashboard. Runs signed out.
 *
 * Estimated execution time: ~3s per browser.
 */
import { signedOutState } from '../../src/constants/auth'
import { users } from '../../src/constants/users'
import { test } from '../../src/fixtures/fixtures'
import {
  action_loginViaUi,
  action_openLoginPage,
  check_landedOnDashboard,
  check_loginShellReady,
} from '../../src/keywords/login.keywords'

test.use({ storageState: signedOutState })

test.describe('Smoke: login', { tag: '@smoke' }, () => {
  test('renders an interactive login form', async ({ loginPage }) => {
    await action_openLoginPage(loginPage)
    await check_loginShellReady(loginPage)
  })

  test('signs in with valid credentials and lands on the dashboard', async ({ loginPage }) => {
    await action_loginViaUi(loginPage, users.standard)
    await check_landedOnDashboard(loginPage)
  })
})
