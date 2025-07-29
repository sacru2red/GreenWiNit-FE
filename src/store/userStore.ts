import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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

interface UserStoreState {
  /**
   * @deprecated
   * @TODO remove this
   */
  user: null | User
  /**
   * @deprecated
   * @TODO remove this
   */
  login: (user: User) => void
  logout: () => void
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
}

export const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        login: (user: User) => {
          set({ user })
        },
        logout: () => {
          set({ user: null })
        },
        setAccessToken: (accessToken: string) => {
          set({ accessToken })
        },
      }),
      {
        name: 'user',
      },
    ),
  ),
)
