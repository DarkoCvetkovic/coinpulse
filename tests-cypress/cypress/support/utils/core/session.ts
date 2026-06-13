const SESSION_STORAGE_KEY = 'coinpulse.auth'

export function seedAuthSession(session: unknown, rememberMe: boolean): void {
  cy.window().then(win => {
    const store = rememberMe ? win.localStorage : win.sessionStorage
    store.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  })
}

export function readAuthSession(win: Window): string | null {
  return (
    win.localStorage.getItem(SESSION_STORAGE_KEY) ?? win.sessionStorage.getItem(SESSION_STORAGE_KEY)
  )
}
