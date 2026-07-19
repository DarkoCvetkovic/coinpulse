import { users } from '../../support/constants/users'
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
} from '../../support/keywords/dynamic.keywords'

describe('Dynamic elements', { tags: ['@dynamic'] }, () => {
  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.standard)
    action_openDynamic()
  })

  it('advances the live price ticker for the top coin', () => {
    const topSymbol = 'BTC'

    check_tickerAdvances(topSymbol)
  })

  it('enables the delayed button after the countdown and confirms the click', () => {
    check_delayedButtonEnablesAndClicks()
  })

  it('renders the embedded chart inside the iframe', () => {
    const iframeTitle = 'Embedded BTC chart'

    check_iframeChartRenders(iframeTitle)
  })

  it('exposes the Fear and Greed value inside the shadow DOM', () => {
    const fearAndGreedValue = '61'

    check_shadowWidgetValue(fearAndGreedValue)
  })

  it('starts the lazy list with the first batch only', () => {
    const firstBatch = 5

    check_lazyListStartsWithOneBatch(firstBatch)
  })

  it('loads more coins when scrolling to the bottom', () => {
    const totalAfterFirstScroll = 10

    check_lazyListLoadsMore(totalAfterFirstScroll)
  })

  it('eventually lazy-loads every seeded coin', () => {
    const totalCoins = 20
    const batchSize = 5

    check_lazyListLoadsAllCoins(totalCoins, batchSize)
  })

  it('points the external link to a new browser tab', () => {
    const bitcoinUrl = 'https://bitcoin.org'

    check_externalLinkOpensNewTab(bitcoinUrl)
  })
})
