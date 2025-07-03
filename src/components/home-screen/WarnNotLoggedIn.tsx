import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

interface WarnNotLoggedInProps {
  isOpen: boolean
  onClose: () => void
  redirectUrl?: string
}

const WarnNotLoggedIn = ({ isOpen, onClose, redirectUrl }: WarnNotLoggedInProps) => {
  const navigate = useNavigate()

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogContentText className="text-center !text-black">
          로그인 후<br />
          챌린지에 참여할 수 있어요.
        </DialogContentText>
        <div className="mt-6 flex flex-row gap-6">
          <Button variant="cancel" size="flex" onClick={onClose}>
            취소
          </Button>
          <Button size="flex" onClick={() => navigate(`/login?redirect=${redirectUrl ?? '/'}`)}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WarnNotLoggedIn
