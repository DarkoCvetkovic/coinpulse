import http from './http'

export const transactionsApi = {
  /**
   * Transactions of the logged-in user.
   * @returns {Promise<Array<{ id: number, coin: object, type: 'buy'|'sell',
   *   amount: number, price: number, date: string, note: string }>>}
   */
  async list() {
    const { data } = await http.get('/api/transactions')
    return data
  },
}
