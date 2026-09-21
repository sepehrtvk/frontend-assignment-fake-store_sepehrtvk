import { describe, expect, it } from 'vitest'
import { isTyping } from './keyboard'

const element = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host.firstElementChild
}

describe('isTyping', () => {
  it.each([
    ['a text field', '<input type="text">'],
    ['a search field', '<input type="search">'],
    ['a field with no type', '<input>'],
    ['a textarea', '<textarea></textarea>'],
    ['a select', '<select></select>'],
    ['an editable region', '<div contenteditable="true"></div>'],
  ])('is true for %s', (_, html) => {
    expect(isTyping(element(html))).toBe(true)
  })

  it.each([
    ['a checkbox the user just ticked', '<input type="checkbox">'],
    ['a radio', '<input type="radio">'],
    ['a button', '<button></button>'],
    ['a region switched off for editing', '<div contenteditable="false"></div>'],
  ])('is false for %s', (_, html) => {
    expect(isTyping(element(html))).toBe(false)
  })

  it('is false when nothing has focus', () => {
    expect(isTyping(null)).toBe(false)
  })
})
