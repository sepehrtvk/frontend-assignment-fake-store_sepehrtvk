import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FadeInImage from './FadeInImage.vue'

const imageState = (complete: boolean, naturalWidth: number) => {
  vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(complete)
  vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(naturalWidth)
}

const mountImage = () => mount(FadeInImage, { props: { src: '/bag.png', alt: 'Backpack' } })

afterEach(() => vi.restoreAllMocks())

describe('FadeInImage', () => {
  it('shows a photo that finished loading before the page came alive', () => {
    imageState(true, 400)

    expect(mountImage().find('img').classes()).not.toContain('opacity-0')
  })

  it('leaves a photo that is already painting where it is', () => {
    imageState(false, 400)

    expect(mountImage().find('img').classes()).not.toContain('opacity-0')
  })

  it('hides a photo that has not started, then fades it in once it arrives', async () => {
    imageState(false, 0)
    const wrapper = mountImage()
    await nextTick()

    expect(wrapper.find('img').classes()).toContain('opacity-0')

    await wrapper.find('img').trigger('load')

    expect(wrapper.find('img').classes()).not.toContain('opacity-0')
  })

  it('reveals the alt text when the photo fails, rather than hiding it forever', async () => {
    imageState(false, 0)
    const wrapper = mountImage()
    await nextTick()

    await wrapper.find('img').trigger('error')

    expect(wrapper.find('img').classes()).not.toContain('opacity-0')
  })
})
