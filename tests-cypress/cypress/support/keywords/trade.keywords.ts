import { tradePage } from '../pages/trade/trade-page'

export function action_openTrade() {
  cy.log('Open the trade page')

  tradePage.visit()
}

export function action_recordTrade(type: 'buy' | 'sell', amount: string) {
  cy.log(`Record a ${type} trade for amount: ${amount}`)

  tradePage.selectFirstCoin()
  tradePage.selectType(type)
  tradePage.enterAmount(amount)
  tradePage.confirm()
  tradePage.submit()
}

export function action_submitEmptyTrade() {
  cy.log('Submit the trade form with no input to trigger validation')

  tradePage.submit()
}

export function check_tradeShellReady() {
  cy.log('Verify the trade form renders and is interactive')

  tradePage.verifyShellReady()
}

export function check_tradeValidationErrors() {
  cy.log('Verify required-field validation messages on the trade form')

  tradePage.verifyRequiredErrors()
}

export function check_tradeSuccess(text: string) {
  cy.log(`Verify the trade success message contains: ${text}`)

  tradePage.verifySuccess(text)
}
