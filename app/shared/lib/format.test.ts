import { describe, expect, it } from 'vitest'
import { count } from './format'

describe('count', () => {
  it('writes the interface counts in persian digits', () => {
    expect(count(6)).toBe('۶')
  })

  it('groups the thousands', () => {
    expect(count(1200)).toBe('۱٬۲۰۰')
  })
})
