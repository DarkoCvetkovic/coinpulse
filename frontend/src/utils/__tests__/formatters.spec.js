import { describe, expect, it } from 'vitest'
import { formatAmount, formatCurrency, formatPercent } from '../formatters'

describe('formatCurrency', () => {
  it('formats regular amounts with two decimals and grouping', () => {
    expect(formatCurrency(64250)).toBe('$64,250.00')
  })

  it('formats sub-dollar amounts with extended precision', () => {
    expect(formatCurrency(0.1357)).toBe('$0.1357')
  })

  it('formats zero with the regular formatter', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats negative sub-dollar amounts', () => {
    expect(formatCurrency(-0.5)).toBe('-$0.50')
  })

  it('accepts numeric strings', () => {
    expect(formatCurrency('1234.5')).toBe('$1,234.50')
  })

  it('returns a dash for non-numeric input', () => {
    expect(formatCurrency('not-a-number')).toBe('-')
  })
})

describe('formatPercent', () => {
  it('prefixes positive values with a plus sign', () => {
    expect(formatPercent(1.5)).toBe('+1.50%')
  })

  it('keeps the minus sign for negative values', () => {
    expect(formatPercent(-2.5)).toBe('-2.50%')
  })

  it('formats zero without a sign', () => {
    expect(formatPercent(0)).toBe('0.00%')
  })

  it('returns a dash for non-numeric input', () => {
    expect(formatPercent('not-a-number')).toBe('-')
  })
})

describe('formatAmount', () => {
  it('formats with grouping and up to eight decimals', () => {
    expect(formatAmount(1234.56789012)).toBe('1,234.56789012')
  })

  it('accepts numeric strings', () => {
    expect(formatAmount('42')).toBe('42')
  })

  it('returns a dash for non-numeric input', () => {
    expect(formatAmount('not-a-number')).toBe('-')
  })
})
