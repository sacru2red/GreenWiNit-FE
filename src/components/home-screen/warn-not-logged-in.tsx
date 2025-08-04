import { Dialog, DialogContent, DialogDescription, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

interface WarnNotLoggedInProps {
  isOpen: boolean
  onOpenChange(open: boolean): void
  redirectUrl?: string
}

const WarnNotLoggedIn = ({ isOpen, onOpenChange, redirectUrl }: WarnNotLoggedInProps) => {
  const navigate = useNavigate()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogDescription className="text-center text-black">
          로그인 후<br />
          챌린지에 참여할 수 있어요.
        </DialogDescription>
        <DialogFooter className="flex flex-row gap-6 sm:justify-center">
          <Button variant="cancel" size="flex" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button size="flex" onClick={() => navigate(`/login?redirect=${redirectUrl ?? '/'}`)}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WarnNotLoggedIn
