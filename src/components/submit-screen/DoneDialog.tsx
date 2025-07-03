import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

interface DoneDialogProps {
  open: boolean
  onClose: (open: boolean) => void
}

const DoneDialog = ({ open, onClose }: DoneDialogProps) => {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogContent className="flex flex-col gap-3">
        <DialogContentText className="text-border text-center !text-lg !text-black">
          챌린지 인증 완료
        </DialogContentText>
        <DialogContentText className="text-border !text-light-gray text-center !text-sm">
          당신의 실천이
          <br />더 나은 지구를 만듭니다 :)
        </DialogContentText>
        <DialogContentText className="text-border !text-lighter-gray text-center !text-sm">
          * 관리자 확인 후, 포인트가 적립됩니다.
        </DialogContentText>
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
