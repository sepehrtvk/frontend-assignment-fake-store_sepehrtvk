import { describe, expect, it } from 'vitest'
import {
  applyFilters,
  isFiltered,
  parseFilters,
  toQuery,
  toggleCategory,
  type Filters,
} from './filters'
import { makeProduct } from '~/test/fixtures'

const empty: Filters = { search: '', categories: [], sort: '' }

const products = [
  makeProduct({
    id: 1,
    title: 'Mens Casual Slim Fit',
    category: "men's clothing",
    rate: 2.1,
    count: 430,
  }),
  makeProduct({
    id: 2,
    title: 'Solid Gold Petite Micropave',
    category: 'jewelery',
    rate: 3.9,
    count: 70,
  }),
  makeProduct({
    id: 3,
    title: 'WD 2TB Elements Portable',
    category: 'electronics',
    rate: 3.3,
    count: 203,
  }),
  makeProduct({
    id: 4,
    title: 'Mens Cotton Jacket',
    category: "men's clothing",
    rate: 4.7,
    count: 500,
  }),
]

const ids = (filters: Partial<Filters>) =>
  applyFilters(products, { ...empty, ...filters }).map((product) => product.id)

describe('parseFilters', () => {
  it('reads an empty query as no filters at all', () => {
    expect(parseFilters({})).toEqual(empty)
  })

  it('trims the search term', () => {
    expect(parseFilters({ q: '  jacket ' }).search).toBe('jacket')
  })

  it('reads a single category as a list of one', () => {
    expect(parseFilters({ category: 'jewelery' }).categories).toEqual(['jewelery'])
  })

  it('reads a repeated category key as a list', () => {
    expect(parseFilters({ category: ['jewelery', 'electronics'] }).categories).toEqual([
      'jewelery',
      'electronics',
    ])
  })

  it('ignores a sort it does not know', () => {
    expect(parseFilters({ sort: 'price-desc' }).sort).toBe('')
  })

  it('keeps a sort it does know', () => {
    expect(parseFilters({ sort: 'rate-desc' }).sort).toBe('rate-desc')
  })
})

describe('toQuery', () => {
  it('leaves out every key that has no value', () => {
    expect(toQuery(empty)).toEqual({})
  })

  it('round trips the filters it was given', () => {
    const filters: Filters = { search: 'gold', categories: ['jewelery'], sort: 'count-asc' }

    expect(parseFilters(toQuery(filters))).toEqual(filters)
  })
})

describe('toggleCategory', () => {
  it('adds a category that was not chosen', () => {
    expect(toggleCategory(empty, 'jewelery').categories).toEqual(['jewelery'])
  })

  it('removes one that was', () => {
    const chosen: Filters = { ...empty, categories: ['jewelery', 'electronics'] }

    expect(toggleCategory(chosen, 'jewelery').categories).toEqual(['electronics'])
  })

  it('leaves the search and the sort alone', () => {
    const filters: Filters = { search: 'gold', categories: [], sort: 'rate-desc' }

    expect(toggleCategory(filters, 'jewelery')).toMatchObject({ search: 'gold', sort: 'rate-desc' })
  })

  it('returns a new object rather than editing the one it was given', () => {
    const filters: Filters = { ...empty, categories: ['jewelery'] }

    toggleCategory(filters, 'electronics')

    expect(filters.categories).toEqual(['jewelery'])
  })
})

describe('isFiltered', () => {
  it('is false until something is chosen', () => {
    expect(isFiltered(empty)).toBe(false)
  })

  it('is true for a search on its own', () => {
    expect(isFiltered({ ...empty, search: 'gold' })).toBe(true)
  })

  it('is true for a sort on its own', () => {
    expect(isFiltered({ ...empty, sort: 'rate-asc' })).toBe(true)
  })
})

describe('applyFilters', () => {
  it('returns everything when nothing is chosen', () => {
    expect(ids({})).toEqual([1, 2, 3, 4])
  })

  it('matches the search against the title, ignoring case', () => {
    expect(ids({ search: 'mens' })).toEqual([1, 4])
  })

  it('matches part of a word', () => {
    expect(ids({ search: 'port' })).toEqual([3])
  })

  it('treats several categories as any of them', () => {
    expect(ids({ categories: ['jewelery', 'electronics'] })).toEqual([2, 3])
  })

  it('requires the search and the category to agree', () => {
    expect(ids({ search: 'mens', categories: ['jewelery'] })).toEqual([])
  })

  it('sorts by how many people rated the product', () => {
    expect(ids({ sort: 'count-asc' })).toEqual([2, 3, 1, 4])
    expect(ids({ sort: 'count-desc' })).toEqual([4, 1, 3, 2])
  })

  it('sorts by the rating itself', () => {
    expect(ids({ sort: 'rate-desc' })).toEqual([4, 2, 3, 1])
    expect(ids({ sort: 'rate-asc' })).toEqual([1, 3, 2, 4])
  })

  it('leaves products with the same rating in the order the store sent them', () => {
    const tied = [makeProduct({ id: 7, rate: 4 }), makeProduct({ id: 8, rate: 4 })]

    expect(applyFilters(tied, { ...empty, sort: 'rate-desc' }).map((p) => p.id)).toEqual([7, 8])
  })

  it('sorts a filtered list rather than filtering a sorted one', () => {
    expect(ids({ categories: ["men's clothing"], sort: 'rate-desc' })).toEqual([4, 1])
  })

  it('leaves the given list untouched', () => {
    applyFilters(products, { ...empty, sort: 'rate-desc' })

    expect(products.map((product) => product.id)).toEqual([1, 2, 3, 4])
  })
})
