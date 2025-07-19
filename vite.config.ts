import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-datepicker')) return 'vendor-react-datepicker'
            if (id.includes('date-fns')) return 'vendor-date-fns'
            if (id.includes('@tanstack/react-query')) return 'vendor-tanstack-react-query'
            if (id.includes('react-router')) return 'vendor-react-router'
            if (id.includes('sonner')) return 'vendor-sonner'
            if (id.includes('react-hook-form')) return 'vendor-react-hook-form'
            if (id.includes('embla-carousel')) return 'vendor-embla-carousel'
            if (id.includes('dayjs')) return 'vendor-dayjs'
            if (id.includes('react-dom')) return 'vendor-react-dom'
            if (id.includes('react')) return 'vendor-react'
            return 'vendor'
          }
        },
      },
    },
  },
})
