import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the dynamic elements page: ticker, delayed button, lazy list. */
export class DynamicPage extends BasePage {
  readonly root: Locator
  readonly tickerCard: Locator
  readonly delayedButton: Locator
  readonly lazyList: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('dynamic-page')
    this.tickerCard = page.getByTestId('ticker-card')
    this.delayedButton = page.getByTestId('delayed-button')
    this.lazyList = page.getByTestId('lazy-list')
  }

  async open(): Promise<void> {
    await this.goto(routes.dynamic)
    await expect(this.root).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.tickerCard).toBeVisible()
    await expect(this.delayedButton).toBeVisible()
    await expect(this.lazyList).toBeVisible()
  }
}
