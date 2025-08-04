import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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
