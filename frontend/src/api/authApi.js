import http from './http'

export const authApi = {
  /**
   * @param {{ username: string, password: string }} credentials
   * @returns {Promise<{ token: string, username: string, role: string }>}
   */
  async login(credentials) {
    const { data } = await http.post('/api/auth/login', credentials)
    return data
  },

  async logout() {
    await http.post('/api/auth/logout')
  },
}
