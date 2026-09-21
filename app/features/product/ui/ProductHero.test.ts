import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import ProductHero from './ProductHero.vue'
import { backpack } from '~/test/fixtures'
import { stubDialogMethods } from '~/test/dialog'

beforeAll(stubDialogMethods)

const mountHero = () =>
  mount(ProductHero, { props: { product: backpack }, attachTo: document.body })

describe('ProductHero', () => {
  it('makes the product title the heading of the page', () => {
    expect(mountHero().find('h1').text()).toBe('Fjallraven Foldsack No. 1 Backpack')
  })

  it('describes the photo with the title', () => {
    expect(mountHero().find('img').attributes('alt')).toBe('Fjallraven Foldsack No. 1 Backpack')
  })

  it('loads the photo straight away, since it is the first thing on the page', () => {
    expect(mountHero().find('img').attributes('loading')).toBeUndefined()
  })

  it('keeps the enlarged image closed until it is asked for', () => {
    expect(mountHero().find('dialog').element.open).toBe(false)
  })

  it('opens the image at full size', async () => {
    const wrapper = mountHero()

    await wrapper.get('button[aria-label="بزرگ‌نمایی تصویر"]').trigger('click')

    expect(wrapper.find('dialog').element.open).toBe(true)
  })

  it('closes the enlarged image from its own close button', async () => {
    const wrapper = mountHero()

    await wrapper.get('button[aria-label="بزرگ‌نمایی تصویر"]').trigger('click')
    await wrapper.get('button[aria-label="بستن تصویر"]').trigger('click')

    expect(wrapper.find('dialog').element.open).toBe(false)
  })

  it('describes the enlarged image too', () => {
    const images = mountHero().findAll('img')

    expect(images).toHaveLength(2)
    expect(images[1]?.attributes('alt')).toBe('Fjallraven Foldsack No. 1 Backpack')
  })
})
