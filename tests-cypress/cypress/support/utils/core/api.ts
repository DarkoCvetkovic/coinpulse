import { apiPaths } from '../../constants/routes'
import type { LoginCredentials } from '../../models/auth'
import { backendUrl } from './backend'

export function apiToken(credentials: LoginCredentials) {
  return cy
    .request<{ token: string }>('POST', backendUrl(apiPaths.login), {
      username: credentials.username,
      password: credentials.password,
    })
    .then(res => res.body.token)
}
