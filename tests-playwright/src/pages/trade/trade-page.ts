import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the trade page: the buy/sell transaction form. */
export class TradePage extends BasePage {
  readonly root: Locator
  readonly coin: Locator
  readonly amount: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('trade-form')
    this.coin = page.getByTestId('trade-coin')
    this.amount = page.getByTestId('trade-amount')
    this.submitButton = page.getByTestId('trade-submit')
  }

  async open(): Promise<void> {
    await this.goto(routes.trade)
    await expect(this.root).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.coin).toBeVisible()
    await expect(this.amount).toBeVisible()
    await expect(this.submitButton).toBeEnabled()
  }
}
