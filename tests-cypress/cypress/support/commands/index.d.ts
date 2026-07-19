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

    /** Resets the backend to its seeded state, then logs in (standard_user by default). */
    resetAndLogin(credentials?: LoginCredentials): Chainable<void>

    /** Clicks the element matched by the selector. */
    uiClick(selector: string): Chainable<void>

    /** Double-clicks the element matched by the selector. */
    uiDblClick(selector: string): Chainable<void>

    /** Right-clicks the element matched by the selector. */
    uiRightClick(selector: string): Chainable<void>

    /** Dispatches a DOM event on the element matched by the selector. */
    uiTrigger(selector: string, eventName: string): Chainable<void>

    /** Clears the input matched by the selector and types the value into it. */
    uiType(selector: string, value: string, options?: Partial<Cypress.TypeOptions>): Chainable<void>

    /** Picks an option from the select element matched by the selector. */
    uiSelect(selector: string, value: string): Chainable<void>

    /** Checks the checkbox matched by the selector. */
    uiCheck(selector: string): Chainable<void>

    /** Scrolls the element matched by the selector into view. */
    uiScrollIntoView(selector: string): Chainable<void>
  }
}
