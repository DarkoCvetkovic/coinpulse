import { test } from '../fixtures/fixtures'
import type { DynamicPage } from '../pages/dynamic/dynamic-page'

export async function action_openDynamic(dynamicPage: DynamicPage): Promise<void> {
  await test.step('Open the dynamic elements page', async () => {
    await dynamicPage.open()
  })
}

export async function check_dynamicShellReady(dynamicPage: DynamicPage): Promise<void> {
  await test.step('Verify the dynamic elements page shell is rendered', async () => {
    await dynamicPage.verifyShellReady()
  })
}
