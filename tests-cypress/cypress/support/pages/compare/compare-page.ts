import { routes } from '../../constants/routes'
import { testId } from '../../utils/core/selectors'

export const compareObj = {
  page: testId('compare-page'),
  watchlist: {
    card: testId('compare-watchlist-card'),
    list: testId('compare-watchlist'),
    items: '[data-testid^="compare-watchlist-item-"]',
    empty: testId('compare-watchlist-empty'),
    item: (symbol: string) => testId(`compare-watchlist-item-${symbol}`),
  },
  zone: {
    card: testId('compare-zone-card'),
    dropArea: testId('compare-zone'),
    hint: testId('compare-zone-hint'),
    clearButton: testId('compare-clear'),
    chips: '[data-testid^="compare-chip-"]:not([data-testid^="compare-chip-remove-"])',
    chip: (symbol: string) => testId(`compare-chip-${symbol}`),
    chipRemove: (symbol: string) => testId(`compare-chip-remove-${symbol}`),
  },
  results: {
    card: testId('compare-results-card'),
    tab: (key: string) => testId(`compare-tabs-${key}`),
    overviewTable: testId('compare-overview-table'),
    column: (symbol: string) => testId(`compare-col-${symbol}`),
    value: (metric: string, symbol: string) => testId(`compare-value-${metric}-${symbol}`),
    tooltipBubble: (metric: string) => testId(`compare-tooltip-${metric}-bubble`),
    charts: testId('compare-charts'),
    chartItems: '[data-testid="price-chart"]',
    news: testId('compare-news'),
    newsItem: (coinId: number, ordinal: number) => testId(`compare-news-${coinId}-${ordinal}`),
  },
  faq: {
    toggle: (key: string) => testId(`compare-faq-toggle-${key}`),
    content: (key: string) => testId(`compare-faq-content-${key}`),
  },
  contextMenu: {
    menu: testId('compare-context-menu'),
    addCompare: testId('context-add-compare'),
    removeWatchlist: testId('context-remove-watchlist'),
  },
  limitModal: {
    modal: testId('compare-limit-modal'),
    ok: testId('compare-limit-ok'),
  },
  clearModal: {
    modal: testId('compare-clear-modal'),
    cancel: testId('compare-clear-cancel'),
    confirm: testId('compare-clear-confirm'),
  },
}

export const comparePage = {
  visit: () => {
    cy.visit(routes.compare)
    cy.get(compareObj.page).should('be.visible')
    cy.get(compareObj.watchlist.list).should('be.visible')
  },

  verifyWatchlistCoin: (symbol: string) => {
    cy.get(compareObj.watchlist.item(symbol)).should('be.visible')
  },

  verifyWatchlistCount: (count: number) => {
    cy.get(compareObj.watchlist.items).should('have.length', count)
  },

  verifyWatchlistOrder: (symbols: string[]) => {
    cy.get(compareObj.watchlist.items).should(items => {
      const rendered = items
        .toArray()
        .map(item => item.getAttribute('data-testid')?.replace('compare-watchlist-item-', ''))
      expect(rendered).to.deep.equal(symbols)
    })
  },

  verifyZoneEmpty: () => {
    cy.get(compareObj.zone.hint).should('be.visible')
    cy.get(compareObj.zone.chips).should('not.exist')
  },

  addByDoubleClick: (symbol: string) => {
    cy.get(compareObj.watchlist.item(symbol)).dblclick()
  },

  addByDragAndDrop: (symbol: string) => {
    cy.get(compareObj.watchlist.item(symbol)).trigger('dragstart')
    cy.get(compareObj.zone.dropArea).trigger('drop')
  },

  addByContextMenu: (symbol: string) => {
    cy.get(compareObj.watchlist.item(symbol)).rightclick()
    cy.get(compareObj.contextMenu.menu).should('be.visible')
    cy.get(compareObj.contextMenu.addCompare).click()
    cy.get(compareObj.contextMenu.menu).should('not.exist')
  },

  reorderByDrag: (fromSymbol: string, toSymbol: string) => {
    cy.get(compareObj.watchlist.item(fromSymbol)).trigger('dragstart')
    cy.get(compareObj.watchlist.item(toSymbol)).trigger('drop')
  },

  removeFromWatchlistViaMenu: (symbol: string) => {
    cy.get(compareObj.watchlist.item(symbol)).rightclick()
    cy.get(compareObj.contextMenu.removeWatchlist).click()
    cy.get(compareObj.watchlist.item(symbol)).should('not.exist')
  },

  verifyChip: (symbol: string) => {
    cy.get(compareObj.zone.chip(symbol)).should('be.visible')
  },

  verifyNoChip: (symbol: string) => {
    cy.get(compareObj.zone.chip(symbol)).should('not.exist')
  },

  verifyChipCount: (count: number) => {
    cy.get(compareObj.zone.chips).should('have.length', count)
  },

  removeChip: (symbol: string) => {
    cy.get(compareObj.zone.chipRemove(symbol)).click()
  },

  verifyLimitModalShown: () => {
    cy.get(compareObj.limitModal.modal).should('be.visible')
  },

  closeLimitModal: () => {
    cy.get(compareObj.limitModal.ok).click()
    cy.get(compareObj.limitModal.modal).should('not.exist')
  },

  openClearModal: () => {
    cy.get(compareObj.zone.clearButton).click()
    cy.get(compareObj.clearModal.modal).should('be.visible')
  },

  cancelClear: () => {
    cy.get(compareObj.clearModal.cancel).click()
    cy.get(compareObj.clearModal.modal).should('not.exist')
  },

  confirmClear: () => {
    cy.get(compareObj.clearModal.confirm).click()
    cy.get(compareObj.clearModal.modal).should('not.exist')
  },

  verifyResultsShown: () => {
    cy.get(compareObj.results.card).should('be.visible')
  },

  verifyResultsHidden: () => {
    cy.get(compareObj.results.card).should('not.exist')
  },

  selectTab: (key: string) => {
    cy.get(compareObj.results.tab(key)).click()
  },

  verifyOverviewColumn: (symbol: string, coinName: string) => {
    cy.get(compareObj.results.column(symbol)).should('contain.text', coinName)
  },

  verifyOverviewValue: (metric: string, symbol: string, expected: string) => {
    cy.get(compareObj.results.value(metric, symbol)).should('contain.text', expected)
  },

  verifyMetricTooltip: (metric: string, text: string) => {
    // The bubble is CSS hover-only, so assert its content instead of visibility.
    cy.get(compareObj.results.tooltipBubble(metric)).should('contain.text', text)
  },

  verifyChartCount: (count: number) => {
    cy.get(compareObj.results.charts)
      .find(compareObj.results.chartItems)
      .should('have.length', count)
  },

  verifyNewsHeadline: (coinId: number, ordinal: number, headline: string) => {
    cy.get(compareObj.results.newsItem(coinId, ordinal)).should('contain.text', headline)
  },

  toggleFaq: (key: string) => {
    cy.get(compareObj.faq.toggle(key)).click()
  },

  verifyFaqAnswerShown: (key: string, textFragment: string) => {
    cy.get(compareObj.faq.content(key)).should('contain.text', textFragment)
  },

  verifyFaqAnswerHidden: (key: string) => {
    cy.get(compareObj.faq.content(key)).should('not.exist')
  },
}
