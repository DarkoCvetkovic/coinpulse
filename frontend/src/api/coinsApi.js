import http from './http'

export const coinsApi = {
  /**
   * Paged list of coins. Supports page, size, sort (e.g. "rank,asc"),
   * category, status and search query params.
   * @returns {Promise<{ content: Array, page: { totalElements: number } }>}
   */
  async list(params = {}) {
    const { data } = await http.get('/api/coins', { params })
    return data
  },

  async getById(id) {
    const { data } = await http.get(`/api/coins/${id}`)
    return data
  },

  /** Admin only. */
  async create(coin) {
    const { data } = await http.post('/api/coins', coin)
    return data
  },

  /** Admin only. */
  async update(id, coin) {
    const { data } = await http.put(`/api/coins/${id}`, coin)
    return data
  },

  /** Admin only. */
  async remove(id) {
    await http.delete(`/api/coins/${id}`)
  },
}
