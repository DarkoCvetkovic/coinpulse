import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the admin coin form (create and edit). */
export class CoinFormPage extends BasePage {
  readonly root: Locator
  readonly name: Locator
  readonly symbol: Locator
  readonly price: Locator
  readonly category: Locator
  readonly submitButton: Locator
  readonly nameError: Locator
  readonly symbolError: Locator
  readonly priceError: Locator
  readonly categoryError: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('coin-form-page')
    this.name = page.getByTestId('coin-name')
    this.symbol = page.getByTestId('coin-symbol')
    this.price = page.getByTestId('coin-price')
    this.category = page.getByTestId('coin-category')
    this.submitButton = page.getByTestId('coin-form-submit')
    this.nameError = page.getByTestId('coin-name-error')
    this.symbolError = page.getByTestId('coin-symbol-error')
    this.priceError = page.getByTestId('coin-price-error')
    this.categoryError = page.getByTestId('coin-category-error')
  }

  async openNew(): Promise<void> {
    await this.goto(routes.coinNew)
  }

  async openEdit(id: number): Promise<void> {
    await this.goto(`/coins/${id}/edit`)
    await expect(this.root).toBeVisible()
  }

  async fillValid(name: string, symbol: string): Promise<void> {
    const validPrice = '100'
    const validCategory = 'L1'
    await this.name.fill(name)
    await this.symbol.fill(symbol)
    await this.price.fill(validPrice)
    await this.category.selectOption(validCategory)
  }

  async submit(): Promise<void> {
    await this.submitButton.click()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.name).toBeVisible()
    await expect(this.symbol).toBeVisible()
    await expect(this.submitButton).toBeVisible()
  }

  async verifyRequiredErrors(): Promise<void> {
    await expect(this.nameError).toBeVisible()
    await expect(this.symbolError).toBeVisible()
    await expect(this.priceError).toBeVisible()
    await expect(this.categoryError).toBeVisible()
  }

  async verifyNameValue(name: string): Promise<void> {
    await expect(this.name).toHaveValue(name)
  }
}
