import { users } from '../../support/constants/users'
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
} from '../../support/keywords/compare.keywords'

describe('Compare results', { tags: ['@compare'] }, () => {
  const btc = 'BTC'
  const eth = 'ETH'

  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.standard)
    action_openCompare()
    action_addCoinByDoubleClick(btc)
    action_addCoinByDoubleClick(eth)
    check_resultsShown()
  })

  it('shows seeded metrics for the compared coins in the overview table', () => {
    const btcName = 'Bitcoin'
    const ethName = 'Ethereum'
    const btcPrice = '$64,250.00'
    const btcChange = '+2.45%'
    const btcRank = '#1'
    const btcCategory = 'L1'
    const btcLaunchDate = '2009-01-03'
    const ethPrice = '$3,480.50'

    check_overviewColumn(btc, btcName)
    check_overviewColumn(eth, ethName)
    check_overviewValue('price', btc, btcPrice)
    check_overviewValue('change24h', btc, btcChange)
    check_overviewValue('rank', btc, btcRank)
    check_overviewValue('category', btc, btcCategory)
    check_overviewValue('launchDate', btc, btcLaunchDate)
    check_overviewValue('price', eth, ethPrice)
  })

  it('explains the price metric through its tooltip', () => {
    const priceTooltip = 'Current market price in USD (seed data).'

    check_metricTooltip('price', priceTooltip)
  })

  it('renders one price chart per compared coin on the chart tab', () => {
    const comparedCount = 2

    action_selectCompareTab('chart')

    check_chartsRendered(comparedCount)
  })

  it('lists deterministic headlines on the news tab', () => {
    const btcId = 1
    const btcHeadline = 'Bitcoin climbs 2.45% in 24 hours'
    const btcSecondHeadline = 'What BTC holders should know about the L1 sector'

    action_selectCompareTab('news')

    check_newsHeadline(btcId, 1, btcHeadline)
    check_newsHeadline(btcId, 2, btcSecondHeadline)
  })

  it('expands and collapses an FAQ answer', () => {
    const faqKey = 'real'
    const faqFragment = 'QA portfolio demo'

    check_faqAnswerHidden(faqKey)
    action_toggleFaqItem(faqKey)
    check_faqAnswerShown(faqKey, faqFragment)
    action_toggleFaqItem(faqKey)
    check_faqAnswerHidden(faqKey)
  })
})
