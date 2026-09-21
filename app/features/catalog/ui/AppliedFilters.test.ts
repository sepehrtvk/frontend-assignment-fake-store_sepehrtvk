import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppliedFilters from './AppliedFilters.vue'
import type { Filters } from '../model/filters'

const empty: Filters = { search: '', categories: [], sort: '' }

const mountChips = (filters: Partial<Filters> = {}) =>
  mount(AppliedFilters, { props: { filters: { ...empty, ...filters } } })

describe('AppliedFilters', () => {
  it('stays out of the way when nothing is filtered', () => {
    expect(mountChips().html()).toBe('<!--v-if-->')
  })

  it('shows the search term as a chip', () => {
    expect(mountChips({ search: 'gold' }).text()).toContain('gold')
  })

  it('names the sort rather than showing its key', () => {
    expect(mountChips({ sort: 'rate-desc' }).text()).toContain('رتبه: زیاد به کم')
  })

  it('shows one chip per chosen category, named as the store names it', () => {
    const wrapper = mountChips({ categories: ['jewelery', 'electronics'] })

    expect(wrapper.text()).toContain('jewelery')
    expect(wrapper.text()).toContain('electronics')
  })

  it('removes only the filter whose chip was pressed', async () => {
    const wrapper = mountChips({ search: 'gold', categories: ['jewelery'], sort: 'rate-desc' })

    await wrapper.findAll('button')[0]?.trigger('click')

    expect(wrapper.emitted('update:filters')?.at(-1)).toEqual([
      { search: '', categories: ['jewelery'], sort: 'rate-desc' },
    ])
  })

  it('offers one press back to the full list', async () => {
    const wrapper = mountChips({ search: 'gold', categories: ['jewelery'], sort: 'rate-desc' })

    await wrapper.findAll('button').at(-1)?.trigger('click')

    expect(wrapper.emitted('update:filters')?.at(-1)).toEqual([empty])
  })

  it('tells a screen reader what pressing a chip does', () => {
    expect(mountChips({ search: 'gold' }).find('button').text()).toContain('حذف فیلتر')
  })
})
