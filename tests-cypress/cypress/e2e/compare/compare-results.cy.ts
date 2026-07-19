import { seedCoins } from '../../support/constants/coins'
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
  const btc = seedCoins.btc
  const eth = seedCoins.eth

  beforeEach(() => {
    cy.resetAndLogin(users.standard)
    action_openCompare()
    action_addCoinByDoubleClick(btc.symbol)
    action_addCoinByDoubleClick(eth.symbol)
    check_resultsShown()
  })

  it('shows seeded metrics for the compared coins in the overview table', () => {
    check_overviewColumn(btc.symbol, btc.name)
    check_overviewColumn(eth.symbol, eth.name)
    check_overviewValue('price', btc.symbol, btc.price)
    check_overviewValue('change24h', btc.symbol, btc.change24h)
    check_overviewValue('rank', btc.symbol, btc.rank)
    check_overviewValue('category', btc.symbol, btc.category)
    check_overviewValue('launchDate', btc.symbol, btc.launchDate)
    check_overviewValue('price', eth.symbol, eth.price)
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
    const btcHeadline = `${btc.name} climbs 2.45% in 24 hours`
    const btcSecondHeadline = `What ${btc.symbol} holders should know about the ${btc.category} sector`

    action_selectCompareTab('news')
    check_newsHeadline(btc.id, 1, btcHeadline)
    check_newsHeadline(btc.id, 2, btcSecondHeadline)
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
