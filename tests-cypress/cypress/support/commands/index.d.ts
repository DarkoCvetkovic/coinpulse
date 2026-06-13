type LoginCredentials = import('../models/auth').LoginCredentials
type CoinInput = import('../models/coin').CoinInput
type Coin = import('../models/coin').Coin

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Logs in through the backend API and seeds the persisted session, then
     * caches it with cy.session. Defaults to the standard_user account.
     */
    login(credentials?: LoginCredentials): Chainable<void>

    /** Resets the backend database to its seeded state via POST /api/test/reset. */
    resetBackend(): Chainable<void>

    /** Creates a coin via POST /api/coins as admin and yields the created coin. */
    createCoin(coin: CoinInput): Chainable<Coin>
  }
}
