import { users } from '../../support/constants/users'
import {
  action_goToNextMarketsPage,
  action_openMarkets,
  action_setPageSize,
  check_coinRowAbsent,
  check_coinRowVisible,
  check_paginationVisible,
} from '../../support/keywords/markets.keywords'

describe('Markets pagination', { tags: ['@markets'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
    action_openMarkets()
  })

  it('moves to the next page of coins', () => {
    action_setPageSize('5')
    check_paginationVisible()
    check_coinRowVisible('BTC')
    action_goToNextMarketsPage()
    check_coinRowAbsent('BTC')
  })
})
