import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// The app deploys to GitHub Pages as a project site at
// https://<user>.github.io/knowledge-base/, so assets are served under /knowledge-base/.
// Override with VITE_BASE (e.g. "/") for other hosts.
const base = process.env.VITE_BASE ?? '/knowledge-base/'

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    css: false,
  },
})
