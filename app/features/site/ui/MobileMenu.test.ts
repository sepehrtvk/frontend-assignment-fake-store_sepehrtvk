import { RouterLinkStub, mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import MobileMenu from './MobileMenu.vue'
import { stubDialogMethods } from '~/test/dialog'

beforeAll(stubDialogMethods)

const mountMenu = (open = true) =>
  mount(MobileMenu, {
    props: { open },
    global: { stubs: { NuxtLink: RouterLinkStub } },
    attachTo: document.body,
  })

describe('MobileMenu', () => {
  it('opens the dialog when the model says it is open', async () => {
    const wrapper = mountMenu(false)

    await wrapper.setProps({ open: true })

    expect(wrapper.find('dialog').element.open).toBe(true)
  })

  it('lists every entry in the site navigation', () => {
    const wrapper = mountMenu()

    expect(wrapper.text()).toContain('لیست محصولات')
    expect(wrapper.text()).toContain('تماس با ما')
  })

  it('links every entry, to the list until the other pages exist', () => {
    const links = mountMenu().findAllComponents(RouterLinkStub)

    expect(links).toHaveLength(4)
    expect(links.every((link) => link.props('to') === '/')).toBe(true)
  })

  it('marks only the products entry as the current page', () => {
    const current = mountMenu().findAll('[aria-current="page"]')

    expect(current).toHaveLength(1)
    expect(current[0]?.text()).toContain('لیست محصولات')
  })

  it('closes when an entry is chosen, even one that leads to this page', async () => {
    const wrapper = mountMenu()

    await wrapper.findAllComponents(RouterLinkStub)[1]?.trigger('click')

    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('closes when the close button is pressed', async () => {
    const wrapper = mountMenu()

    await wrapper.get('button[aria-label="بستن فهرست"]').trigger('click')

    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('names the dialog so a screen reader announces what opened', () => {
    expect(mountMenu().find('dialog').attributes('aria-label')).toBe('فهرست اصلی')
  })
})
