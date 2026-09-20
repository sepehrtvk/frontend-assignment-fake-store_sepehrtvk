import type { Product } from './product.types'

const LABELS: Record<string, string> = {
  electronics: 'لوازم الکترونیکی',
  jewelery: 'طلا و جواهر',
  "men's clothing": 'پوشاک مردانه',
  "women's clothing": 'پوشاک زنانه',
}

export interface CategoryFacet {
  value: string
  label: string
  count: number
}

export function categoryLabel(value: string): string {
  return LABELS[value] ?? value
}

export function countCategories(products: Product[]): CategoryFacet[] {
  const counts = new Map<string, number>()

  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
  }

  return [...counts]
    .map(([value, count]) => ({ value, label: categoryLabel(value), count }))
    .sort((a, b) => a.label.localeCompare(b.label, 'fa'))
}
