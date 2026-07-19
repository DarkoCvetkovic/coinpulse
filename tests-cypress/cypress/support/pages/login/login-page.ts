import { routes } from '../../constants/routes'

export const loginObj = {
  page: '[data-testid="login-page"]',
  form: {
    form: '[data-testid="login-form"]',
    username: '[data-testid="login-username"]',
    password: '[data-testid="login-password"]',
    rememberMe: '[data-testid="login-remember-me"]',
    submit: '[data-testid="login-submit"]',
  },
  errors: {
    server: '[data-testid="login-error"]',
    username: '[data-testid="login-username-error"]',
    password: '[data-testid="login-password-error"]',
  },
  hints: {
    slow: '[data-testid="login-slow-hint"]',
  },
}

export const loginPage = {
  visit: () => {
    cy.visit(routes.login)
    cy.get(loginObj.form.form).should('be.visible')
  },

  typeUsername: (value: string) => {
    cy.get(loginObj.form.username).clear().type(value)
  },

  typePassword: (value: string) => {
    cy.get(loginObj.form.password).clear().type(value, { log: false })
  },

  enableRememberMe: () => {
    cy.get(loginObj.form.rememberMe).check()
  },

  submit: () => {
    cy.get(loginObj.form.submit).click()
  },

  verifyShellReady: () => {
    cy.get(loginObj.form.username).should('be.visible')
    cy.get(loginObj.form.password).should('be.visible')
    cy.get(loginObj.form.submit).should('be.enabled')
  },

  verifyServerError: (message: string) => {
    cy.get(loginObj.errors.server).should('be.visible').and('contain.text', message)
  },

  verifyFieldErrors: () => {
    cy.get(loginObj.errors.username).should('be.visible')
    cy.get(loginObj.errors.password).should('be.visible')
  },

  verifyUsernameError: (message: string) => {
    cy.get(loginObj.errors.username).should('be.visible').and('contain.text', message)
  },

  verifyPasswordError: (message: string) => {
    cy.get(loginObj.errors.password).should('be.visible').and('contain.text', message)
  },

  verifyNoUsernameError: () => {
    cy.get(loginObj.errors.username).should('not.exist')
  },
}
