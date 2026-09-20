import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProductHero from './ProductHero.vue'
import { backpack } from '~/test/fixtures'

const mountHero = () => mount(ProductHero, { props: { product: backpack } })

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
})
