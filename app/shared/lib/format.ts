const money = new Intl.NumberFormat('fa-IR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const whole = new Intl.NumberFormat('fa-IR')
const oneDecimal = new Intl.NumberFormat('fa-IR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export const price = (value: number) => `${money.format(value)} دلار`

export const count = (value: number) => whole.format(value)

export const rate = (value: number) => oneDecimal.format(value)
