Cypress.Commands.add('uiClick', (selector: string) => {
  cy.get(selector).click()
})

Cypress.Commands.add('uiDblClick', (selector: string) => {
  cy.get(selector).dblclick()
})

Cypress.Commands.add('uiRightClick', (selector: string) => {
  cy.get(selector).rightclick()
})

Cypress.Commands.add('uiTrigger', (selector: string, eventName: string) => {
  cy.get(selector).trigger(eventName)
})

Cypress.Commands.add(
  'uiType',
  (selector: string, value: string, options?: Partial<Cypress.TypeOptions>) => {
    cy.get(selector).clear().type(value, options)
  },
)

Cypress.Commands.add('uiSelect', (selector: string, value: string) => {
  cy.get(selector).select(value)
})

Cypress.Commands.add('uiCheck', (selector: string) => {
  cy.get(selector).check()
})

Cypress.Commands.add('uiScrollIntoView', (selector: string) => {
  cy.get(selector).scrollIntoView()
})
