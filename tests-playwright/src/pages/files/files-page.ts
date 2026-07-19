import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

const VALID_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"></svg>'

/** Page object for the files page: logo upload and portfolio download cards. */
export class FilesPage extends BasePage {
  readonly root: Locator
  readonly uploadCard: Locator
  readonly uploadSuccess: Locator
  readonly uploadError: Locator
  readonly uploadCoin: Locator
  readonly uploadPreview: Locator
  readonly uploadInput: Locator
  readonly uploadSubmit: Locator
  readonly uploadAdminOnly: Locator
  readonly downloadCard: Locator
  readonly downloadSuccess: Locator
  readonly downloadCsv: Locator
  readonly downloadJson: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('files-page')
    this.uploadCard = page.getByTestId('upload-card')
    this.uploadSuccess = page.getByTestId('upload-success')
    this.uploadError = page.getByTestId('upload-error')
    this.uploadCoin = page.getByTestId('upload-coin')
    this.uploadPreview = page.getByTestId('upload-preview')
    this.uploadInput = page.getByTestId('upload-input')
    this.uploadSubmit = page.getByTestId('upload-submit')
    this.uploadAdminOnly = page.getByTestId('upload-admin-only')
    this.downloadCard = page.getByTestId('download-card')
    this.downloadSuccess = page.getByTestId('download-success')
    this.downloadCsv = page.getByTestId('download-csv')
    this.downloadJson = page.getByTestId('download-json')
  }

  async open(): Promise<void> {
    await this.goto(routes.files)
    await expect(this.root).toBeVisible()
  }

  async selectFirstCoin(): Promise<void> {
    await expect(this.uploadCoin.locator('option').nth(1)).toBeAttached()
    await this.uploadCoin.selectOption({ index: 1 })
  }

  async pickValidImage(): Promise<void> {
    await this.uploadInput.setInputFiles({
      name: 'logo.svg',
      mimeType: 'image/svg+xml',
      buffer: Buffer.from(VALID_SVG),
    })
    await expect(this.uploadPreview).toBeVisible()
  }

  async pickInvalidFile(): Promise<void> {
    await this.uploadInput.setInputFiles({
      name: 'note.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('not an image'),
    })
  }

  async submitUpload(): Promise<void> {
    await this.uploadSubmit.click()
  }

  async download(format: 'csv' | 'json'): Promise<void> {
    await (format === 'csv' ? this.downloadCsv : this.downloadJson).click()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.uploadCard).toBeVisible()
    await expect(this.downloadCard).toBeVisible()
    await expect(this.downloadCsv).toBeVisible()
  }

  async verifyUploadSuccess(): Promise<void> {
    await expect(this.uploadSuccess).toBeVisible()
  }

  async verifyUploadError(): Promise<void> {
    await expect(this.uploadError).toBeVisible()
  }

  async verifyAdminOnly(): Promise<void> {
    await expect(this.uploadAdminOnly).toBeVisible()
    await expect(this.uploadCoin).toBeHidden()
  }

  async verifyDownloadSuccess(format: string): Promise<void> {
    await expect(this.downloadSuccess).toBeVisible()
    await expect(this.downloadSuccess).toContainText(`portfolio.${format}`)
  }
}
