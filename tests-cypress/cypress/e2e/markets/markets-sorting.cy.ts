import { users } from '../../support/constants/users'
import {
  action_openMarkets,
  action_sortBy,
  check_firstCoinRow,
  check_sortIndicator,
} from '../../support/keywords/markets.keywords'

describe('Markets sorting', { tags: ['@markets'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
    action_openMarkets()
  })

  it('lists coins by rank ascending by default with BTC first', () => {
    check_firstCoinRow('BTC')
  })

  it('toggles the sort direction when the same column is clicked twice', () => {
    action_sortBy('name')
    check_sortIndicator('name', 'asc')
    action_sortBy('name')
    check_sortIndicator('name', 'desc')
  })
})
