import { users } from '../../support/constants/users'
import { action_openFiles, check_filesShellReady } from '../../support/keywords/files.keywords'

describe('Smoke: files', { tags: ['@smoke'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
  })

  it('renders the upload and download cards', () => {
    action_openFiles()
    check_filesShellReady()
  })
})
