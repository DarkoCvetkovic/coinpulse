import { routes } from '../../constants/routes'
import { testId } from '../../utils/core/selectors'

export const coinFormObj = {
  page: testId('coin-form-page'),
  form: testId('coin-form'),
  error: testId('coin-form-error'),
  fields: {
    name: testId('coin-name'),
    symbol: testId('coin-symbol'),
    price: testId('coin-price'),
    marketCap: testId('coin-market-cap'),
    change24h: testId('coin-change24h'),
    rank: testId('coin-rank'),
    category: testId('coin-category'),
    launchDate: testId('coin-launch-date'),
    statusActive: testId('coin-status-active'),
    statusDelisted: testId('coin-status-delisted'),
    description: testId('coin-description'),
    logoUrl: testId('coin-logo-url'),
    cancel: testId('coin-form-cancel'),
    submit: testId('coin-form-submit'),
  },
  errors: {
    name: testId('coin-name-error'),
    symbol: testId('coin-symbol-error'),
    price: testId('coin-price-error'),
    category: testId('coin-category-error'),
  },
}

export const coinFormPage = {
  visitNew: () => {
    cy.visit(routes.coinNew)
  },

  visitEdit: (id: number) => {
    cy.visit(`/coins/${id}/edit`)
    cy.get(coinFormObj.page).should('be.visible')
  },

  fillValid: (name: string, symbol: string) => {
    cy.uiType(coinFormObj.fields.name, name)
    cy.uiType(coinFormObj.fields.symbol, symbol)
    cy.uiType(coinFormObj.fields.price, '100')
    cy.uiSelect(coinFormObj.fields.category, 'L1')
  },

  submit: () => {
    cy.uiClick(coinFormObj.fields.submit)
  },

  verifyShellReady: () => {
    cy.get(coinFormObj.fields.name).should('be.visible')
    cy.get(coinFormObj.fields.symbol).should('be.visible')
    cy.get(coinFormObj.fields.submit).should('be.visible')
  },

  verifyRequiredErrors: () => {
    cy.get(coinFormObj.errors.name).should('be.visible')
    cy.get(coinFormObj.errors.symbol).should('be.visible')
    cy.get(coinFormObj.errors.price).should('be.visible')
    cy.get(coinFormObj.errors.category).should('be.visible')
  },

  verifyNameValue: (name: string) => {
    cy.get(coinFormObj.fields.name).should('have.value', name)
  },
}
