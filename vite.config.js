import { defineConfig } from 'vitest/config'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA()
  ],
  test: {
    environment: 'jsdom'
  }
})
