import { defineStore } from 'pinia'
import { watchlistApi } from '../api/watchlistApi'

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    items: [],
    loaded: false,
  }),

  getters: {
    coinIds: (state) => new Set(state.items.map((item) => item.coin.id)),
    contains() {
      return (coinId) => this.coinIds.has(coinId)
    },
  },

  actions: {
    async load() {
      this.items = await watchlistApi.list()
      this.loaded = true
    },

    async toggle(coinId) {
      if (this.contains(coinId)) {
        await watchlistApi.remove(coinId)
        this.items = this.items.filter((item) => item.coin.id !== coinId)
      } else {
        const item = await watchlistApi.add(coinId)
        this.items.push(item)
      }
    },

    reset() {
      this.items = []
      this.loaded = false
    },
  },
})
