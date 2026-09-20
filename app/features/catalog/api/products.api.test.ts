import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchProduct, fetchProducts } from './products.api'

const backpack = {
  id: 1,
  title: 'Fjallraven Foldsack No. 1 Backpack',
  price: 109.95,
  description: 'Your perfect pack for everyday use.',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL.png',
  rating: { rate: 3.9, count: 120 },
}

const respond = (body: unknown) => ({ ok: true, status: 200, json: async () => body }) as Response

const respondEmptyBody = () =>
  ({
    ok: true,
    status: 200,
    json: async () => {
      throw new SyntaxError('Unexpected end of JSON input')
    },
  }) as unknown as Response

const respondStatus = (status: number) =>
  ({ ok: false, status, json: async () => null }) as Response

const answerWith = (res: Response) =>
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => res),
  )

afterEach(() => vi.unstubAllGlobals())

describe('fetchProducts', () => {
  it('flattens the nested rating onto the product', async () => {
    answerWith(respond([backpack]))

    expect(await fetchProducts()).toEqual([
      {
        id: 1,
        title: 'Fjallraven Foldsack No. 1 Backpack',
        price: 109.95,
        description: 'Your perfect pack for everyday use.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL.png',
        rate: 3.9,
        count: 120,
      },
    ])
  })

  it('drops entries that have no id, title or image', async () => {
    answerWith(respond([backpack, { id: 2, title: 'No image' }, { title: 'No id', image: 'x' }]))

    const products = await fetchProducts()

    expect(products.map((p) => p.id)).toEqual([1])
  })

  it('reads an unrated product as zero rather than dropping it', async () => {
    answerWith(respond([{ ...backpack, rating: undefined }]))

    const [product] = await fetchProducts()

    expect(product).toMatchObject({ rate: 0, count: 0 })
  })

  it('explains an unreachable store instead of leaking the fetch error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('Failed to fetch')
      }),
    )

    await expect(fetchProducts()).rejects.toThrow('اتصال اینترنت خود را بررسی کنید')
  })

  it('reports the status when the store refuses the request', async () => {
    answerWith(respondStatus(503))

    await expect(fetchProducts()).rejects.toThrow('(503)')
  })

  it('treats a response with no usable product as a failure', async () => {
    answerWith(respond([{ title: 'nameless' }]))

    await expect(fetchProducts()).rejects.toThrow('هیچ محصولی')
  })
})

describe('fetchProduct', () => {
  it('returns the product the store has', async () => {
    answerWith(respond(backpack))

    expect(await fetchProduct(1)).toMatchObject({ id: 1, rate: 3.9 })
  })

  it('returns nothing for an id the store answers with an empty body', async () => {
    answerWith(respondEmptyBody())

    expect(await fetchProduct(999)).toBeNull()
  })

  it('returns nothing when the body is missing the fields a product needs', async () => {
    answerWith(respond({ id: 999 }))

    expect(await fetchProduct(999)).toBeNull()
  })
})
