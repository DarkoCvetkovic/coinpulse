import { test } from '../fixtures/fixtures'
import type { FilesPage } from '../pages/files/files-page'

export async function action_openFiles(filesPage: FilesPage): Promise<void> {
  await test.step('Open the files page', async () => {
    await filesPage.open()
  })
}

export async function action_uploadValidLogo(filesPage: FilesPage): Promise<void> {
  await test.step('Upload a valid logo image for the first coin', async () => {
    await filesPage.selectFirstCoin()
    await filesPage.pickValidImage()
    await filesPage.submitUpload()
  })
}

export async function action_pickInvalidLogoFile(filesPage: FilesPage): Promise<void> {
  await test.step('Pick a non-image file in the logo dropzone', async () => {
    await filesPage.pickInvalidFile()
  })
}

export async function action_downloadPortfolio(
  filesPage: FilesPage,
  format: 'csv' | 'json',
): Promise<void> {
  await test.step(`Download the portfolio export as: ${format}`, async () => {
    await filesPage.download(format)
  })
}

export async function check_filesShellReady(filesPage: FilesPage): Promise<void> {
  await test.step('Verify the upload and download cards render', async () => {
    await filesPage.verifyShellReady()
  })
}

export async function check_logoUploadSucceeded(filesPage: FilesPage): Promise<void> {
  await test.step('Verify the logo upload success message', async () => {
    await filesPage.verifyUploadSuccess()
  })
}

export async function check_logoUploadRejected(filesPage: FilesPage): Promise<void> {
  await test.step('Verify the logo upload rejects a non-image file', async () => {
    await filesPage.verifyUploadError()
  })
}

export async function check_uploadIsAdminOnly(filesPage: FilesPage): Promise<void> {
  await test.step('Verify the logo upload is hidden for a standard user', async () => {
    await filesPage.verifyAdminOnly()
  })
}

export async function check_portfolioDownloaded(
  filesPage: FilesPage,
  format: 'csv' | 'json',
): Promise<void> {
  await test.step(`Verify the portfolio ${format} download success message`, async () => {
    await filesPage.verifyDownloadSuccess(format)
  })
}
