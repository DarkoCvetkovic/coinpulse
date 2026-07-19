import { register as registerCypressGrep } from '@cypress/grep'
import 'cypress-mochawesome-reporter/register'
import './commands/api/auth'
import './commands/api/seed'
import './commands/ui/actions'

registerCypressGrep()

Cypress.on('uncaught:exception', () => false)
