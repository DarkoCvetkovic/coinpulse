import type { CoinInput } from '../models/coin'

export function action_seedCoin(coin: CoinInput) {
  cy.log(`Seed coin via the API: ${coin.symbol}`)

  return cy.createCoin(coin)
}
