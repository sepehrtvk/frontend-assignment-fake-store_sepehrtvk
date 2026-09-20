import type { IconName } from '~/shared/ui/icons'

export interface NavLink {
  label: string
  icon: IconName
  to?: string
}

export const navLinks: NavLink[] = [
  { label: 'لیست محصولات', icon: 'category', to: '/' },
  { label: 'دریافت مشاوره', icon: 'book' },
  { label: 'سوالات متداول', icon: 'question' },
  { label: 'تماس با ما', icon: 'phoneCall' },
]
