import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
// https://ko.vite.dev/config/#using-environment-variables-in-config
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        [env.VITE_API_URL]: {
          target: env.API_PROXY_TO,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_URL}`), ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // pass origin header to target server to avoid CORS error
              proxyReq.setHeader('origin', 'https://www.greenwinit.store')
              proxyReq.setHeader('referer', 'https://www.greenwinit.store')
            })
          },
        },
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
              if (id.includes('sonner')) return 'vendor-sonner'
              if (id.includes('react-hook-form')) return 'vendor-react-hook-form'
              if (id.includes('embla-carousel')) return 'vendor-embla-carousel'
              if (id.includes('dayjs')) return 'vendor-dayjs'
              return 'vendor'
            }
          },
        },
      },
    },
  }
})
