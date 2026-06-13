import { routes } from '../constants/routes'
import type { LoginCredentials } from '../models/auth'
import { loginPage } from '../pages/login/login-page'

export function action_openLoginPage() {
  cy.log('Open the login page')

  loginPage.visit()
}

export function action_loginViaUi(credentials: LoginCredentials) {
  cy.log(`Log in via the UI as user: ${credentials.username}`)

  loginPage.visit()
  loginPage.typeUsername(credentials.username)
  loginPage.typePassword(credentials.password)
  if (credentials.rememberMe) loginPage.enableRememberMe()
  loginPage.submit()
}

export function check_loginShellReady() {
  cy.log('Verify the login form is rendered and interactive')

  loginPage.verifyShellReady()
}

export function check_landedOnDashboard() {
  cy.log('Verify redirect to the dashboard after sign-in')

  cy.location('pathname').should('eq', routes.dashboard)
}

export function check_loginValidationErrors() {
  cy.log('Verify required-field validation messages are shown')

  loginPage.verifyFieldErrors()
}

export function check_loginServerError(message: string) {
  cy.log(`Verify the login server error message: ${message}`)

  loginPage.verifyServerError(message)
}
