export function isNumeric(value: unknown): boolean {
  return (
    (typeof value === 'number' && !isNaN(value)) ||
    (typeof value === 'string' && value.trim() != '' && !isNaN(Number(value)))
  )
}
