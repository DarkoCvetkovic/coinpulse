import { seedCoinCount, seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openDynamic,
  check_delayedButtonEnablesAndClicks,
  check_externalLinkOpensNewTab,
  check_iframeChartRenders,
  check_lazyListLoadsAllCoins,
  check_lazyListLoadsMore,
  check_lazyListStartsWithOneBatch,
  check_shadowWidgetValue,
  check_tickerAdvances,
} from '../../src/keywords/dynamic.keywords'
import { action_resetBackend } from '../../src/keywords/seed.keywords'

test.describe('Dynamic elements', { tag: '@dynamic' }, () => {
  test.beforeEach(async ({ api, dynamicPage }) => {
    await action_resetBackend(api)
    await action_openDynamic(dynamicPage)
  })

  test('advances the live price ticker for the top coin', async ({ dynamicPage }) => {
    const topSymbol = seedCoins.btc.symbol

    await check_tickerAdvances(dynamicPage, topSymbol)
  })

  test('enables the delayed button after the countdown and confirms the click', async ({
    dynamicPage,
  }) => {
    await check_delayedButtonEnablesAndClicks(dynamicPage)
  })

  test('renders the embedded chart inside the iframe', async ({ dynamicPage }) => {
    const iframeTitle = 'Embedded BTC chart'

    await check_iframeChartRenders(dynamicPage, iframeTitle)
  })

  test('exposes the Fear and Greed value inside the shadow DOM', async ({ dynamicPage }) => {
    const fearAndGreedValue = '61'

    await check_shadowWidgetValue(dynamicPage, fearAndGreedValue)
  })

  test('starts the lazy list with the first batch only', async ({ dynamicPage }) => {
    const firstBatch = 5

    await check_lazyListStartsWithOneBatch(dynamicPage, firstBatch)
  })

  test('loads more coins when scrolling to the bottom', async ({ dynamicPage }) => {
    const totalAfterFirstScroll = 10

    await check_lazyListLoadsMore(dynamicPage, totalAfterFirstScroll)
  })

  test('eventually lazy-loads every seeded coin', async ({ dynamicPage }) => {
    const totalCoins = seedCoinCount
    const batchSize = 5

    await check_lazyListLoadsAllCoins(dynamicPage, totalCoins, batchSize)
  })

  test('points the external link to a new browser tab', async ({ dynamicPage }) => {
    const bitcoinUrl = 'https://bitcoin.org'

    await check_externalLinkOpensNewTab(dynamicPage, bitcoinUrl)
  })
})
