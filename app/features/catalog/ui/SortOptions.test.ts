import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SortOptions from './SortOptions.vue'

const mountOptions = (sort: '' | 'rate-desc' = '') => mount(SortOptions, { props: { sort } })

describe('SortOptions', () => {
  it('offers the four orders the design specifies', () => {
    const labels = mountOptions()
      .findAll('label')
      .map((label) => label.text())

    expect(labels).toEqual([
      'تعداد: کم به زیاد',
      'تعداد: زیاد به کم',
      'رتبه: زیاد به کم',
      'رتبه: کم به زیاد',
    ])
  })

  it('checks nothing until an order is chosen', () => {
    const checked = mountOptions()
      .findAll('input')
      .filter((input) => input.element.checked)

    expect(checked).toHaveLength(0)
  })

  it('marks the chosen order', () => {
    const inputs = mountOptions('rate-desc').findAll('input')

    expect(inputs[2]?.element.checked).toBe(true)
  })

  it('reports the order that was picked', async () => {
    const wrapper = mountOptions()

    await wrapper.findAll('input')[1]?.trigger('change')

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['count-desc'])
  })

  it('groups the radios under a name a screen reader can read out', () => {
    expect(mountOptions().find('legend').text()).toBe('مرتب سازی محصولات')
  })

  it('keeps the radios of one instance from fighting another on the page', () => {
    const wrapper = mount(
      {
        components: { SortOptions },
        template: '<div><SortOptions sort="" /><SortOptions sort="" /></div>',
      },
      { attachTo: document.body },
    )

    const [sidebar, sheet] = wrapper.findAllComponents(SortOptions)

    expect(sidebar?.find('input').attributes('name')).not.toBe(
      sheet?.find('input').attributes('name'),
    )
  })
})
