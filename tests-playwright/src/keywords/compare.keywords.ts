import { test } from '../fixtures/fixtures'
import type { ComparePage } from '../pages/compare/compare-page'

export async function action_openCompare(comparePage: ComparePage): Promise<void> {
  await test.step('Open the compare page', async () => {
    await comparePage.open()
  })
}

export async function check_compareShellReady(comparePage: ComparePage): Promise<void> {
  await test.step('Verify the compare page shell is rendered', async () => {
    await comparePage.verifyShellReady()
  })
}

export async function action_addCoinByDoubleClick(
  comparePage: ComparePage,
  symbol: string,
): Promise<void> {
  await test.step(`Add coin ${symbol} to the compare zone by double-click`, async () => {
    await comparePage.addByDoubleClick(symbol)
  })
}

export async function action_addCoinByDragAndDrop(
  comparePage: ComparePage,
  symbol: string,
): Promise<void> {
  await test.step(`Drag coin ${symbol} from the watchlist into the compare zone`, async () => {
    await comparePage.addByDragAndDrop(symbol)
  })
}

export async function action_addCoinByContextMenu(
  comparePage: ComparePage,
  symbol: string,
): Promise<void> {
  await test.step(`Add coin ${symbol} to the compare zone via the right-click menu`, async () => {
    await comparePage.addByContextMenu(symbol)
  })
}

export async function action_removeComparedCoin(
  comparePage: ComparePage,
  symbol: string,
): Promise<void> {
  await test.step(`Remove coin ${symbol} from the compare zone`, async () => {
    await comparePage.removeChip(symbol)
  })
}

export async function action_reorderWatchlist(
  comparePage: ComparePage,
  fromSymbol: string,
  toSymbol: string,
): Promise<void> {
  await test.step(`Drag coin ${fromSymbol} onto ${toSymbol} to reorder the watchlist`, async () => {
    await comparePage.reorderByDrag(fromSymbol, toSymbol)
  })
}

export async function action_removeCoinFromWatchlist(
  comparePage: ComparePage,
  symbol: string,
): Promise<void> {
  await test.step(`Remove coin ${symbol} from the watchlist via the right-click menu`, async () => {
    await comparePage.removeFromWatchlistViaMenu(symbol)
  })
}

export async function action_dismissLimitModal(comparePage: ComparePage): Promise<void> {
  await test.step('Dismiss the compare limit modal', async () => {
    await comparePage.closeLimitModal()
  })
}

export async function action_cancelClearComparison(comparePage: ComparePage): Promise<void> {
  await test.step('Open the clear confirmation and cancel it', async () => {
    await comparePage.openClearModal()
    await comparePage.cancelClear()
  })
}

export async function action_clearComparison(comparePage: ComparePage): Promise<void> {
  await test.step('Clear the compare zone via the confirmation modal', async () => {
    await comparePage.openClearModal()
    await comparePage.confirmClear()
  })
}

export async function action_selectCompareTab(
  comparePage: ComparePage,
  key: string,
): Promise<void> {
  await test.step(`Switch the compare results to the ${key} tab`, async () => {
    await comparePage.selectTab(key)
  })
}

export async function action_toggleFaqItem(comparePage: ComparePage, key: string): Promise<void> {
  await test.step(`Toggle the FAQ accordion item: ${key}`, async () => {
    await comparePage.toggleFaq(key)
  })
}

export async function check_watchlistShowsCoins(
  comparePage: ComparePage,
  symbols: string[],
): Promise<void> {
  await test.step(`Verify the watchlist shows coins: ${symbols.join(', ')}`, async () => {
    await comparePage.verifyWatchlistCount(symbols.length)
    for (const symbol of symbols) {
      await comparePage.verifyWatchlistCoin(symbol)
    }
  })
}

export async function check_watchlistOrder(
  comparePage: ComparePage,
  symbols: string[],
): Promise<void> {
  await test.step(`Verify the watchlist order is: ${symbols.join(', ')}`, async () => {
    await comparePage.verifyWatchlistOrder(symbols)
  })
}

export async function check_compareZoneEmpty(comparePage: ComparePage): Promise<void> {
  await test.step('Verify the compare zone is empty and shows the drop hint', async () => {
    await comparePage.verifyZoneEmpty()
    await comparePage.verifyResultsHidden()
  })
}

export async function check_comparedCoins(
  comparePage: ComparePage,
  symbols: string[],
): Promise<void> {
  await test.step(`Verify the compare zone holds: ${symbols.join(', ')}`, async () => {
    await comparePage.verifyChipCount(symbols.length)
    for (const symbol of symbols) {
      await comparePage.verifyChip(symbol)
    }
  })
}

export async function check_coinNotCompared(
  comparePage: ComparePage,
  symbol: string,
): Promise<void> {
  await test.step(`Verify coin ${symbol} is not in the compare zone`, async () => {
    await comparePage.verifyNoChip(symbol)
  })
}

export async function check_limitModalShown(comparePage: ComparePage): Promise<void> {
  await test.step('Verify the compare limit modal is shown', async () => {
    await comparePage.verifyLimitModalShown()
  })
}

export async function check_resultsShown(comparePage: ComparePage): Promise<void> {
  await test.step('Verify the compare results card is shown', async () => {
    await comparePage.verifyResultsShown()
  })
}

export async function check_overviewColumn(
  comparePage: ComparePage,
  symbol: string,
  coinName: string,
): Promise<void> {
  await test.step(`Verify the overview table has a column for ${coinName}`, async () => {
    await comparePage.verifyOverviewColumn(symbol, coinName)
  })
}

export async function check_overviewValue(
  comparePage: ComparePage,
  metric: string,
  symbol: string,
  expected: string,
): Promise<void> {
  await test.step(`Verify overview metric ${metric} for ${symbol} is: ${expected}`, async () => {
    await comparePage.verifyOverviewValue(metric, symbol, expected)
  })
}

export async function check_metricTooltip(
  comparePage: ComparePage,
  metric: string,
  text: string,
): Promise<void> {
  await test.step(`Verify the tooltip for metric ${metric}`, async () => {
    await comparePage.verifyMetricTooltip(metric, text)
  })
}

export async function check_chartsRendered(comparePage: ComparePage, count: number): Promise<void> {
  await test.step(`Verify the chart tab renders ${count} price charts`, async () => {
    await comparePage.verifyChartCount(count)
  })
}

export async function check_newsHeadline(
  comparePage: ComparePage,
  coinId: number,
  ordinal: number,
  headline: string,
): Promise<void> {
  await test.step(`Verify news headline ${ordinal} for coin id ${coinId}`, async () => {
    await comparePage.verifyNewsHeadline(coinId, ordinal, headline)
  })
}

export async function check_faqAnswerShown(
  comparePage: ComparePage,
  key: string,
  textFragment: string,
): Promise<void> {
  await test.step(`Verify the FAQ answer for ${key} is expanded`, async () => {
    await comparePage.verifyFaqAnswerShown(key, textFragment)
  })
}

export async function check_faqAnswerHidden(comparePage: ComparePage, key: string): Promise<void> {
  await test.step(`Verify the FAQ answer for ${key} is collapsed`, async () => {
    await comparePage.verifyFaqAnswerHidden(key)
  })
}
