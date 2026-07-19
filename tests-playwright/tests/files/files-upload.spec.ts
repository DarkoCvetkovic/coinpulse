import { authStates } from '../../src/constants/auth'
import { test } from '../../src/fixtures/fixtures'
import {
  action_openFiles,
  action_pickInvalidLogoFile,
  action_uploadValidLogo,
  check_logoUploadRejected,
  check_logoUploadSucceeded,
  check_uploadIsAdminOnly,
} from '../../src/keywords/files.keywords'
import { action_resetBackend } from '../../src/keywords/seed.keywords'

test.describe('Files logo upload, admin', { tag: '@files' }, () => {
  test.use({ storageState: authStates.admin })

  test('uploads a valid logo as an admin', async ({ api, filesPage }) => {
    await action_resetBackend(api)
    await action_openFiles(filesPage)
    await action_uploadValidLogo(filesPage)
    await check_logoUploadSucceeded(filesPage)
  })

  test('rejects a non-image file', async ({ filesPage }) => {
    await action_openFiles(filesPage)
    await action_pickInvalidLogoFile(filesPage)
    await check_logoUploadRejected(filesPage)
  })
})

test.describe('Files logo upload, standard user', { tag: '@files' }, () => {
  test('hides the upload for a standard user', async ({ filesPage }) => {
    await action_openFiles(filesPage)
    await check_uploadIsAdminOnly(filesPage)
  })
})
