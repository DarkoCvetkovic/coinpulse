import { seedCoins } from '../../support/constants/coins'
import { users } from '../../support/constants/users'
import {
  action_filterByStatus,
  action_openMarkets,
  check_coinRowAbsent,
  check_coinRowVisible,
} from '../../support/keywords/markets.keywords'

describe('Markets filtering', { tags: ['@markets'] }, () => {
  const bitcoin = seedCoins.btc.symbol
  const terraClassic = 'LUNC'

  beforeEach(() => {
    cy.login(users.standard)
    action_openMarkets()
  })

  it('shows only delisted coins when filtered by delisted status', () => {
    const delistedStatus = 'delisted'
    const ftx = 'FTT'

    action_filterByStatus(delistedStatus)
    check_coinRowVisible(terraClassic)
    check_coinRowVisible(ftx)
    check_coinRowAbsent(bitcoin)
  })

  it('shows only active coins when filtered by active status', () => {
    const activeStatus = 'active'

    action_filterByStatus(activeStatus)
    check_coinRowVisible(bitcoin)
    check_coinRowAbsent(terraClassic)
  })
})
