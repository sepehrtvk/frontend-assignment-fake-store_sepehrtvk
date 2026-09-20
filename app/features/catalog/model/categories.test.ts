import { describe, expect, it } from 'vitest'
import { categoryLabel, countCategories } from './categories'
import { makeProduct } from '~/test/fixtures'

describe('categoryLabel', () => {
  it('names each category the store sends in persian', () => {
    expect(categoryLabel('electronics')).toBe('لوازم الکترونیکی')
    expect(categoryLabel("men's clothing")).toBe('پوشاک مردانه')
  })

  it("keeps the store's own spelling of jewelery as the key", () => {
    expect(categoryLabel('jewelery')).toBe('طلا و جواهر')
  })

  it('falls back to the raw value for a category it has never seen', () => {
    expect(categoryLabel('groceries')).toBe('groceries')
  })
})

describe('countCategories', () => {
  const products = [
    makeProduct({ id: 1, category: 'electronics' }),
    makeProduct({ id: 2, category: 'electronics' }),
    makeProduct({ id: 3, category: 'jewelery' }),
  ]

  it('counts the products in each category', () => {
    expect(countCategories(products)).toEqual([
      { value: 'jewelery', label: 'طلا و جواهر', count: 1 },
      { value: 'electronics', label: 'لوازم الکترونیکی', count: 2 },
    ])
  })

  it('leaves out categories nothing in the list belongs to', () => {
    expect(countCategories(products).map((c) => c.value)).not.toContain("men's clothing")
  })

  it('has nothing to offer for an empty list', () => {
    expect(countCategories([])).toEqual([])
  })
})
