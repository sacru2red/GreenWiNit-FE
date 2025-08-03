import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/**
 * @deprecated DO NOT USE THIS
 */
export interface User {
  id: string
  name: string
  email: string
  point: number
  challengeCount: number
  level: {
    name: string
    code: number
    exp: number
    nextLevelExp: number
  }
}

interface authStoreState {
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
  initAccessToken: () => void
}

export const authStore = create<authStoreState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        setAccessToken: (accessToken: string) => {
          set({ accessToken })
        },
        initAccessToken: () => {
          set({ accessToken: null })
        },
      }),
      {
        name: 'auth',
      },
    ),
  ),
)
