import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import EmptyState from './EmptyState.vue'

describe('EmptyState', () => {
  it('says what is missing', () => {
    expect(mount(EmptyState, { props: { title: 'محصولی پیدا نشد' } }).text()).toContain(
      'محصولی پیدا نشد',
    )
  })

  it('adds the hint when there is something to suggest', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'محصولی پیدا نشد', hint: 'فیلترها را بردارید' },
    })

    expect(wrapper.text()).toContain('فیلترها را بردارید')
  })

  it('leaves the hint out rather than rendering an empty line', () => {
    expect(mount(EmptyState, { props: { title: 'محصولی پیدا نشد' } }).findAll('p')).toHaveLength(1)
  })

  it('hides its illustration from screen readers', () => {
    const wrapper = mount(EmptyState, { props: { title: 'محصولی پیدا نشد' } })

    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
  })
})
