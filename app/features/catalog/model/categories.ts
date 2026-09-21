import type { Product } from './product.types'

export interface CategoryFacet {
  value: string
  count: number
}

export function countCategories(products: Product[]): CategoryFacet[] {
  const counts = new Map<string, number>()

  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
  }

  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value))
}
