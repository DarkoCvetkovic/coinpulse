import { signedOutState } from '../../src/constants/auth'
import { routes } from '../../src/constants/routes'
import { users } from '../../src/constants/users'
import { test } from '../../src/fixtures/fixtures'
import {
  action_attemptVisit,
  action_logout,
  action_submitLoginForm,
  check_landedOn,
  check_redirectedToLogin,
} from '../../src/keywords/login.keywords'

test.describe('Auth route guard, signed out', { tag: '@auth' }, () => {
  test.use({ storageState: signedOutState })

  test('redirects an unauthenticated visitor from a protected page to the login', async ({
    page,
  }) => {
    await action_attemptVisit(page, routes.dashboard)
    await check_redirectedToLogin(page)
  })

  test('returns to the originally requested page after signing in', async ({ page, loginPage }) => {
    await action_attemptVisit(page, routes.markets)
    await check_redirectedToLogin(page)
    await action_submitLoginForm(loginPage, users.standard)
    await check_landedOn(page, routes.markets)
  })
})

test.describe('Auth route guard, signed in', { tag: '@auth' }, () => {
  test('keeps an authenticated user away from the login page', async ({ page }) => {
    await action_attemptVisit(page, routes.login)
    await check_landedOn(page, routes.dashboard)
  })

  test('locks the app again after logging out', async ({ page, headerPage }) => {
    await action_attemptVisit(page, routes.dashboard)
    await action_logout(headerPage)
    await check_redirectedToLogin(page)
    await action_attemptVisit(page, routes.dashboard)
    await check_redirectedToLogin(page)
  })
})
