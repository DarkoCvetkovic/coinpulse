import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

const WATCHLIST_ITEM_PREFIX = 'compare-watchlist-item-'

/** Page object for the compare page: watchlist builder, compare zone, results. */
export class ComparePage extends BasePage {
  readonly root: Locator
  readonly watchlistCard: Locator
  readonly watchlistItems: Locator
  readonly zoneCard: Locator
  readonly dropArea: Locator
  readonly zoneHint: Locator
  readonly clearButton: Locator
  readonly chips: Locator
  readonly resultsCard: Locator
  readonly charts: Locator
  readonly contextMenu: Locator
  readonly contextAddCompare: Locator
  readonly contextRemoveWatchlist: Locator
  readonly limitModal: Locator
  readonly limitOk: Locator
  readonly clearModal: Locator
  readonly clearCancel: Locator
  readonly clearConfirm: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('compare-page')
    this.watchlistCard = page.getByTestId('compare-watchlist-card')
    this.watchlistItems = page.locator(`[data-testid^="${WATCHLIST_ITEM_PREFIX}"]`)
    this.zoneCard = page.getByTestId('compare-zone-card')
    this.dropArea = page.getByTestId('compare-zone')
    this.zoneHint = page.getByTestId('compare-zone-hint')
    this.clearButton = page.getByTestId('compare-clear')
    this.chips = page.locator(
      '[data-testid^="compare-chip-"]:not([data-testid^="compare-chip-remove-"])',
    )
    this.resultsCard = page.getByTestId('compare-results-card')
    this.charts = page.getByTestId('compare-charts').locator('[data-testid="price-chart"]')
    this.contextMenu = page.getByTestId('compare-context-menu')
    this.contextAddCompare = page.getByTestId('context-add-compare')
    this.contextRemoveWatchlist = page.getByTestId('context-remove-watchlist')
    this.limitModal = page.getByTestId('compare-limit-modal')
    this.limitOk = page.getByTestId('compare-limit-ok')
    this.clearModal = page.getByTestId('compare-clear-modal')
    this.clearCancel = page.getByTestId('compare-clear-cancel')
    this.clearConfirm = page.getByTestId('compare-clear-confirm')
  }

  watchlistItem(symbol: string): Locator {
    return this.page.getByTestId(`${WATCHLIST_ITEM_PREFIX}${symbol}`)
  }

  chip(symbol: string): Locator {
    return this.page.getByTestId(`compare-chip-${symbol}`)
  }

  chipRemove(symbol: string): Locator {
    return this.page.getByTestId(`compare-chip-remove-${symbol}`)
  }

  tab(key: string): Locator {
    return this.page.getByTestId(`compare-tabs-${key}`)
  }

  overviewColumn(symbol: string): Locator {
    return this.page.getByTestId(`compare-col-${symbol}`)
  }

  overviewValue(metric: string, symbol: string): Locator {
    return this.page.getByTestId(`compare-value-${metric}-${symbol}`)
  }

  tooltipBubble(metric: string): Locator {
    return this.page.getByTestId(`compare-tooltip-${metric}-bubble`)
  }

  newsItem(coinId: number, ordinal: number): Locator {
    return this.page.getByTestId(`compare-news-${coinId}-${ordinal}`)
  }

  faqToggle(key: string): Locator {
    return this.page.getByTestId(`compare-faq-toggle-${key}`)
  }

  faqContent(key: string): Locator {
    return this.page.getByTestId(`compare-faq-content-${key}`)
  }

  async open(): Promise<void> {
    await this.goto(routes.compare)
    await expect(this.root).toBeVisible()
    await expect(this.watchlistCard).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.watchlistCard).toBeVisible()
    await expect(this.zoneCard).toBeVisible()
    await expect(this.dropArea).toBeVisible()
  }

  async addByDoubleClick(symbol: string): Promise<void> {
    await this.watchlistItem(symbol).dblclick()
  }

  async addByDragAndDrop(symbol: string): Promise<void> {
    await this.watchlistItem(symbol).dispatchEvent('dragstart')
    await this.dropArea.dispatchEvent('drop')
  }

  async addByContextMenu(symbol: string): Promise<void> {
    await this.watchlistItem(symbol).click({ button: 'right' })
    await expect(this.contextMenu).toBeVisible()
    await this.contextAddCompare.click()
    await expect(this.contextMenu).toBeHidden()
  }

  async reorderByDrag(fromSymbol: string, toSymbol: string): Promise<void> {
    await this.watchlistItem(fromSymbol).dispatchEvent('dragstart')
    await this.watchlistItem(toSymbol).dispatchEvent('drop')
  }

  async removeFromWatchlistViaMenu(symbol: string): Promise<void> {
    await this.watchlistItem(symbol).click({ button: 'right' })
    await this.contextRemoveWatchlist.click()
    await expect(this.watchlistItem(symbol)).toBeHidden()
  }

  async removeChip(symbol: string): Promise<void> {
    await this.chipRemove(symbol).click()
  }

  async closeLimitModal(): Promise<void> {
    await this.limitOk.click()
    await expect(this.limitModal).toBeHidden()
  }

  async openClearModal(): Promise<void> {
    await this.clearButton.click()
    await expect(this.clearModal).toBeVisible()
  }

  async cancelClear(): Promise<void> {
    await this.clearCancel.click()
    await expect(this.clearModal).toBeHidden()
  }

  async confirmClear(): Promise<void> {
    await this.clearConfirm.click()
    await expect(this.clearModal).toBeHidden()
  }

  async selectTab(key: string): Promise<void> {
    await this.tab(key).click()
  }

  async toggleFaq(key: string): Promise<void> {
    await this.faqToggle(key).click()
  }

  async verifyWatchlistCoin(symbol: string): Promise<void> {
    await expect(this.watchlistItem(symbol)).toBeVisible()
  }

  async verifyWatchlistCount(count: number): Promise<void> {
    await expect(this.watchlistItems).toHaveCount(count)
  }

  async verifyWatchlistOrder(symbols: string[]): Promise<void> {
    await expect
      .poll(() =>
        this.watchlistItems.evaluateAll(
          (items, prefix) =>
            items.map(item => item.getAttribute('data-testid')?.replace(prefix, '')),
          WATCHLIST_ITEM_PREFIX,
        ),
      )
      .toEqual(symbols)
  }

  async verifyZoneEmpty(): Promise<void> {
    await expect(this.zoneHint).toBeVisible()
    await expect(this.chips).toHaveCount(0)
  }

  async verifyChip(symbol: string): Promise<void> {
    await expect(this.chip(symbol)).toBeVisible()
  }

  async verifyNoChip(symbol: string): Promise<void> {
    await expect(this.chip(symbol)).toBeHidden()
  }

  async verifyChipCount(count: number): Promise<void> {
    await expect(this.chips).toHaveCount(count)
  }

  async verifyLimitModalShown(): Promise<void> {
    await expect(this.limitModal).toBeVisible()
  }

  async verifyResultsShown(): Promise<void> {
    await expect(this.resultsCard).toBeVisible()
  }

  async verifyResultsHidden(): Promise<void> {
    await expect(this.resultsCard).toBeHidden()
  }

  async verifyOverviewColumn(symbol: string, coinName: string): Promise<void> {
    await expect(this.overviewColumn(symbol)).toContainText(coinName)
  }

  async verifyOverviewValue(metric: string, symbol: string, expected: string): Promise<void> {
    await expect(this.overviewValue(metric, symbol)).toContainText(expected)
  }

  async verifyMetricTooltip(metric: string, text: string): Promise<void> {
    await expect(this.tooltipBubble(metric)).toContainText(text)
  }

  async verifyChartCount(count: number): Promise<void> {
    await expect(this.charts).toHaveCount(count)
  }

  async verifyNewsHeadline(coinId: number, ordinal: number, headline: string): Promise<void> {
    await expect(this.newsItem(coinId, ordinal)).toContainText(headline)
  }

  async verifyFaqAnswerShown(key: string, textFragment: string): Promise<void> {
    await expect(this.faqContent(key)).toContainText(textFragment)
  }

  async verifyFaqAnswerHidden(key: string): Promise<void> {
    await expect(this.faqContent(key)).toBeHidden()
  }
}
