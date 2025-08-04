import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

interface DoneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DoneDialog = ({ open, onOpenChange }: DoneDialogProps) => {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-3">
        <DialogDescription className="text-border text-center !text-lg !text-black">
          챌린지 인증 완료
        </DialogDescription>
        <DialogDescription className="text-border !text-light-gray text-center !text-sm">
          당신의 실천이
          <br />더 나은 지구를 만듭니다 :)
        </DialogDescription>
        <DialogDescription className="text-border !text-lighter-gray text-center !text-sm">
          * 관리자 확인 후, 포인트가 적립됩니다.
        </DialogDescription>
        <div className="flex w-full flex-row justify-center">
          <Button size="sm" onClick={() => navigate('/challenges/user/me/joined')}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DoneDialog
