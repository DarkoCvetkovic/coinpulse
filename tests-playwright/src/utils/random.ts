/** Yields a unique-enough coin symbol like Z04217 for API-seeded test coins. */
export function randomSymbol(prefix = 'Z'): string {
  const digits = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0')
  return `${prefix}${digits}`
}
