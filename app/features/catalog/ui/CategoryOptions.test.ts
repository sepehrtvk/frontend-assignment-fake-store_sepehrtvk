import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CategoryOptions from './CategoryOptions.vue'

const facets = [
  { value: 'electronics', label: 'لوازم الکترونیکی', count: 6 },
  { value: 'jewelery', label: 'طلا و جواهر', count: 4 },
]

const mountOptions = (categories: string[] = []) =>
  mount(CategoryOptions, { props: { facets, categories } })

describe('CategoryOptions', () => {
  it('names each category in persian', () => {
    expect(mountOptions().text()).toContain('لوازم الکترونیکی')
  })

  it('shows how many products each one holds', () => {
    expect(mountOptions().text()).toContain('۶')
  })

  it('ticks the categories the url already carries', () => {
    const inputs = mountOptions(['jewelery']).findAll('input')

    expect(inputs[0]?.element.checked).toBe(false)
    expect(inputs[1]?.element.checked).toBe(true)
  })

  it('reports the category that was toggled', async () => {
    const wrapper = mountOptions()

    await wrapper.findAll('input')[1]?.trigger('change')

    expect(wrapper.emitted('toggle')?.at(-1)).toEqual(['jewelery'])
  })

  it('reports a tick and an untick the same way, since the url decides', async () => {
    const wrapper = mountOptions(['jewelery'])

    await wrapper.findAll('input')[1]?.trigger('change')

    expect(wrapper.emitted('toggle')?.at(-1)).toEqual(['jewelery'])
  })

  it('reads the count as part of the label it belongs to', () => {
    expect(mountOptions().findAll('label')[0]?.text()).toBe('لوازم الکترونیکی۶')
  })

  it('has nothing to show when no products arrived', () => {
    expect(
      mount(CategoryOptions, { props: { facets: [], categories: [] } }).findAll('label'),
    ).toHaveLength(0)
  })
})
