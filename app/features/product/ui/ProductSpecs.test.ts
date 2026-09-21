import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProductSpecs from './ProductSpecs.vue'
import { backpack } from '~/test/fixtures'

const mountSpecs = (product = backpack) => mount(ProductSpecs, { props: { product } })

describe('ProductSpecs', () => {
  it('lists the five rows the design specifies, in order', () => {
    const labels = mountSpecs()
      .findAll('dt')
      .map((term) => term.text())

    expect(labels).toEqual(['قیمت', 'توضیحات', 'دسته بندی', 'رتبه', 'تعداد'])
  })

  it('shows the price exactly as the store sends it', () => {
    expect(mountSpecs().findAll('dd')[0]?.text()).toBe('109.95')
  })

  it('names the category exactly as the store does', () => {
    expect(mountSpecs().findAll('dd')[2]?.text()).toBe("men's clothing")
  })

  it('shows the rating and how many people gave it', () => {
    expect(mountSpecs().findAll('dd')[3]?.text()).toBe('3.9')
    expect(mountSpecs().findAll('dd')[4]?.text()).toBe('120')
  })

  it('marks the english description ltr so its punctuation holds', () => {
    expect(mountSpecs().findAll('dd')[1]?.attributes('dir')).toBe('ltr')
  })

  it('leaves the persian rows in the direction of the page', () => {
    expect(mountSpecs().findAll('dd')[0]?.attributes('dir')).toBeUndefined()
  })

  it('pairs each value with its label', () => {
    const wrapper = mountSpecs()

    expect(wrapper.findAll('dt')).toHaveLength(wrapper.findAll('dd').length)
  })
})
