import { routes } from '../constants/routes'
import type { LoginCredentials } from '../models/auth'
import { headerPage } from '../pages/layout/header-page'
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

export function action_submitLoginForm(credentials: LoginCredentials) {
  cy.log(`Submit the already open login form as user: ${credentials.username}`)

  if (credentials.username) loginPage.typeUsername(credentials.username)
  if (credentials.password) loginPage.typePassword(credentials.password)
  loginPage.submit()
}

export function action_submitEmptyLoginForm() {
  cy.log('Submit the login form with both fields empty')

  loginPage.submit()
}

export function action_attemptVisit(path: string) {
  cy.log(`Attempt to open the path directly: ${path}`)

  cy.visit(path)
}

export function action_logout() {
  cy.log('Log out via the header button')

  headerPage.logout()
}

export function check_usernameRequiredError(message: string) {
  cy.log(`Verify the username required error: ${message}`)

  loginPage.verifyUsernameError(message)
}

export function check_passwordRequiredError(message: string) {
  cy.log(`Verify the password required error: ${message}`)

  loginPage.verifyPasswordError(message)
}

export function check_noUsernameError() {
  cy.log('Verify no username validation error is shown')

  loginPage.verifyNoUsernameError()
}

export function check_redirectedToLogin() {
  cy.log('Verify the visitor was redirected to the login page')

  cy.location('pathname').should('eq', routes.login)
}

export function check_landedOn(path: string) {
  cy.log(`Verify the browser landed on: ${path}`)

  cy.location('pathname').should('eq', path)
}
