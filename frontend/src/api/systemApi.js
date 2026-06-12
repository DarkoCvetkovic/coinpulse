import http from './http'

export const systemApi = {
  /**
   * Cheap unauthenticated call used to wake the free-tier backend
   * from its cold-start sleep before the user actually needs it.
   */
  async ping() {
    await http.get('/api/test/slow', { params: { ms: 1 } })
  },
}
