import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProductCard from './ProductCard.vue'
import { backpack } from '~/test/fixtures'

const mountCard = (product = backpack, highlight?: string) =>
  mount(ProductCard, {
    props: { product, highlight },
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

  it('shows the price and the rating exactly as the store sends them', () => {
    const text = mountCard().text()

    expect(text).toContain('109.95')
    expect(text).toContain('3.9')
  })

  it('lets an english title render left to right inside the rtl page', () => {
    expect(mountCard().find('p').attributes('dir')).toBe('ltr')
  })

  it('names its photo so the product page can morph out of it', () => {
    expect(mountCard().find('[style*="view-transition-name"]').attributes('style')).toContain(
      'view-transition-name: product-1',
    )
  })

  it('marks the part of the title the search matched, keeping the title casing', () => {
    const marks = mountCard(backpack, 'FOLD').findAll('mark')

    expect(marks.map((mark) => mark.text())).toEqual(['Fold'])
  })

  it('still reads as the whole title around the mark', () => {
    expect(mountCard(backpack, 'fold').find('p').text()).toBe('Fjallraven Foldsack No. 1 Backpack')
  })

  it('marks nothing when there is no search', () => {
    expect(mountCard().findAll('mark')).toHaveLength(0)
  })
})
