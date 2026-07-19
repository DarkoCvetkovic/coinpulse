import { test } from '../fixtures/fixtures'
import type { LoginCredentials } from '../models/auth'
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
