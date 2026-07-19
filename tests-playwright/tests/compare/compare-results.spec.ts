import { seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_addCoinByDoubleClick,
  action_openCompare,
  action_selectCompareTab,
  action_toggleFaqItem,
  check_chartsRendered,
  check_faqAnswerHidden,
  check_faqAnswerShown,
  check_metricTooltip,
  check_newsHeadline,
  check_overviewColumn,
  check_overviewValue,
  check_resultsShown,
} from '../../src/keywords/compare.keywords'
import { action_resetBackend } from '../../src/keywords/seed.keywords'

test.describe('Compare results', { tag: '@compare' }, () => {
  const btc = seedCoins.btc
  const eth = seedCoins.eth

  test.beforeEach(async ({ api, comparePage }) => {
    await action_resetBackend(api)
    await action_openCompare(comparePage)
    await action_addCoinByDoubleClick(comparePage, btc.symbol)
    await action_addCoinByDoubleClick(comparePage, eth.symbol)
    await check_resultsShown(comparePage)
  })

  test('shows seeded metrics for the compared coins in the overview table', async ({
    comparePage,
  }) => {
    await check_overviewColumn(comparePage, btc.symbol, btc.name)
    await check_overviewColumn(comparePage, eth.symbol, eth.name)
    await check_overviewValue(comparePage, 'price', btc.symbol, btc.price)
    await check_overviewValue(comparePage, 'change24h', btc.symbol, btc.change24h)
    await check_overviewValue(comparePage, 'rank', btc.symbol, btc.rank)
    await check_overviewValue(comparePage, 'category', btc.symbol, btc.category)
    await check_overviewValue(comparePage, 'launchDate', btc.symbol, btc.launchDate)
    await check_overviewValue(comparePage, 'price', eth.symbol, eth.price)
  })

  test('explains the price metric through its tooltip', async ({ comparePage }) => {
    const priceTooltip = 'Current market price in USD (seed data).'

    await check_metricTooltip(comparePage, 'price', priceTooltip)
  })

  test('renders one price chart per compared coin on the chart tab', async ({ comparePage }) => {
    const comparedCount = 2

    await action_selectCompareTab(comparePage, 'chart')
    await check_chartsRendered(comparePage, comparedCount)
  })

  test('lists deterministic headlines on the news tab', async ({ comparePage }) => {
    const btcHeadline = `${btc.name} climbs 2.45% in 24 hours`
    const btcSecondHeadline = `What ${btc.symbol} holders should know about the ${btc.category} sector`

    await action_selectCompareTab(comparePage, 'news')
    await check_newsHeadline(comparePage, btc.id, 1, btcHeadline)
    await check_newsHeadline(comparePage, btc.id, 2, btcSecondHeadline)
  })

  test('expands and collapses an FAQ answer', async ({ comparePage }) => {
    const faqKey = 'real'
    const faqFragment = 'QA portfolio demo'

    await check_faqAnswerHidden(comparePage, faqKey)
    await action_toggleFaqItem(comparePage, faqKey)
    await check_faqAnswerShown(comparePage, faqKey, faqFragment)
    await action_toggleFaqItem(comparePage, faqKey)
    await check_faqAnswerHidden(comparePage, faqKey)
  })
})
