import { comparePage } from '../pages/compare/compare-page'

export function action_openCompare() {
  cy.log('Open the compare page')

  comparePage.visit()
}

export function check_compareShellReady() {
  cy.log('Verify the compare page shell is rendered')

  comparePage.verifyShellReady()
}

export function action_addCoinByDoubleClick(symbol: string) {
  cy.log(`Add coin ${symbol} to the compare zone by double-click`)

  comparePage.addByDoubleClick(symbol)
}

export function action_addCoinByDragAndDrop(symbol: string) {
  cy.log(`Drag coin ${symbol} from the watchlist into the compare zone`)

  comparePage.addByDragAndDrop(symbol)
}

export function action_addCoinByContextMenu(symbol: string) {
  cy.log(`Add coin ${symbol} to the compare zone via the right-click menu`)

  comparePage.addByContextMenu(symbol)
}

export function action_removeComparedCoin(symbol: string) {
  cy.log(`Remove coin ${symbol} from the compare zone`)

  comparePage.removeChip(symbol)
}

export function action_reorderWatchlist(fromSymbol: string, toSymbol: string) {
  cy.log(`Drag coin ${fromSymbol} onto ${toSymbol} to reorder the watchlist`)

  comparePage.reorderByDrag(fromSymbol, toSymbol)
}

export function action_removeCoinFromWatchlist(symbol: string) {
  cy.log(`Remove coin ${symbol} from the watchlist via the right-click menu`)

  comparePage.removeFromWatchlistViaMenu(symbol)
}

export function action_dismissLimitModal() {
  cy.log('Dismiss the compare limit modal')

  comparePage.closeLimitModal()
}

export function action_cancelClearComparison() {
  cy.log('Open the clear confirmation and cancel it')

  comparePage.openClearModal()
  comparePage.cancelClear()
}

export function action_clearComparison() {
  cy.log('Clear the compare zone via the confirmation modal')

  comparePage.openClearModal()
  comparePage.confirmClear()
}

export function action_selectCompareTab(key: string) {
  cy.log(`Switch the compare results to the ${key} tab`)

  comparePage.selectTab(key)
}

export function action_toggleFaqItem(key: string) {
  cy.log(`Toggle the FAQ accordion item: ${key}`)

  comparePage.toggleFaq(key)
}

export function check_watchlistShowsCoins(symbols: string[]) {
  cy.log(`Verify the watchlist shows coins: ${symbols.join(', ')}`)

  comparePage.verifyWatchlistCount(symbols.length)
  symbols.forEach(symbol => comparePage.verifyWatchlistCoin(symbol))
}

export function check_watchlistOrder(symbols: string[]) {
  cy.log(`Verify the watchlist order is: ${symbols.join(', ')}`)

  comparePage.verifyWatchlistOrder(symbols)
}

export function check_compareZoneEmpty() {
  cy.log('Verify the compare zone is empty and shows the drop hint')

  comparePage.verifyZoneEmpty()
  comparePage.verifyResultsHidden()
}

export function check_comparedCoins(symbols: string[]) {
  cy.log(`Verify the compare zone holds: ${symbols.join(', ')}`)

  comparePage.verifyChipCount(symbols.length)
  symbols.forEach(symbol => comparePage.verifyChip(symbol))
}

export function check_coinNotCompared(symbol: string) {
  cy.log(`Verify coin ${symbol} is not in the compare zone`)

  comparePage.verifyNoChip(symbol)
}

export function check_limitModalShown() {
  cy.log('Verify the compare limit modal is shown')

  comparePage.verifyLimitModalShown()
}

export function check_resultsShown() {
  cy.log('Verify the compare results card is shown')

  comparePage.verifyResultsShown()
}

export function check_overviewColumn(symbol: string, coinName: string) {
  cy.log(`Verify the overview table has a column for ${coinName}`)

  comparePage.verifyOverviewColumn(symbol, coinName)
}

export function check_overviewValue(metric: string, symbol: string, expected: string) {
  cy.log(`Verify overview metric ${metric} for ${symbol} is: ${expected}`)

  comparePage.verifyOverviewValue(metric, symbol, expected)
}

export function check_metricTooltip(metric: string, text: string) {
  cy.log(`Verify the tooltip for metric ${metric}`)

  comparePage.verifyMetricTooltip(metric, text)
}

export function check_chartsRendered(count: number) {
  cy.log(`Verify the chart tab renders ${count} price charts`)

  comparePage.verifyChartCount(count)
}

export function check_newsHeadline(coinId: number, ordinal: number, headline: string) {
  cy.log(`Verify news headline ${ordinal} for coin id ${coinId}`)

  comparePage.verifyNewsHeadline(coinId, ordinal, headline)
}

export function check_faqAnswerShown(key: string, textFragment: string) {
  cy.log(`Verify the FAQ answer for ${key} is expanded`)

  comparePage.verifyFaqAnswerShown(key, textFragment)
}

export function check_faqAnswerHidden(key: string) {
  cy.log(`Verify the FAQ answer for ${key} is collapsed`)

  comparePage.verifyFaqAnswerHidden(key)
}
