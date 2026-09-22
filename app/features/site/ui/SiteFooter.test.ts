import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SiteFooter from './SiteFooter.vue'

const mountFooter = () => mount(SiteFooter, { global: { stubs: { NuxtLink: RouterLinkStub } } })

const bottomRow = () => mountFooter().findAll('a[aria-label]')

describe('SiteFooter', () => {
  it('orders the social icons to read telegram to linkedin from left to right, as drawn', () => {
    expect(bottomRow().map((link) => link.attributes('aria-label'))).toEqual([
      'لینکدین',
      'یوتیوب',
      'توییتر',
      'اینستاگرام',
      'تلگرام',
    ])
  })

  it('rests the social icons in the light pink and hovers them to the brand pink', () => {
    const classes = bottomRow()[0]?.classes()

    expect(classes).toContain('text-brand-light')
    expect(classes).toContain('hover:text-brand')
  })

  it('rests the icons beside the social labels in the muted grey', () => {
    const icon = mountFooter().findAll('ul.gap-4 svg')[0]

    expect(icon?.classes()).toContain('text-muted')
    expect(icon?.classes()).toContain('group-hover:text-brand')
  })

  it('shows both trust badges, each described for screen readers', () => {
    const alts = mountFooter()
      .findAll('img')
      .map((image) => image.attributes('alt'))

    expect(alts).toEqual(['نشان ملی ثبت رسانه‌های دیجیتال', 'نماد اعتماد الکترونیکی'])
  })

  it('links every entry to the list until the other pages exist', () => {
    const links = mountFooter().findAllComponents(RouterLinkStub)

    expect(links.length).toBeGreaterThan(0)
    expect(links.every((link) => link.props('to') === '/')).toBe(true)
  })
})
