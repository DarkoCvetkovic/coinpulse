import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the trade page: the buy/sell transaction form. */
export class TradePage extends BasePage {
  readonly root: Locator
  readonly form: Locator
  readonly marketPrice: Locator
  readonly coin: Locator
  readonly typeBuy: Locator
  readonly typeSell: Locator
  readonly amount: Locator
  readonly confirm: Locator
  readonly submitButton: Locator
  readonly success: Locator
  readonly coinError: Locator
  readonly amountError: Locator
  readonly priceError: Locator
  readonly confirmError: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('trade-page')
    this.form = page.getByTestId('trade-form')
    this.marketPrice = page.getByTestId('trade-market-price')
    this.coin = page.getByTestId('trade-coin')
    this.typeBuy = page.getByTestId('trade-type-buy')
    this.typeSell = page.getByTestId('trade-type-sell')
    this.amount = page.getByTestId('trade-amount')
    this.confirm = page.getByTestId('trade-confirm')
    this.submitButton = page.getByTestId('trade-submit')
    this.success = page.getByTestId('trade-success')
    this.coinError = page.getByTestId('trade-coin-error')
    this.amountError = page.getByTestId('trade-amount-error')
    this.priceError = page.getByTestId('trade-price-error')
    this.confirmError = page.getByTestId('trade-confirm-error')
  }

  async open(): Promise<void> {
    await this.goto(routes.trade)
    await expect(this.root).toBeVisible()
    await expect(this.form).toBeVisible()
  }

  async selectFirstCoin(): Promise<void> {
    await expect(this.coin.locator('option').nth(1)).toBeAttached()
    await this.coin.selectOption({ index: 1 })
    await expect(this.marketPrice).toBeVisible()
  }

  async selectType(type: 'buy' | 'sell'): Promise<void> {
    await (type === 'buy' ? this.typeBuy : this.typeSell).check()
  }

  async enterAmount(amount: string): Promise<void> {
    await this.amount.fill(amount)
  }

  async confirmTrade(): Promise<void> {
    await this.confirm.check()
  }

  async submit(): Promise<void> {
    await this.submitButton.click()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.coin).toBeVisible()
    await expect(this.amount).toBeVisible()
    await expect(this.submitButton).toBeEnabled()
  }

  async verifyRequiredErrors(): Promise<void> {
    await expect(this.coinError).toBeVisible()
    await expect(this.amountError).toBeVisible()
    await expect(this.priceError).toBeVisible()
    await expect(this.confirmError).toBeVisible()
  }

  async verifySuccess(text: string): Promise<void> {
    await expect(this.success).toBeVisible()
    await expect(this.success).toContainText(text)
  }
}
