import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

type LoginDialogProps = {
  isOpen: boolean
  description: string
  paragraph: string
  setIsOpen: (open: boolean) => void
  onLogin: () => void
}

function LoginDialog({ isOpen, description, paragraph, setIsOpen, onLogin }: LoginDialogProps) {
  const navigate = useNavigate()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-6 p-10">
        <DialogTitle className="sr-only">로그인</DialogTitle>
        <DialogDescription className="text-secondary-foreground flex flex-col items-center justify-center text-center text-base whitespace-pre-line">
          {description}
          {paragraph && <span>{paragraph}</span>}
        </DialogDescription>
        <DialogFooter className="flex flex-row items-center gap-4 sm:justify-center">
          <Button
            size="flex"
            variant="cancel"
            onClick={(prev) => {
              setIsOpen(!prev)
              navigate('/')
            }}
            className="h-10 px-4 py-2.5"
          >
            취소
          </Button>
          <Button size="flex" onClick={onLogin} className="h-10 px-4 py-2.5">
            로그인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
