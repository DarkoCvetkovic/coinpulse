declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Logs in through the backend API and seeds the persisted session, then
     * caches it with cy.session. Defaults to the standard_user account.
     */
    login(credentials?: import('../models/auth').LoginCredentials): Chainable<void>

    /** Resets the backend database to its seeded state via POST /api/test/reset. */
    resetBackend(): Chainable<void>
  }
}
