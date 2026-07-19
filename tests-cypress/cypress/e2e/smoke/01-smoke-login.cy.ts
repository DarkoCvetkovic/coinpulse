/**
 * Smoke: login page.
 *
 * Verifies the login form renders interactive and that valid credentials
 * sign in and land on the dashboard.
 *
 * Estimated execution time: ~2s.
 */
import { users } from '../../support/constants/users'
import {
  action_loginViaUi,
  action_openLoginPage,
  check_landedOnDashboard,
  check_loginShellReady,
} from '../../support/keywords/login.keywords'

describe('Smoke: login', { tags: ['@smoke', '@auth'] }, () => {
  it('renders an interactive login form', () => {
    action_openLoginPage()
    check_loginShellReady()
  })

  it('signs in with valid credentials and lands on the dashboard', () => {
    action_loginViaUi(users.standard)
    check_landedOnDashboard()
  })
})
