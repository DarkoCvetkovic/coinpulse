import type { LoginCredentials } from '../models/auth'

function credential(usernameKey: string, passwordKey: string): LoginCredentials {
  return {
    username: String(Cypress.expose(usernameKey) ?? ''),
    password: String(Cypress.expose(passwordKey) ?? ''),
  }
}

export const users = {
  standard: credential('STANDARD_USERNAME', 'STANDARD_PASSWORD'),
  locked: credential('LOCKED_USERNAME', 'LOCKED_PASSWORD'),
  admin: credential('ADMIN_USERNAME', 'ADMIN_PASSWORD'),
} satisfies Record<string, LoginCredentials>
