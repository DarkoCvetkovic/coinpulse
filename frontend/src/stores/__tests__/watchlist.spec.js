import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useWatchlistStore } from '../watchlist'
import { watchlistApi } from '../../api/watchlistApi'

vi.mock('../../api/watchlistApi', () => ({
  watchlistApi: {
    list: vi.fn(),
    add: vi.fn(),
    remove: vi.fn(),
  },
}))

const btcItem = { id: 1, coin: { id: 10, symbol: 'BTC' } }
const ethItem = { id: 2, coin: { id: 20, symbol: 'ETH' } }
const solItem = { id: 3, coin: { id: 30, symbol: 'SOL' } }

describe('watchlist store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('starts empty and not loaded', () => {
    const store = useWatchlistStore()

    expect(store.items).toEqual([])
    expect(store.loaded).toBe(false)
  })

  it('load fetches the items and marks the store as loaded', async () => {
    watchlistApi.list.mockResolvedValue([btcItem, ethItem])
    const store = useWatchlistStore()

    await store.load()

    expect(store.items).toEqual([btcItem, ethItem])
    expect(store.loaded).toBe(true)
  })

  it('contains reports membership by coin id', async () => {
    watchlistApi.list.mockResolvedValue([btcItem])
    const store = useWatchlistStore()
    await store.load()

    expect(store.contains(btcItem.coin.id)).toBe(true)
    expect(store.contains(solItem.coin.id)).toBe(false)
  })

  it('toggle adds a coin that is not on the watchlist', async () => {
    watchlistApi.list.mockResolvedValue([btcItem])
    watchlistApi.add.mockResolvedValue(solItem)
    const store = useWatchlistStore()
    await store.load()

    await store.toggle(solItem.coin.id)

    expect(watchlistApi.add).toHaveBeenCalledWith(solItem.coin.id)
    expect(store.items).toEqual([btcItem, solItem])
  })

  it('toggle removes a coin that is already on the watchlist', async () => {
    watchlistApi.list.mockResolvedValue([btcItem, ethItem])
    watchlistApi.remove.mockResolvedValue()
    const store = useWatchlistStore()
    await store.load()

    await store.toggle(ethItem.coin.id)

    expect(watchlistApi.remove).toHaveBeenCalledWith(ethItem.coin.id)
    expect(store.items).toEqual([btcItem])
  })

  it('reset clears the items and the loaded flag', async () => {
    watchlistApi.list.mockResolvedValue([btcItem])
    const store = useWatchlistStore()
    await store.load()

    store.reset()

    expect(store.items).toEqual([])
    expect(store.loaded).toBe(false)
  })
})
