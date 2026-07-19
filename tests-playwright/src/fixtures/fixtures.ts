import { test as base, expect } from '@playwright/test'
import { ApiClient } from '../api/api-client'
import { ApiExplorerPage } from '../pages/api-explorer/api-explorer-page'
import { CoinFormPage } from '../pages/coin-form/coin-form-page'
import { ComparePage } from '../pages/compare/compare-page'
import { DashboardPage } from '../pages/dashboard/dashboard-page'
import { DynamicPage } from '../pages/dynamic/dynamic-page'
import { FilesPage } from '../pages/files/files-page'
import { LoginPage } from '../pages/login/login-page'
import { MarketsPage } from '../pages/markets/markets-page'
import { TradePage } from '../pages/trade/trade-page'

interface Fixtures {
  api: ApiClient
  loginPage: LoginPage
  dashboardPage: DashboardPage
  marketsPage: MarketsPage
  tradePage: TradePage
  comparePage: ComparePage
  apiExplorerPage: ApiExplorerPage
  filesPage: FilesPage
  dynamicPage: DynamicPage
  coinFormPage: CoinFormPage
}

/**
 * Project-wide test extension: injects the API client and one page object per
 * app page. Specs import test/expect from here, never from @playwright/test.
 */
export const test = base.extend<Fixtures>({
  api: async ({ request }, use) => {
    await use(new ApiClient(request))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page))
  },
  marketsPage: async ({ page }, use) => {
    await use(new MarketsPage(page))
  },
  tradePage: async ({ page }, use) => {
    await use(new TradePage(page))
  },
  comparePage: async ({ page }, use) => {
    await use(new ComparePage(page))
  },
  apiExplorerPage: async ({ page }, use) => {
    await use(new ApiExplorerPage(page))
  },
  filesPage: async ({ page }, use) => {
    await use(new FilesPage(page))
  },
  dynamicPage: async ({ page }, use) => {
    await use(new DynamicPage(page))
  },
  coinFormPage: async ({ page }, use) => {
    await use(new CoinFormPage(page))
  },
})

export { expect }
