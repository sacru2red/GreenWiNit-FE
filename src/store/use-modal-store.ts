import { create } from 'zustand'

type ConfirmModalType =
  | 'should-login' // 로그인이 필요합니다.
  | 'delete-team' // 팀을 삭제하시겠습니까?
  | 'withdraw' // 회원 탈퇴 시, 30일 이내에 재가입이 불가능합니다.
  | 'edit-profile' // 회원정보를 수정하시겠습니까?

type NoticeModalType =
  | 'completed-certify-challenge' // 챌린지 인증 완료
  | 'completed-join-challenge' // 챌린지 참여 완료
  | 'completed-select-team' // 팀 선택 완료
  | 'completed-regist-team' // 팀 등록 완료
  | 'completed-withdraw' // 계정 삭제 완료

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
