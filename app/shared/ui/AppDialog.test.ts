import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import AppDialog from './AppDialog.vue'
import { stubDialogMethods } from '~/test/dialog'

beforeAll(stubDialogMethods)

const mountDialog = (open = false) =>
  mount(AppDialog, {
    props: { label: 'فهرست', open },
    slots: { default: '<p>محتوا</p>' },
    attachTo: document.body,
  })

describe('AppDialog', () => {
  it('starts closed', () => {
    expect(mountDialog().find('dialog').element.open).toBe(false)
  })

  it('opens when the model turns true', async () => {
    const wrapper = mountDialog()

    await wrapper.setProps({ open: true })

    expect(wrapper.find('dialog').element.open).toBe(true)
  })

  it('closes again when the model turns false', async () => {
    const wrapper = mountDialog(false)

    await wrapper.setProps({ open: true })
    await wrapper.setProps({ open: false })

    expect(wrapper.find('dialog').element.open).toBe(false)
  })

  it('tells the model when the dialog closes itself', async () => {
    const wrapper = mountDialog()

    await wrapper.setProps({ open: true })
    wrapper.find('dialog').element.close()

    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('names itself for assistive technology', () => {
    expect(mountDialog().find('dialog').attributes('aria-label')).toBe('فهرست')
  })

  it('renders what it was given', () => {
    expect(mountDialog().text()).toContain('محتوا')
  })
})
