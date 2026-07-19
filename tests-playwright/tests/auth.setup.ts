/**
 * Setup project: signs in via the backend API once per seeded account, plants
 * the session into the app's localStorage and saves it as a storage state that
 * the browser projects preload, so specs start already authenticated.
 */
import type { Page } from '@playwright/test'
import type { ApiClient } from '../src/api/api-client'
import { authStates, sessionStorageKey } from '../src/constants/auth'
import { routes } from '../src/constants/routes'
import { users } from '../src/constants/users'
import { test as setup } from '../src/fixtures/fixtures'
import type { LoginCredentials } from '../src/models/auth'

async function saveAuthState(
  page: Page,
  api: ApiClient,
  credentials: LoginCredentials,
  statePath: string,
): Promise<void> {
  const session = await api.login(credentials)
  await page.goto(routes.login)
  await page.evaluate(
    ([key, value]) => window.localStorage.setItem(key, value),
    [sessionStorageKey, JSON.stringify(session)],
  )
  await page.context().storageState({ path: statePath })
}

setup('authenticate as standard user', async ({ page, api }) => {
  await saveAuthState(page, api, users.standard, authStates.standard)
})

setup('authenticate as admin', async ({ page, api }) => {
  await saveAuthState(page, api, users.admin, authStates.admin)
})
