import { coinFormPage } from '../pages/coin-form/coin-form-page'

export function action_openNewCoinForm() {
  cy.log('Open the new coin form')

  coinFormPage.visitNew()
}

export function action_openEditCoinForm(id: number) {
  cy.log(`Open the edit form for coin id: ${id}`)

  coinFormPage.visitEdit(id)
}

export function action_submitNewCoin(name: string, symbol: string) {
  cy.log(`Fill and submit a new coin: ${name} (${symbol})`)

  coinFormPage.fillValid(name, symbol)
  coinFormPage.submit()
}

export function action_submitEmptyCoinForm() {
  cy.log('Submit the coin form empty to trigger validation')

  coinFormPage.submit()
}

export function check_coinFormShellReady() {
  cy.log('Verify the coin form renders')

  coinFormPage.verifyShellReady()
}

export function check_coinFormRequiredErrors() {
  cy.log('Verify required-field validation on the coin form')

  coinFormPage.verifyRequiredErrors()
}

export function check_coinNamePrefilled(name: string) {
  cy.log(`Verify the coin form is prefilled with name: ${name}`)

  coinFormPage.verifyNameValue(name)
}
