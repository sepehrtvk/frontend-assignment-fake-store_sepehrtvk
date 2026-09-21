export interface TextPart {
  text: string
  match: boolean
}

export function splitByMatch(text: string, term: string): TextPart[] {
  const needle = term.trim().toLowerCase()
  const haystack = text.toLowerCase()

  if (!needle || haystack.length !== text.length) return [{ text, match: false }]

  const parts: TextPart[] = []
  let from = 0

  for (let at = haystack.indexOf(needle); at !== -1; at = haystack.indexOf(needle, from)) {
    if (at > from) parts.push({ text: text.slice(from, at), match: false })
    parts.push({ text: text.slice(at, at + needle.length), match: true })
    from = at + needle.length
  }

  if (from < text.length) parts.push({ text: text.slice(from), match: false })

  return parts
}
