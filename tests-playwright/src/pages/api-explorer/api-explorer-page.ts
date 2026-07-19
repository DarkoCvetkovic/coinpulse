import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the API explorer: request groups and the response panel. */
export class ApiExplorerPage extends BasePage {
  readonly root: Locator
  readonly coinsGroup: Locator
  readonly simulationsGroup: Locator
  readonly emptyResponse: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('api-explorer-page')
    this.coinsGroup = page.getByTestId('api-group-coins')
    this.simulationsGroup = page.getByTestId('api-group-simulations')
    this.emptyResponse = page.getByTestId('api-response-empty')
  }

  async open(): Promise<void> {
    await this.goto(routes.apiExplorer)
    await expect(this.root).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.coinsGroup).toBeVisible()
    await expect(this.simulationsGroup).toBeVisible()
    await expect(this.emptyResponse).toBeVisible()
  }
}
