import { test } from '../fixtures/fixtures'
import type { FilesPage } from '../pages/files/files-page'

export async function action_openFiles(filesPage: FilesPage): Promise<void> {
  await test.step('Open the files page', async () => {
    await filesPage.open()
  })
}

export async function check_filesShellReady(filesPage: FilesPage): Promise<void> {
  await test.step('Verify the upload and download cards render', async () => {
    await filesPage.verifyShellReady()
  })
}
