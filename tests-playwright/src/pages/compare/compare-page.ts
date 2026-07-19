import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the compare page: watchlist builder and the compare zone. */
export class ComparePage extends BasePage {
  readonly root: Locator
  readonly watchlistCard: Locator
  readonly zoneCard: Locator
  readonly dropArea: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('compare-page')
    this.watchlistCard = page.getByTestId('compare-watchlist-card')
    this.zoneCard = page.getByTestId('compare-zone-card')
    this.dropArea = page.getByTestId('compare-zone')
  }

  async open(): Promise<void> {
    await this.goto(routes.compare)
    await expect(this.root).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.watchlistCard).toBeVisible()
    await expect(this.zoneCard).toBeVisible()
    await expect(this.dropArea).toBeVisible()
  }
}
