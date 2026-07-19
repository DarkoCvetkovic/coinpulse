import type { ApiClient } from '../api/api-client'
import { test } from '../fixtures/fixtures'
import type { Coin, CoinInput } from '../models/coin'

export async function action_seedCoin(api: ApiClient, coin: CoinInput): Promise<Coin> {
  return test.step(`Seed coin via the API: ${coin.symbol}`, async () => {
    return api.createCoin(coin)
  })
}

export async function action_resetBackend(api: ApiClient): Promise<void> {
  await test.step('Reset the backend to its seeded state', async () => {
    await api.resetBackend()
  })
}
