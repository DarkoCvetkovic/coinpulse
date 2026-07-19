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
        cy.uiSelect(tradeObj.fields.coin, String(option.val()))
      })
    cy.get(tradeObj.marketPrice).should('be.visible')
  },

  selectType: (type: 'buy' | 'sell') => {
    cy.uiCheck(type === 'buy' ? tradeObj.fields.typeBuy : tradeObj.fields.typeSell)
  },

  enterAmount: (amount: string) => {
    cy.uiType(tradeObj.fields.amount, amount)
  },

  enterPrice: (price: string) => {
    cy.uiType(tradeObj.fields.price, price)
  },

  enterNote: (note: string) => {
    cy.uiType(tradeObj.fields.note, note)
  },

  confirm: () => {
    cy.uiCheck(tradeObj.fields.confirm)
  },

  submit: () => {
    cy.uiClick(tradeObj.fields.submit)
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
