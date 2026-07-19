import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the admin coin form (create and edit). */
export class CoinFormPage extends BasePage {
  readonly root: Locator
  readonly name: Locator
  readonly symbol: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('coin-form-page')
    this.name = page.getByTestId('coin-name')
    this.symbol = page.getByTestId('coin-symbol')
    this.submitButton = page.getByTestId('coin-form-submit')
  }

  async openNew(): Promise<void> {
    await this.goto(routes.coinNew)
    await expect(this.root).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.name).toBeVisible()
    await expect(this.symbol).toBeVisible()
    await expect(this.submitButton).toBeVisible()
  }
}
