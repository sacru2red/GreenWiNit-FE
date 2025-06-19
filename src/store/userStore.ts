import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserState {
  user: null | {
    id: string
    name: string
    email: string
  }
  login: () => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: () => {
          set({ user: { id: '1', name: 'John Doe', email: 'john.doe@example.com' } })
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
