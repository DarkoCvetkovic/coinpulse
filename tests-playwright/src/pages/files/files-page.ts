import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the files page: logo upload and portfolio download cards. */
export class FilesPage extends BasePage {
  readonly root: Locator
  readonly uploadCard: Locator
  readonly downloadCard: Locator
  readonly downloadCsv: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('files-page')
    this.uploadCard = page.getByTestId('upload-card')
    this.downloadCard = page.getByTestId('download-card')
    this.downloadCsv = page.getByTestId('download-csv')
  }

  async open(): Promise<void> {
    await this.goto(routes.files)
    await expect(this.root).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.uploadCard).toBeVisible()
    await expect(this.downloadCard).toBeVisible()
    await expect(this.downloadCsv).toBeVisible()
  }
}
