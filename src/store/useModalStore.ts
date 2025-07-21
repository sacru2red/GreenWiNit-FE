import { create } from 'zustand'

type ConfirmModalType = 'should-login' | 'delete-team' | 'delete-profile' | 'edit-profile'

type NoticeModalType =
  | 'certify-challenge'
  | 'join-challenge'
  | 'select-team'
  | 'regist-team'
  | 'delete-profile'

type ConfirmModal = {
  group: 'confirm'
  type: ConfirmModalType
  onConfirm: () => void
}

type NoticeModal = {
  group: 'notice'
  type: NoticeModalType
}

type ModalType = ConfirmModal | NoticeModal

interface ModalState {
  isOpen: boolean
  modal: ModalType | null
  setOpen: (isOpen: boolean) => void
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modal: null,
  setOpen: (isOpen) => set((state) => ({ ...state, isOpen })),
  openModal: (modal) => set({ isOpen: true, modal }),
  closeModal: () => set({ isOpen: false, modal: null }),
}))
