import { routes } from '../../constants/routes'
import { testId } from '../../utils/core/selectors'

export const tradeObj = {
  page: testId('trade-page'),
  form: testId('trade-form'),
  marketPrice: testId('trade-market-price'),
  alerts: {
    success: testId('trade-success'),
    error: testId('trade-error'),
  },
  fields: {
    coin: testId('trade-coin'),
    typeBuy: testId('trade-type-buy'),
    typeSell: testId('trade-type-sell'),
    amount: testId('trade-amount'),
    price: testId('trade-price'),
    date: testId('trade-date'),
    note: testId('trade-note'),
    confirm: testId('trade-confirm'),
    submit: testId('trade-submit'),
  },
  errors: {
    coin: testId('trade-coin-error'),
    type: testId('trade-type-error'),
    amount: testId('trade-amount-error'),
    price: testId('trade-price-error'),
    date: testId('trade-date-error'),
    confirm: testId('trade-confirm-error'),
  },
}

export const tradePage = {
  visit: () => {
    cy.visit(routes.trade)
    cy.get(tradeObj.page).should('be.visible')
    cy.get(tradeObj.form).should('be.visible')
  },

  selectFirstCoin: () => {
    cy.get(tradeObj.fields.coin).find('option').should('have.length.greaterThan', 1)
    cy.get(tradeObj.fields.coin)
      .find('option')
      .eq(1)
      .then(option => {
        cy.get(tradeObj.fields.coin).select(String(option.val()))
      })
    cy.get(tradeObj.marketPrice).should('be.visible')
  },

  selectType: (type: 'buy' | 'sell') => {
    cy.get(type === 'buy' ? tradeObj.fields.typeBuy : tradeObj.fields.typeSell).check()
  },

  enterAmount: (amount: string) => {
    cy.get(tradeObj.fields.amount).clear().type(amount)
  },

  enterPrice: (price: string) => {
    cy.get(tradeObj.fields.price).clear().type(price)
  },

  enterNote: (note: string) => {
    cy.get(tradeObj.fields.note).clear().type(note)
  },

  confirm: () => {
    cy.get(tradeObj.fields.confirm).check()
  },

  submit: () => {
    cy.get(tradeObj.fields.submit).click()
  },

  verifyShellReady: () => {
    cy.get(tradeObj.fields.coin).should('be.visible')
    cy.get(tradeObj.fields.amount).should('be.visible')
    cy.get(tradeObj.fields.submit).should('be.enabled')
  },

  verifyRequiredErrors: () => {
    cy.get(tradeObj.errors.coin).should('be.visible')
    cy.get(tradeObj.errors.amount).should('be.visible')
    cy.get(tradeObj.errors.price).should('be.visible')
    cy.get(tradeObj.errors.confirm).should('be.visible')
  },

  verifySuccess: (text: string) => {
    cy.get(tradeObj.alerts.success).should('be.visible').and('contain.text', text)
  },
}
