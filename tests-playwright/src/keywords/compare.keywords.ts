import { test } from '../fixtures/fixtures'
import type { ComparePage } from '../pages/compare/compare-page'

export async function action_openCompare(comparePage: ComparePage): Promise<void> {
  await test.step('Open the compare page', async () => {
    await comparePage.open()
  })
}

export async function check_compareShellReady(comparePage: ComparePage): Promise<void> {
  await test.step('Verify the compare page shell is rendered', async () => {
    await comparePage.verifyShellReady()
  })
}
