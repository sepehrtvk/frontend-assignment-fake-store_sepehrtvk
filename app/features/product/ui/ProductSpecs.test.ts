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

  it('writes the price in persian digits', () => {
    expect(mountSpecs().findAll('dd')[0]?.text()).toBe('۱۰۹٫۹۵ دلار')
  })

  it('names the category in persian rather than repeating the slug', () => {
    expect(mountSpecs().findAll('dd')[2]?.text()).toBe('پوشاک مردانه')
  })

  it('shows the rating and how many people gave it', () => {
    expect(mountSpecs().findAll('dd')[3]?.text()).toBe('۳٫۹')
    expect(mountSpecs().findAll('dd')[4]?.text()).toBe('۱۲۰')
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
