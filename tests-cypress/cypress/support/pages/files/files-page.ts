import { routes } from '../../constants/routes'
import { testId } from '../../utils/core/selectors'

export const filesObj = {
  page: testId('files-page'),
  upload: {
    card: testId('upload-card'),
    success: testId('upload-success'),
    error: testId('upload-error'),
    coin: testId('upload-coin'),
    dropzone: testId('upload-dropzone'),
    preview: testId('upload-preview'),
    input: testId('upload-input'),
    submit: testId('upload-submit'),
    adminOnly: testId('upload-admin-only'),
  },
  download: {
    card: testId('download-card'),
    success: testId('download-success'),
    error: testId('download-error'),
    csv: testId('download-csv'),
    json: testId('download-json'),
  },
}

const VALID_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"></svg>'

export const filesPage = {
  visit: () => {
    cy.visit(routes.files)
    cy.get(filesObj.page).should('be.visible')
  },

  selectFirstCoin: () => {
    cy.get(filesObj.upload.coin).find('option').should('have.length.greaterThan', 1)
    cy.get(filesObj.upload.coin)
      .find('option')
      .eq(1)
      .then(option => {
        cy.uiSelect(filesObj.upload.coin, String(option.val()))
      })
  },

  pickValidImage: () => {
    cy.get(filesObj.upload.input).selectFile(
      { contents: Cypress.Buffer.from(VALID_SVG), fileName: 'logo.svg', mimeType: 'image/svg+xml' },
      { force: true },
    )
    cy.get(filesObj.upload.preview).should('be.visible')
  },

  pickInvalidFile: () => {
    cy.get(filesObj.upload.input).selectFile(
      {
        contents: Cypress.Buffer.from('not an image'),
        fileName: 'note.txt',
        mimeType: 'text/plain',
      },
      { force: true },
    )
  },

  submitUpload: () => {
    cy.uiClick(filesObj.upload.submit)
  },

  downloadCsv: () => {
    cy.uiClick(filesObj.download.csv)
  },

  downloadJson: () => {
    cy.uiClick(filesObj.download.json)
  },

  verifyShellReady: () => {
    cy.get(filesObj.upload.card).should('be.visible')
    cy.get(filesObj.download.card).should('be.visible')
    cy.get(filesObj.download.csv).should('be.visible')
  },

  verifyUploadSuccess: () => {
    cy.get(filesObj.upload.success).should('be.visible')
  },

  verifyUploadError: () => {
    cy.get(filesObj.upload.error).should('be.visible')
  },

  verifyAdminOnly: () => {
    cy.get(filesObj.upload.adminOnly).should('be.visible')
    cy.get(filesObj.upload.coin).should('not.exist')
  },

  verifyDownloadSuccess: (format: string) => {
    cy.get(filesObj.download.success)
      .should('be.visible')
      .and('contain.text', `portfolio.${format}`)
  },
}
