import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import FilterSheet from './FilterSheet.vue'
import FilterPanel from './FilterPanel.vue'
import type { Filters } from '../model/filters'
import { stubDialogMethods } from '~/test/dialog'

beforeAll(stubDialogMethods)

const empty: Filters = { search: '', categories: [], sort: '' }

const facets = [{ value: 'jewelery', label: 'طلا و جواهر', count: 4 }]

const mountSheet = (open = true, results = 6) =>
  mount(FilterSheet, {
    props: { open, filters: empty, facets, results },
    attachTo: document.body,
  })

describe('FilterSheet', () => {
  it('shows the same panel the sidebar shows', () => {
    expect(mountSheet().findComponent(FilterPanel).exists()).toBe(true)
  })

  it('says how many products the current filters leave', () => {
    expect(mountSheet(true, 6).text()).toContain('نمایش ۶ محصول')
  })

  it('closes when the results button is pressed', async () => {
    const wrapper = mountSheet()

    const results = wrapper.findAll('button').find((button) => button.text().includes('نمایش'))

    await results?.trigger('click')

    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('closes from the header button too', async () => {
    const wrapper = mountSheet()

    await wrapper.get('button[aria-label="بستن فیلترها"]').trigger('click')

    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('passes a filter change straight through', async () => {
    const wrapper = mountSheet()

    wrapper.findComponent(FilterPanel).vm.$emit('update:filters', { ...empty, search: 'gold' })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:filters')?.at(-1)).toEqual([{ ...empty, search: 'gold' }])
  })

  it('names itself so a screen reader announces what opened', () => {
    expect(mountSheet().find('dialog').attributes('aria-label')).toBe('فیلتر و جستجو')
  })
})
