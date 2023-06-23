import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    checker({ vueTsc: true })
  ],
})
