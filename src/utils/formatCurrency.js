export function formatCurrency(value, currency) {
  return new Intl.NumberFormat('ka-GE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}
