import type { Product } from '~/features/catalog/model/product.types'

export function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    title: 'Fjallraven Foldsack No. 1 Backpack',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL.png',
    rate: 3.9,
    count: 120,
    ...overrides,
  }
}

export const backpack = makeProduct()

export const ring = makeProduct({
  id: 5,
  title: 'John Hardy Legends Naga Bracelet',
  price: 695,
  category: 'jewelery',
  rate: 4.6,
  count: 400,
})
