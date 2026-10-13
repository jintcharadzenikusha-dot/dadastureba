export function formatCurrency(value, currency = 'GEL') {
  return new Intl.NumberFormat('ka-GE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}
