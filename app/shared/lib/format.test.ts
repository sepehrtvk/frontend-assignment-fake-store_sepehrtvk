import { describe, expect, it } from 'vitest'
import { count, price, rate } from './format'

describe('price', () => {
  it('writes the amount in persian digits and names the currency', () => {
    expect(price(109.95)).toBe('۱۰۹٫۹۵ دلار')
  })

  it('keeps two decimals on a round number', () => {
    expect(price(695)).toBe('۶۹۵٫۰۰ دلار')
  })
})

describe('count', () => {
  it('groups the thousands', () => {
    expect(count(1200)).toBe('۱٬۲۰۰')
  })
})

describe('rate', () => {
  it('always shows one decimal, so 4 and 4.5 line up', () => {
    expect(rate(4)).toBe('۴٫۰')
    expect(rate(3.9)).toBe('۳٫۹')
  })
})
