import { testId } from '../../utils/core/selectors'

export const headerObj = {
  header: testId('app-header'),
  logoutButton: testId('logout-button'),
}

export const headerPage = {
  logout: () => {
    cy.uiClick(headerObj.logoutButton)
  },
}
