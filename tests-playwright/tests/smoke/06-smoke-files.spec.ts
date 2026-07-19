/**
 * Smoke: files page.
 *
 * Opens the files page as standard_user and verifies the upload and
 * download cards render.
 *
 * Estimated execution time: ~2s per browser.
 */
import { test } from '../../src/fixtures/fixtures'
import { action_openFiles, check_filesShellReady } from '../../src/keywords/files.keywords'

test.describe('Smoke: files', { tag: '@smoke' }, () => {
  test('renders the upload and download cards', async ({ filesPage }) => {
    await action_openFiles(filesPage)
    await check_filesShellReady(filesPage)
  })
})
