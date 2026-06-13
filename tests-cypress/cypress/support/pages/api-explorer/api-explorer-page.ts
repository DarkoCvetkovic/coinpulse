import { routes } from '../../constants/routes'
import { testId } from '../../utils/core/selectors'

export const apiExplorerObj = {
  page: testId('api-explorer-page'),
  groups: {
    coins: testId('api-group-coins'),
    simulations: testId('api-group-simulations'),
  },
  response: {
    card: testId('api-response-card'),
    request: testId('api-response-request'),
    status: testId('api-response-status'),
    time: testId('api-response-time'),
    body: testId('api-response-body'),
    empty: testId('api-response-empty'),
  },
  runButton: (key: string) => testId(`api-run-${key}`),
}

export const apiExplorerPage = {
  visit: () => {
    cy.visit(routes.apiExplorer)
    cy.get(apiExplorerObj.page).should('be.visible')
  },

  run: (key: string) => {
    cy.get(apiExplorerObj.runButton(key)).click()
  },

  verifyShellReady: () => {
    cy.get(apiExplorerObj.groups.coins).should('be.visible')
    cy.get(apiExplorerObj.groups.simulations).should('be.visible')
    cy.get(apiExplorerObj.response.empty).should('be.visible')
  },

  verifyStatus: (status: number) => {
    cy.get(apiExplorerObj.response.status).should('contain.text', String(status))
  },

  verifyResponseShown: () => {
    cy.get(apiExplorerObj.response.status).should('be.visible')
    cy.get(apiExplorerObj.response.time).should('be.visible')
    cy.get(apiExplorerObj.response.body).should('be.visible')
  },
}
