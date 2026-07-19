import { apiPaths, routes } from '../../constants/routes'
import { users } from '../../constants/users'
import type { AuthSession, LoginCredentials } from '../../models/auth'
import { backendUrl } from '../../utils/core/backend'
import { readAuthSession, seedAuthSession } from '../../utils/core/session'

Cypress.Commands.add('login', (credentials: LoginCredentials = users.standard) => {
  const { username, password, rememberMe = false } = credentials

  cy.session(
    ['coinpulse', username, String(rememberMe)],
    () => {
      cy.request<AuthSession>('POST', backendUrl(apiPaths.login), { username, password }).then(
        ({ body }) => {
          cy.visit(routes.login)
          seedAuthSession(body, rememberMe)
        },
      )
    },
    {
      validate() {
        cy.window().then(win => {
          expect(readAuthSession(win), 'persisted CoinPulse session').to.be.a('string')
        })
      },
    },
  )
})

Cypress.Commands.add('resetBackend', () => {
  cy.request('POST', backendUrl(apiPaths.reset)).its('status').should('eq', 200)
})

Cypress.Commands.add('resetAndLogin', (credentials: LoginCredentials = users.standard) => {
  cy.resetBackend()
  cy.login(credentials)
})
