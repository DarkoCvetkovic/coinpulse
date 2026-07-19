import { expect, type Locator, type Page } from '@playwright/test'
import { routes } from '../../constants/routes'
import { BasePage } from '../base-page'

const STAR_ON_CLASS = /markets__star--on/

/** Page object for the markets page: coins table, search, filters, admin actions. */
export class MarketsPage extends BasePage {
  readonly root: Locator
  readonly table: Locator
  readonly search: Locator
  readonly filterCategory: Locator
  readonly filterStatus: Locator
  readonly pageSize: Locator
  readonly empty: Locator
  readonly addButton: Locator
  readonly pagination: Locator
  readonly paginationNext: Locator
  readonly deleteModal: Locator
  readonly deleteCancel: Locator
  readonly deleteConfirm: Locator

  constructor(page: Page) {
    super(page)
    this.root = page.getByTestId('markets-page')
    this.table = page.getByTestId('markets-table')
    this.search = page.getByTestId('markets-search')
    this.filterCategory = page.getByTestId('markets-filter-category')
    this.filterStatus = page.getByTestId('markets-filter-status')
    this.pageSize = page.getByTestId('markets-page-size')
    this.empty = page.getByTestId('markets-empty')
    this.addButton = page.getByTestId('coin-add-button')
    this.pagination = page.getByTestId('pagination')
    this.paginationNext = page.getByTestId('pagination-next')
    this.deleteModal = page.getByTestId('coin-delete-modal')
    this.deleteCancel = page.getByTestId('coin-delete-cancel')
    this.deleteConfirm = page.getByTestId('coin-delete-confirm')
  }

  row(symbol: string): Locator {
    return this.page.getByTestId(`markets-row-${symbol}`)
  }

  sortHeader(column: string): Locator {
    return this.page.getByTestId(`markets-sort-${column}`)
  }

  watchlistToggle(symbol: string): Locator {
    return this.page.getByTestId(`watchlist-toggle-${symbol}`)
  }

  editButton(symbol: string): Locator {
    return this.page.getByTestId(`coin-edit-${symbol}`)
  }

  deleteButton(symbol: string): Locator {
    return this.page.getByTestId(`coin-delete-${symbol}`)
  }

  async open(): Promise<void> {
    await this.goto(routes.markets)
    await expect(this.root).toBeVisible()
    await expect(this.table).toBeVisible()
  }

  async searchFor(term: string): Promise<void> {
    await this.search.fill(term)
  }

  async filterByCategory(category: string): Promise<void> {
    await this.filterCategory.selectOption(category)
  }

  async filterByStatus(status: string): Promise<void> {
    await this.filterStatus.selectOption(status)
  }

  async setPageSize(size: string): Promise<void> {
    await this.pageSize.selectOption(size)
  }

  async sortBy(column: string): Promise<void> {
    await this.sortHeader(column).click()
  }

  async goToNextPage(): Promise<void> {
    await this.paginationNext.click()
  }

  async toggleWatchlist(symbol: string): Promise<void> {
    await this.watchlistToggle(symbol).click()
  }

  async openDeleteModal(symbol: string): Promise<void> {
    await this.deleteButton(symbol).click()
    await expect(this.deleteModal).toBeVisible()
  }

  async cancelDelete(): Promise<void> {
    await this.deleteCancel.click()
    await expect(this.deleteModal).toBeHidden()
  }

  async confirmDelete(): Promise<void> {
    await this.deleteConfirm.click()
    await expect(this.deleteModal).toBeHidden()
  }

  async verifyShellReady(): Promise<void> {
    await expect(this.table).toBeVisible()
    await expect(this.search).toBeVisible()
    await expect(this.filterCategory).toBeVisible()
    await expect(this.filterStatus).toBeVisible()
  }

  async verifyFirstRow(symbol: string): Promise<void> {
    await expect(this.table.locator('tbody tr').first()).toHaveAttribute(
      'data-testid',
      `markets-row-${symbol}`,
    )
  }

  async verifySortIndicator(column: string, direction: 'asc' | 'desc'): Promise<void> {
    await expect(this.sortHeader(column)).toContainText(direction === 'asc' ? '▲' : '▼')
  }

  async verifyRowVisible(symbol: string): Promise<void> {
    await expect(this.row(symbol)).toBeVisible()
  }

  async verifyRowAbsent(symbol: string): Promise<void> {
    await expect(this.row(symbol)).toBeHidden()
  }

  async verifyEmptyState(): Promise<void> {
    await expect(this.empty).toBeVisible()
  }

  async verifyPaginationVisible(): Promise<void> {
    await expect(this.pagination).toBeVisible()
  }

  async verifyWatchlistStarOn(symbol: string): Promise<void> {
    await expect(this.watchlistToggle(symbol)).toHaveClass(STAR_ON_CLASS)
  }

  async verifyWatchlistStarOff(symbol: string): Promise<void> {
    await expect(this.watchlistToggle(symbol)).not.toHaveClass(STAR_ON_CLASS)
  }

  async verifyAdminActionsVisible(symbol: string): Promise<void> {
    await expect(this.addButton).toBeVisible()
    await expect(this.editButton(symbol)).toBeVisible()
    await expect(this.deleteButton(symbol)).toBeVisible()
  }

  async verifyAdminActionsAbsent(symbol: string): Promise<void> {
    await expect(this.addButton).toBeHidden()
    await expect(this.editButton(symbol)).toBeHidden()
    await expect(this.deleteButton(symbol)).toBeHidden()
  }
}
