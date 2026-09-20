import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AlertBanner from './AlertBanner.vue'

describe('AlertBanner', () => {
  it('shows the message it was given', () => {
    expect(mount(AlertBanner, { props: { message: 'فروشگاه در دسترس نیست' } }).text()).toContain(
      'فروشگاه در دسترس نیست',
    )
  })

  it('announces itself without waiting for focus', () => {
    const wrapper = mount(AlertBanner, { props: { message: 'خطا' } })

    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('makes room for a way out of the error', () => {
    const wrapper = mount(AlertBanner, {
      props: { message: 'خطا' },
      slots: { action: '<button>تلاش دوباره</button>' },
    })

    expect(wrapper.find('button').text()).toBe('تلاش دوباره')
  })

  it('renders nothing extra when there is no action', () => {
    expect(
      mount(AlertBanner, { props: { message: 'خطا' } })
        .find('button')
        .exists(),
    ).toBe(false)
  })
})
