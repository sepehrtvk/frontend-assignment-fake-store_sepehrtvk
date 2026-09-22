import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppIcon from './AppIcon.vue'
import { icons, type IconName } from './icons'

const names = Object.keys(icons) as IconName[]

describe('AppIcon', () => {
  it.each(names)('keeps the viewBox of %s, so it scales instead of cropping', (name) => {
    expect(mount(AppIcon, { props: { name } }).find('svg').attributes('viewBox')).toMatch(
      /^0 0 \d+ \d+$/,
    )
  })

  it('draws at the size it is given', () => {
    const svg = mount(AppIcon, { props: { name: 'telegram', size: 20 } }).find('svg')

    expect(svg.attributes('width')).toBe('20')
    expect(svg.attributes('viewBox')).toBe('0 0 24 24')
  })

  it('hides itself from assistive technology', () => {
    expect(
      mount(AppIcon, { props: { name: 'box' } })
        .find('svg')
        .attributes('aria-hidden'),
    ).toBe('true')
  })
})
