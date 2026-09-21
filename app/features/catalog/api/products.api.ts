import type { Product } from '../model/product.types'

const BASE = 'https://fakestoreapi.com'

const UNREACHABLE = 'فروشگاه در دسترس نیست. اتصال اینترنت خود را بررسی کنید.'
const EMPTY = 'فروشگاه هیچ محصولی برنگرداند.'

interface RawProduct {
  id?: number
  title?: string
  price?: number
  description?: string
  category?: string
  image?: string
  rating?: { rate?: number; count?: number }
}

type UsableProduct = RawProduct & { id: number; title: string; image: string }

async function request(path: string): Promise<unknown> {
  let res: Response
  try {
    res = await fetch(`${BASE}${path}`)
  } catch {
    throw new Error(UNREACHABLE)
  }

  if (!res.ok) throw new Error(`دریافت اطلاعات از فروشگاه ناموفق بود (${res.status})`)

  return res.json().catch(() => null)
}

function isUsable(raw: RawProduct): raw is UsableProduct {
  return typeof raw.id === 'number' && Boolean(raw.title) && Boolean(raw.image)
}

function toProduct(raw: UsableProduct): Product {
  return {
    id: raw.id,
    title: raw.title,
    price: raw.price ?? 0,
    description: raw.description ?? '',
    category: raw.category ?? '',
    image: raw.image,
    rate: raw.rating?.rate ?? 0,
    count: raw.rating?.count ?? 0,
  }
}

function toProducts(body: unknown): Product[] {
  const raw: RawProduct[] = Array.isArray(body) ? body : []
  return raw.filter(isUsable).map(toProduct)
}

export async function fetchProducts(): Promise<Product[]> {
  const products = toProducts(await request('/products'))

  if (!products.length) throw new Error(EMPTY)

  return products
}

export async function fetchProductsInCategories(categories: string[]): Promise<Product[]> {
  const lists = await Promise.all(
    categories.map(async (category) =>
      toProducts(await request(`/products/category/${encodeURIComponent(category)}`)),
    ),
  )

  return lists.flat().sort((a, b) => a.id - b.id)
}

export async function fetchProduct(id: number): Promise<Product | null> {
  const body = await request(`/products/${id}`)
  if (!body || typeof body !== 'object') return null

  const raw = body as RawProduct
  return isUsable(raw) ? toProduct(raw) : null
}
