import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

const externalLinkAttrs = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

/**
 * Page object for the dynamic elements page: ticker, delayed button, iframe,
 * shadow DOM widget, lazy list and external link. Playwright pierces open
 * shadow roots natively and its real browsers deliver IntersectionObserver
 * callbacks on scroll, so no shims are needed here.
 */
export class DynamicPage extends BasePage {
  readonly root: Locator
  readonly tickerCard: Locator
  readonly tickerPrice: Locator
  readonly tickerCount: Locator
  readonly delayedButton: Locator
  readonly delayedSuccess: Locator
  readonly chartFrame: FrameLocator
  readonly shadowValue: Locator
  readonly lazyList: Locator
  readonly lazyItems: Locator
  readonly lazySentinel: Locator
  readonly lazyDone: Locator
  readonly externalLink: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('dynamic-page')
    this.tickerCard = page.getByTestId('ticker-card')
    this.tickerPrice = page.getByTestId('ticker-price')
    this.tickerCount = page.getByTestId('ticker-count')
    this.delayedButton = page.getByTestId('delayed-button')
    this.delayedSuccess = page.getByTestId('delayed-success')
    this.chartFrame = page.frameLocator('[data-testid="chart-iframe"]')
    this.shadowValue = page.getByTestId('shadow-widget-value')
    this.lazyList = page.getByTestId('lazy-list')
    this.lazyItems = page.locator('[data-testid^="lazy-item-"]')
    this.lazySentinel = page.getByTestId('lazy-sentinel')
    this.lazyDone = page.getByTestId('lazy-done')
    this.externalLink = page.getByTestId('external-link')
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

  async verifyTickerCoin(symbol: string): Promise<void> {
    await expect(this.tickerCard).toContainText(symbol)
    await expect(this.tickerPrice).toBeVisible()
  }

  async verifyTickerAdvances(): Promise<void> {
    const initial = Number(await this.tickerCount.textContent())
    await expect
      .poll(async () => Number(await this.tickerCount.textContent()))
      .toBeGreaterThan(initial)
  }

  async verifyDelayedButtonDisabled(): Promise<void> {
    await expect(this.delayedButton).toBeDisabled()
  }

  async clickDelayedButtonWhenReady(): Promise<void> {
    await expect(this.delayedButton).toBeEnabled()
    await this.delayedButton.click()
  }

  async verifyDelayedSuccess(): Promise<void> {
    await expect(this.delayedSuccess).toBeVisible()
  }

  async verifyIframeContent(title: string): Promise<void> {
    await expect(this.chartFrame.getByTestId('iframe-title')).toContainText(title)
  }

  async verifyShadowWidgetValue(value: string): Promise<void> {
    await expect(this.shadowValue).toContainText(value)
  }

  async verifyLazyInitialBatch(batch: number): Promise<void> {
    await expect(this.lazyItems).toHaveCount(batch)
    await expect(this.lazyDone).toBeHidden()
  }

  async loadMoreLazyCoins(expectedCount: number): Promise<void> {
    await expect(this.lazyItems.first()).toBeVisible()
    await this.scrollSentinelIntoFreshView()
    await expect(this.lazyItems).toHaveCount(expectedCount)
  }

  async loadAllLazyCoins(total: number, batch: number): Promise<void> {
    await expect(this.lazyItems.first()).toBeVisible()
    const loads = Math.ceil((total - batch) / batch)
    for (let i = 0; i < loads; i += 1) {
      const expected = Math.min(batch * (i + 2), total)
      await this.scrollSentinelIntoFreshView()
      await expect(this.lazyItems).toHaveCount(expected)
    }
    await expect(this.lazyDone).toBeVisible()
  }

  /**
   * IntersectionObserver only fires on intersection CHANGES: when a loaded batch
   * leaves the sentinel inside the viewport, staying there produces no new event
   * and scrollIntoViewIfNeeded is a no-op. Scrolling to the top first takes the
   * sentinel out of view, so bringing it back always yields a fresh intersection.
   */
  private async scrollSentinelIntoFreshView(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0))
    await this.lazySentinel.scrollIntoViewIfNeeded()
  }

  async verifyExternalLink(href: string): Promise<void> {
    await expect(this.externalLink).toHaveAttribute('href', href)
    await expect(this.externalLink).toHaveAttribute('target', externalLinkAttrs.target)
    await expect(this.externalLink).toHaveAttribute('rel', externalLinkAttrs.rel)
  }
}
