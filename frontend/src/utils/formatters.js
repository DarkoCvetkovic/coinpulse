const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const preciseCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 6,
})

export function formatCurrency(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return '-'
  // Sub-dollar coins (e.g. DOGE) need more decimals to be meaningful
  return num !== 0 && Math.abs(num) < 1
    ? preciseCurrencyFormatter.format(num)
    : currencyFormatter.format(num)
}

export function formatPercent(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return '-'
  const sign = num > 0 ? '+' : ''
  return `${sign}${num.toFixed(2)}%`
}

export function formatAmount(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return '-'
  return num.toLocaleString('en-US', { maximumFractionDigits: 8 })
}
