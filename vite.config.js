import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Since this is a user/org GitHub Pages site (username.github.io)
  build: {
    outDir: 'dist',
  }
})
