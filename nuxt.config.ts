import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-20',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/styles/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      titleTemplate: '%s | فروشگاه',
      link: [{ rel: 'icon', href: '/favicon.svg' }],
    },
  },
  vite: {
    plugins: [tailwindcss(), svgLoader()],
  },
})
