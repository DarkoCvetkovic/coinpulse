import { test } from '../fixtures/fixtures'
import type { ApiExplorerPage } from '../pages/api-explorer/api-explorer-page'

export async function action_openApiExplorer(apiExplorerPage: ApiExplorerPage): Promise<void> {
  await test.step('Open the API explorer page', async () => {
    await apiExplorerPage.open()
  })
}

export async function check_apiExplorerShellReady(apiExplorerPage: ApiExplorerPage): Promise<void> {
  await test.step('Verify the request groups and empty response state render', async () => {
    await apiExplorerPage.verifyShellReady()
  })
}

export async function action_runApiRequest(
  apiExplorerPage: ApiExplorerPage,
  key: string,
): Promise<void> {
  await test.step(`Run the API explorer request: ${key}`, async () => {
    await apiExplorerPage.run(key)
  })
}

export async function check_apiResponseStatus(
  apiExplorerPage: ApiExplorerPage,
  status: number,
): Promise<void> {
  await test.step(`Verify the API response status is: ${status}`, async () => {
    await apiExplorerPage.verifyResponseStatus(status)
  })
}
