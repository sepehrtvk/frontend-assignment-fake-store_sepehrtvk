import type { LocationQuery, LocationQueryValue } from 'vue-router'
import type { Product } from './product.types'

export const SORT_KEYS = ['count-asc', 'count-desc', 'rate-desc', 'rate-asc'] as const

export type SortKey = (typeof SORT_KEYS)[number]

export interface Filters {
  search: string
  categories: string[]
  sort: SortKey | ''
}

type QueryValue = LocationQueryValue | LocationQueryValue[] | undefined

const comparators: Record<SortKey, (a: Product, b: Product) => number> = {
  'count-asc': (a, b) => a.count - b.count,
  'count-desc': (a, b) => b.count - a.count,
  'rate-desc': (a, b) => b.rate - a.rate,
  'rate-asc': (a, b) => a.rate - b.rate,
}

function readText(value: QueryValue): string {
  return typeof value === 'string' ? value.trim() : ''
}

function readList(value: QueryValue): string[] {
  const values = Array.isArray(value) ? value : [value]
  return values.filter((item): item is string => typeof item === 'string' && item.length > 0)
}

function isSortKey(value: string): value is SortKey {
  return SORT_KEYS.some((key) => key === value)
}

export function parseFilters(query: LocationQuery): Filters {
  const sort = readText(query.sort)

  return {
    search: readText(query.q),
    categories: readList(query.category),
    sort: isSortKey(sort) ? sort : '',
  }
}

export function toQuery(filters: Filters): LocationQuery {
  const query: LocationQuery = {}

  if (filters.search) query.q = filters.search
  if (filters.categories.length) query.category = filters.categories
  if (filters.sort) query.sort = filters.sort

  return query
}

export function toggleCategory(filters: Filters, value: string): Filters {
  const categories = filters.categories.includes(value)
    ? filters.categories.filter((category) => category !== value)
    : [...filters.categories, value]

  return { ...filters, categories }
}

export function isFiltered(filters: Filters): boolean {
  return Boolean(filters.search || filters.categories.length || filters.sort)
}

export function applyFilters(products: Product[], filters: Filters): Product[] {
  const search = filters.search.toLowerCase()

  const matching = products.filter(
    (product) =>
      (!search || product.title.toLowerCase().includes(search)) &&
      (!filters.categories.length || filters.categories.includes(product.category)),
  )

  return filters.sort ? [...matching].sort(comparators[filters.sort]) : matching
}
