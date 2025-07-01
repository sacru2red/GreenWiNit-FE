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
  user: null | User
  login: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (user: User) => {
          set({ user })
        },
        logout: () => {
          set({ user: null })
        },
      }),
      {
        name: 'user',
      },
    ),
  ),
)
