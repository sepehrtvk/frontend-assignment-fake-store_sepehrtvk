import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProductGrid from './ProductGrid.vue'
import { backpack, ring } from '~/test/fixtures'

const mountGrid = (products = [backpack, ring]) =>
  mount(ProductGrid, {
    props: { products },
    global: { stubs: { NuxtLink: RouterLinkStub } },
  })

describe('ProductGrid', () => {
  it('shows one card per product', () => {
    expect(mountGrid().findAll('li')).toHaveLength(2)
  })

  it('keeps the order it was given, since sorting happened upstream', () => {
    const links = mountGrid().findAllComponents(RouterLinkStub)

    expect(links.map((link) => link.props('to'))).toEqual(['/products/1', '/products/5'])
  })

  it('renders an empty list rather than failing on one', () => {
    expect(mountGrid([]).findAll('li')).toHaveLength(0)
  })
})
