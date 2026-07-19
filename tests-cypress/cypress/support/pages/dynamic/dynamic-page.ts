import { routes } from '../../constants/routes'
import {
  installScrollDrivenIntersectionObserver,
  LAZY_SHIM_FLAG,
  triggerLazyCheck,
} from '../../utils/core/intersection-observer'
import { testId } from '../../utils/core/selectors'

export const dynamicObj = {
  page: testId('dynamic-page'),
  ticker: {
    card: testId('ticker-card'),
    price: testId('ticker-price'),
    count: testId('ticker-count'),
  },
  delayed: {
    button: testId('delayed-button'),
    success: testId('delayed-success'),
  },
  iframe: {
    frame: testId('chart-iframe'),
    title: testId('iframe-title'),
  },
  shadow: {
    host: testId('shadow-host'),
    value: testId('shadow-widget-value'),
  },
  lazy: {
    list: testId('lazy-list'),
    items: '[data-testid^="lazy-item-"]',
    sentinel: testId('lazy-sentinel'),
    loading: testId('lazy-loading'),
    done: testId('lazy-done'),
  },
  external: {
    link: testId('external-link'),
  },
}

const externalLinkAttrs = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

export const dynamicPage = {
  visit: () => {
    cy.visit(routes.dynamic, {
      onBeforeLoad: win => installScrollDrivenIntersectionObserver(win),
    })
    cy.get(dynamicObj.page).should('be.visible')
    cy.window().its(LAZY_SHIM_FLAG).should('eq', true)
  },

  verifyShellReady: () => {
    cy.get(dynamicObj.ticker.card).should('be.visible')
    cy.get(dynamicObj.delayed.button).should('be.visible')
    cy.get(dynamicObj.lazy.list).should('be.visible')
  },

  verifyTickerCoin: (symbol: string) => {
    cy.get(dynamicObj.ticker.card).should('contain.text', symbol)
    cy.get(dynamicObj.ticker.price).should('be.visible')
  },

  verifyTickerAdvances: () => {
    cy.get(dynamicObj.ticker.count)
      .invoke('text')
      .then(initial => {
        cy.get(dynamicObj.ticker.count).should(el => {
          expect(Number(el.text())).to.be.greaterThan(Number(initial))
        })
      })
  },

  verifyDelayedButtonDisabled: () => {
    cy.get(dynamicObj.delayed.button).should('be.disabled')
  },

  clickDelayedButtonWhenReady: () => {
    cy.get(dynamicObj.delayed.button).should('not.be.disabled')
    cy.uiClick(dynamicObj.delayed.button)
  },

  verifyDelayedSuccess: () => {
    cy.get(dynamicObj.delayed.success).should('be.visible')
  },

  verifyIframeContent: (title: string) => {
    cy.get(dynamicObj.iframe.frame)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(body => cy.wrap(body))
      .find(dynamicObj.iframe.title)
      .should('contain.text', title)
  },

  verifyShadowWidgetValue: (value: string) => {
    cy.get(dynamicObj.shadow.host)
      .shadow()
      .find(dynamicObj.shadow.value)
      .should('contain.text', value)
  },

  verifyLazyInitialBatch: (batch: number) => {
    cy.get(dynamicObj.lazy.items).should('have.length', batch)
    cy.get(dynamicObj.lazy.done).should('not.exist')
  },

  loadMoreLazyCoins: (expectedCount: number) => {
    cy.get(dynamicObj.lazy.items).should('have.length.at.least', 1)
    cy.uiScrollIntoView(dynamicObj.lazy.sentinel)
    cy.window().then(triggerLazyCheck)
    cy.get(dynamicObj.lazy.items).should('have.length', expectedCount)
  },

  loadAllLazyCoins: (total: number, batch: number) => {
    cy.get(dynamicObj.lazy.items).should('have.length.at.least', 1)
    const loads = Math.ceil((total - batch) / batch)
    for (let i = 0; i < loads; i += 1) {
      const expected = Math.min(batch * (i + 2), total)
      cy.uiScrollIntoView(dynamicObj.lazy.sentinel)
      cy.window().then(triggerLazyCheck)
      cy.get(dynamicObj.lazy.items).should('have.length', expected)
    }
    cy.get(dynamicObj.lazy.done).should('be.visible')
  },

  verifyExternalLink: (href: string) => {
    cy.get(dynamicObj.external.link)
      .should('have.attr', 'href', href)
      .and('have.attr', 'target', externalLinkAttrs.target)
      .and('have.attr', 'rel', externalLinkAttrs.rel)
  },
}
