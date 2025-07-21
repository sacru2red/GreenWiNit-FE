import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { NoticeModalType } from '@/store/use-modal-store'

interface ResultNoticeDialogProps {
  isOpen: boolean
  type: NoticeModalType
  setOpen: (isOpen: boolean) => void
  onClick: () => void
}

const info = {
  'completed-certify-challenge': {
    title: '챌린지 인증 완료',
    description: `당신의 실천이\n 더 나은 지구를 만듭니다:)`,
    paragraph: '관리자 확인 후, 포인트가 적립됩니다.',
  },
  'completed-join-challenge': {
    title: '챌린지 참여 완료',
    description: '[홈] -> [참여 챌린지]에서\n챌린지를 인증해보세요!',
  },
  'completed-select-team': {
    title: '팀 선택 완료',
    description: '[홈] -> [나의 챌린지]에서 확인하세요!\n오픈채팅방을 통해 이야기를 나눠요.',
  },
  'completed-regist-team': {
    title: '팀 등록 완료',
    description: '[홈] -> [나의 챌린지]에서 확인하세요!\n오픈채팅방을 통해 이야기를 나눠요.',
  },
  'completed-withdraw': {
    title: null,
    description: '회원 탈퇴가\n정상적으로 완료되었습니다.',
  },
} satisfies Record<
  NoticeModalType,
  { title: string | null; description: string; paragraph?: string }
>

function ResultNoticeDialog({ isOpen, type, setOpen, onClick }: ResultNoticeDialogProps) {
  if (!(type in info)) return null
  const data = info[type]
  const title = data.title ?? null
  const description = data.description
  const paragraph = 'paragraph' in data ? data.paragraph : null

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="h-[200px] w-[228px] gap-0">
        {title && (
          <DialogTitle className="flex items-center justify-center text-center text-lg leading-3 font-semibold whitespace-pre-line text-black">
            {title}
          </DialogTitle>
        )}
        <DialogDescription className="text-secondary-foreground flex flex-col items-center justify-center text-center text-base whitespace-pre-line">
          {description}
          {paragraph && <p className="text-lighter-gray text-xs">{paragraph}</p>}
        </DialogDescription>
        <DialogFooter className="flex flex-row items-center gap-4 sm:justify-center">
          <Button size="flex" onClick={onClick} className="h-10 px-4 py-2.5">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ResultNoticeDialog
