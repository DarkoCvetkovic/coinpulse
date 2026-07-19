import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import type { LoginCredentials } from '../../models/auth'
import { BasePage } from '../base-page'

/** Page object for the login page: form fields, validation and server errors. */
export class LoginPage extends BasePage {
  readonly form: Locator
  readonly username: Locator
  readonly password: Locator
  readonly rememberMe: Locator
  readonly submitButton: Locator
  readonly serverError: Locator
  readonly usernameError: Locator
  readonly passwordError: Locator

  constructor(page: Page) {
    super(page)
    this.form = page.getByTestId('login-form')
    this.username = page.getByTestId('login-username')
    this.password = page.getByTestId('login-password')
    this.rememberMe = page.getByTestId('login-remember-me')
    this.submitButton = page.getByTestId('login-submit')
    this.serverError = page.getByTestId('login-error')
    this.usernameError = page.getByTestId('login-username-error')
    this.passwordError = page.getByTestId('login-password-error')
  }

  async open(): Promise<void> {
    await this.goto(routes.login)
    await expect(this.form).toBeVisible()
  }

  async signIn(credentials: LoginCredentials): Promise<void> {
    await this.username.fill(credentials.username)
    await this.password.fill(credentials.password)
    if (credentials.rememberMe) await this.rememberMe.check()
    await this.submitButton.click()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.username).toBeVisible()
    await expect(this.password).toBeVisible()
    await expect(this.submitButton).toBeEnabled()
  }

  async verifyRedirectedToDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.dashboard}$`))
  }
}
