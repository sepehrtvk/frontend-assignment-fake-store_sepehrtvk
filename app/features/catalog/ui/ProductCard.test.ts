import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProductCard from './ProductCard.vue'
import { backpack } from '~/test/fixtures'

const mountCard = (product = backpack) =>
  mount(ProductCard, {
    props: { product },
    global: { stubs: { NuxtLink: RouterLinkStub } },
  })

describe('ProductCard', () => {
  it('shows the title the store sent', () => {
    expect(mountCard().text()).toContain('Fjallraven Foldsack No. 1 Backpack')
  })

  it('leads to the product it describes', () => {
    expect(mountCard().getComponent(RouterLinkStub).props('to')).toBe('/products/1')
  })

  it('is a single link, so one product costs one tab stop', () => {
    expect(mountCard().findAllComponents(RouterLinkStub)).toHaveLength(1)
  })

  it('describes the photo with the product title', () => {
    expect(mountCard().find('img').attributes('alt')).toBe('Fjallraven Foldsack No. 1 Backpack')
  })

  it('leaves photos below the fold to the browser', () => {
    expect(mountCard().find('img').attributes('loading')).toBe('lazy')
  })

  it('shows the price and the rating the sort options order by', () => {
    const text = mountCard().text()

    expect(text).toContain('۱۰۹٫۹۵ دلار')
    expect(text).toContain('۳٫۹')
  })

  it('lets an english title render left to right inside the rtl page', () => {
    expect(mountCard().find('p').attributes('dir')).toBe('ltr')
  })
})
