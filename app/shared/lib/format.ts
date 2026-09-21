const whole = new Intl.NumberFormat('fa-IR')

export const count = (value: number) => whole.format(value)
