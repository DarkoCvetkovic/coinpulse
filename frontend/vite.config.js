import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Production builds are served from https://darkocvetkovic.github.io/coinpulse/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === 'production' ? '/coinpulse/' : '/',
}))
