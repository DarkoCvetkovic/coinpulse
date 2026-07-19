/** Storage-state files produced by tests/auth.setup.ts, one per seeded account. */
export const authStates = {
  standard: 'playwright/.auth/standard.json',
  admin: 'playwright/.auth/admin.json',
}

/** Storage-state override for specs that must start signed out (login flow itself). */
export const signedOutState = { cookies: [], origins: [] }

/** localStorage key under which the frontend persists the auth session. */
export const sessionStorageKey = 'coinpulse.auth'
