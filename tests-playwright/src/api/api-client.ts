import { expect, type APIRequestContext } from '@playwright/test'
import { apiPaths } from '../constants/routes'
import { users } from '../constants/users'
import type { AuthSession, LoginCredentials } from '../models/auth'
import type { Coin, CoinInput } from '../models/coin'

const backendUrl = (path: string) => `${process.env.BACKEND_URL ?? 'http://localhost:8080'}${path}`

/**
 * Thin API helper over Playwright's APIRequestContext, mirroring the Cypress
 * api commands: backend reset, API login and admin coin seeding.
 */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  /** Resets the backend database to its seeded state via POST /api/test/reset. */
  async resetBackend(): Promise<void> {
    const response = await this.request.post(backendUrl(apiPaths.reset))
    expect(response.status()).toBe(200)
  }

  /** Logs in through the backend API and yields the auth session (token + role). */
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const response = await this.request.post(backendUrl(apiPaths.login), {
      data: { username: credentials.username, password: credentials.password },
    })
    expect(response.status()).toBe(200)
    return (await response.json()) as AuthSession
  }

  /** Creates a coin via POST /api/coins as admin and yields the created coin. */
  async createCoin(coin: CoinInput): Promise<Coin> {
    const session = await this.login(users.admin)
    const response = await this.request.post(backendUrl(apiPaths.coins), {
      headers: { Authorization: `Bearer ${session.token}` },
      data: coin,
    })
    expect(response.status()).toBe(201)
    return (await response.json()) as Coin
  }
}
