import { apiExplorerPage } from '../pages/api-explorer/api-explorer-page'

export function action_openApiExplorer() {
  cy.log('Open the API Explorer page')

  apiExplorerPage.visit()
}

export function action_runApiRequest(key: string) {
  cy.log(`Run the API Explorer request: ${key}`)

  apiExplorerPage.run(key)
}

export function check_apiExplorerShellReady() {
  cy.log('Verify the API Explorer renders its request groups and empty response state')

  apiExplorerPage.verifyShellReady()
}

export function check_apiResponseStatus(status: number) {
  cy.log(`Verify the API Explorer response status is: ${status}`)

  apiExplorerPage.verifyResponseShown()
  apiExplorerPage.verifyStatus(status)
}
