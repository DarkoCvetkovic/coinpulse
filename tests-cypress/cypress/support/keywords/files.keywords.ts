import { filesPage } from '../pages/files/files-page'

export function action_openFiles() {
  cy.log('Open the files page')

  filesPage.visit()
}

export function action_uploadValidLogo() {
  cy.log('Upload a valid logo image for the first coin')

  filesPage.selectFirstCoin()
  filesPage.pickValidImage()
  filesPage.submitUpload()
}

export function action_pickInvalidLogoFile() {
  cy.log('Pick a non-image file in the logo dropzone')

  filesPage.pickInvalidFile()
}

export function action_downloadPortfolio(format: 'csv' | 'json') {
  cy.log(`Download the portfolio export as: ${format}`)

  if (format === 'csv') filesPage.downloadCsv()
  else filesPage.downloadJson()
}

export function check_filesShellReady() {
  cy.log('Verify the files page upload and download cards render')

  filesPage.verifyShellReady()
}

export function check_logoUploadSucceeded() {
  cy.log('Verify the logo upload success message')

  filesPage.verifyUploadSuccess()
}

export function check_logoUploadRejected() {
  cy.log('Verify the logo upload rejects a non-image file')

  filesPage.verifyUploadError()
}

export function check_uploadIsAdminOnly() {
  cy.log('Verify the logo upload is hidden for a standard user')

  filesPage.verifyAdminOnly()
}

export function check_portfolioDownloaded(format: 'csv' | 'json') {
  cy.log(`Verify the portfolio ${format} download success message`)

  filesPage.verifyDownloadSuccess(format)
}
