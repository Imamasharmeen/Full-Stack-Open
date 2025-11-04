// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true
      }
    }
  },
  // 🧪 Added Vitest testing configuration
  test: {
    environment: 'jsdom', // Simulates a browser for component testing
    globals: true,        // Lets you use describe/test/expect without importing
    setupFiles: './testSetup.js', // Runs setup (cleanup + jest-dom)
  }
})
