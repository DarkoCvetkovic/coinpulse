export function backendUrl(path: string): string {
  return `${String(Cypress.expose('BACKEND_URL') ?? '')}${path}`
}
