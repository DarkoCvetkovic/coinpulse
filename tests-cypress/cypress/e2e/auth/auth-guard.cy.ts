import { routes } from '../../support/constants/routes'
import { users } from '../../support/constants/users'
import {
  action_attemptVisit,
  action_logout,
  action_submitLoginForm,
  check_landedOn,
  check_redirectedToLogin,
} from '../../support/keywords/login.keywords'

describe('Auth route guard', { tags: ['@auth'] }, () => {
  it('redirects an unauthenticated visitor from a protected page to the login', () => {
    action_attemptVisit(routes.dashboard)

    check_redirectedToLogin()
  })

  it('returns to the originally requested page after signing in', () => {
    action_attemptVisit(routes.markets)
    check_redirectedToLogin()

    action_submitLoginForm(users.standard)

    check_landedOn(routes.markets)
  })

  it('keeps an authenticated user away from the login page', () => {
    cy.login(users.standard)

    action_attemptVisit(routes.login)

    check_landedOn(routes.dashboard)
  })

  it('locks the app again after logging out', () => {
    cy.login(users.standard)
    action_attemptVisit(routes.dashboard)

    action_logout()
    check_redirectedToLogin()

    action_attemptVisit(routes.dashboard)
    check_redirectedToLogin()
  })
})
