import type { IconName } from '~/shared/ui/icons'

export interface NavLink {
  label: string
  icon: IconName
  to: string
  current?: boolean
}

export const navLinks: NavLink[] = [
  { label: 'لیست محصولات', icon: 'category', to: '/', current: true },
  { label: 'دریافت مشاوره', icon: 'book', to: '/' },
  { label: 'سوالات متداول', icon: 'question', to: '/' },
  { label: 'تماس با ما', icon: 'phoneCall', to: '/' },
]
