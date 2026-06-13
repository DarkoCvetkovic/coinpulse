import { users } from '../../support/constants/users'
import {
  action_openEditCoinForm,
  check_coinNamePrefilled,
} from '../../support/keywords/coin-form.keywords'
import { action_seedCoin } from '../../support/keywords/seed.be.keywords'
import { buildCoin } from '../../support/utils/resources/coin-builders'

describe('Coin form edit', { tags: ['@coin-form'] }, () => {
  beforeEach(() => {
    cy.resetBackend()
    cy.login(users.admin)
  })

  it('loads an existing coin into the edit form', () => {
    action_seedCoin(buildCoin()).then(coin => {
      action_openEditCoinForm(coin.id)
      check_coinNamePrefilled(coin.name)
    })
  })
})
