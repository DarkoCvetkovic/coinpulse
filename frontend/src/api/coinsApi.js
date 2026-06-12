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
}
