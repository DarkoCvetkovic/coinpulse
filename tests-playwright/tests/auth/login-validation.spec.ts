import { signedOutState } from '../../src/constants/auth'
import { users } from '../../src/constants/users'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openLoginPage,
  action_submitEmptyLoginForm,
  action_submitLoginForm,
  check_noUsernameError,
  check_passwordRequiredError,
  check_usernameRequiredError,
} from '../../src/keywords/login.keywords'

test.use({ storageState: signedOutState })

test.describe('Login validation', { tag: '@auth' }, () => {
  const usernameRequired = 'Username is required'
  const passwordRequired = 'Password is required'

  test.beforeEach(async ({ loginPage }) => {
    await action_openLoginPage(loginPage)
  })

  test('requires both fields when the form is submitted empty', async ({ loginPage }) => {
    await action_submitEmptyLoginForm(loginPage)
    await check_usernameRequiredError(loginPage, usernameRequired)
    await check_passwordRequiredError(loginPage, passwordRequired)
  })

  test('requires only the missing password when the username is filled', async ({ loginPage }) => {
    const usernameOnly = { username: users.standard.username, password: '' }

    await action_submitLoginForm(loginPage, usernameOnly)
    await check_passwordRequiredError(loginPage, passwordRequired)
    await check_noUsernameError(loginPage)
  })
})
