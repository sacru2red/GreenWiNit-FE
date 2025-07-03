import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface MessageStoreState {
  opened: boolean
  message: null | string
  showMessage: (message: string) => void
  hideMessage: () => void
  clearMessage: () => void
}

export const useMessageStore = create<MessageStoreState>()(
  devtools(
    persist(
      (set) => ({
        opened: false,
        message: null,
        showMessage: (message: string) => {
          set({ message, opened: true })
        },
        hideMessage: () => {
          set({ opened: false })
        },
        clearMessage: () => {
          set({ message: null, opened: false })
        },
      }),
      {
        name: 'message',
      },
    ),
  ),
)
