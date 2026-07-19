import { seedCoins } from '../../src/constants/coins'
import { test } from '../../src/fixtures/fixtures'
import {
  action_filterByStatus,
  action_openMarkets,
  check_coinRowAbsent,
  check_coinRowVisible,
} from '../../src/keywords/markets.keywords'

test.describe('Markets filtering', { tag: '@markets' }, () => {
  const bitcoin = seedCoins.btc.symbol
  const terraClassic = 'LUNC'

  test.beforeEach(async ({ marketsPage }) => {
    await action_openMarkets(marketsPage)
  })

  test('shows only delisted coins when filtered by delisted status', async ({ marketsPage }) => {
    const delistedStatus = 'delisted'
    const ftx = 'FTT'

    await action_filterByStatus(marketsPage, delistedStatus)
    await check_coinRowVisible(marketsPage, terraClassic)
    await check_coinRowVisible(marketsPage, ftx)
    await check_coinRowAbsent(marketsPage, bitcoin)
  })

  test('shows only active coins when filtered by active status', async ({ marketsPage }) => {
    const activeStatus = 'active'

    await action_filterByStatus(marketsPage, activeStatus)
    await check_coinRowVisible(marketsPage, bitcoin)
    await check_coinRowAbsent(marketsPage, terraClassic)
  })
})
