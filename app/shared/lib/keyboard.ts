const TEXT_ENTRY =
  'input:not([type=checkbox], [type=radio], [type=button], [type=submit], [type=reset]), textarea, select, [contenteditable]:not([contenteditable=false])'

export function isTyping(target: EventTarget | null): boolean {
  return target instanceof Element && target.matches(TEXT_ENTRY)
}
