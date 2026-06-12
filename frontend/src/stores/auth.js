import { defineStore } from 'pinia'
import { authApi } from '../api/authApi'

const STORAGE_KEY = 'coinpulse.auth'

function readPersistedSession() {
  // "Remember me" sessions live in localStorage, ordinary ones in sessionStorage
  const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: readPersistedSession()?.token ?? null,
    username: readPersistedSession()?.username ?? null,
    role: readPersistedSession()?.role ?? null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    isAdmin: (state) => state.role === 'ADMIN',
  },

  actions: {
    async login({ username, password, rememberMe = false }) {
      const session = await authApi.login({ username, password })
      this.token = session.token
      this.username = session.username
      this.role = session.role
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem(STORAGE_KEY, JSON.stringify(session))
    },

    async logout() {
      try {
        await authApi.logout()
      } catch {
        // The backend call is best-effort; the local session is cleared regardless
      }
      this.clearSession()
    },

    clearSession() {
      this.token = null
      this.username = null
      this.role = null
      localStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(STORAGE_KEY)
    },
  },
})
