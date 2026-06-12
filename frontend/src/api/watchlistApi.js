import http from './http'

export const watchlistApi = {
  /**
   * @returns {Promise<Array<{ id: number, coin: object }>>}
   */
  async list() {
    const { data } = await http.get('/api/watchlist')
    return data
  },

  async add(coinId) {
    const { data } = await http.post('/api/watchlist', { coinId })
    return data
  },

  async remove(coinId) {
    await http.delete(`/api/watchlist/${coinId}`)
  },
}
