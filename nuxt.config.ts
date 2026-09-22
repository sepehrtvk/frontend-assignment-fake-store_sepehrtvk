import tailwindcss from '@tailwindcss/vite'
import { iconLoader } from './icons.config'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-20',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  experimental: {
    viewTransition: true,
  },
  css: ['~/assets/styles/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      titleTemplate: '%s | فروشگاه',
      link: [{ rel: 'icon', href: '/favicon.svg' }],
    },
  },
  vite: {
    plugins: [tailwindcss(), iconLoader()],
  },
})
