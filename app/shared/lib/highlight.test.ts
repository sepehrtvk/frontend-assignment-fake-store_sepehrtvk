import { describe, expect, it } from 'vitest'
import { splitByMatch } from './highlight'

describe('splitByMatch', () => {
  it('returns the text untouched when there is nothing to find', () => {
    expect(splitByMatch('Solid Gold Petite', '')).toEqual([
      { text: 'Solid Gold Petite', match: false },
    ])
  })

  it('marks the match and keeps the casing of the text, not of the search', () => {
    expect(splitByMatch('Solid Gold Petite', 'GOLD')).toEqual([
      { text: 'Solid ', match: false },
      { text: 'Gold', match: true },
      { text: ' Petite', match: false },
    ])
  })

  it('marks every occurrence', () => {
    expect(
      splitByMatch('Rose Gold and White Gold', 'gold').filter((part) => part.match),
    ).toHaveLength(2)
  })

  it('handles a match at the very start and the very end', () => {
    expect(splitByMatch('gold ring gold', 'gold')).toEqual([
      { text: 'gold', match: true },
      { text: ' ring ', match: false },
      { text: 'gold', match: true },
    ])
  })

  it('returns one plain part when the term does not appear', () => {
    expect(splitByMatch('Silver Chain', 'gold')).toEqual([{ text: 'Silver Chain', match: false }])
  })

  it('ignores the spaces around a term, as the filter does', () => {
    expect(splitByMatch('Solid Gold', '  gold ').find((part) => part.match)?.text).toBe('Gold')
  })

  it('gives up rather than mis-slice when lowercasing changes the length', () => {
    expect(splitByMatch('İstanbul Gold', 'gold')).toEqual([{ text: 'İstanbul Gold', match: false }])
  })
})
