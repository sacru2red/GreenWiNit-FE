import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/common/modal/dialog'
import { Button } from '@/components/common/button'
import { useNavigate } from '@tanstack/react-router'

interface DoneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DoneDialog = ({ open, onOpenChange }: DoneDialogProps) => {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle>챌린지 인증 완료</DialogTitle>
        </DialogHeader>
        <DialogDescription className="!text-light-gray text-center !text-sm">
          당신의 실천이
          <br />더 나은 지구를 만듭니다 :&#41;
        </DialogDescription>
        <DialogDescription className="!text-lighter-gray text-center !text-sm text-nowrap">
          * 관리자 확인 후, 포인트가 적립됩니다.
        </DialogDescription>
        <div className="flex w-full flex-row justify-center">
          <Button size="sm" onClick={() => navigate({ to: '/challenges/user/me/joined' })}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DoneDialog
