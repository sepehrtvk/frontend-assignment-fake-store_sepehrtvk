import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: { '~': fileURLToPath(new URL('./app', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
  },
})
