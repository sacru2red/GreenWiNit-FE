import { createRoot } from 'react-dom/client'
import './index.css'
import fetchIntercept, { FetchInterceptorResponse } from 'fetch-intercept'
import { API_URL } from './constant/network.ts'
import { authStore } from './store/auth-store.ts'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { authApi } from './api/auth.ts'

// Create a new router instance
const router = createRouter({
  routeTree,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

let isRefreshing = false
function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  if (!base64Url) {
    return null
  }

  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  try {
    return JSON.parse(jsonPayload)
  } catch (_e) {
    return null
  }
}

fetchIntercept.register({
  request: function (url: string, config: RequestInit) {
    const accessToken = authStore.getState().accessToken
    if (accessToken) {
      const jwt = parseJwt(accessToken)
      if (jwt && typeof jwt === 'object') {
        const expSeconds = Number(jwt.exp)
        const expMillis = expSeconds * 1000
        const remainTimeMillis = expMillis - Date.now()
        const remainTimeSeconds = remainTimeMillis / 1000

        // 2분 미만으로 남았을 때 refresh 시도
        if (remainTimeSeconds < 60 * 2 && !isRefreshing) {
          isRefreshing = true
          void authApi.refreshAccessToken().then((res) => {
            if (res.success) {
              authStore.getState().setAccessToken(res.result.accessToken)
              isRefreshing = false
            }
          })
        }
      }
    }

    if (url.startsWith(API_URL) && accessToken) {
      const nextConfig = {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }

      return [
        url,
        {
          ...nextConfig,
        },
      ]
    }

    // Modify the url or config here
    return [url, config]
  },

  response: function (response: FetchInterceptorResponse) {
    const isApiUrl = API_URL.startsWith('/')
      ? new URL(response.url).pathname.startsWith(API_URL)
      : response.url.startsWith(API_URL)
    if (isApiUrl && !response.ok) {
      if (response.status >= 400 && response.status < 500) {
        if (response.headers.get('content-type')?.includes('json')) {
          response
            .clone()
            .json()
            .then((body) => {
              if (body.message === '접근이 거부되었습니다.' || body.message.includes('JWT 토큰')) {
                authStore.getState().initAccessToken()
                router.navigate({ to: '/login' })
              }
            })
        }
      }
    }

    return response
  },
})
