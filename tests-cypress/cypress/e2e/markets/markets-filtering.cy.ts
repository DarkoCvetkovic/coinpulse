import { users } from '../../support/constants/users'
import {
  action_filterByStatus,
  action_openMarkets,
  check_coinRowAbsent,
  check_coinRowVisible,
} from '../../support/keywords/markets.keywords'

describe('Markets filtering', { tags: ['@markets'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
    action_openMarkets()
  })

  it('shows only delisted coins when filtered by delisted status', () => {
    action_filterByStatus('delisted')
    check_coinRowVisible('LUNC')
    check_coinRowVisible('FTT')
    check_coinRowAbsent('BTC')
  })

  it('shows only active coins when filtered by active status', () => {
    action_filterByStatus('active')
    check_coinRowVisible('BTC')
    check_coinRowAbsent('LUNC')
  })
})
