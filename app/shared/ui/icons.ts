import Book from '~/assets/icons/book.svg?component'
import Box from '~/assets/icons/box.svg?component'
import BreadcrumbArrow from '~/assets/icons/breadcrumb-arrow.svg?component'
import Category from '~/assets/icons/category.svg?component'
import Chevron from '~/assets/icons/chevron.svg?component'
import Close from '~/assets/icons/close.svg?component'
import Home from '~/assets/icons/home.svg?component'
import Instagram from '~/assets/icons/instagram.svg?component'
import Linkedin from '~/assets/icons/linkedin.svg?component'
import Menu from '~/assets/icons/menu.svg?component'
import Phone from '~/assets/icons/phone.svg?component'
import PhoneCall from '~/assets/icons/phone-call.svg?component'
import Question from '~/assets/icons/question.svg?component'
import Search from '~/assets/icons/search.svg?component'
import Sort from '~/assets/icons/sort.svg?component'
import Telegram from '~/assets/icons/telegram.svg?component'
import Twitter from '~/assets/icons/twitter.svg?component'
import Youtube from '~/assets/icons/youtube.svg?component'
import Zoom from '~/assets/icons/zoom.svg?component'

export const icons = {
  book: Book,
  box: Box,
  breadcrumbArrow: BreadcrumbArrow,
  category: Category,
  chevron: Chevron,
  close: Close,
  home: Home,
  instagram: Instagram,
  linkedin: Linkedin,
  menu: Menu,
  phone: Phone,
  phoneCall: PhoneCall,
  question: Question,
  search: Search,
  sort: Sort,
  telegram: Telegram,
  twitter: Twitter,
  youtube: Youtube,
  zoom: Zoom,
}

export type IconName = keyof typeof icons
