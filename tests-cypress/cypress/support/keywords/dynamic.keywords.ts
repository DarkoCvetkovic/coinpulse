import { dynamicPage } from '../pages/dynamic/dynamic-page'

export function action_openDynamic() {
  cy.log('Open the dynamic elements page')

  dynamicPage.visit()
}

export function check_dynamicShellReady() {
  cy.log('Verify the dynamic elements page shell is rendered')

  dynamicPage.verifyShellReady()
}

export function check_tickerAdvances(symbol: string) {
  cy.log(`Verify the live ticker shows ${symbol} and its update counter advances`)

  dynamicPage.verifyTickerCoin(symbol)
  dynamicPage.verifyTickerAdvances()
}

export function check_delayedButtonEnablesAndClicks() {
  cy.log('Verify the delayed button enables after its countdown and confirms the click')

  dynamicPage.verifyDelayedButtonDisabled()
  dynamicPage.clickDelayedButtonWhenReady()
  dynamicPage.verifyDelayedSuccess()
}

export function check_iframeChartRenders(title: string) {
  cy.log(`Verify the embedded iframe chart renders with title: ${title}`)

  dynamicPage.verifyIframeContent(title)
}

export function check_shadowWidgetValue(value: string) {
  cy.log(`Verify the shadow DOM Fear and Greed widget shows: ${value}`)

  dynamicPage.verifyShadowWidgetValue(value)
}

export function check_lazyListStartsWithOneBatch(batch: number) {
  cy.log(`Verify the lazy list initially renders one batch of ${batch} coins`)

  dynamicPage.verifyLazyInitialBatch(batch)
}

export function check_lazyListLoadsMore(expectedCount: number) {
  cy.log(`Verify scrolling lazy-loads more coins up to a total of ${expectedCount}`)

  dynamicPage.loadMoreLazyCoins(expectedCount)
}

export function check_lazyListLoadsAllCoins(total: number, batch: number) {
  cy.log(`Verify scrolling lazy-loads all ${total} coins in batches of ${batch}`)

  dynamicPage.loadAllLazyCoins(total, batch)
}

export function check_externalLinkOpensNewTab(href: string) {
  cy.log(`Verify the external link points to ${href} and opens in a new tab`)

  dynamicPage.verifyExternalLink(href)
}
