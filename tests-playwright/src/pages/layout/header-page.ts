import { type Locator, type Page } from '@playwright/test'
import { BasePage } from '../base-page'

/** Page object for the app header shared across authenticated pages. */
export class HeaderPage extends BasePage {
  readonly root: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('app-header')
    this.logoutButton = page.getByTestId('logout-button')
  }

  async logout(): Promise<void> {
    await this.logoutButton.click()
  }
}
