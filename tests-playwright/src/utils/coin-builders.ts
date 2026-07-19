import type { CoinInput } from '../models/coin'
import { randomSymbol } from './random'

/** Builds a valid coin payload for API seeding; override any field per test. */
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
