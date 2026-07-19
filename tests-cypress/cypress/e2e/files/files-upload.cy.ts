import { users } from '../../support/constants/users'
import {
  action_openFiles,
  action_pickInvalidLogoFile,
  action_uploadValidLogo,
  check_logoUploadRejected,
  check_logoUploadSucceeded,
  check_uploadIsAdminOnly,
} from '../../support/keywords/files.keywords'

describe('Files logo upload', { tags: ['@files'] }, () => {
  it('uploads a valid logo as an admin', () => {
    cy.resetAndLogin(users.admin)
    action_openFiles()
    action_uploadValidLogo()
    check_logoUploadSucceeded()
  })

  it('rejects a non-image file', () => {
    cy.login(users.admin)
    action_openFiles()
    action_pickInvalidLogoFile()
    check_logoUploadRejected()
  })

  it('hides the upload for a standard user', () => {
    cy.login(users.standard)
    action_openFiles()
    check_uploadIsAdminOnly()
  })
})
