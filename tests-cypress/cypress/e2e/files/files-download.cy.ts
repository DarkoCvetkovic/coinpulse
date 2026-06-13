import { users } from '../../support/constants/users'
import {
  action_downloadPortfolio,
  action_openFiles,
  check_portfolioDownloaded,
} from '../../support/keywords/files.keywords'

describe('Files portfolio download', { tags: ['@files'] }, () => {
  beforeEach(() => {
    cy.login(users.standard)
    action_openFiles()
  })

  it('downloads the portfolio as CSV', () => {
    const format = 'csv'

    action_downloadPortfolio(format)
    check_portfolioDownloaded(format)
  })

  it('downloads the portfolio as JSON', () => {
    const format = 'json'

    action_downloadPortfolio(format)
    check_portfolioDownloaded(format)
  })
})
