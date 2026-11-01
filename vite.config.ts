import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /portfolio-website/, Vercel serves it from the root.
  // Vercel sets VERCEL=1 during its builds.
  base: process.env.VERCEL ? '/' : '/portfolio-website/',
  plugins: [react()],
})
