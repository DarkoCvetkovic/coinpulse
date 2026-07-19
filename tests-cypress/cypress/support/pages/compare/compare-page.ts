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

  verifyShellReady: () => {
    cy.get(compareObj.watchlist.card).should('be.visible')
    cy.get(compareObj.zone.card).should('be.visible')
    cy.get(compareObj.zone.dropArea).should('be.visible')
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
    cy.uiDblClick(compareObj.watchlist.item(symbol))
  },

  addByDragAndDrop: (symbol: string) => {
    cy.uiTrigger(compareObj.watchlist.item(symbol), 'dragstart')
    cy.uiTrigger(compareObj.zone.dropArea, 'drop')
  },

  addByContextMenu: (symbol: string) => {
    cy.uiRightClick(compareObj.watchlist.item(symbol))
    cy.get(compareObj.contextMenu.menu).should('be.visible')
    cy.uiClick(compareObj.contextMenu.addCompare)
    cy.get(compareObj.contextMenu.menu).should('not.exist')
  },

  reorderByDrag: (fromSymbol: string, toSymbol: string) => {
    cy.uiTrigger(compareObj.watchlist.item(fromSymbol), 'dragstart')
    cy.uiTrigger(compareObj.watchlist.item(toSymbol), 'drop')
  },

  removeFromWatchlistViaMenu: (symbol: string) => {
    cy.uiRightClick(compareObj.watchlist.item(symbol))
    cy.uiClick(compareObj.contextMenu.removeWatchlist)
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
    cy.uiClick(compareObj.zone.chipRemove(symbol))
  },

  verifyLimitModalShown: () => {
    cy.get(compareObj.limitModal.modal).should('be.visible')
  },

  closeLimitModal: () => {
    cy.uiClick(compareObj.limitModal.ok)
    cy.get(compareObj.limitModal.modal).should('not.exist')
  },

  openClearModal: () => {
    cy.uiClick(compareObj.zone.clearButton)
    cy.get(compareObj.clearModal.modal).should('be.visible')
  },

  cancelClear: () => {
    cy.uiClick(compareObj.clearModal.cancel)
    cy.get(compareObj.clearModal.modal).should('not.exist')
  },

  confirmClear: () => {
    cy.uiClick(compareObj.clearModal.confirm)
    cy.get(compareObj.clearModal.modal).should('not.exist')
  },

  verifyResultsShown: () => {
    cy.get(compareObj.results.card).should('be.visible')
  },

  verifyResultsHidden: () => {
    cy.get(compareObj.results.card).should('not.exist')
  },

  selectTab: (key: string) => {
    cy.uiClick(compareObj.results.tab(key))
  },

  verifyOverviewColumn: (symbol: string, coinName: string) => {
    cy.get(compareObj.results.column(symbol)).should('contain.text', coinName)
  },

  verifyOverviewValue: (metric: string, symbol: string, expected: string) => {
    cy.get(compareObj.results.value(metric, symbol)).should('contain.text', expected)
  },

  verifyMetricTooltip: (metric: string, text: string) => {
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
    cy.uiClick(compareObj.faq.toggle(key))
  },

  verifyFaqAnswerShown: (key: string, textFragment: string) => {
    cy.get(compareObj.faq.content(key)).should('contain.text', textFragment)
  },

  verifyFaqAnswerHidden: (key: string) => {
    cy.get(compareObj.faq.content(key)).should('not.exist')
  },
}
