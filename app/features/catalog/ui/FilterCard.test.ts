import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FilterCard from './FilterCard.vue'

const mountCard = () =>
  mount(FilterCard, {
    props: { title: 'مرتب سازی' },
    slots: { default: '<p>گزینه‌ها</p>' },
  })

describe('FilterCard', () => {
  it('shows its title', () => {
    expect(mountCard().find('summary').text()).toContain('مرتب سازی')
  })

  it('shows what it was given', () => {
    expect(mountCard().text()).toContain('گزینه‌ها')
  })

  it('starts open, so the filters are visible without a click', () => {
    expect(mountCard().find('details').attributes('open')).toBeDefined()
  })
})
