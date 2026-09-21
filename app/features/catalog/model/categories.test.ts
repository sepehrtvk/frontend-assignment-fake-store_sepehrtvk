import { describe, expect, it } from 'vitest'
import { countCategories } from './categories'
import { makeProduct } from '~/test/fixtures'

describe('countCategories', () => {
  const products = [
    makeProduct({ id: 1, category: 'electronics' }),
    makeProduct({ id: 2, category: 'electronics' }),
    makeProduct({ id: 3, category: 'jewelery' }),
  ]

  it('counts the products in each category, named as the store names it', () => {
    expect(countCategories(products)).toEqual([
      { value: 'electronics', count: 2 },
      { value: 'jewelery', count: 1 },
    ])
  })

  it('leaves out categories nothing in the list belongs to', () => {
    expect(countCategories(products).map((c) => c.value)).not.toContain("men's clothing")
  })

  it('has nothing to offer for an empty list', () => {
    expect(countCategories([])).toEqual([])
  })
})
