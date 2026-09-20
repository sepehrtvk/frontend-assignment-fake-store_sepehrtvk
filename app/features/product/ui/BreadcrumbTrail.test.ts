import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BreadcrumbTrail from './BreadcrumbTrail.vue'

const mountTrail = (title = 'Fjallraven Foldsack No. 1 Backpack') =>
  mount(BreadcrumbTrail, {
    props: { title },
    global: { stubs: { NuxtLink: RouterLinkStub } },
  })

describe('BreadcrumbTrail', () => {
  it('ends at the product being looked at', () => {
    expect(mountTrail().find('[aria-current="page"]').text()).toBe(
      'Fjallraven Foldsack No. 1 Backpack',
    )
  })

  it('offers two ways back to the list', () => {
    const links = mountTrail().findAllComponents(RouterLinkStub)

    expect(links.map((link) => link.props('to'))).toEqual(['/', '/'])
  })

  it('names itself, since a page can hold more than one nav', () => {
    expect(mountTrail().find('nav').attributes('aria-label')).toBe('مسیر صفحه')
  })

  it('hides the separators from screen readers', () => {
    expect(mountTrail().findAll('[aria-hidden="true"]').length).toBeGreaterThan(0)
  })
})
