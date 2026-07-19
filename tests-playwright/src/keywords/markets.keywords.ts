import { test } from '../fixtures/fixtures'
import type { MarketsPage } from '../pages/markets/markets-page'

export async function action_openMarkets(marketsPage: MarketsPage): Promise<void> {
  await test.step('Open the markets page', async () => {
    await marketsPage.open()
  })
}

export async function action_searchCoins(marketsPage: MarketsPage, term: string): Promise<void> {
  await test.step(`Search the markets table for: ${term}`, async () => {
    await marketsPage.searchFor(term)
  })
}

export async function action_filterByStatus(
  marketsPage: MarketsPage,
  status: string,
): Promise<void> {
  await test.step(`Filter markets by status: ${status}`, async () => {
    await marketsPage.filterByStatus(status)
  })
}

export async function action_filterByCategory(
  marketsPage: MarketsPage,
  category: string,
): Promise<void> {
  await test.step(`Filter markets by category: ${category}`, async () => {
    await marketsPage.filterByCategory(category)
  })
}

export async function action_setPageSize(marketsPage: MarketsPage, size: string): Promise<void> {
  await test.step(`Set the markets page size to: ${size}`, async () => {
    await marketsPage.setPageSize(size)
  })
}

export async function action_sortBy(marketsPage: MarketsPage, column: string): Promise<void> {
  await test.step(`Sort the markets table by column: ${column}`, async () => {
    await marketsPage.sortBy(column)
  })
}

export async function action_goToNextMarketsPage(marketsPage: MarketsPage): Promise<void> {
  await test.step('Go to the next markets page', async () => {
    await marketsPage.goToNextPage()
  })
}

export async function action_toggleWatchlist(
  marketsPage: MarketsPage,
  symbol: string,
): Promise<void> {
  await test.step(`Toggle the watchlist star for coin: ${symbol}`, async () => {
    await marketsPage.toggleWatchlist(symbol)
  })
}

export async function action_cancelDeleteCoin(
  marketsPage: MarketsPage,
  symbol: string,
): Promise<void> {
  await test.step(`Open and cancel the delete confirmation for coin: ${symbol}`, async () => {
    await marketsPage.openDeleteModal(symbol)
    await marketsPage.cancelDelete()
  })
}

export async function action_deleteCoin(marketsPage: MarketsPage, symbol: string): Promise<void> {
  await test.step(`Delete coin ${symbol} via the confirmation modal`, async () => {
    await marketsPage.openDeleteModal(symbol)
    await marketsPage.confirmDelete()
  })
}

export async function check_marketsShellReady(marketsPage: MarketsPage): Promise<void> {
  await test.step('Verify the markets table, search and filters render', async () => {
    await marketsPage.verifyShellReady()
  })
}

export async function check_coinRowVisible(
  marketsPage: MarketsPage,
  symbol: string,
): Promise<void> {
  await test.step(`Verify the row for coin ${symbol} is visible`, async () => {
    await marketsPage.verifyRowVisible(symbol)
  })
}

export async function check_coinRowAbsent(marketsPage: MarketsPage, symbol: string): Promise<void> {
  await test.step(`Verify the row for coin ${symbol} is absent`, async () => {
    await marketsPage.verifyRowAbsent(symbol)
  })
}

export async function check_marketsEmptyState(marketsPage: MarketsPage): Promise<void> {
  await test.step('Verify the markets empty state is shown', async () => {
    await marketsPage.verifyEmptyState()
  })
}

export async function check_firstCoinRow(marketsPage: MarketsPage, symbol: string): Promise<void> {
  await test.step(`Verify the first row is coin: ${symbol}`, async () => {
    await marketsPage.verifyFirstRow(symbol)
  })
}

export async function check_sortIndicator(
  marketsPage: MarketsPage,
  column: string,
  direction: 'asc' | 'desc',
): Promise<void> {
  await test.step(`Verify the ${column} column sorts ${direction}`, async () => {
    await marketsPage.verifySortIndicator(column, direction)
  })
}

export async function check_paginationVisible(marketsPage: MarketsPage): Promise<void> {
  await test.step('Verify the pagination controls are visible', async () => {
    await marketsPage.verifyPaginationVisible()
  })
}

export async function check_watchlistStarOn(
  marketsPage: MarketsPage,
  symbol: string,
): Promise<void> {
  await test.step(`Verify coin ${symbol} is starred`, async () => {
    await marketsPage.verifyWatchlistStarOn(symbol)
  })
}

export async function check_watchlistStarOff(
  marketsPage: MarketsPage,
  symbol: string,
): Promise<void> {
  await test.step(`Verify coin ${symbol} is not starred`, async () => {
    await marketsPage.verifyWatchlistStarOff(symbol)
  })
}

export async function check_adminControlsVisible(
  marketsPage: MarketsPage,
  symbol: string,
): Promise<void> {
  await test.step(`Verify admin controls are visible for coin: ${symbol}`, async () => {
    await marketsPage.verifyAdminActionsVisible(symbol)
  })
}

export async function check_adminControlsAbsent(
  marketsPage: MarketsPage,
  symbol: string,
): Promise<void> {
  await test.step(`Verify admin controls are absent for coin: ${symbol}`, async () => {
    await marketsPage.verifyAdminActionsAbsent(symbol)
  })
}
