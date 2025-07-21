import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/store/useModalStore'

interface ConfirmDialogProps {
  isOpen: boolean
  type: 'should-login' | 'delete-team' | 'edit-profile' | 'delete-profile'
  setOpen: (isOpen: boolean) => void
  onConfirm: () => void
  closeModal: () => void
}

const info = {
  'should-login': {
    title: null,
    description: `로그인 후,\n챌린지에 참여할 수 있어요.`,
    showResultMessage: false,
  },
  'delete-team': {
    title: '팀 삭제',
    description: `팀을 삭제하시겠습니까?\n팀 삭제시, 기존 다른 팀원의\n[나의 팀]목록에서도 삭제됩니다.`,
    showResultMessage: false,
  },
  'edit-profile': {
    title: null,
    description: '회원정보를\n수정하시겠습니까?',
    showResultMessage: false,
  },
  'delete-profile': {
    title: '회원 탈퇴',
    description: '회원 탈퇴 시,30일 이내에\n재가입이 불가능합니다.',
    showResultMessage: true,
  },
}

function ConfirmDialog({ isOpen, type, setOpen, onConfirm, closeModal }: ConfirmDialogProps) {
  const { openModal } = useModalStore.getState()

  const { title, description, showResultMessage } = info[type]

  const submitAndNoticeResult = async () => {
    // api 연결 후에 아래와 비슷한 로직으로 변경될 예정
    // const res = await onConfirm()
    // if ((res as any).ok) openModal({ group: 'notice', type: 'delete-profile' })
    openModal({ group: 'notice', type: 'delete-profile' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="h-[200px] w-[228px] gap-0">
        {title && (
          <DialogTitle className="flex items-center justify-center text-center text-lg font-semibold">
            {title}
          </DialogTitle>
        )}
        <DialogDescription className="text-secondary-foreground flex items-center justify-center text-center text-base whitespace-pre-line">
          {description}
        </DialogDescription>
        <DialogFooter className="flex flex-row items-center gap-4 sm:justify-center">
          <Button size="flex" variant="cancel" onClick={closeModal} className="h-10 px-4 py-2.5">
            취소
          </Button>
          <Button
            size="flex"
            onClick={showResultMessage ? submitAndNoticeResult : onConfirm}
            className="h-10 px-4 py-2.5"
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
