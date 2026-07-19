import { signedOutState } from '../../src/constants/auth'
import { users } from '../../src/constants/users'
import { test } from '../../src/fixtures/fixtures'
import { action_loginViaUi, check_loginServerError } from '../../src/keywords/login.keywords'

test.use({ storageState: signedOutState })

test.describe('Login server errors', { tag: '@auth' }, () => {
  const invalidCredentialsMessage = 'Invalid username or password.'
  const lockedAccountMessage = 'This account is locked. Contact an administrator.'
  const wrongPassword = 'WrongPass123!'

  test('rejects a valid user with a wrong password', async ({ loginPage }) => {
    const wrongPasswordUser = { username: users.standard.username, password: wrongPassword }

    await action_loginViaUi(loginPage, wrongPasswordUser)
    await check_loginServerError(loginPage, invalidCredentialsMessage)
  })

  test('rejects an unknown username', async ({ loginPage }) => {
    const unknownUser = { username: 'ghost_user', password: wrongPassword }

    await action_loginViaUi(loginPage, unknownUser)
    await check_loginServerError(loginPage, invalidCredentialsMessage)
  })

  test('explains that a locked account cannot sign in', async ({ loginPage }) => {
    await action_loginViaUi(loginPage, users.locked)
    await check_loginServerError(loginPage, lockedAccountMessage)
  })
})
