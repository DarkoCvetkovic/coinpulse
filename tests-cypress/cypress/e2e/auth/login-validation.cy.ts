import { users } from '../../support/constants/users'
import {
  action_openLoginPage,
  action_submitEmptyLoginForm,
  action_submitLoginForm,
  check_loginValidationErrors,
  check_noUsernameError,
  check_passwordRequiredError,
  check_usernameRequiredError,
} from '../../support/keywords/login.keywords'

describe('Login validation', { tags: ['@auth'] }, () => {
  const usernameRequired = 'Username is required'
  const passwordRequired = 'Password is required'

  beforeEach(() => {
    action_openLoginPage()
  })

  it('requires both fields when the form is submitted empty', () => {
    action_submitEmptyLoginForm()

    check_loginValidationErrors()
    check_usernameRequiredError(usernameRequired)
    check_passwordRequiredError(passwordRequired)
  })

  it('requires only the missing password when the username is filled', () => {
    const usernameOnly = { username: users.standard.username, password: '' }

    action_submitLoginForm(usernameOnly)

    check_passwordRequiredError(passwordRequired)
    check_noUsernameError()
  })
})
