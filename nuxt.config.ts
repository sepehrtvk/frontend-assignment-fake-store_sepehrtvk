import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-20',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/styles/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
