import { routes } from '../constants/routes'
import { marketsPage } from '../pages/markets/markets-page'

export function action_openMarkets() {
  cy.log('Open the markets page')

  marketsPage.visit()
}

export function action_searchCoins(term: string) {
  cy.log(`Search the markets table for: ${term}`)

  marketsPage.search(term)
}

export function action_filterByCategory(category: string) {
  cy.log(`Filter markets by category: ${category}`)

  marketsPage.filterByCategory(category)
}

export function action_filterByStatus(status: string) {
  cy.log(`Filter markets by status: ${status}`)

  marketsPage.filterByStatus(status)
}

export function action_setPageSize(size: string) {
  cy.log(`Set the markets page size to: ${size}`)

  marketsPage.setPageSize(size)
}

export function action_sortBy(column: string) {
  cy.log(`Sort the markets table by column: ${column}`)

  marketsPage.sortBy(column)
}

export function action_goToNextMarketsPage() {
  cy.log('Go to the next markets page')

  marketsPage.goToNextPage()
}

export function action_toggleWatchlist(symbol: string) {
  cy.log(`Toggle the watchlist star for coin: ${symbol}`)

  marketsPage.toggleWatchlist(symbol)
}

export function action_cancelDeleteCoin(symbol: string) {
  cy.log(`Open and cancel the delete confirmation for coin: ${symbol}`)

  marketsPage.openDeleteModal(symbol)
  marketsPage.cancelDelete()
}

export function action_deleteCoin(symbol: string) {
  cy.log(`Delete coin ${symbol} via the confirmation modal`)

  marketsPage.openDeleteModal(symbol)
  marketsPage.confirmDelete()
}

export function check_marketsShellReady() {
  cy.log('Verify the markets table, search and filters render')

  marketsPage.verifyShellReady()
}

export function check_landedOnMarkets() {
  cy.log('Verify navigation to the markets page')

  cy.location('pathname').should('eq', routes.markets)
}

export function check_firstCoinRow(symbol: string) {
  cy.log(`Verify the first market row is coin: ${symbol}`)

  marketsPage.verifyFirstRow(symbol)
}

export function check_sortIndicator(column: string, direction: 'asc' | 'desc') {
  cy.log(`Verify the ${column} column shows the ${direction} sort indicator`)

  marketsPage.verifySortIndicator(column, direction)
}

export function check_coinRowVisible(symbol: string) {
  cy.log(`Verify the market row for coin ${symbol} is visible`)

  marketsPage.verifyRowVisible(symbol)
}

export function check_coinRowAbsent(symbol: string) {
  cy.log(`Verify there is no market row for coin: ${symbol}`)

  marketsPage.verifyRowAbsent(symbol)
}

export function check_marketsEmptyState() {
  cy.log('Verify the markets empty state is shown')

  marketsPage.verifyEmptyState()
}

export function check_totalCoinCount(count: number) {
  cy.log(`Verify the markets total shows ${count} coins`)

  marketsPage.verifyTotalCount(count)
}

export function check_paginationVisible() {
  cy.log('Verify the markets pagination control is visible')

  marketsPage.verifyPaginationVisible()
}

export function check_watchlistStarOn(symbol: string) {
  cy.log(`Verify coin ${symbol} is starred in the watchlist`)

  marketsPage.verifyWatchlistStarOn(symbol)
}

export function check_watchlistStarOff(symbol: string) {
  cy.log(`Verify coin ${symbol} is not starred in the watchlist`)

  marketsPage.verifyWatchlistStarOff(symbol)
}

export function check_adminControlsVisible(symbol: string) {
  cy.log(`Verify admin add, edit and delete controls are visible for coin: ${symbol}`)

  marketsPage.verifyAddButtonVisible()
  marketsPage.verifyAdminActionsVisible(symbol)
}

export function check_adminControlsAbsent(symbol: string) {
  cy.log(`Verify admin controls are hidden for a standard user, coin: ${symbol}`)

  marketsPage.verifyAddButtonAbsent()
  marketsPage.verifyAdminActionsAbsent(symbol)
}
