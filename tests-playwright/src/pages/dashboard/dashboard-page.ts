import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

/** Page object for the portfolio dashboard: stat cards, price chart, top movers. */
export class DashboardPage extends BasePage {
  readonly root: Locator
  readonly portfolioValue: Locator
  readonly change24h: Locator
  readonly watchlist: Locator
  readonly watchlistValue: Locator
  readonly transactions: Locator
  readonly transactionsValue: Locator
  readonly chartCard: Locator
  readonly gainers: Locator
  readonly losers: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('dashboard-page')
    this.portfolioValue = page.getByTestId('stat-portfolio-value')
    this.change24h = page.getByTestId('stat-24h-change')
    this.watchlist = page.getByTestId('stat-watchlist')
    this.watchlistValue = page.getByTestId('stat-watchlist-value')
    this.transactions = page.getByTestId('stat-transactions')
    this.transactionsValue = page.getByTestId('stat-transactions-value')
    this.chartCard = page.getByTestId('dashboard-chart-card')
    this.gainers = page.getByTestId('top-gainers')
    this.losers = page.getByTestId('top-losers')
  }

  async open(): Promise<void> {
    await this.goto(routes.dashboard)
    await expect(this.root).toBeVisible()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.portfolioValue).toBeVisible()
    await expect(this.change24h).toBeVisible()
    await expect(this.watchlist).toBeVisible()
    await expect(this.transactions).toBeVisible()
    await expect(this.chartCard).toBeVisible()
    await expect(this.gainers).toBeVisible()
    await expect(this.losers).toBeVisible()
  }

  async verifyTransactionsCount(count: number): Promise<void> {
    await expect(this.transactionsValue).toHaveText(String(count))
  }

  async verifyWatchlistCount(count: number): Promise<void> {
    await expect(this.watchlistValue).toHaveText(String(count))
  }
}
