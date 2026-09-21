import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchBox from './SearchBox.vue'

const mountBox = (search = '') => mount(SearchBox, { props: { search } })

describe('SearchBox', () => {
  it('starts from the term already in the url', () => {
    expect(mountBox('jacket').find('input').element.value).toBe('jacket')
  })

  it('submits the term rather than searching on every keystroke', async () => {
    const wrapper = mountBox()

    await wrapper.find('input').setValue('gold')

    expect(wrapper.emitted('submit')).toBeUndefined()

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')?.at(-1)).toEqual(['gold'])
  })

  it('trims what the user typed', async () => {
    const wrapper = mountBox()

    await wrapper.find('input').setValue('  gold  ')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')?.at(-1)).toEqual(['gold'])
  })

  it('offers no way to clear an empty field', () => {
    expect(mountBox().find('button[aria-label="پاک کردن جستجو"]').exists()).toBe(false)
  })

  it('clears the term and says so in one press', async () => {
    const wrapper = mountBox('gold')

    await wrapper.get('button[aria-label="پاک کردن جستجو"]').trigger('click')

    expect(wrapper.find('input').element.value).toBe('')
    expect(wrapper.emitted('submit')?.at(-1)).toEqual([''])
  })

  it('follows the term when the url changes underneath it', async () => {
    const wrapper = mountBox('gold')

    await wrapper.setProps({ search: '' })

    expect(wrapper.find('input').element.value).toBe('')
  })

  it('names the field for people who cannot see the placeholder', () => {
    expect(mountBox().find('input').attributes('aria-label')).toBe('جستجوی محصولات')
  })

  it('announces the slash shortcut that focuses it', () => {
    expect(mountBox().find('input').attributes('aria-keyshortcuts')).toBe('/')
  })

  it('shows the shortcut hint while the field is empty', () => {
    expect(mountBox().find('kbd').text()).toBe('/')
  })

  it('swaps the hint for the clear button once there is a term', () => {
    const wrapper = mountBox('gold')

    expect(wrapper.find('kbd').exists()).toBe(false)
    expect(wrapper.find('button[aria-label="پاک کردن جستجو"]').exists()).toBe(true)
  })
})
