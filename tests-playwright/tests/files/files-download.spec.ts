import { test } from '../../src/fixtures/fixtures'
import {
  action_downloadPortfolio,
  action_openFiles,
  check_portfolioDownloaded,
} from '../../src/keywords/files.keywords'

test.describe('Files portfolio download', { tag: '@files' }, () => {
  test.beforeEach(async ({ filesPage }) => {
    await action_openFiles(filesPage)
  })

  test('downloads the portfolio as CSV', async ({ filesPage }) => {
    const format = 'csv'

    await action_downloadPortfolio(filesPage, format)
    await check_portfolioDownloaded(filesPage, format)
  })

  test('downloads the portfolio as JSON', async ({ filesPage }) => {
    const format = 'json'

    await action_downloadPortfolio(filesPage, format)
    await check_portfolioDownloaded(filesPage, format)
  })
})
