export type Role = 'USER' | 'ADMIN'

export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

export interface AuthSession {
  token: string
  username: string
  role: Role
}
