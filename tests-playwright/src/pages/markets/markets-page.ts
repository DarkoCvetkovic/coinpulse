import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the markets page: coins table, search and filters. */
export class MarketsPage extends BasePage {
  readonly root: Locator
  readonly table: Locator
  readonly search: Locator
  readonly filterCategory: Locator
  readonly filterStatus: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('markets-page')
    this.table = page.getByTestId('markets-table')
    this.search = page.getByTestId('markets-search')
    this.filterCategory = page.getByTestId('markets-filter-category')
    this.filterStatus = page.getByTestId('markets-filter-status')
  }

  async open(): Promise<void> {
    await this.goto(routes.markets)
    await expect(this.root).toBeVisible()
    await expect(this.table).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.table).toBeVisible()
    await expect(this.search).toBeVisible()
    await expect(this.filterCategory).toBeVisible()
    await expect(this.filterStatus).toBeVisible()
  }
}
