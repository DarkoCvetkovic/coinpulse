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

export async function check_tickerAdvances(
  dynamicPage: DynamicPage,
  symbol: string,
): Promise<void> {
  await test.step(`Verify the live ticker shows ${symbol} and its update counter advances`, async () => {
    await dynamicPage.verifyTickerCoin(symbol)
    await dynamicPage.verifyTickerAdvances()
  })
}

export async function check_delayedButtonEnablesAndClicks(dynamicPage: DynamicPage): Promise<void> {
  await test.step('Verify the delayed button enables after its countdown and confirms the click', async () => {
    await dynamicPage.verifyDelayedButtonDisabled()
    await dynamicPage.clickDelayedButtonWhenReady()
    await dynamicPage.verifyDelayedSuccess()
  })
}

export async function check_iframeChartRenders(
  dynamicPage: DynamicPage,
  title: string,
): Promise<void> {
  await test.step(`Verify the embedded iframe chart renders with title: ${title}`, async () => {
    await dynamicPage.verifyIframeContent(title)
  })
}

export async function check_shadowWidgetValue(
  dynamicPage: DynamicPage,
  value: string,
): Promise<void> {
  await test.step(`Verify the shadow DOM Fear and Greed widget shows: ${value}`, async () => {
    await dynamicPage.verifyShadowWidgetValue(value)
  })
}

export async function check_lazyListStartsWithOneBatch(
  dynamicPage: DynamicPage,
  batch: number,
): Promise<void> {
  await test.step(`Verify the lazy list initially renders one batch of ${batch} coins`, async () => {
    await dynamicPage.verifyLazyInitialBatch(batch)
  })
}

export async function check_lazyListLoadsMore(
  dynamicPage: DynamicPage,
  expectedCount: number,
): Promise<void> {
  await test.step(`Verify scrolling lazy-loads more coins up to a total of ${expectedCount}`, async () => {
    await dynamicPage.loadMoreLazyCoins(expectedCount)
  })
}

export async function check_lazyListLoadsAllCoins(
  dynamicPage: DynamicPage,
  total: number,
  batch: number,
): Promise<void> {
  await test.step(`Verify scrolling lazy-loads all ${total} coins in batches of ${batch}`, async () => {
    await dynamicPage.loadAllLazyCoins(total, batch)
  })
}

export async function check_externalLinkOpensNewTab(
  dynamicPage: DynamicPage,
  href: string,
): Promise<void> {
  await test.step(`Verify the external link points to ${href} and opens in a new tab`, async () => {
    await dynamicPage.verifyExternalLink(href)
  })
}
