import { users } from '../../support/constants/users'
import { action_loginViaUi, check_loginServerError } from '../../support/keywords/login.keywords'

describe('Login server errors', { tags: ['@auth'] }, () => {
  const invalidCredentialsMessage = 'Invalid username or password.'
  const lockedAccountMessage = 'This account is locked. Contact an administrator.'
  const wrongPassword = 'WrongPass123!'

  it('rejects a valid user with a wrong password', () => {
    const wrongPasswordUser = { username: users.standard.username, password: wrongPassword }

    action_loginViaUi(wrongPasswordUser)
    check_loginServerError(invalidCredentialsMessage)
  })

  it('rejects an unknown username', () => {
    const unknownUser = { username: 'ghost_user', password: wrongPassword }

    action_loginViaUi(unknownUser)
    check_loginServerError(invalidCredentialsMessage)
  })

  it('explains that a locked account cannot sign in', () => {
    action_loginViaUi(users.locked)
    check_loginServerError(lockedAccountMessage)
  })
})
