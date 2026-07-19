import type { LoginCredentials } from '../models/auth'

function credential(usernameKey: string, passwordKey: string): LoginCredentials {
  return {
    username: process.env[usernameKey] ?? '',
    password: process.env[passwordKey] ?? '',
  }
}

/** Seeded accounts, filled from .env (see .env.example). */
export const users = {
  standard: credential('STANDARD_USERNAME', 'STANDARD_PASSWORD'),
  locked: credential('LOCKED_USERNAME', 'LOCKED_PASSWORD'),
  admin: credential('ADMIN_USERNAME', 'ADMIN_PASSWORD'),
} satisfies Record<string, LoginCredentials>
