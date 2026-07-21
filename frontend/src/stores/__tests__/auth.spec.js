import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../auth'
import { authApi } from '../../api/authApi'

vi.mock('../../api/authApi', () => ({
  authApi: {
    login: vi.fn(),
    logout: vi.fn(),
  },
}))

const STORAGE_KEY = 'coinpulse.auth'
const userSession = { token: 'user-jwt', username: 'standard_user', role: 'USER' }
const adminSession = { token: 'admin-jwt', username: 'admin', role: 'ADMIN' }
const credentials = { username: 'standard_user', password: 'unit-test-password' }

describe('auth store', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('starts without a session when nothing is persisted', () => {
    const store = useAuthStore()

    expect(store.token).toBeNull()
    expect(store.username).toBeNull()
    expect(store.role).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('restores a remembered session from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userSession))

    const store = useAuthStore()

    expect(store.token).toBe(userSession.token)
    expect(store.username).toBe(userSession.username)
    expect(store.role).toBe(userSession.role)
    expect(store.isAuthenticated).toBe(true)
  })

  it('restores a non-remembered session from sessionStorage', () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userSession))

    const store = useAuthStore()

    expect(store.token).toBe(userSession.token)
    expect(store.isAuthenticated).toBe(true)
  })

  it('ignores a corrupted persisted session', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')

    const store = useAuthStore()

    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('login stores the session in state and sessionStorage by default', async () => {
    authApi.login.mockResolvedValue(userSession)
    const store = useAuthStore()

    await store.login(credentials)

    expect(authApi.login).toHaveBeenCalledWith({
      username: credentials.username,
      password: credentials.password,
    })
    expect(store.token).toBe(userSession.token)
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(userSession))
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('login with rememberMe persists the session to localStorage', async () => {
    authApi.login.mockResolvedValue(userSession)
    const store = useAuthStore()

    await store.login({ ...credentials, rememberMe: true })

    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(userSession))
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('isAdmin is true only for the ADMIN role', async () => {
    authApi.login.mockResolvedValue(adminSession)
    const store = useAuthStore()

    await store.login(credentials)

    expect(store.isAdmin).toBe(true)
  })

  it('isAdmin is false for the USER role', async () => {
    authApi.login.mockResolvedValue(userSession)
    const store = useAuthStore()

    await store.login(credentials)

    expect(store.isAdmin).toBe(false)
  })

  it('logout clears the state and both storages', async () => {
    authApi.login.mockResolvedValue(userSession)
    authApi.logout.mockResolvedValue()
    const store = useAuthStore()
    await store.login({ ...credentials, rememberMe: true })

    await store.logout()

    expect(store.token).toBeNull()
    expect(store.username).toBeNull()
    expect(store.role).toBeNull()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('logout clears the session even when the API call fails', async () => {
    authApi.login.mockResolvedValue(userSession)
    authApi.logout.mockRejectedValue(new Error('network down'))
    const store = useAuthStore()
    await store.login(credentials)

    await store.logout()

    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })
})
