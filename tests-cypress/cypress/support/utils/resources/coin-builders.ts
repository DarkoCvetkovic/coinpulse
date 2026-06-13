import type { CoinInput } from '../../models/coin'
import { randomSymbol } from '../core/random'

export function buildCoin(overrides: Partial<CoinInput> = {}): CoinInput {
  const symbol = randomSymbol()
  return {
    name: `Test Coin ${symbol}`,
    symbol,
    price: 1.23,
    marketCap: 1_000_000,
    change24h: 0,
    rank: null,
    category: 'L1',
    status: 'active',
    ...overrides,
  }
}
