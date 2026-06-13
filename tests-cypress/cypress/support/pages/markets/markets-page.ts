import { routes } from '../../constants/routes'
import { testId } from '../../utils/core/selectors'

export const marketsObj = {
  page: testId('markets-page'),
  total: testId('markets-total'),
  addButton: testId('coin-add-button'),
  search: testId('markets-search'),
  filterCategory: testId('markets-filter-category'),
  filterStatus: testId('markets-filter-status'),
  pageSize: testId('markets-page-size'),
  error: testId('markets-error'),
  table: testId('markets-table'),
  empty: testId('markets-empty'),
  deleteModal: {
    modal: testId('coin-delete-modal'),
    cancel: testId('coin-delete-cancel'),
    confirm: testId('coin-delete-confirm'),
  },
  pagination: {
    nav: testId('pagination'),
    prev: testId('pagination-prev'),
    next: testId('pagination-next'),
  },
  sortHeader: (column: string) => testId(`markets-sort-${column}`),
  row: (symbol: string) => testId(`markets-row-${symbol}`),
  watchlistToggle: (symbol: string) => testId(`watchlist-toggle-${symbol}`),
  editButton: (symbol: string) => testId(`coin-edit-${symbol}`),
  deleteButton: (symbol: string) => testId(`coin-delete-${symbol}`),
  paginationPage: (oneBasedPage: number) => testId(`pagination-page-${oneBasedPage}`),
}

export const marketsPage = {
  visit: () => {
    cy.visit(routes.markets)
    cy.get(marketsObj.page).should('be.visible')
    cy.get(marketsObj.table).should('be.visible')
  },

  search: (term: string) => {
    cy.get(marketsObj.search).clear().type(term)
  },

  filterByCategory: (category: string) => {
    cy.get(marketsObj.filterCategory).select(category)
  },

  filterByStatus: (status: string) => {
    cy.get(marketsObj.filterStatus).select(status)
  },

  setPageSize: (size: string) => {
    cy.get(marketsObj.pageSize).select(size)
  },

  sortBy: (column: string) => {
    cy.get(marketsObj.sortHeader(column)).click()
  },

  goToNextPage: () => {
    cy.get(marketsObj.pagination.next).click()
  },

  toggleWatchlist: (symbol: string) => {
    cy.get(marketsObj.watchlistToggle(symbol)).click()
  },

  openDeleteModal: (symbol: string) => {
    cy.get(marketsObj.deleteButton(symbol)).click()
    cy.get(marketsObj.deleteModal.modal).should('be.visible')
  },

  cancelDelete: () => {
    cy.get(marketsObj.deleteModal.cancel).click()
    cy.get(marketsObj.deleteModal.modal).should('not.exist')
  },

  confirmDelete: () => {
    cy.get(marketsObj.deleteModal.confirm).click()
    cy.get(marketsObj.deleteModal.modal).should('not.exist')
  },

  verifyShellReady: () => {
    cy.get(marketsObj.table).should('be.visible')
    cy.get(marketsObj.search).should('be.visible')
    cy.get(marketsObj.filterCategory).should('be.visible')
  },

  verifyFirstRow: (symbol: string) => {
    cy.get(`${marketsObj.table} tbody tr`)
      .first()
      .should('have.attr', 'data-testid', `markets-row-${symbol}`)
  },

  verifySortIndicator: (column: string, direction: 'asc' | 'desc') => {
    cy.get(marketsObj.sortHeader(column)).should('contain.text', direction === 'asc' ? '▲' : '▼')
  },

  verifyRowVisible: (symbol: string) => {
    cy.get(marketsObj.row(symbol)).should('be.visible')
  },

  verifyRowAbsent: (symbol: string) => {
    cy.get(marketsObj.row(symbol)).should('not.exist')
  },

  verifyEmptyState: () => {
    cy.get(marketsObj.empty).should('be.visible')
  },

  verifyTotalCount: (count: number) => {
    cy.get(marketsObj.total).should('have.text', `${count} coins`)
  },

  verifyPaginationVisible: () => {
    cy.get(marketsObj.pagination.nav).should('be.visible')
  },

  verifyWatchlistStarOn: (symbol: string) => {
    cy.get(marketsObj.watchlistToggle(symbol)).should('have.class', 'markets__star--on')
  },

  verifyWatchlistStarOff: (symbol: string) => {
    cy.get(marketsObj.watchlistToggle(symbol)).should('not.have.class', 'markets__star--on')
  },

  verifyAddButtonVisible: () => {
    cy.get(marketsObj.addButton).should('be.visible')
  },

  verifyAddButtonAbsent: () => {
    cy.get(marketsObj.addButton).should('not.exist')
  },

  verifyAdminActionsVisible: (symbol: string) => {
    cy.get(marketsObj.editButton(symbol)).should('be.visible')
    cy.get(marketsObj.deleteButton(symbol)).should('be.visible')
  },

  verifyAdminActionsAbsent: (symbol: string) => {
    cy.get(marketsObj.editButton(symbol)).should('not.exist')
    cy.get(marketsObj.deleteButton(symbol)).should('not.exist')
  },
}
