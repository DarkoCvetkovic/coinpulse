import type { Page } from '@playwright/test'
import { routes } from '../constants/routes'
import { expect, test } from '../fixtures/fixtures'
import type { LoginCredentials } from '../models/auth'
import type { HeaderPage } from '../pages/layout/header-page'
import type { LoginPage } from '../pages/login/login-page'

export async function action_openLoginPage(loginPage: LoginPage): Promise<void> {
  await test.step('Open the login page', async () => {
    await loginPage.open()
  })
}

export async function action_loginViaUi(
  loginPage: LoginPage,
  credentials: LoginCredentials,
): Promise<void> {
  await test.step(`Log in via the UI as user: ${credentials.username}`, async () => {
    await loginPage.open()
    await loginPage.signIn(credentials)
  })
}

export async function check_loginShellReady(loginPage: LoginPage): Promise<void> {
  await test.step('Verify the login form is rendered and interactive', async () => {
    await loginPage.verifyShellReady()
  })
}

export async function check_landedOnDashboard(loginPage: LoginPage): Promise<void> {
  await test.step('Verify redirect to the dashboard after sign-in', async () => {
    await loginPage.verifyRedirectedToDashboard()
  })
}

export async function action_submitLoginForm(
  loginPage: LoginPage,
  credentials: LoginCredentials,
): Promise<void> {
  await test.step(`Submit the already open login form as user: ${credentials.username}`, async () => {
    if (credentials.username) await loginPage.fillUsername(credentials.username)
    if (credentials.password) await loginPage.fillPassword(credentials.password)
    await loginPage.submit()
  })
}

export async function action_submitEmptyLoginForm(loginPage: LoginPage): Promise<void> {
  await test.step('Submit the login form with both fields empty', async () => {
    await loginPage.submit()
  })
}

export async function action_attemptVisit(page: Page, path: string): Promise<void> {
  await test.step(`Attempt to open the path directly: ${path}`, async () => {
    await page.goto(path)
  })
}

export async function action_logout(headerPage: HeaderPage): Promise<void> {
  await test.step('Log out via the header button', async () => {
    await headerPage.logout()
  })
}

export async function check_usernameRequiredError(
  loginPage: LoginPage,
  message: string,
): Promise<void> {
  await test.step(`Verify the username required error: ${message}`, async () => {
    await loginPage.verifyUsernameError(message)
  })
}

export async function check_passwordRequiredError(
  loginPage: LoginPage,
  message: string,
): Promise<void> {
  await test.step(`Verify the password required error: ${message}`, async () => {
    await loginPage.verifyPasswordError(message)
  })
}

export async function check_noUsernameError(loginPage: LoginPage): Promise<void> {
  await test.step('Verify no username validation error is shown', async () => {
    await loginPage.verifyNoUsernameError()
  })
}

export async function check_loginServerError(loginPage: LoginPage, message: string): Promise<void> {
  await test.step(`Verify the login server error message: ${message}`, async () => {
    await loginPage.verifyServerError(message)
  })
}

export async function check_redirectedToLogin(page: Page): Promise<void> {
  await test.step('Verify the visitor was redirected to the login page', async () => {
    await expect(page).toHaveURL(new RegExp(`${routes.login}`))
  })
}

export async function check_landedOn(page: Page, path: string): Promise<void> {
  await test.step(`Verify the browser landed on: ${path}`, async () => {
    await expect(page).toHaveURL(new RegExp(`${path}$`))
  })
}
